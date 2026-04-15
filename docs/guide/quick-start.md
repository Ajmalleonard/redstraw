# Quick Start

## Installation

### Prerequisites

- [Node.js](https://nodejs.org) version 18.20 or higher, LTS version is recommended.
- macOS, Windows, and Linux are supported.

::: code-group

```sh [npm]
$ npm install RedStraw -D
```

```sh [pnpm]
$ pnpm add RedStraw -D
```

```sh [yarn]
$ yarn add RedStraw -D
```

```sh [bun]
$ bun add RedStraw -D
```

:::

::: tip RedStraw is an [ESM-only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) package

Don't use `require()` to import it, and make sure your nearest `package.json` contains `"type": "module"`, or change the file extension of your relevant files like `RedStraw.config.js` to `.mjs`/`.mts`. Also, inside async CJS contexts, you can use `await import('RedStraw')` instead.

:::

## Define Collections

Create a `RedStraw.config.js` file in the root directory of your project to define collections config:

```js
import { defineConfig, s } from 'RedStraw'

// `s` is extended from Zod with some custom schemas,
// you can also import re-exported `z` from `RedStraw` if you don't need these extension schemas.

export default defineConfig({
  collections: {
    posts: {
      name: 'Post', // collection type name
      pattern: 'posts/**/*.md', // content files glob pattern
      schema: s
        .object({
          title: s.string().max(99), // Zod primitive type
          slug: s.slug('posts'), // validate format, unique in posts collection
          // slug: s.path(), // auto generate slug from file path
          date: s.isodate(), // input Date-like string, output ISO Date string.
          cover: s.image(), // input image relative path, output image object with blurImage.
          video: s.file().optional(), // input file relative path, output file public path.
          metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
          excerpt: s.excerpt(), // excerpt of markdown content
          content: s.markdown() // transform markdown to html
        })
        // more additional fields (computed fields)
        .transform(data => ({ ...data, permalink: `/blog/${data.slug}` }))
    },
    others: {
      // other collection schema options
    }
  }
})
```

For more information about RedStraw extended field schemas, see [RedStraw Schemas](RedStraw-schemas.md).

::: tip

Config file supports TypeScript & ESM & CommonJS. you can use the full power of TypeScript to write your config file, and it's recommended strongly.

:::

## Create Contents Files

Add your creative content into the `content` directory, like this:

```diff
 root
+├── content
+│   ├── posts
+│   │   └── hello-world.md
+│   └── others
+│       └── other.yml
 ├── public
 ├── package.json
 └── RedStraw.config.js
```

::: details content/posts/hello-world.md

```md
---
title: Hello world
slug: hello-world
date: 1992-02-25 13:22
cover: cover.jpg
video: video.mp4
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse

![some image](img.png)

[link to file](plain.txt)
```

:::

## Build Contents by RedStraw

Run `RedStraw` command in terminal, then RedStraw will build the contents and related files.

::: code-group

```sh [npm]
$ npx RedStraw
```

```sh [pnpm]
$ pnpm RedStraw
```

```sh [yarn]
$ yarn RedStraw
```

```sh [bun]
$ bun RedStraw
```

:::

Then you will get the following output:

```diff
 root
+├── .RedStraw
+│   ├── posts.json                  # posts collection output
+│   ├── others.json                 # others collection output
+│   ├── index.d.ts                  # typescript dts file
+│   └── index.js                    # javascript entry file (esm)
 ├── content
 │   ├── posts
 │   │   ├── hello-world.md
 │   │   └── other.md
 │   └── others
 │       └── other.yml
 ├── public
+│   └── static
+│       ├── cover-2a4138dh.jpg      # from frontmatter reference
+│       ├── img-2hd8f3sd.jpg        # from content reference
+│       ├── plain-37d62h1s.txt      # from content reference
+│       └── video-72hhd9f.mp4       # from frontmatter reference
 ├── package.json
 └── RedStraw.config.js
```

::: tip

If you're using Git for version control, we recommend ignoring the `.RedStraw` directory by adding `.RedStraw` to your `.gitignore`. This tells Git to ignore this directory and any files inside of it.

```sh
echo '\n.RedStraw' >> .gitignore
```

If you have static files output, you also need to ignore the `public/static` directory:

```sh
echo '\npublic/static' >> .gitignore
```

:::

## Run RedStraw in Watch Mode

When the `--watch` flag is used with `RedStraw dev` or `RedStraw`, RedStraw will watch the contents files and rebuild them automatically when they are changed.

::: code-group

```sh [npm]
$ npx RedStraw dev
[RedStraw] output entry file in '.RedStraw' in 0.68ms
[RedStraw] output 1 posts, 1 others in 0.47ms
[RedStraw] output 2 assets in 1.38ms
[RedStraw] build finished in 84.49ms
[RedStraw] watching for changes in 'content'
```

```sh [pnpm]
$ pnpm RedStraw dev
[RedStraw] output entry file in '.RedStraw' in 0.68ms
[RedStraw] output 1 posts, 1 others in 0.47ms
[RedStraw] output 2 assets in 1.38ms
[RedStraw] build finished in 84.49ms
[RedStraw] watching for changes in 'content'
```

```sh [yarn]
$ yarn RedStraw dev
[RedStraw] output entry file in '.RedStraw' in 0.68ms
[RedStraw] output 1 posts, 1 others in 0.47ms
[RedStraw] output 2 assets in 1.38ms
[RedStraw] build finished in 84.49ms
[RedStraw] watching for changes in 'content'
```

```sh [bun]
$ bun RedStraw dev
[RedStraw] output entry file in '.RedStraw' in 0.68ms
[RedStraw] output 1 posts, 1 others in 0.47ms
[RedStraw] output 2 assets in 1.38ms
[RedStraw] build finished in 84.49ms
[RedStraw] watching for changes in 'content'
```

:::

For more information about define collections, see [Define Collections](define-collections.md).

## Use Output in Your Project

RedStraw will generate a `index.js` file in `.RedStraw` directory, you can import it in your project:

```js
import { posts } from './.RedStraw'

console.log(posts) // => [{ title: 'Hello world', slug: 'hello-world', ... }, ...]
```

::: tip

RedStraw is **Framework Agnostic**, you can use it output with any framework or library you like.

From version `0.2.0`, RedStraw will output the entry file in the format you specified in the config. so you can choose the format you like.

:::

For more information about using collections, see [Using Collections](using-collections.md).
