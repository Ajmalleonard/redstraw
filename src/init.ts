import { access, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { logger } from './logger'

const configTemplate = `import { defineCollection, defineConfig, s } from 'redstraw'

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/*.md',
  schema: s.object({
    title: s.string(),
    description: s.string().optional(),
    date: s.isodate(),
    content: s.markdown()
  })
})

export default defineConfig({
  root: 'content',
  collections: { posts }
})
`

const samplePost = `---
title: Hello World
description: My first post with RedStraw
date: 2025-01-01
---

Welcome to RedStraw! This is your first content file.

## Getting Started

Edit this file or create new Markdown files in \`content/posts/\` to build your content.
`

/**
 * Initialize a new RedStraw project with starter config and content
 * @param cwd working directory
 */
export const init = async (cwd: string = process.cwd()): Promise<void> => {
  const configPath = join(cwd, 'redstraw.config.ts')

  // check if config already exists
  try {
    await access(configPath)
    logger.error(`config file already exists at '${configPath}'`)
    process.exit(1)
  } catch {
    // config doesn't exist, proceed
  }

  const begin = performance.now()

  // create config file
  await writeFile(configPath, configTemplate)
  logger.log(`created config file at '${configPath}'`)

  // create content directory and sample post
  const postsDir = join(cwd, 'content', 'posts')
  await mkdir(postsDir, { recursive: true })

  const samplePostPath = join(postsDir, 'hello-world.md')
  await writeFile(samplePostPath, samplePost)
  logger.log(`created sample post at '${samplePostPath}'`)

  logger.info('initialized redstraw project', begin)
  console.log()
  console.log('  Next steps:')
  console.log('    1. Edit redstraw.config.ts to customize your collections')
  console.log('    2. Add content files to content/posts/')
  console.log('    3. Run: npx redstraw build')
  console.log()
}
