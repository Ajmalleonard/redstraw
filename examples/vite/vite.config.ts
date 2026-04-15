import redstraw from '@redstraw/plugin-vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), redstraw()],
  resolve: {
    alias: {
      '#straws': path.resolve(__dirname, '.redstraw')
    }
  }
})
