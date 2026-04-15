import { mkdir, rm } from 'node:fs/promises'
import { join, normalize } from 'node:path'
import glob from 'fast-glob'
import { reporter } from 'vfile-reporter'

import { resolveConfig } from './config'
import { RedStrawFile } from './file'
import { logger } from './logger'
import { outputAssets, outputData, outputEntry } from './output'
import { getParsedType, ParseContext } from './schemas/zod'
import { matchPatterns } from './utils'

import type { LogLevel } from './logger'
import type { Schema, ZodMeta } from './schemas'
import type { Config } from './types'

// cache resolved result for rebuild (scoped to watch session)
let resolvedCache = new Map<string, RedStrawFile[]>()

/**
 * Load file and parse data with given schema
 * @param config resolved config
 * @param path file path
 * @param schema data schema
 * @param changed changed file path (relative to content root)
 */
const load = async (config: Config, path: string, schema: Schema, changed?: string): Promise<RedStrawFile> => {
  path = normalize(path)

  if (changed != null && path !== changed) {
    const exists = RedStrawFile.get(path)
    // skip file if changed file not match
    if (exists) return exists
  }

  const file = await RedStrawFile.create({ path, config })

  // may be one or more records in one file, such as yaml array or json array
  const isArr = Array.isArray(file.records)
  const list = isArr ? file.records : [file.records]

  const parsed = await Promise.all(
    list.map(async (data, index) => {
      // push index in path if file is array
      const path = isArr ? [index] : []

      const ctx: ParseContext = {
        common: { issues: [], async: true },
        path,
        meta: file as ZodMeta,
        data,
        parent: null,
        parsedType: getParsedType(data),
        schemaErrorMap: schema._def.errorMap
      }

      // parse data with given schema
      const ret = schema._parse({ data, path, meta: ctx.meta, parent: ctx })

      const result = await (ret instanceof Promise ? ret : Promise.resolve(ret))

      if (result.status === 'valid') return result.value

      // report error if parsing failed
      ctx.common.issues.forEach(issue => {
        const source = issue.path.map(i => (typeof i === 'number' ? `[${i}]` : i)).join('.')
        const message = file.message(issue.message, { source })
        message.fatal = result.status === 'aborted' || issue.fatal
      })

      // return parsed data unless fatal error
      return result.status !== 'aborted' && result.value
    })
  )

  file.result = isArr ? parsed : parsed[0]

  return file
}

/**
 * Resolve collections from content root
 * @param config resolved config
 * @param changed changed file path (relative to content root)
 * @param dryRun if true, skip all file writes
 * @returns resolved result
 */
const resolve = async (config: Config, changed?: string, dryRun = false): Promise<Record<string, unknown>> => {
  const { root, output, collections, prepare, complete, assetsMap, emittedMap } = config
  const begin = performance.now()

  logger.log(`resolving collections from '${root}'`)

  const collectionEntries = Object.entries(collections)
  const total = collectionEntries.length

  const entries = await Promise.all(
    collectionEntries.map(async ([name, { pattern, schema }], idx): Promise<[string, RedStrawFile[]]> => {
      if (changed != null && !matchPatterns(changed, pattern, root) && resolvedCache.has(name)) {
        // skip collection if changed file not match
        logger.log(`skipped resolve '${name}', using previous resolved`)
        return [name, resolvedCache.get(name)!]
      }
      const begin = performance.now()
      logger.log(`[${idx + 1}/${total}] resolving '${name}'...`)
      const paths = await glob(pattern, { cwd: root, absolute: true, onlyFiles: true, ignore: ['**/_*'] })
      const files = await Promise.all(paths.map(path => load(config, path, schema, changed)))
      logger.log(`resolve ${paths.length} files matching '${pattern}'`, begin)
      resolvedCache.set(name, files)
      return [name, files]
    })
  )

  const allFiles = entries.flatMap(([, files]) => files)
  const report = reporter(allFiles, { quiet: true })

  if (report.length > 0) {
    logger.warn(`issues:\n${report}`)
    if (config.strict) throw new Error('Schema validation failed.')
  }

  const result = Object.fromEntries(
    entries.map(([name, files]): [string, any | any[]] => {
      const data = files.flatMap(file => file.result).filter(Boolean)
      if (collections[name].single) {
        if (data.length === 0) throw new Error(`no data resolved for '${name}' collection`)
        if (data.length > 1) logger.warn(`resolved ${data.length} ${name}, but expected single, using first one`)
        else logger.log(`resolved 1 ${name}`)
        return [name, data[0]]
      }
      logger.log(`resolved ${data.length} ${name}`)
      return [name, data]
    })
  )

  const context = { config }

  let shouldOutput = !dryRun
  // apply prepare hook
  if (typeof prepare === 'function') {
    const begin = performance.now()
    const ret = await prepare(result, context)
    if (!dryRun) shouldOutput = ret ?? true
    logger.log(`executed 'prepare' callback got ${shouldOutput}`, begin)
  }

  if (shouldOutput) {
    // emit result if not prevented
    await outputData(output.data, result, emittedMap)
  } else {
    logger.warn(dryRun ? `dry-run: skipped output` : `prevent output by 'prepare' callback`)
  }

  // output all assets
  if (!dryRun) await outputAssets(output.assets, assetsMap, emittedMap)

  // call complete hook
  if (typeof complete === 'function') {
    const begin = performance.now()
    await complete(result, context)
    logger.log(`executed 'complete' callback`, begin)
  }

  logger.log(`resolved ${Object.keys(result).length} collections`, begin)

  return result
}

/**
 * Watch files and rebuild on changes
 * @param config resolved config
 */
const watch = async (config: Config) => {
  const { watch: chokidarWatch } = await import('chokidar')
  const { root, collections, configImports } = config

  logger.info(`watching for changes in '${root}'`)

  const patterns = Object.values(collections).flatMap(({ pattern }) => (Array.isArray(pattern) ? pattern : [pattern]))

  const handleChange = async (event: string, filename?: string | null, isConfig = false) => {
    if (event === 'addDir' || event === 'unlinkDir') return

    try {
      if (isConfig) {
        logger.info('RedStraw config changed, restarting...')
        contentWatcher.close()
        configWatcher.close()
        return build({ config: config.configPath, clean: false, watch: true })
      }

      if (filename == null || typeof filename !== 'string') return

      // skip if filename not match any collection pattern
      if (!matchPatterns(filename, patterns)) return

      const fullpath = join(root, filename)

      // remove changed file cache
      for (const [key, value] of config.cache.entries()) {
        if (value === fullpath) config.cache.delete(key)
      }

      const begin = performance.now()
      logger.info(`changed: '${fullpath}', rebuilding...`)
      await resolve(config, fullpath)
      logger.info(`rebuild finished`, begin)
    } catch (err) {
      logger.warn(err)
    }
  }

  // Watch content files using relative patterns with cwd
  const contentWatcher = chokidarWatch(patterns, {
    cwd: root,
    ignoreInitial: true,
    awaitWriteFinish: { stabilityThreshold: 50, pollInterval: 10 }
  }).on('all', (event, filename) => handleChange(event, filename))

  // Watch config imports using absolute paths (no cwd)
  const configWatcher = chokidarWatch(configImports, {
    ignoreInitial: true,
    awaitWriteFinish: { stabilityThreshold: 50, pollInterval: 10 }
  }).on('all', event => handleChange(event, undefined, true))
}

/**
 * Build options
 */
export interface Options {
  /**
   * Specify config file path, relative to cwd
   * if not specified, will try to find `redstraw.config.{js,ts,mjs,mts,cjs,cts}` in cwd or parent directories
   */
  config?: string
  /**
   * Clean output directories before build
   * @default false
   */
  clean?: boolean
  /**
   * Watch files and rebuild on changes
   * @default false
   */
  watch?: boolean
  /**
   * Log level
   * @default 'info'
   */
  logLevel?: LogLevel
  /**
   * Perform a dry run — validate and resolve content but skip all file writes
   * @default false
   */
  dryRun?: boolean
  /**
   * If true, throws error and terminates process if any schema validation fails.
   * @default false
   */
  strict?: boolean
}
/**
 * Check contents without writing output
 * Validates all content files against their schemas and reports issues
 * @param options build options
 */
export const check = async (options: Options = {}): Promise<{ errors: number; warnings: number }> => {
  const { config: configFile, logLevel, strict } = options

  logLevel != null && logger.set(logLevel)

  const begin = performance.now()

  const config = await resolveConfig(configFile, { strict })
  const { root, collections } = config

  logger.log(`checking collections from '${root}'`)

  resolvedCache = new Map()
  RedStrawFile.clearCache()

  let totalErrors = 0
  let totalWarnings = 0

  for (const [name, { pattern, schema }] of Object.entries(collections)) {
    const paths = await glob(pattern, { cwd: root, absolute: true, onlyFiles: true, ignore: ['**/_*'] })
    const files = await Promise.all(paths.map(path => load(config, path, schema)))

    const report = reporter(files, { quiet: true })
    const fileCount = paths.length

    if (report.length > 0) {
      const errors = files.filter(f => f.messages.some(m => m.fatal))
      const warnings = files.filter(f => f.messages.some(m => !m.fatal))
      totalErrors += errors.length
      totalWarnings += warnings.length
      logger.warn(`${name}: ${fileCount} files, ${errors.length} errors, ${warnings.length} warnings`)
      logger.warn(`issues:\n${report}`)
    } else {
      logger.info(`${name}: ${fileCount} files, all valid`)
    }
  }

  if (totalErrors > 0 && strict) {
    logger.error(`check failed: ${totalErrors} errors found`)
    process.exit(1)
  }

  if (totalErrors === 0 && totalWarnings === 0) {
    logger.info(`all collections valid`, begin)
  } else {
    logger.info(`check finished: ${totalErrors} errors, ${totalWarnings} warnings`, begin)
  }

  return { errors: totalErrors, warnings: totalWarnings }
}

/**
 * Build contents
 * @param options build options
 */
export const build = async (options: Options = {}): Promise<Record<string, unknown>> => {
  const { config: configFile, clean, logLevel, strict, dryRun } = options

  logLevel != null && logger.set(logLevel)

  const begin = performance.now()

  const timer = setTimeout(() => logger.info('building...'), 1000)

  if (dryRun) {
    logger.info('dry-run mode: output will be validated but not written')
  }

  const config = await resolveConfig(configFile, { clean, strict })

  const { configPath, output, collections, emittedMap } = config

  if (output.clean) {
    await rm(output.data, { recursive: true, force: true })
    logger.log(`cleaned data output dir '${output.data}'`)

    await rm(output.assets, { recursive: true, force: true })
    logger.log(`cleaned assets output dir '${output.assets}'`)
  }

  // create output directories if not exists
  await mkdir(output.data, { recursive: true })
  await mkdir(output.assets, { recursive: true })

  // reset caches for fresh build
  resolvedCache = new Map()
  RedStrawFile.clearCache()

  if (!dryRun) await outputEntry(output.data, output.format, configPath, collections, emittedMap)

  logger.log('initialized', begin)

  const result = await resolve(config, undefined, dryRun)

  clearTimeout(timer)

  logger.info(`build finished`, begin)

  options.watch && watch(config)
  return result
}
