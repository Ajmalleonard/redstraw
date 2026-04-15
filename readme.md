# RedStraw

**Modern type-safe content management for Next.js 16+ and Vite**

Transform Markdown, MDX, YAML, JSON into your app's data layer with full TypeScript support and Turbopack optimization.

---

## What is RedStraw?

RedStraw is a modern, type-safe content management system designed specifically for Next.js 16+ and Vite projects. It transforms your Markdown, MDX, YAML, and JSON files into a strongly-typed data layer with zero-cost abstractions.

Built with Turbopack optimization in mind, RedStraw provides blazing-fast content processing with full TypeScript support throughout your entire workflow.

### The Problem RedStraw Solves

Managing static content (blog posts, documentation, product pages) in modern JavaScript apps is challenging:

- **Type Safety**: You write content in files but want TypeScript validation
- **Developer Experience**: No IDE autocomplete or type checking for your content
- **Build Performance**: Traditional solutions are slow and bloated
- **Flexibility**: You need framework-agnostic, customizable solutions

RedStraw solves all of this.

### What's in a Name?

"RedStraw" refers to layers of rock or earth — each layer distinct yet building upon others. Similarly, RedStraw builds your content layer, with each piece precisely typed and validated.

## Key Features

- **Next.js 16 + Turbopack Ready** - Optimized for the latest Next.js with Turbopack support for maximum speed
- **Type-Safe** - Full TypeScript schemas with Zod validation and automatic type generation
- **Framework Agnostic** - JSON, ESM, and TypeScript declaration outputs work with any JavaScript framework
- **Lightweight** - Minimal dependencies, native Node.js APIs, optimized for both build time and runtime
- **Powerful** - Built-in support for Markdown, MDX, YAML, JSON with relative file/image processing
- **Configurable** - Customizable input/output directories, loaders, hooks, and transformation pipelines
- **Extensible** - Support for custom file types, field validation, and output formats

## What Makes RedStraw Different?

- **Modern Stack**: Built for Next.js 16, React 19, and Turbopack
- **Better DX**: Cleaner config API, faster builds
- **Type-Safe**: Full TypeScript integration with Zod validation
- **Framework Agnostic**: Works with any JavaScript framework or library
- **Actively Maintained**: Regular updates and improvements
- **Lightweight**: Minimal dependencies, native Node.js APIs

## Quick Start

```bash
npm install redstraw
# or
pnpm add redstraw
```

## Next.js 16 Integration

RedStraw is optimized for Next.js 16 with Turbopack:

```typescript
// next.config.ts
import { withRedStraw } from 'redstraw/next'

export default withRedStraw({
  // your Next.js config
})
```

Then run with Turbopack for maximum performance:

```bash
next dev --turbopack
```

## Documentation

- [Getting Started](./docs/guide/quick-start.md) - Setup RedStraw in 5 minutes
- [Collections Guide](./docs/guide/define-collections.md) - Define your content structure
- [Next.js 16 Integration](./docs/guide/with-nextjs.md) - Turbopack-optimized setup
- [API Reference](./docs/reference/api.md) - Complete API documentation
- [Examples](./examples) - Learn by example

## Who Uses RedStraw?

RedStraw is trusted by teams building:

- Blog platforms and documentation sites
- Corporate websites with dynamic content
- Knowledge bases and wikis
- E-commerce product catalogs

## Roadmap

- [ ] Incremental content builds for faster development
- [ ] Content versioning and drafts
- [ ] Built-in image optimization
- [ ] GraphQL API export option
- [ ] Remote content sources (CMS integration)
- [ ] Caching layer improvements
- [ ] More built-in schema types
- [ ] CLI scaffolding tool

## Contributing

We welcome contributions!

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## License

[MIT](LICENSE) © RedStraw Contributors
