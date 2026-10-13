# designsnack.ch — Website Redesign
> Requirements document for the Next.js rebuild. Use this as the briefing when starting a new Claude Code session on the repo.

---

## Goal
Redesign and rebuild designsnack.ch from scratch. Shift public identity from "UX/UI designer" to **Design Engineer** — someone who designs, codes, and builds with AI. The website itself is proof of that positioning.

---

## Positioning
- **Title:** Design Engineer
- **Core message:** "I don't hand off Figma files. I design and build — accelerated by AI."
- **Target audience (primary):** Swiss enterprise in banking, insurance, healthcare (embedded long-term engagements)
- **Target audience (secondary):** Scale-ups and digital-first companies building AI products
- **Language:** English

---

## Architecture & Folder Structure

```
src/
├── components/
│   ├── ui/              ← primitives — Button, Badge, Tag, Link (defined once, reused everywhere)
│   └── sections/        ← homepage sections — Hero, TrustBar, Work, About, Contact...
├── lib/
│   └── utils.ts         ← cn() helper for conditional class merging (clsx + tailwind-merge)
└── styles/
    └── globals.css      ← Tailwind base + CSS custom properties
```

**Rules:**
- Every reusable element gets its own file. Never write a `<button>` inline — always use `<Button>`.
- If something appears more than once, it becomes a component.
- Claude Code must use existing components, not invent new variants inline.

**Tailwind config is the single source of truth for the design system.**
Define all brand colors and type scale in `tailwind.config.ts` — never use raw hex values in components.

```js
// tailwind.config.ts
colors: {
  'steel-mist': '#768B9B',
  'white': '#FFFFFF',
  'black': '#111827',
  'dark-black': '#06080E',
}
```

---

## Tech Stack
- **Framework:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS (no component library — plain Tailwind is sufficient for a portfolio site)
- **Animation:** Framer Motion — handles all animations on this site. No GSAP needed.
- **Font loading:** `next/font/google` for Urbanist — never load via `<link>` tag
- **Hosting:** Vercel
- **Repo:** `designsnack` (personal GitHub account — thomasveit89)
- **Old repo:** renamed to `designsnack-legacy` (Nuxt 3, kept for reference)

---

## Design Principles
- Built from scratch — no templates
- Minimalistic, clean aesthetic (consistent with current brand direction)
- Personality-first — copy and tone do the heavy lifting, not decorative elements
- Mobile-first

---

## Creative Ambition — Read This Before Writing Any UI

**This is not a standard portfolio site. Do not default to generic patterns.**

Avoid: nested cards, standard hero+grid layouts, predictable section structures, Inter font, purple gradients, generic hover effects, anything that looks like a Tailwind UI template.

The goal is to design in the browser — iterate visually, push beyond the first obvious solution, use Impeccable commands liberally (`/audit`, `/polish`, `/overdrive`) to challenge every design decision.

### Impeccable Setup
Install the Impeccable design skill before starting:
```
cp -r dist/claude-code/.claude your-project/
```
Or install globally. Use `/audit` frequently, `/overdrive` when something feels too safe.
Full docs: https://github.com/pbakaus/impeccable

### Section-specific creative direction

| Section | Direction |
|---|---|
| **Hero** | Viewport-filling type. Words or lines animate in on load — staggered opacity + subtle upward movement. Not a slide-in. Intentional, calm. |
| **Trust bar** | Infinite auto-scrolling marquee. Slow, subtle. Not a static logo row. |
| **Senior partner statement** | Just the sentence. Full width. Massive type. No surrounding chrome. Let typography be the design. |
| **Selected work** | Stacking scroll cards. Each card scrolls in full-width, pins briefly, then the next card slides over it and pushes it down into a smaller stacked state. End state: a visible pile of all cards. 3 cards max. Implementation: Framer Motion `useScroll` + `useTransform` — scale and position driven by scroll progress, no GSAP needed. **Card layout (full-width state):** project name + one-liner left, large cropped UI screenshot filling the right half (no device mockup — raw UI). Small tag bottom-left: engagement type + duration (e.g. "Embedded · 3 years" or "Designed + Built"). Text is orientation only — the visual does the heavy lifting. |
| **Commit feed** | Terminal aesthetic for this section only. Subtle cursor blink on the prompt character. Use Urbanist (consistent with the rest of the site) but tighter letter-spacing and a dimmer text color to evoke terminal without switching fonts. Signals "this person ships code" without saying it. |
| **About** | Large isolated numbers as visual anchors — `17+` years, `39` countries — typographically dominant with a short label. Framer Motion scroll entrance (fade + upward translate on scroll into view). |
| **Contact** | Just `tommy@designsnack.ch`. Enormous. Nothing else. |

When in doubt: do less, but do it with more conviction. A single typographic element executed perfectly beats a complex layout executed safely.

---

## Design Direction & Style

### References
Stripe and Linear -- but bolder and more creative. Think: that level of craft and typographic confidence, with more personality and less corporate sterility.

### Vibe
Calm, curious, modern, minimalistic.

### Colors
| Token | Hex | Usage |
|---|---|---|
| White | `#FFFFFF` | Background (light mode), text on dark |
| Black | `#111827` | Primary text (light mode), background (dark mode) |
| Steel Mist | `#768B9B` | Primary accent — titles, highlights, UI elements |

Dark mode: implement from the start — light is default, dark is a toggle.

### Typography
- **Font:** Urbanist (Google Fonts) — apply to all text, no exceptions
- **Headings:** Bold and Extra Bold weights. Go big — large type is a core part of the aesthetic
- **Body:** Regular weight
- **Direction:** Big, confident type that commands attention. Stripe/Linear-level typographic hierarchy.

### Motion
- **Appetite:** 3/5 — subtle and intentional, not decorative
- **Library:** Framer Motion only
- **Rules:**
  - No scroll hijacking
  - No scroll-linked animations that feel forced or "web agency"
  - Smooth scrolling is fine, but natural browser behavior is respected
  - Hover states, fade-ins, gentle entrance animations = good
  - Anything that makes the user wait or fights their scroll = bad

### Logo & Assets
Copy all logo variants and Tommy's photo from `/Users/thomasveit/Otto/company/assets/` into `public/assets/` in the repo before building.
- Light backgrounds → `designsnack-black.svg` or `icon-plain-steel-mist.svg`
- Dark backgrounds → `designsnack-white.svg` or `icon-plain-white.svg`
- Tommy's photo → `tommy.webp`

---

## Site Structure

### Homepage (one-pager)
All sections live on the homepage. Smooth scroll, anchor links from nav.

| Section | Purpose |
|---|---|
| **Hero** | Strong positioning statement (Design Engineer framing). 1-line description. Single CTA: "Let's talk." No face required — copy carries the personality. |
| **Trust bar** | Client logos only. Finnova, 3AP, AMBOSS, Netlive, AXA. No words. Fast credibility signal for enterprise visitors. |
| **What I offer** | One bold statement — no three-column model. "Senior partner, not vendor." The engagement detail is a conversation, not a homepage decision. |
| **Selected work** | 2-3 case study teaser cards. Links to individual `/work/[slug]` pages. Quality over quantity — seniority signal. |
| **Building in public** | **Headline:** Work in progress. Always. **Sub:** A live feed of videos, shipped products, and things I'm making. Simple masonry grid — no filter pills. All items shown together. **Implementation:** CSS columns (`columns: 2` on mobile, `columns: 3` on desktop) with `break-inside: avoid` — zero dependency, no library. Framer Motion for card entrance animations only. All items in `data/feed.ts` as a typed `FeedItem[]` array, sorted by `date` descending. Images go in `public/assets/feed/`. Static — no ISR needed. Curated, not a dump — ~15–20 items max across videos, craft, and shipped work. |
| **About** | Short, human. 1-2 paragraphs — the story, not the CV. |
| **Contact** | Simple. Email or minimal form. Single CTA. |

### Navigation
- Logo (top left)
- Nav links: Work · About · Laws & Patterns · Contact
- Laws & Patterns gets its own nav slot (permanent section of the site)

### Separate pages
```
/work/[slug]                          Individual case studies
/laws-and-patterns/                   Index — browse all principles by category
/laws-and-patterns/[slug]             Individual principle pages (SEO)
```

---

## Case Studies (`/work/[slug]`)

Four case studies total. Homepage Selected Work section shows 3 — pick the strongest 3 for the cards, all 4 are accessible via `/work/[slug]`.

| Project | Slug | Type | Visuals |
|---|---|---|---|
| Joyo | `/work/joyo` | Self-initiated | Full — own product, full creative freedom |
| Finnova | `/work/finnova` | Embedded (3 years) | Abstract only — NDA. No permission needed for abstract visuals + logo. |
| AXA | `/work/axa` | Project-based | TBD — pending NDA check |
| Laws & Patterns | `/work/laws-and-patterns` | Self-initiated | Full — own product, full creative freedom |

### Case study page structure
Each case study follows this narrative structure (not a typical portfolio template):

1. **Hero** — project name, one-liner, meta tags (Role · Duration · Year · Type)
2. **The situation** — 1 short paragraph. What existed, what was broken, why it mattered.
3. **My role** — 3-4 lines, specific. What you actually owned, not a job description.
4. **Key decisions** (2-3 chapters) — each one: a specific decision, why, what the alternative was, what you chose. One visual per chapter. This is the most important section — shows how you think.
5. **Outcome** — what shipped. One sentence is fine if NDA-constrained.
6. **Next case study →** — link to keep people moving.

### Per-project notes
- **Joyo** — full visuals, all sections, show the build. Best demonstration of Design Engineer positioning (design + Next.js + Claude API).
- **Finnova** — abstract visuals, lean on decisions + role, outcome stays vague. "Major Swiss core banking platform" framing. Logo is fine (public). No screenshots without explicit written permission.
- **AXA** — same approach as Finnova until NDA is cleared.
- **Laws & Patterns** — full visuals. Self-initiated reference tool: 100+ UX laws, cognitive biases, design heuristics. iOS app + web. Shows design + build + product thinking.

---

## Laws & Patterns (`/laws-and-patterns`)

### Overview
A reference tool for UX/UI designers, PMs, and developers. 100+ UX laws, cognitive biases, and design heuristics. Currently exists as a standalone static page and iOS app — bring into the main designsnack.ch Next.js repo.

### SEO strategy
The real SEO value is individual principle pages, not the index. Each principle (Hick's Law, Miller's Law, Gestalt principles, etc.) is a searched term. 100+ statically generated pages = significant organic traffic potential.

Each principle page needs:
- Title, one-liner, full definition
- Do / don't items
- "How this applies to UI/UX design" section
- Related principles (internal links)
- CTA to download the iOS app

Use `generateStaticParams` to statically generate all principle pages at build time.

### Data source
Principles live in Supabase (`principles` table). Actual DB columns:
`id`, `type`, `title`, `one_liner`, `definition`, `applies_when`, `do`, `dont`, `tags`, `category`, `sources`, `created_at`, `updated_at`

Note: TypeScript `DbPrinciple` interface maps `do` → `do_items` and `dont` → `dont_items`.

**Slug:** add a `slug` column to Supabase before building the web routes. Deriving slugs from title in code is fragile with apostrophes and special characters. Add the column, populate it, and use it as the canonical route key.

### App Store link
https://apps.apple.com/us/app/designsnack-laws-patterns/id6754067995

### Homepage entry points
1. Nav link ("Laws & Patterns")
2. Card/callout in the "Building in public" section on the homepage

---

## SEO Requirements
- Proper meta tags, OG tags on all pages
- Canonical tags on all pages (especially Laws & Patterns — avoid duplicate content if index and detail share similar text)
- `robots.txt` — allow all, disallow nothing (public site, full crawl intended)
- Sitemap generated at build time (`next-sitemap` or custom route at `/sitemap.xml`) — include all `/laws-and-patterns/[slug]` pages
- Individual laws pages are the primary SEO lever
- Fast Core Web Vitals (Vercel + Next.js static generation handles most of this)


---

## Decided

| Decision | Choice |
|---|---|
| Contact | Email link only (`tommy@designsnack.ch`) — no form |
| Building in public | CSS masonry grid, no filter pills, ~15–20 curated items in `data/feed.ts` |
| Header | Scrolls away — not sticky |
| Analytics | Reuse existing GA4 property from current site |

---

## Copy

### Hero
**Headline:** I design it. I develop it.
**Sub:** Senior Design Engineer based in Switzerland — 17+ years of UX depth, frontend roots, and AI in the workflow. I embed in your team and ship what I design.
**CTA:** Let's chat →

### What I offer
No three-column model. One clear statement — the engagement detail is a conversation, not a homepage decision.

**Headline:** You hire a designer. You get a builder too.
**Body:** I work embedded in product teams or on defined projects. Either way, you get someone who designs and builds — not an agency handoff.

I have 17+ years of UX experience and a background in frontend development. I design with implementation in mind, and I build what I design. AI accelerates both sides — faster iteration, faster delivery, without cutting corners on craft.

---

### Selected Work (card titles)
Four case studies exist — homepage shows 3 cards. Suggested three: Joyo, Finnova, Laws & Patterns. AXA added once NDA is cleared.

| Card | Title | Sub |
|---|---|---|
| 1 | Joyo | Designed and built an AI-powered SaaS platform for personalised gift experiences — from concept to production. |
| 2 | Core Banking Platform | One year embedded as senior design partner on one of Switzerland's leading core banking platforms. |
| 3 | Laws & Patterns | Designed and built a reference tool for 100+ UX laws and cognitive biases — iOS app and web. |
| 4 | AXA Switzerland | TBD — pending NDA check. Swap in once cleared. |

### About
**Headline:** Hey, I'm Tommy.
**Body:** I'm a Swiss designer and developer based in Romanshorn. I've spent over 17 years designing complex digital products for banks, insurance companies, and healthcare organisations — the kind of work where getting the details wrong actually matters.

Along the way I picked up frontend development, built my own products, and started using AI as a serious part of my workflow. At some point "UX Designer" stopped feeling like the right label. Design Engineer fits better.

When I'm not designing or building, I'm travelling — 39 countries and counting — coaching football, or foil surfing.

### Contact
**Link:** tommy@designsnack.ch
Display the email enormous. Nothing else in the section.

---

### Footer
**Left:** © 2025 DESIGNSNACK GmbH · Powered by coffee & curiosity
**Right:** Impressum + LinkedIn icon link

---

## Open decisions (resolve before or during build)
- [ ] AXA case study — confirm what can be shown (NDA check); copy TBD

## Resolved
| Decision | Choice |
|---|---|
| Animation library | Framer Motion only — no GSAP anywhere |
| Font | Urbanist everywhere — no monospace exceptions |
| Contact section | Email only (`tommy@designsnack.ch`), displayed enormous, no surrounding copy |
| Laws & Patterns slug | Add `slug` column to Supabase before building routes |
| Git commits in feed | Dropped — dominated the feed during busy client periods, messages felt noisy and unintentional |
| Tagline | Not needed — hero headline "I design it. I build it." carries the positioning |
| SEO | robots.txt + canonical tags added to requirements |
