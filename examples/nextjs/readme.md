# Next.js + MDX + RedStraw

A template with Next.js 15 app dir, [RedStraw](https://github.com/zce/RedStraw), Tailwind CSS and dark mode.

[MDX Example](content/pages/contact/index.mdx)

## Recipes

#### start RedStraw in npm script with `npm-run-all`:

**package.json**:

```json
{
  "scripts": {
    "dev:content": "RedStraw --watch",
    "build:content": "RedStraw --clean",
    "dev:next": "next dev",
    "build:next": "next build",
    "dev": "run-p dev:*",
    "build": "run-s build:*",
    "start": "next start"
  }
}
```
