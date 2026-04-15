---
aside: false
---

# With Next.js

RedStraw loves [Next.js](https://nextjs.org/), it's a great framework for building full-stack web applications.

> [!TIP] Example Repository:
>
> Complete Next.js example with RedStraw - see the [examples/nextjs](https://github.com/ajmalleonard/redstraw/tree/main/examples/nextjs) folder.

This example shows how to use RedStraw with Next.js.

## Try it online


## Source code

👉 https://stackblitz.com/github/ajmalleonard/redstraw/tree/main/examples/nextjs

See [examples](https://github.com/ajmalleonard/redstraw/tree/main/examples) for more examples.

## Project structure

```text
nextjs
├── app                      # Next.js app directory
│   ├── layout.tsx
│   ├── page.tsx
│   └── etc...
├── components
│   ├── mdx-content.tsx
│   └── etc...
├── content                  # content directory
│   ├── categories
│   │   ├── journal.jpg
│   │   ├── journal.yml
│   │   └── etc...
│   ├── options
│   │   └── index.yml
│   ├── pages
│   │   ├── about
│   │   │   └── index.mdx
│   │   └── contact
|   |       ├── img.png and more...
│   │       └── index.mdx
│   ├── posts
│   │   ├── 1970-01-01-style-guide
│   │   │   ├── cover.jpg and more...
│   │   │   └── index.md
│   │   └── 1992-02-25-hello-world
│   │       ├── cover.jpg and more...
│   │       └── index.md
│   └── tags
│       └── index.yml
├── public                   # public directory
│   ├── favicon.ico
│   └── etc...
├── .gitignore
├── package.json
├── README.md
├── tsconfig.json
└── RedStraw.config.ts         # RedStraw config file
```

## Usage

```shell
$ npm install # install dependencies
$ npm run dev # run build in watch mode
$ npm run build # build content by RedStraw
```

Refer to [Integration with Next.js](../guide/with-nextjs.md) for more details about RedStraw with Next.js.
