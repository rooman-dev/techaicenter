# Tech AI Center — sponsor media kit

Static site at techaicenter.com. One job: convert inbound
brand/agency sponsorship enquiries for @TechAi22. Audience is
brand marketers and influencer agencies, not viewers.

Stack: Astro + Tailwind, TypeScript. No CMS, no backend.
Static build deployed to Netlify.

All copy and data live in `src/data/` as typed objects.
Components read from there and never hardcode content.

Pages: `/` (one scroll), `/terms`, `/privacy`.

Home sections in order: hero, trusted-by row, 01 Format,
02 Audience, 03 Work, 04 Process, 05 FAQ, 06 Contact, footer.
Sticky nav. Fixed AI assistant launcher bottom-right.

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
for body. Display tracking stays near 0 — it is already condensed.

## Hard rules

- Never publish a price. Rates are "on request". Packages and
  deliverables may be described; numbers may not.
- One format only: the dedicated video. No integration or
  Shorts packages.
- Every work entry needs a brand, a real YouTube URL, and a
  one-line scope. No entry without all three.
- Placeholders stay in [BRACKETS] until real data arrives.
- Mobile-first. Agencies open these links on phones.
- Tone factual, no hype, no emoji.