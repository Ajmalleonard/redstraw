# @RedStraw/plugin-vite

A Vite plugin for integrating RedStraw content processing.

## Installation

```bash
npm install -D RedStraw @RedStraw/plugin-vite
```

## Usage

```ts
// vite.config.ts
import RedStraw from '@RedStraw/plugin-vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    RedStraw({
      // Path to RedStraw config file
      config: 'RedStraw.config.ts'
    })
  ]
})
```

## Options

- `config`: Path to RedStraw.config.ts file (default: 'RedStraw.config.ts')

## License

[MIT](../../license) &copy; [zce](https://zce.me)
