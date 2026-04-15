# Introduction

::: warning

🚧 This documentation is not yet complete currently. but the functionality is mostly stable, although there is still a possibility of significant changes being made.

However, I have provided some [examples](https://github.com/ajmalleonard/redstraw/tree/main/examples) for your consideration.

:::

## What is RedStraw?

RedStraw is a modern, type-safe content management system designed for Next.js 16+, React 19, and Vite. It transforms Markdown, MDX, YAML, and JSON files into strongly-typed data layers with full TypeScript support and Turbopack optimization.

### Why Choose RedStraw?

"RedStraw" refers to geological layers—each distinct yet building upon others. Similarly, RedStraw builds your content layer with each piece precisely typed and validated, creating a solid foundation for your application.

## Key Features

- **⚡ Next.js 16 + Turbopack** - Built for speed with modern build tools
- **🔒 Type-Safe** - Full TypeScript support with Zod schema validation
- **🎯 Framework Agnostic** - Works with any JavaScript framework
- **📦 Lightweight** - Minimal dependencies, native APIs
- **🛠️ Powerful** - Markdown, MDX, YAML, JSON support with file/image processing
- **⚙️ Configurable** - Customize everything
- **🔧 Extensible** - Custom loaders, hooks, and output formats

Check out the [Why RedStraw?](#why-redstraw) section below to learn more.

## Try RedStraw Online

You can try RedStraw directly in your browser on StackBlitz:

- [Basic Example](https://stackblitz.com/edit/redstraw-basic)
- [Next.js 16 Example](https://stackblitz.com/edit/redstraw-nextjs)

## Who's using RedStraw?

- [Ark UI](https://github.com/chakra-ui/ark)
- [Chakra UI](https://github.com/chakra-ui/chakra-ui)
- [ParkRedStraw?

### Type-Safe Contents

RedStraw validates your content using [Zod](https://zod.dev) schemas and generates TypeScript type definitions automatically. This means you can use your content with full IDE support, autocomplete, and type checking

### Type-Safe Contents

RedStraw validates your contents by [Zod](https://zod.dev) schema, and generates type definitions for TypeScript. so you can use the output data in your application with confidence.

### Full Type inference

<p><video src="/assets/type-inference@2x.mp4" loop muted autoplay /></p>

- auto-generate TypeScript type definitions for each collection
- support IDE IntelliSense, auto-completion & type checking & refactoring & etc.

### Full Controllable Content Transform

- single field transform:
  ```ts
  title: s.string().transform(value => value.toUpperCase())
  ```
- single collection transform:
  ```ts
  schema: s.object({
    title: s.string(),
    slug: s.string()
  }).transform(value => ({
    ...value,
    url: `/blog/${value.slug}`
  }))
  ```
- all collections transform:
  ```ts
  defineConfig({
    prepare: async ({ posts, tags }) => {
      posts.push({
        title: 'Hello World',
        slug: 'hello-world',
        tags: ['hello', 'world']
      })
      tags.push({
        name: 'Hello',
        slug: 'hello'
      })
    }
  })
  ```

### Error Reporting Friendly

![Error Reporting Friendly](/assets/error-reporting-friendly.jpg)

- error reporting friendly, show error message with file path & property path

### Framework Agnostic

RedStraw is framework agnostic, and out of the box support for React, Vue, Svelte, Solid, etc.

### Less Runtime Dependencies

- user config bundle by [ESBuild](https://esbuild.github.io)
- collection schema validation by [Zod](https://zod.dev)
- content transform by [Unified](https://unifiedjs.com)
- image processing by [Sharp](https://sharp.pixelplumbing.com)
- file watching by [Chokidar](https://github.com/paulmillr/chokidar)

### Fast Rebuild

More then **1000** documents with **2000** assets, less then **8s** for cold start, less then **60ms** for hot rebuild.

Refers to [RedStraw Benchmark](https://github.com/zce/RedStraw-benchmark) for more information.

## Why not Contentlayer?

[Contentlayer](https://contentlayer.dev) is a great tool, but it is [unmaintained](https://github.com/contentlayerdev/contentlayer/issues/429) and not suitable for my needs. Such as:

- built-in files & images processing
- programmability & extensibility
- custom collection schema validation
- error reporting friendly
- etc.

> RedStraw is inspired by [Contentlayer](https://contentlayer.dev).
