import type { Plugin } from 'vite'

type Options = {
  /**
   * Path to RedStraw.config.ts
   * @default 'RedStraw.config.{js,ts}'
   */
  config?: string
}

/**
 * RedStraw Vite plugin
 * @param {Options} options - Options
 * @returns {Plugin} Vite plugin
 */
declare function RedStrawPlugin(options?: Options): Plugin

export { RedStrawPlugin as default, type Options }