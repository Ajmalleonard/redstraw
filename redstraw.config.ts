import { defineCollection, defineConfig, s } from 'redstraw'

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
