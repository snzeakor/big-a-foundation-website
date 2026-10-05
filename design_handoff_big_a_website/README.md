# Handoff: Big A Foundation Website

## Overview
A single-page marketing and donation website for the **Big A Foundation**, a community-focused nonprofit. It runs programs, events and resources in **Dallas–Fort Worth (DFW)** and the surrounding areas. It also builds schools across **Nigeria and Africa** (the first is in progress in **Owerri, Imo State**), funds scholarships, supports arts and culture, and backs African entrepreneurs.

Site goals: **drive donations**, **promote events and programs**, and **build credibility with sponsors and partners**.

There are **three visual directions** with the same content and section structure:
- **A — Sunrise**: warm cream, Bricolage Grotesque, rounded color cards, soft drifting blobs.
- **B — Color Field**: full-bleed color bands, condensed Archivo, split DFW / AFRICA hero.
- **C — Collage**: hard-edged offset shadows, Unbounded, tilted polaroids and stickers, crossed marquees.

Ask the client which direction to build; the default is the one they pick, otherwise A.

## About the Design Files
The files in this bundle are **design references created in HTML**: prototypes that show the intended look and behavior. They are not production code to copy directly. Recreate them in the target codebase's environment. If there is no codebase yet, a good fit is **Next.js (App Router) + Tailwind CSS** or **Astro**, plus a hosted donation provider (Stripe Checkout, Givebutter, Donorbox, etc.).

- `*.dc.html`: source prototypes, with inline styles in markup and a JS logic class at the bottom (`class Component extends DCLogic`). They need `support.js` beside them to run.
- `* (standalone).html`: self-contained versions that open directly in any browser. **Use these to view the designs.**

## Fidelity
**High-fidelity.** Colors, type, spacing, layout and interactions are final. Recreate them pixel-perfectly.
**Copy and data are placeholder** (see "Content to replace").

## Shared Section Structure (all three directions)
In page order. Anchor IDs are used by the nav.

1. **Header**: sticky. Logo and wordmark on the left. Nav: Programs (`#programs`), Schools (`#schools`), Events (`#events`), Volunteer (`#volunteer`), Donate CTA (`#donate`).
2. **Hero (`#top`)**: headline, DFW ↔ Nigeria/Africa framing, two CTAs (Give today → `#donate`, Events → `#events`), plus decorative imagery.
3. **Marquee**: infinite horizontal scroll of keywords (Community, Scholarships, Schools, Arts & Culture, Entrepreneurs…).
4. **Impact numbers**: 4 stats that count up on scroll: 2 continents · 1000+ DFW families · 50+ scholarships · first school rising in Owerri.
5. **Mission**: "Two homes": a DFW card and a Nigeria + Africa card (A), or a mission block with layered photos (C). B folds the mission into the hero and a black statement band.
6. **Programs (`#programs`)**: 6 programs: Community Programs (DFW), Family Resources (DFW), Schools Across Africa (Nigeria + Africa), Scholarships (Global), Arts & Culture (Africa), Entrepreneurship (Africa). Each has a photo, location tag, title and one-line description. A and C use a responsive grid; B uses a horizontal snap-scroll rail with prev/next buttons.
7. **Schools across Africa (`#schools`)**: the featured international initiative. Roadmap: **School 01 · Owerri, Nigeria (building now)** → **More of Nigeria (planning)** → **Across Africa (the goal)**. A and C show an animated progress bar for Owerri (35%, placeholder). CTA "Fund a brick", "Build it with us" in B: scrolls to `#donate` and preselects the "Schools in Africa" fund.
8. **Events (`#events`)**: 4 upcoming events with date, title, place and CTA. A uses list rows that shift right and fill with color on hover; B uses cards; C uses ticket-style cards with a dashed perforation.
9. **Gallery**: photo grid/masonry (A, B) or a taped polaroid wall (C).
10. **Donate (`#donate`)**: interactive donation widget (see below).
11. **Volunteer (`#volunteer`)**: name and email inputs, multi-select interest chips, submit button. Submitting swaps in a success message.
12. **Instagram**: 6 square tiles plus a Follow button, linking to https://www.instagram.com/bigafoundation/. Build it with a real IG embed or API.
13. **Footer (`#contact`)**: logo, contact email, partners email, Instagram, "Dallas–Fort Worth, TX", ©, 501(c)(3) and EIN line. A and B close with a giant display wordmark or line.

## Donation Widget (all directions)
State:
- `frequency`: `'One-time' | 'Monthly'` (default **Monthly**)
- `fund`: one of `Where needed most / Most needed`, `DFW programs`, `Schools in Africa`, `Scholarships`, `Arts & culture`, `Entrepreneurs` (default index 0)
- `amount`: one of `25 | 50 | 100 | 250` (default **50**)

Derived:
- Impact line: `$${amount}${monthly ? '/month' : ''} ${impact[amount]}. Going to: ${fund}.`
  - 25 → "buys school supplies for a student"
  - 50 → "stocks a family resource kit"
  - 100 → "funds desks for a new classroom"
  - 250 → "moves a student closer to a full scholarship"
- Button label: `Give $${amount}${monthly ? ' monthly' : ''} →`

On submit, the prototype only shows a thank-you line. **Wire this to the real payment provider** and pass frequency, amount and fund designation. Consider adding a custom amount field.

## Volunteer Form
State: `name`, `email`, `interests: string[]` (toggle chips: Events, Mentoring, Resource drives, School building, Arts & culture, Fundraising), `sent: boolean`.
Add real validation (required name, valid email) and post to a form backend, CRM or email.

## Motion (Showpiece level, requested by client)
All directions:
- **Scroll reveal**: elements fade and translate in when 12% visible (IntersectionObserver, once).
  - A: `translateY(48px)` → 0, 0.9s `cubic-bezier(.2,.7,.2,1)`, staggered `data-delay` 0–300ms
  - B: `translateY(60px) skewY(2deg)` → 0, 0.9s, same easing
  - C: `translateY(50px) scale(.92)` → 0, 0.8s springy `cubic-bezier(.3,1.5,.5,1)`, random 0–160ms stagger
- **Count-up stats**: 1.8s ease-out-cubic from 0, with `toLocaleString()` and suffix.
- **Marquee**: `translateX(0 → -50%)` linear infinite on duplicated content (A 34s, B 28s, C 30s; C's second band runs in reverse).
- **Progress bar**: width 0 → 35% over 2.4s on load.
- Respect `prefers-reduced-motion`: disable infinite animations and parallax.

Per direction:
- **A**: three blurred color blobs (`filter: blur(70px)`, opacity .35) drift on 16–22s loops. Hero word rotator cycles every 2.2s through DFW / Nigeria / Fort Worth / Africa / your block; each word blurs and slides up in (0.6s) with a 5px underline in its color. The two hero photos parallax at -0.06 and +0.08 × scrollY. A floating "♥ DFW ↔ Africa" badge bobs (6s) with a pulsing heart (1.4s). Program cards lift 8px and rotate -0.6° on hover.
- **B**: the hero city words rise from a clipped mask (1s, second word +150ms). A central red heart circle beats (1.6s, double-pulse). A spinning text seal on the schools photo (18s). The marquee band is rotated -1.5°. Event cards on hover: translateY(-6px) rotate(-1deg) and invert to black.
- **C**: four hero polaroids float (6–8s bob) and parallax at different rates. A wiggling ♥ sticker and a spinning "DFW" sticker. Two crossed marquee bands at ±3°. Cards are pre-rotated by ±1–6° and straighten on hover. Buttons translate (-3px,-3px) and grow their offset shadow from 5px to 8px. A "tilt" multiplier (0–2) scales all rotations.

## Design Tokens
**Brand colors (from the logo)**
- Teal `#1aa58f` (deep `#137a6a`, light `#4fd1b9`, tint `#e3f4f0` / `#d3eee8`)
- Red `#d8352a` (deep `#b8271d`, bright `#ff5a4e`, tint `#fde7e4` / `#fbdcd8`)
- Orange `#ef7d16` (deep `#b85a08`, tint `#feeedc` / `#fde0c2`)
- Ink `#161412`; muted text `#4a453f`, `#5b554e`; on-dark muted `#c9c2b8`, `#9b9389`
- Backgrounds: A/B cream `#fbf8f3`, A alt band `#f2ede5`; C cream `#fff8ee`; neutral tint `#e6dfd5`; input border `#e2dbd0`

**Typography** (Google Fonts)
- A: **Bricolage Grotesque** 500/700/800 for display (hero `clamp(56px,8.6vw,128px)`, lh .88, ls -.05em; section H2 `clamp(44px,6vw,88px)`, lh .92, ls -.045em) + **Figtree** 400–700 for body (18–21px, lh 1.55–1.6)
- B: **Archivo** variable, weight 900, `font-stretch` 62–75%, uppercase display (hero `clamp(120px,19vw,300px)`, lh .8; H2 `clamp(64px,9vw,150px)`, lh .82); body Archivo 500
- C: **Unbounded** 700/900 for display (hero `clamp(50px,9vw,138px)`, ls -.04em; H2 `clamp(44px,6.4vw,96px)`) + **Figtree** body
- All: **JetBrains Mono** 400 for eyebrows and labels, 11–13px, letter-spacing .06–.1em, uppercase

**Radii**: pills 999px · A cards 20–40px · B 14–32px (buttons 12–14px) · C 18–44px
**Borders/shadows**: A uses soft shadows `0 30px 60px -30px rgba(22,20,18,.35)`. B is flat. C uses `2.5–3px solid #161412` borders with hard offset shadows `5–10px 5–10px 0 #161412` (or a brand color).
**Layout**: max-width 1320px (A, C) / 1400px (B); side padding `clamp(16px,4vw,40px)`; section padding `clamp(80px,10vw,140px)`; grids use `repeat(auto-fit, minmax(min(100%, Npx), 1fr))`, so the layout is fully fluid down to mobile.

## Assets
- `assets/big-a-logo.jpeg`: Big A Foundation logo (two figures with a heart, teal/red/orange). On cream backgrounds it is shown with `mix-blend-mode: multiply` to drop the white. **Get a transparent PNG/SVG from the client.**
- All photos are **striped placeholders** labeled with the intended subject (e.g. "photo: school site"). Replace them with real imagery from the client.

## Content to Replace (placeholders)
- Stats: 1000+ families, 50+ scholarships, 35% build progress
- All event dates, titles and venues
- Emails (hello@ / partners@bigafoundation.org), EIN `00-0000000`
- Instagram tiles (use a real feed)
- Impact lines per donation amount

## Files
- `Big A - A Sunrise (standalone).html`, `Big A - B Color Field (standalone).html`, `Big A - C Collage (standalone).html`: open in any browser to view
- `source/Big A - A Sunrise.dc.html`, `source/Big A - B Color Field.dc.html`, `source/Big A - C Collage.dc.html`: readable source (markup with inline styles plus a logic class)
- `source/support.js`: runtime needed only to open the source files
- `assets/big-a-logo.jpeg`
