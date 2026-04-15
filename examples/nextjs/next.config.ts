import { startRedStraw } from 'redstraw/next';



import type { NextConfig } from 'next';


const nextConfig: NextConfig = {
  /* config options here */
}

export default async function config() {
  await startRedStraw()
  return nextConfig
}

// legacy next.config.js ↓ (not support turbopack)

// /** @type {import('next').NextConfig} */
// module.exports = {
//   // othor next config here...
//   webpack: config => {
//     config.plugins.push(new RedStrawWebpackPlugin())
//     return config
//   }
// }

// class RedStrawWebpackPlugin {
//   static started = false
//   apply(/** @type {import('webpack').Compiler} */ compiler) {
//     // executed three times in nextjs
//     // twice for the server (nodejs / edge runtime) and once for the client
//     compiler.hooks.beforeCompile.tapPromise('RedStrawWebpackPlugin', async () => {
//       if (RedStrawWebpackPlugin.started) return
//       RedStrawWebpackPlugin.started = true
//       const dev = compiler.options.mode === 'development'
//       const { build } = await import('RedStraw')
//       await build({ watch: dev, clean: !dev })
//     })
//   }
// }