# CLI Reference

## Usage

::: code-group

```sh [npm]
$ npx RedStraw <command> [options]
```

```sh [pnpm]
$ pnpm RedStraw <command> [options]
```

```sh [yarn]
$ yarn RedStraw <command> [options]
```

```sh [bun]
$ bun RedStraw <command> [options]
```

:::

## Options

| Option          | Description            |
| --------------- | ---------------------- |
| `-v, --version` | Print version number   |
| `-h, --help`    | Print help information |

## `RedStraw build`

Build the contents with default config file in current directory.

### Usage

```sh
$ RedStraw build [options]
```

### Options

| Option                | Description                                  | Default            |
| --------------------- | -------------------------------------------- | ------------------ |
| `-c, --config <path>` | Use specified config file                    | `RedStraw.config.js` |
| `--clean`             | Clean output directory before build          | `false`            |
| `--watch`             | Watch for changes and rebuild                | `false`            |
| `--verbose`           | Print additional information                 | `false`            |
| `--silent`            | Silent mode (no output)                      | `false`            |
| `--strict`            | Terminate process on schema validation error | `false`            |
| `--debug`             | Output full error stack trace                | `false`            |

## `RedStraw dev`

Build the contents with watch mode.

### Usage

```sh
$ RedStraw dev [options]
```

### Options

| Option                | Description                                  | Default            |
| --------------------- | -------------------------------------------- | ------------------ |
| `-c, --config <path>` | Use specified config file                    | `RedStraw.config.js` |
| `--clean`             | Clean output directory before build          | `false`            |
| `--verbose`           | Print additional information                 | `false`            |
| `--silent`            | Silent mode (no output)                      | `false`            |
| `--strict`            | Terminate process on schema validation error | `false`            |
| `--debug`             | Output full error stack trace                | `false`            |

## `RedStraw init`

TODO: Create a default config file in current directory.

### Usage

```sh
$ RedStraw init [options]
```
