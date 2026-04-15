import { parseArgs } from 'node:util'

import { name, version } from '../package.json'
import { build, check } from './build'
import { init } from './init'
import { logger } from './logger'
import { resolveConfig } from './config'

const parse: typeof parseArgs = config => {
  try {
    return parseArgs(config)
  } catch (err: any) {
    logger.error(err.message)
    process.exit(1)
  }
}

const { values, positionals } = parse({
  allowPositionals: true,
  options: {
    config: { type: 'string', short: 'c' },
    clean: { type: 'boolean', default: false },
    watch: { type: 'boolean', default: false },
    verbose: { type: 'boolean', default: false },
    silent: { type: 'boolean', default: false },
    strict: { type: 'boolean', short: 's', default: false },
    'dry-run': { type: 'boolean', default: false },
    debug: { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h', default: false },
    version: { type: 'boolean', short: 'v', default: false }
  }
})

if (values.version) {
  console.log(`${name}/${version}`)
  process.exit(0)
}

if (values.help) {
  console.log(`
${name}/${version}

Usage:
  $ redstraw <command> [options]

Commands:
  build    Build contents for production
  dev      Build contents with watch mode
  check    Validate content files without building
  clean    Remove output directories
  init     Create a starter config and content

Options:
  -c, --config <path>  Use specified config file
  --clean              Clean output directory before build
  --watch              Watch for changes and rebuild
  --dry-run            Validate content without writing any output files
  --verbose            Print additional information
  --silent             Silent mode (no output)
  --strict             Throw error and terminate process if any schema validation fails
  --debug              Output full error stack trace
  -h, --help           Display this message
  -v, --version        Display version number
`)
  process.exit(0)
}

const command = positionals[0]

const logLevel = values.silent ? 'silent' : values.verbose ? 'debug' : 'info'

const run = async () => {
  switch (command) {
    case 'init':
      await init()
      break

    case 'check':
      await check({ ...values, logLevel })
      break

    case 'clean': {
      const config = await resolveConfig(values.config)
      const { rm } = await import('node:fs/promises')
      await rm(config.output.data, { recursive: true, force: true })
      logger.info(`removed '${config.output.data}'`)
      await rm(config.output.assets, { recursive: true, force: true })
      logger.info(`removed '${config.output.assets}'`)
      break
    }

    case 'dev':
      await build({ ...values, watch: true, dryRun: values['dry-run'], logLevel })
      break

    case 'build':
      await build({ ...values, dryRun: values['dry-run'], logLevel })
      break

    case undefined:
      // no command and no relevant flags — show help
      if (!values.watch) {
        console.log(`${name}/${version}\n\nRun 'redstraw --help' for usage information.`)
        process.exit(0)
      }
      // --watch without command acts like dev
      await build({ ...values, watch: true, logLevel })
      break

    default:
      logger.error(`unknown command '${command}'`)
      console.log(`\nRun 'redstraw --help' for usage information.`)
      process.exit(1)
  }
}

run().catch(err => {
  logger.error(err.message)
  if (values.debug) throw err
  process.exit(1)
})
