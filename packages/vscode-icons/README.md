# RedStraw Icons

File icon theme for [RedStraw](https://github.com/ajmalleonard/redstraw) — gives VS Code custom icons for:

| Match | Icon |
|-------|------|
| `redstraw.config.ts` / `.js` / `.mts` / `.mjs` / `.cts` / `.cjs` | ![config](./icons/redstraw-config.png) Config icon (redstraw layers + amber dot) |
| `.redstraw/` folder (closed) | ![folder](./icons/redstraw-folder.png) Gradient folder with layers |
| `.redstraw/` folder (open) | ![folder-open](./icons/redstraw-folder-open.png) Open folder variant |

## Installation

**From VS Code Marketplace:**

Search for `RedStraw Icons` in the Extensions panel, or:
```
ext install redstraw.redstraw-vscode-icons
```

**Then activate it:**
1. `Cmd/Ctrl + Shift + P` → `Preferences: File Icon Theme`
2. Select **RedStraw Icons**

> **Note:** RedStraw Icons only defines icons for RedStraw-specific files. For all other file types, VS Code falls back to your currently active icon theme.

## Works alongside other themes

RedStraw Icons is designed to layer on top of themes like [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme). All non-redstraw files use your existing theme's icons.

## Contributing

Found a file pattern that should get a RedStraw icon? Open an issue or PR at [github.com/ajmalleonard/redstraw](https://github.com/ajmalleonard/redstraw).
