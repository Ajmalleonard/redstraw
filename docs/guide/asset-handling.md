# Asset Handling

> [!TIP]
> This documentation is still being written. Please check back later.

## Refer

- [File Schema](RedStraw-schemas.md#s-file)
- [Image Schema](RedStraw-schemas.md#s-image)
- [Markdown Schema](RedStraw-schemas.md#s-markdown)
- [MDX Schema](RedStraw-schemas.md#s-mdx)

## Uploading Assets

You can upload assets to your OSS, CDN, or other storage services.

e.g. Upload images on complete hook:

```ts
import { defineConfig } from 'RedStraw'

export default defineConfig({
  output: {
    base: 'https://oss.your.com/static/'
  },
  complete: async () => {
    // TODO: upload images
    // static => https://oss.your.com/static/
  }
})
```

Currently, we don't provide any built-in uploading plugins, we will provide them in the future.
