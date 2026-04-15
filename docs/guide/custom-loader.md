# Custom Loader

Built-in loaders are:

- `matter-loader`: parse frontmatter and provide content and data
- `json-loader`: parse document as json
- `yaml-loader`: parse document as yaml

RedStraw supports custom loaders. A loader is a function that takes a [vfile](https://github.com/vfile/vfile) as input and returns a JavaScript object.

In `RedStraw.config.js`:

```js
import { defineConfig, defineLoader } from 'RedStraw'
import toml from 'toml'

const tomlLoader = defineLoader({
  test: /\.toml$/,
  load: vfile => {
    return { data: toml.parse(vfile.toString()) }
  }
})

export default defineConfig({
  // ...
  loaders: [tomlLoader]
})
```

> [!TIP]
> This documentation is still being written. Please check back later.
