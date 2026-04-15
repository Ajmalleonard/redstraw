# Integration with Next.js 16 + Turbopack

RedStraw is the perfect content layer for Next.js 16 and Turbopack. This guide covers integrating RedStraw with the latest Next.js stack for optimal performance.

## Quick Setup with withRedStraw Helper

The recommended way to use RedStraw with Next.js 16 is with the built-in `withRedStraw` helper:

```ts [next.config.ts]
import { withRedStraw } from 'redstraw/next'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* your Next.js config */
}

export default withRedStraw(nextConfig)
```

Then run with Turbopack for maximum performance:

```bash
next dev --turbopack
```

## Using Turbopack for Speed

RedStraw is optimized for Turbopack:

### Development

```bash
# With Turbopack (recommended for Next.js 16)
next dev --turbopack

# Or without Turbopack
next dev
```

### Production Build

```bash
# Turbopack automatically optimizes build process
next build
```

## Manual Integration (Advanced)

If you need more control, you can manually configure RedStraw in your Next.js config:

::: code-group

```ts [next.config.ts]
import type { NextConfig } from 'next'

const isDev = process.argv.indexOf('dev') !== -1
const isBuild = process.argv.indexOf('build') !== -1
if (!process.env.REDSTRAW_STARTED && (isDev || isBuild)) {
  process.env.REDSTRAW_STARTED = '1'
  import('redstraw').then(m => m.build({ watch: isDev, clean: !isDev }))
}

const nextConfig: NextConfig = {
  /* config options here */
}

export default nextConfig
```

```js [next.config.mjs]
const isDev = process.argv.indexOf('dev') !== -1
const isBuild = process.argv.indexOf('build') !== -1
if (!process.env.REDSTRAW_STARTED && (isDev || isBuild)) {
  process.env.REDSTRAW_STARTED = '1'
  const { build } = await import('redstraw')
  await build({ watch: isDev, clean: !isDev })
}

/** @type {import('next').NextConfig} */
export default {
  // next config here...
}
```

:::

## Using npm Scripts with npm-run-all

For separate content and Next.js builds:

**package.json**:

```json
{
  "scripts": {
    "dev:content": "redstraw build --watch",
    "build:content": "redstraw build --clean",
    "dev:next": "next dev --turbopack",
    "build:next": "next build",
    "dev": "run-p dev:*",
    "build": "run-s build:*",
    "start": "next start"
  }
}
```

## Performance Tips for Next.js 16

1. **Always use `--turbopack`** during development:

   ```bash
   next dev --turbopack
   ```

2. **Optimize generated static params** - Pre-generate only essential pages:

   ```tsx
   export const dynamicParams = false
   ```

3. **Use proper image optimization** with Next.js Image component:

   ```tsx
   import Image from 'next/image'
   ```

4. **Enable Incremental Static Regeneration**:
   ```tsx
   export const revalidate = 3600 // revalidate every hour
   ```

## Examples

- [examples/nextjs](./../../../../examples/nextjs) - Complete Next.js 16 + Turbopack example
- [Live Demo](https://stackblitz.com/edit/redstraw-nextjs) - Try on StackBlitz
  Content Structure in Next.js

Typical structure for a Next.js 16 project with RedStraw:

```
my-nextjs-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── blog/
│       ├── page.tsx
│       └── [slug]/
│           └── page.tsx
├── content/
│   └── posts/
│       ├── first-post.md
│       └── second-post.md
├── redstraw.config.ts
├── next.config.ts
└── package.json
```

## Using RedStraw Content in Next.js Pages
