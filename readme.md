<div align="center">
  <picture>
    <img src="https://redstraw.js.org/assets/logo.svg" width="300" alt="RedStraw" title="RedStraw">
  </picture>
  
  <h1>RedStraw</h1>
  <p><strong>Modern type-safe content management for Next.js 16+ and Vite</strong></p>
  
  <p>Transform Markdown, MDX, YAML, JSON into your app's data layer with full TypeScript support and Turbopack optimization.</p>
  
  <p>
    <a href="https://github.com/ajmalleonard/redstraw/actions"><img src="https://img.shields.io/github/actions/workflow/status/ajmalleonard/redstraw/main.yml" alt="Build Status"></a>
    <a href="https://github.com/ajmalleonard/redstraw/blob/main/LICENSE"><img src="https://img.shields.io/github/license/ajmalleonard/redstraw" alt="License"></a>
    <a href="https://www.npmjs.com/package/redstraw"><img src="https://img.shields.io/npm/v/redstraw" alt="NPM Version"></a>
    <a href="https://www.npmjs.com/package/redstraw"><img src="https://img.shields.io/node/v/redstraw" alt="Node Version"></a>
    <br>
    <a href="https://www.npmjs.com/package/redstraw"><img src="https://img.shields.io/npm/dm/redstraw" alt="NPM Downloads"></a>
    <a href="https://packagephobia.com/result?p=redstraw"><img src="https://packagephobia.com/badge?p=redstraw" alt="Install Size"></a>
  </p>
</div>

---

## ✨ What is RedStraw?

RedStraw is a **modern, type-safe content management system** designed specifically for Next.js 16+ and Vite projects. It transforms your Markdown, MDX, YAML, and JSON files into a strongly-typed data layer with zero-cost abstractions.

Built with **Turbopack** optimization in mind, RedStraw provides blazing-fast content processing with full TypeScript support throughout your entire workflow.

### 🎯 The Problem RedStraw Solves

Managing static content (blog posts, documentation, product pages) in modern JavaScript apps is challenging:

- **Type Safety**: You write content in files but want TypeScript validation
- **Developer Experience**: No IDE autocomplete or type checking for your content
- **Build Performance**: Traditional solutions are slow and bloated
- **Flexibility**: You need framework-agnostic, customizable solutions

RedStraw solves all of this. ✨

### 🌍 What's in a Name?

"RedStraw" refers to **layers of rock or earth** — each layer distinct yet building upon others. Similarly, RedStraw builds your content layer, with each piece precisely typed and validated.

## 🚀 Key Features

- **⚡ Next.js 16 + Turbopack Ready** - Optimized for the latest Next.js with Turbopack support for maximum speed
- **🔒 Type-Safe** - Full TypeScript schemas with Zod validation and automatic type generation
- **🎯 Framework Agnostic** - JSON, ESM, and TypeScript declaration outputs work with any JavaScript framework
- **📦 Lightweight** - Minimal dependencies, native Node.js APIs, optimized for both build time and runtime
- **🛠️ Powerful** - Built-in support for Markdown, MDX, YAML, JSON with relative file/image processing
- **⚙️ Configurable** - Customizable input/output directories, loaders, hooks, and transformation pipelines
- **🔧 Extensible** - Support for custom file types, field validation, and output formats

## 🚀 What Makes RedStraw Different?

- ✅ **Modern Stack**: Built for Next.js 16, React 19, and Turbopack
- ✅ **Better DX**: Cleaner config API, faster builds
- ✅ **Type-Safe**: Full TypeScript integration with Zod validation
- ✅ **Framework Agnostic**: Works with any JavaScript framework or library
- ✅ **Actively Maintained**: Regular updates and improvements
- ✅ **Lightweight**: Minimal dependencies, native Node.js APIs

## 📚 Quick Start

```bash
npm install redstraw
# or
pnpm add redstraw
```

## 🔗 Next.js 16 Integration

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

## 📖 Documentation

- [**Getting Started**](./docs/guide/quick-start.md) - Setup RedStraw in 5 minutes
- [**Collections Guide**](./docs/guide/define-collections.md) - Define your content structure
- [**Next.js 16 Integration**](./docs/guide/with-nextjs.md) - Turbopack-optimized setup
- [**API Reference**](./docs/reference/api.md) - Complete API documentation
- [**Examples**](./examples) - Learn by example

## 🌐 Try RedStraw Online

Experience RedStraw directly in your browser:

- [Basic Example (StackBlitz)](https://stackblitz.com/edit/redstraw-basic)
- [Next.js Example (StackBlitz)](https://stackblitz.com/edit/redstraw-nextjs)

## 🤝 Who Uses RedStraw?

RedStraw is trusted by teams building:

- 📝 Blog platforms and documentation sites
- 🏢 Corporate websites with dynamic content
- 📚 Knowledge bases and wikis
- 🛍️ E-commerce product catalogs

## 🛣️ Roadmap

- [ ] Incremental content builds for faster development
- [ ] Content versioning and drafts
- [ ] Built-in image optimization
- [ ] GraphQL API export option
- [ ] Remote content sources (CMS integration)
- [ ] Caching layer improvements
- [ ] More built-in schema types
- [ ] CLI scaffolding tool

See [CHANGELOG.md](./CHANGELOG.md) and the [open issues](https://github.com/ajmalleonard/redstraw/issues) for more details.

## 🐛 Found a Bug?

Please [open an issue](https://github.com/ajmalleonard/redstraw/issues) on GitHub.

## 💬 Have Questions?

- 📖 Check the [documentation](./docs)
- 💭 Look at [examples](./examples)
- 🆘 Search [existing issues](https://github.com/ajmalleonard/redstraw/issues)

## 🔄 Upgrading Your Setup

If you're looking to modernize your content management system, RedStraw offers a fresh, type-safe approach built for today's JavaScript ecosystem.

## 🤝 Contributing

We welcome contributions!

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 License

[MIT](LICENSE) © RedStraw Contributors

---

<div align="center">
  <p>Made with ❤️ for developers who care about type safety and developer experience</p>
  <p><a href="https://github.com/ajmalleonard/redstraw">⭐ Star us on GitHub</a></p>
</div>
````
