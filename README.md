# manasvardhan.com

Personal portfolio of Manas Vardhan — ML and infrastructure engineer.

Built on Next.js 16, Tailwind CSS v4, shadcn/ui, and Radix.

## Development

Requires Node 22+ and pnpm.

```bash
pnpm install
pnpm dev      # http://localhost:1408
pnpm build    # production build
pnpm start    # serve the production build
```

## Where the content lives

All site content is data, not markup. To update the site, edit these files:

| File | Contents |
| --- | --- |
| `src/features/portfolio/data/user.ts` | Name, tagline, About bullets, avatar, keywords |
| `src/features/portfolio/data/experiences.ts` | Employment timeline, roles, accomplishments |
| `src/features/portfolio/data/projects.ts` | Project cards, descriptions, banners, links |
| `src/features/portfolio/data/social-links.ts` | Footer and command-palette social links |
| `src/config/site.ts` | Site URL, nav, UTM parameters |

Blog posts are **not** stored here. The Blog section reads the RSS feed of
[The Agent Stack](https://theagentstack.hashnode.dev) at request time, revalidating
hourly, so publishing on Hashnode updates the site with no redeploy. That logic lives
in `src/features/blog/data/hashnode.ts`.

`main.tex` is the source CV the site content was derived from. It is kept in the repo
as the reference document; nothing builds from it.

## Images

- `public/projects/*.jpg` — screenshots captured from live project URLs
- `public/projects/*.svg` — hand-drawn banners for projects with no public URL,
  designed to stay legible at card size (~357px wide)
- `public/company-logos/*.svg` — monograms used in the experience timeline
- `public/avatar.jpeg` — profile photo

## Credits

The design and component system are from
[chanhdai.com](https://github.com/ncdai/chanhdai.com) by Chánh Đại, used under the MIT
license. His name, logo, and brand assets are covered by a separate trademark policy and
have been removed from this fork.
