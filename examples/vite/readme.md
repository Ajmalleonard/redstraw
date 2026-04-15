# Vite + MDX + RedStraw

A template with Vite, [RedStraw](https://github.com/zce/RedStraw).

[MDX Example](content/pages/about/index.mdx)

## Recipes

#### Using @RedStraw/plugin-vite:

**vite.config.ts**:

```ts
import RedStraw from '@RedStraw/plugin-vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [RedStraw()]
})
```
