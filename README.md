# [Plumbiu's blog](https://blog.plumbiu.top/)

<details>

<summary>Performance</summary>

**Phone:**
![phone-scores](./assets/phone-scores.webp)

**PC:**
![pc-scores](./assets/pc-scores.webp)

</details>

# Features

- Static stite generate(SSG)
- Lightweight: 110kB first load JS(mostly react)
- Highly designed by [remark](https://github.com/remarkjs/remark) and [rehype](https://github.com/rehypejs/rehype)
- Static syntax highlighting via [shiki](https://github.com/shikijs/shiki)
- Light/dark theme width [persistent storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) and [system theme listener](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
- Image optimization via [sharp](https://github.com/lovell/sharp) and [next/image](https://nextjs.org/docs/basic-features/image-optimization)
- SEO friendly with RSS feed
- Module css an self-designed components
- Comment system via [Gtihub API](https://docs.github.com/zh/rest)
- Custom markdown rules via [remark-directive](https://github.com/remarkjs/remark-directive): see [`custom-component.md`](/data/posts/note/custom-component.md) and [preview](https://blog.plumbiu.top/posts/note/custom-component)
- Component lazy load via [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)

# Customize

## Env

See [.env.example](/.env.example) file.

## Directory

- [data/posts](/data/posts/): markdown files with category
- [data/components](/data/components/): markdown custom component
- [src/plugins](/src/plugins/): [rehype](https://github.com/rehypejs/rehype) and [remark](https://github.com/remarkjs/remark) plugins
- [src/styles](/src/styles/): global style
- [public/images](/public/images/): markdown static image, you don't need write the `/images/` prefix, see `getAssetImagePath` in [/src/utils/node/fs.ts](/src/utils/node/fs.ts) file
- [src/utils/node/markdown](/src/utils/node/markdown): markdown utils

## File

- [data/site.ts](/data/site.ts): site config data
- [src/plugins/remark/data/variable.ts](/src/plugins/remark/data/variable.ts): inject variable in markdown, markdown content `${ bar.test.a }` will be replaced with `Test string`
- [src/constants.ts](/src/constants.ts): edit `PostDir` variable if you don't want write the category post
- [src/app/posts/styles/md.css](/src/app/posts/styles/md.css): markdown style
- [src/app/posts/styles/shiki.css](/src/app/posts/styles/shiki.css): shiki style, generated by [shiki-class-transformer](https://github.com/Plumbiu/shiki-class-transformer)
- [scripts/feed.ts](/scripts/feed.ts): rss data

## Post

Front matter must have at least the following configuration to display post:

```markdown
---
title: Title
date: Publish Date
desc: The article introduction, it can be a number, indicating that the introduction is the nth line of the article body (starting from 1)
---
```

## Scripts

Run `pnpm generate`.

# Deploy to Github pages

Edit the `RepoName` in [data/site.ts](/data/site.ts) file and `BasePath` in [next.config.js](/next.config.js) file.

> [!WARNING]
> Github pages only support static resources, [rewrites](https://nextjs.org/docs/app/api-reference/config/next-config-js/rewrites) will not work, see [next.config.js](/next.config.js)

<details>

<summary>However, you can create <code>src/app/page.tsx</code> <code>src/app/list/page.tsx</code> and <code>src/app/list/[type]/page.tsx</code> files to generate</summary>

```tsx
// src/app/list/page.tsx
// src/app/page.tsx
import ArtlistAll from '@/list/[id]/[pagenum]/page'

export default function Art() {
  return (
    <ArtlistAll
      params={{
        type: 'blog',
        pagenum: '1',
      }}
    />
  )
}
```

```tsx
// src/app/list/[id]/page.tsx
import ArtlistAll from './[pagenum]/page'
import { PostDir } from '@/constants'

interface Params {
  type: string
}
export async function generateStaticParams() {
  return PostDir.map((type) => ({
    type,
  }))
}

interface ListProps {
  params: Params
}

async function ArtList({ params }: ListProps) {
  const type = params.type
  return (
    <ArtlistAll
      params={{
        type,
        pagenum: '1',
      }}
    />
  )
}
export default ArtList
```

</details>
