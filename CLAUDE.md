# CLAUDE.md — spperera.com

Personal site for Samudra Perera. Software engineer, Toronto. It has two jobs:

1. Tell a hiring engineer what he does within about fifteen seconds.
2. Host writing that is pleasant to read.

Everything else is subordinate to those. **The aesthetic is clean, minimal, and fast.** If a
change adds visual weight without adding information, it is the wrong change.

---

## Stack

- **Next.js (App Router) + TypeScript**
- **Tailwind** for layout utilities. Design tokens live in CSS custom properties, not in
  `tailwind.config`. One source of truth for colour — do not duplicate the palette into the
  Tailwind theme.
- **MDX** compiled at build time: `remark-gfm`, `remark-frontmatter`, `rehype-slug`,
  `rehype-autolink-headings`, `rehype-pretty-code`.
- **next-themes** for the light/dark toggle.
- Fonts via `next/font/google` — Instrument Sans and JetBrains Mono. Self-hosted, no
  render-blocking request.
- Deployed on **Vercel**.

No CSS-in-JS. No component library. No animation library — everything in the reference files
is plain CSS plus a few lines of vanilla JS.

---

## Design tokens

Defined once at the root. Components reference the semantic names, never raw hex.

```css
--bg      /* page background     */  --ink    /* body text            */
--surface /* raised surfaces     */  --muted  /* secondary text       */
--line    /* all 1px borders     */  --faint  /* meta, dates, labels  */
--note    /* code + inline chips */  --accent /* the only accent      */
```

**Sage.** Light / dark:

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#FAFAF7` | `#0E1211` |
| `--surface` | `#FFFFFF` | `#151A18` |
| `--ink` | `#141A17` | `#E8EDE9` |
| `--muted` | `#63706A` | `#93A09A` |
| `--faint` | `#97A29C` | `#64716B` |
| `--line` | `#E2E6E0` | `#232B28` |
| `--note` | `#F1F4EF` | `#121716` |
| `--accent` | `#1F5F4F` | `#6FBFA6` |

**Every neutral carries the accent's hue.** `--muted` is `#63706A` — grey with green in it,
not a neutral grey. That bias is what separates this from a framework default, and it is the
easiest thing to lose when someone adds a component with a hand-picked colour.

**Never pure white or pure black.** The ground is `#FAFAF7`, the ink is `#141A17`. Pure
values read as unfinished.

**Dark mode is tinted too.** Most dark modes fail by being neutral charcoal; this one leans
green so the personality survives the switch.

**One accent colour, used only for links, hover, focus, and the reading progress bar.** Not
for headings, not for backgrounds, not for decoration. The moment a second accent appears the
design stops being this design.

---

## Hard rules

The things that erode first in a long session. Not negotiable.

1. **No raw hex in components.** If a needed colour has no token, add a token.
2. **No new colours.** One accent. Greys come from the four neutral tokens.
3. **Motion budget is small and fixed:** a staggered fade on load, row dimming on hover,
   link underline transitions, the reading progress bar, the back-arrow nudge, the sticky
   nav's hide-on-scroll-down/show-on-scroll-up, and the one-time truck crossing on `/about`
   (drives once on scroll-into-view, monochrome only). Adding to this list needs a reason.
   Never: scroll-jacking, pinned sections, parallax, reveal-on-scroll everywhere, cursor
   followers, page transitions that delay content.
4. **Transitions are 160–200ms.** This is a snappy site, not an editorial one.
5. **`prefers-reduced-motion` is a build requirement.** New motion without a reset is
   incomplete work.
6. **Every hover effect goes inside `@media (hover:hover) and (pointer:fine)`.** Touch
   browsers emulate `:hover` on tap and it sticks. No hover state may be the only route to
   information.
7. **Touch targets are at least 44×44px** — padding with matching negative margin so the
   visual rhythm is unaffected.
8. **Never bare `vh`.** iOS Safari measures `100vh` with browser chrome collapsed. Use `svh`
   or `dvh` with a `vh` fallback.
9. **No `localStorage` beyond what next-themes handles.**
10. **Body text is never below 15px.** Article prose is 16.5px on a 640px measure.

---

## Layout

- **Measure: 640px** with 24px gutters. This is the whole layout. Content does not go wider.
- Margin notes are the one exception: above 1120px they sit at `left:100%` beside their
  paragraph, anchored to a `position:relative` wrapper. Below that they drop inline. Do not
  convert this to a grid — the anchoring is the point.
- **Typography:** Instrument Sans throughout, JetBrains Mono for dates, tags, code, and
  labels. Two families total. Never set body copy in mono.
- Mobile: below 600px, row dates move above titles, the pager stacks, gutters stay 24px.

---

## Routes

| Route | Purpose |
|---|---|
| `/` | Intro, Experience, Projects, Writing — all on one page |
| `/writing` | Post index, reverse chronological |
| `/writing/[slug]` | Article |
| `/projects` | Full project list |
| `/about` | Longer bio and full work history |
| `/now` | What he's working on. **Must be dated** — the previous site's went two years stale. |

**Experience and projects are never merged into one list.** A recruiter cannot tell what was
a job and what was a weekend. They are separate sections on the home page and separate
routes.

Experience appears above Projects on the home page. Employment history is the thing a
recruiter came for and must never be behind a click.

---

## Writing pipeline

Posts are MDX files in `content/posts/`. Filename becomes the slug:
`cpp-library.mdx` → `/writing/cpp-library`.

Frontmatter:

```yaml
---
title: "..."
date: "2026-03-14"
summary: "..."
tags: ["C++"]
published: true
---
```

The index reads the folder at build time and sorts by date. `published: false` hides a draft
from the index while still allowing local preview. Reading time is computed from word count —
do not hand-write it.

**Authoring is plain markdown.** Headings, links, lists, blockquotes, images
(`![alt](/posts/x.png)`), and fenced code blocks all work with no class names. Styling comes
from the MDX component mapping in `mdx-components.tsx`.

Four components, and no more without a reason:

| Component | Use |
|---|---|
| `<Side>` | Margin note. An aside that would break the sentence if inlined. |
| `<Callout title="">` | A rule and a label, no fill. **One kind only.** |
| `<Figure>` | Only when the caption must differ from the alt text. |
| Per-post demos | Imported by the one post that uses them. |

Footnotes use standard `[^1]` syntax, resolved by `remark-gfm` at build time. They collect at
the bottom and get hover-on-desktop, jump-on-mobile behaviour from the article layout.

Syntax highlighting runs at build via Shiki. **Zero highlighting JavaScript ships.** Use two
colours — accent for keywords, faint for comments — not a stock rainbow theme, which is the
fastest way to make a designed site look templated.

### Interactive demos

The one place this site earns real character. A post that shows a tradeoff with a live
control beats three paragraphs describing it. Rules: the demo lives inside the post, never in
the page chrome; it is imported per-post so nothing ships elsewhere; it uses the same tokens
and the same accent; and the post must still make sense with JavaScript disabled.

---

## Theme

Three states: system (default), light, dark. `next-themes` sets `data-theme` on `<html>`, and
the token blocks key off it. Ship the inline script next-themes provides to prevent a flash
of the wrong theme on first paint.

Both themes are first-class. Check every new component in both before calling it done —
borders and `--faint` text are where dark mode usually breaks.

---

## Content rules

- **Restraint is the voice.** Short sentences. No adjective stacking. The intro is three
  short paragraphs, not a bio.
- **Every project entry needs** a one-line description, tech tags, and a link out. A bare
  name and link is not an entry.
- **The Airbus sentence is the highest-value sentence on the site.** It must name the
  specific problem the C++ library solved, with a number if one exists. The reference files
  carry a placeholder — never ship it.
- Do not write a paragraph listing hobbies. If personality belongs anywhere it is in `/now`
  and in the writing.

---

## Definition of done

- Renders correctly at 375×667, 390×844, 768, 1280, 1600 — and in landscape.
- Correct in both light and dark.
- `prefers-reduced-motion: reduce` produces a complete, static page.
- Keyboard reaches every interactive element with a visible focus ring.
- No raw hex, no ungated `:hover`, no horizontal scroll at 320px.
- Lighthouse performance ≥ 98 on desktop, ≥ 95 on mobile. **Speed is this site's flex** —
  it should load faster than anything else the reader opened today.
- Images through `next/image` with explicit sizes. No layout shift.

---

## Reference files

Standalone HTML, no build step. These are the source of truth for visual behaviour — open
them rather than inventing.

- `clean-home.html` — home page: intro, experience, projects, writing, theme toggle
- `clean-writing.html` — article: margin notes, callouts, figures, code, footnotes,
  reading progress, an inline demo
- `example-post.mdx` — the authoring surface, showing exactly what a post looks like

---

## History

An earlier direction built this site around a Maynard Dixon painting — a textured linen
ground, generated clouds, Western motifs, an editorial serif. It was abandoned as too
elaborate for what the site needs to do. **Do not reintroduce background textures, generated
artwork, decorative motifs, or a second display typeface.** The current direction is the
decision.

## Working style

Samudra prefers purposeful simplicity over elaborate solutions, and consistently cuts
features that add weight without adding function. When a decision has a real trade-off, state
it and let him choose rather than picking silently. When in doubt, cut it.
