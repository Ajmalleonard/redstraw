---
aside: false
---

# Framework Agnostic

RedStraw is a framework agnostic library, it can be used in any JavaScript framework or library.

## Try it online


## Source code

👉 https://stackblitz.com/github/ajmalleonard/redstraw/tree/main/examples/basic

See [examples](https://github.com/ajmalleonard/redstraw/tree/main/examples) for more examples.

## Project structure

```text
basic
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
├── .gitignore
├── package.json
├── README.md
└── RedStraw.config.js         # RedStraw config file
```

## Usage

```shell
$ npm install # install dependencies
$ npm run dev # run build in watch mode
$ npm run build # build content by RedStraw
```

Refer to [Quick Start](../guide/quick-start.md) for more details about RedStraw.
