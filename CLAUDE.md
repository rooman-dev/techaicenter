# Tech AI Center — sponsor media kit

Static site at techaicenter.com. One job: convert inbound
brand/agency sponsorship enquiries for @TechAi22. Audience is
brand marketers and influencer agencies, not viewers.

Stack: Astro + Tailwind, TypeScript. No CMS, no backend.
Static build deployed to Netlify.

All copy and data live in `src/data/` as typed objects.
Components read from there and never hardcode content.

Pages: `/` (one scroll), `/terms`, `/privacy`, `/thanks`.

Home sections in order: hero, trusted-by row, 01 Campaigns,
02 Format, 03 Audience, 04 Process, 05 FAQ, 06 Contact, footer.
Sticky nav; hamburger below 1024 opening a full-screen sheet.
No AI assistant launcher.

Hero carries a five-pair rotating headline + message
(hero.rotations). Pair one is in the HTML for SEO and no-JS;
the rest are swapped in by script, pause on hover/focus, and
stay static under prefers-reduced-motion.

Campaigns shows all entries as equal cards — 3 columns from
1024, 2 from 768, 1 on mobile — with a 16:9 thumbnail and the
caption below it. No feature card, no hero video frame.

## Design tokens

Background: near-black. Base #010206, vertical gradient
#010206 → #03050C → #040711 → #020409 → #000103, plus blue
corner glows rgba(14,40,88,0.17) top-left and
rgba(8,28,68,0.12) top-right.

Text: #E9EFF7 primary, #C5CFDE secondary, #9FAEC6 body,
#7B8EAB muted, #4A5566 placeholder.
Hairlines and tints: rgba(255,255,255,0.085).

Glass: background rgba(1,2,6,0.66), backdrop-blur 24px
saturate 105%, border rgba(255,255,255,0.075). Use it on nav,
format panel, audience band, feature card, process band,
FAQ band, contact band and AI panel — not on work grid cells.

Accent #2E90FF. Cyan #17B6FF. Repeat-client green #00D94A.
Section numbers carry one logo colour each: 01 #F7861B,
02 #17B6FF, 03 #00D94A, 04 #7B6BFF, 05 #FF3B4E, 06 #E9EFF7.

Type: Big Shoulders Display 800 for display, Archivo 400/500/600
for body, self-hosted as woff2. Display tracking stays near 0 —
it is already condensed. Display line-height stays at or above
1.1: the face's ink runs taller than its em box and clips
descenders below that.

Layout tokens: --pad (16/24/48px gutter), --container (68rem,
80rem from 1440), --section-gap (clamp(80px, 10vw, 140px), each
section contributing half above and half below), --copy and
--copy-sm for fluid body text. No fixed container widths.

## Hard rules

- Never publish a price. Rates are "on request". Packages and
  deliverables may be described; numbers may not.
- One format only: the dedicated video. No integration or
  Shorts packages.
- Every work entry needs a brand, a real YouTube URL, and a
  one-line scope. No entry without all three.
- Placeholders stay in [BRACKETS] until real data arrives, and
  never render: isFilled() in src/data/utils.ts hides the
  element that would show one.
- Mobile-first. Agencies open these links on phones.
- Tone factual, no hype, no emoji.
- Every viewport from 360 to 2560 must pass scripts/: the
  responsive audit, alignment, mobile and wide/engine checks.