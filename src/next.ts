import { build } from './build'

import type { Options } from './build'

const START_PROMISE_KEY = Symbol.for('RedStraw.next.startPromise')

export const startRedStraw = async (options: Options = {}): Promise<void> => {
  const argv = process.argv
  const isDev = argv.includes('dev')
  const isBuild = argv.includes('build')

  if (!isDev && !isBuild) return

  const globalScope = globalThis as typeof globalThis & { [START_PROMISE_KEY]?: Promise<void> }
  const existing = globalScope[START_PROMISE_KEY]
  if (existing) return existing

  if (process.env.REDSTRAW_STARTED) return
  process.env.REDSTRAW_STARTED = '1'

  const startPromise = build({
    ...options,
    watch: options.watch ?? isDev,
    clean: options.clean ?? !isDev
  }).then(() => undefined)

  globalScope[START_PROMISE_KEY] = startPromise
  return startPromise
}