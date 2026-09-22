/* All copy and data live here. Components never hardcode content.
   Placeholders stay in [BRACKETS] until real data arrives. */

import type { ImageMetadata } from 'astro';
import capcutThumb from '../assets/capcut.jpg';
import buzzyThumb from '../assets/buzzy.jpg';
import monkeycodeThumb from '../assets/monkeycode.jpg';
import luminaThumb from '../assets/lumina.jpg';
import aiinspoThumb from '../assets/aiinspo.jpg';
import formaThumb from '../assets/forma.jpg';

/* Email and location are NOT here: they live on `business`, which the
   footer, contact rows and legal pages all read from. */
export interface Profile {
  name: string;
  /** Full <title> and og:title for the home page. */
  title: string;
  handle: string;
  /** Canonical channel URL. The contact row links to this. */
  channelUrl: string;
  /** Meta description and og:description. */
  tagline: string;
}

export interface NavItem {
  /** Label shown in the sticky nav. */
  label: string;
  /** In-page anchor, matching the matching section's `id`. */
  href: string;
}

/** Outline call-to-action sitting at the right of the sticky nav. */
export interface NavCta {
  label: string;
  href: string;
}

/** Legal pages linked from the footer. */
export interface LegalLink {
  label: string;
  href: string;
}

export interface Business {
  /** Registered or trading name, as it should appear in the footer. */
  name: string;
  /** Full street address. */
  address: string;
  city: string;
  country: string;
  /** Business address — the form, sponsors and the legal pages use this. */
  email: string;
  /** Personal address, shown alongside the business one. */
  personalEmail: string;
  phone: string;
  /** Separate from `phone` on purpose: the two may diverge. */
  whatsapp: string;
}

export interface HeroButton {
  label: string;
  href: string;
  /** `solid` carries the light border; `ghost` has no border. */
  variant: 'solid' | 'ghost';
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroRotation {
  headline: string;
  message: string;
}

export interface Hero {
  /** Six dot colours, left to right, in the eyebrow row. */
  eyebrowDots: string[];
  eyebrowText: string;
  headlineLine1: string;
  /** Rendered in --accent. */
  headlineLine2: string;
  intro: string;
  /** Pair 1 is rendered in the HTML; the rest are swapped in by script. */
  rotations: HeroRotation[];
  buttons: HeroButton[];
  stats: HeroStat[];
}

export interface FormatBenefit {
  title: string;
  detail: string;
}

export interface FormatFact {
  label: string;
  value: string;
  /** Renders the value in --accent. Used for the fee, which is never a number. */
  accent?: boolean;
  note?: string;
}

export interface FormatSection {
  /** Gutter label, e.g. "01 — Format". */
  label: string;
  /** Heading in primary text, followed by headingTail in the muted colour. */
  headingLead: string;
  headingTail: string;
  intro: string;
  benefitsHeading: string;
  benefits: FormatBenefit[];
  facts: FormatFact[];
  supplyLabel: string;
  supplyItems: string[];
}

export interface AudienceCountry {
  name: string;
  /** Track fill, layout only. The visible figure stays bracketed. */
  fill: number;
  figure: string;
}

export interface AudienceStat {
  value: string;
  label: string;
}

export interface AudienceSection {
  label: string;
  headingLine1: string;
  headingLine2: string;
  intro: string;
  watchTimeHeading: string;
  countries: AudienceCountry[];
  caption: string;
  stats: AudienceStat[];
}

export interface Project {
  /** Brand the video was made for. Required. */
  brand: string;
  /** Real YouTube URL. Required. */
  url: string;
  /** Video title as published. */
  title: string;
  /** One-line scope of the work. Required. */
  scope: string;
  /** Marks a brand that has commissioned more than once. */
  repeatClient: boolean;
  /** Imported image, not a path string, so Astro can optimise it. */
  thumb: ImageMetadata;
  thumbAlt: string;
}

export interface ProcessStep {
  number: string;
  days: string;
  title: string;
  description: string;
  /** CSS colour for the floating step number. */
  color: string;
  /** Negative delay, so the five floats sit at different points in the cycle. */
  floatDelay: string;
}

export interface ProcessSection {
  label: string;
  heading: string;
  intro: string;
  steps: ProcessStep[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSection {
  label: string;
  headingLine1: string;
  headingLine2: string;
  note: string;
  items: FaqItem[];
}

export interface ContactDetail {
  label: string;
  value: string;
  /** Present when the value should be a link. */
  href?: string;
  /** Opens in a new tab. */
  external?: boolean;
}

export interface ContactFitCheck {
  eyebrow: string;
  body: string;
  inputLabel: string;
  placeholder: string;
  buttonLabel: string;
}

export interface ContactField {
  id: string;
  name: string;
  label: string;
  /** Input type. Ignored when `multiline` is set. */
  type?: 'text' | 'email';
  /** Renders a textarea instead of an input. */
  multiline?: boolean;
  autocomplete?: string;
  /** Sits beside the previous field on a two-column row. */
  half?: boolean;
}

export interface ThanksPage {
  title: string;
  description: string;
  heading: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
}

export interface ContactSection {
  label: string;
  headingLine1: string;
  /** Rendered in --accent. */
  headingLine2: string;
  intro: string;
  details: ContactDetail[];
  fitCheck: ContactFitCheck;
  formName: string;
  formAction: string;
  fields: ContactField[];
  submitLabel: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  brand: string;
}

export interface WorkSection {
  label: string;
  heading: string;
  note: string;
  entries: Project[];
  entryCta: string;
  repeatTag: string;
}

export const profile: Profile = {
  name: 'Tech AI Center',
  title: 'Abid Ali · Tech AI Center — sponsored video for software and AI brands',
  handle: '@TechAi22',
  channelUrl: 'https://www.youtube.com/@TechAi22',
  tagline:
    'One dedicated long-form video per campaign. You give me the product and I build something real with it on camera, for creators and studios across the US and Europe.',
};

export const hero: Hero = {
  eyebrowDots: ['#F7861B', '#E9EFF7', '#00D94A', '#3411E0', '#FF3B4E', '#7B6BFF'],
  // TEMP — replace with real YT Studio data
  eyebrowText: 'One format · Next slot: early October',
  headlineLine1: "I don't review products.",
  headlineLine2: 'I build something with them.',
  intro:
    'One dedicated long-form video, made properly. You give me the product - software, hardware, a platform, an API - and I take it from nothing to a finished piece of work on camera. My audience watches because the result is real, which is why they go and try the thing.',
  rotations: [
    {
      headline: 'More sign-ups for your AI tool.',
      message:
        'One dedicated video that shows viewers exactly why they need your product — and sends them straight to it.',
    },
    {
      headline: 'Real customers, not just views.',
      message:
        "I build something real with your tool on camera — that's what turns watchers into paying users.",
    },
    {
      headline: 'Launch day, done right.',
      message:
        'Time your video to your launch or update, so the first people who hear about it are ready to try it.',
    },
    {
      headline: 'Your tool, explained better than your own demo.',
      message:
        'A clear walkthrough viewers actually finish — and leave knowing exactly how to use your product.',
    },
    {
      headline: 'A video that keeps selling for months.',
      message:
        'Long-form content ranks on YouTube and Google, so new viewers keep finding your product long after launch day.',
    },
  ],
  buttons: [
    { label: 'Get more customers', href: '#contact', variant: 'solid' },
    { label: 'See past campaigns', href: '#work', variant: 'ghost' },
  ],
  stats: [
    { value: '60.6K', label: 'Subscribers' },
    // Channel views over 28 days, not a per-video average. The label has to
    // say which, or the figure misreads as per-video performance.
    { value: '409K', label: 'Views, last 28 days' },
  ],
};

/** Brand names in the trusted-by band, in display order. */
export const trustedBy: string[] = [
  'Higgsfield',
  'Lovart',
  'CapCut',
  'Buzzy',
  'MonkeyCode',
  'BytePlus',
  'Stellar',
  'AI Inspo',
];

export const format: FormatSection = {
  label: '02 — Format',
  headingLead: 'The dedicated video.',
  headingTail: "That's it.",
  intro:
    "I don't sell integrations, bundles or shout-outs. One video, one product, all the attention. It runs long because a real build takes as long as it takes - and length is why viewers finish it convinced instead of curious.",
  benefitsHeading: 'What you get',
  benefits: [
    {
      title: 'A real build, start to finish',
      detail: 'Not a menu tour. Something finished exists by the end.',
    },
    {
      title: 'Scripted, voiced, edited in-house',
      detail: 'No outsourced narration, no template edit.',
    },
    {
      title: 'Custom thumbnail and title',
      detail: 'Tested before publish, swapped if it underperforms.',
    },
    {
      title: 'Your link, first line of the description',
      detail: "Repeated in a pinned comment for the video's life.",
    },
    {
      title: 'One revision on the unlisted cut',
      detail: 'You see it privately before anyone else does.',
    },
    {
      title: 'Analytics at 14 and 30 days',
      detail: 'Views, retention, traffic - sent without chasing.',
    },
  ],
  facts: [
    { label: 'Runtime', value: '7-12 min' },
    { label: 'Turnaround', value: '10-14 days' },
    {
      label: 'Fee',
      value: 'On request',
      accent: true,
      note: 'Set by usage rights, exclusivity and timing. Quoted same day.',
    },
  ],
  supplyLabel: 'You supply',
  supplyItems: ['Product access', 'Key messages', 'Tracking link', 'Brand assets, if any'],
};

export const audience: AudienceSection = {
  label: '03 — Audience',
  headingLine1: 'People who buy tools,',
  headingLine2: 'not people who scroll past them.',
  intro:
    'Creators, freelancers and small studios who already pay for their stack and are deciding what to add next. They arrive looking for a workflow they can copy, so they follow the link while the video is still playing.',
  watchTimeHeading: 'Watch time by country',
  countries: [
    // TEMP — replace with real YT Studio data
    { name: 'United States', fill: 34, figure: '34%' },
    { name: 'United Kingdom', fill: 11, figure: '11%' },
    { name: 'Germany', fill: 8, figure: '8%' },
    { name: 'Canada', fill: 7, figure: '7%' },
  ],
  caption: 'Figures and marker sizes from YouTube Studio - replace before launch.',
  stats: [
    // TEMP — replace with real YT Studio data
    { value: '4:18', label: 'Avg. view duration' },
    { value: '58%', label: 'Age 25-44' },
    { value: '61%', label: 'US + Europe' },
  ],
};

/** Every entry needs a brand, a real YouTube URL and a one-line scope. */
export const work: WorkSection = {
  label: '01 — Campaigns',
  heading: 'Selected campaigns',
  note: 'Three of these brands booked a second video.',
  entries: [
    {
      brand: 'CapCut',
      url: 'https://www.youtube.com/watch?v=hd7gswpPLWg',
      title: 'How to Make a Marketing Video Step-by-Step',
      scope:
        'A complete marketing video built in CapCut with Seedance 2.5 at 1080p, from blank timeline to finished export.',
      repeatClient: false,
      thumb: capcutThumb,
      thumbAlt: 'CapCut campaign video thumbnail',
    },
    {
      brand: 'FORMA / OnlyDoc',
      url: 'https://www.youtube.com/watch?v=2OUQbKE4iQY',
      title: 'FORMA / OnlyDoc review',
      scope: 'A full walkthrough of the product on camera, from first run to finished output.',
      repeatClient: false,
      thumb: formaThumb,
      thumbAlt: 'FORMA OnlyDoc review on Tech AI',
    },
    {
      brand: 'Buzzy',
      url: 'https://www.youtube.com/watch?v=edOXlof-qMY',
      title: 'Buzzy AI + Seedance 2.5 Is an AI Filmmaking Powerhouse',
      scope: "Built a full filmmaking pass inside Buzzy's canvas - storyboard through to finished cut.",
      repeatClient: true,
      thumb: buzzyThumb,
      thumbAlt: 'Buzzy campaign video thumbnail',
    },
    {
      brand: 'MonkeyCode',
      url: 'https://www.youtube.com/watch?v=51G3YvLz4is',
      title: 'I Built & Deployed a Real App With Zero Setup',
      scope:
        'A real application built and deployed live on camera, then submitted to their public gallery.',
      repeatClient: true,
      thumb: monkeycodeThumb,
      thumbAlt: 'MonkeyCode campaign video thumbnail',
    },
    {
      brand: 'Lumina',
      url: 'https://www.youtube.com/watch?v=zWN9tF0pLUQ',
      title: 'Seedance 2.5 on Lumina Is Crazy - 30 Sec AI Video + 50 References',
      scope:
        'A thirty-second generation driven by fifty reference images, start to finish on BytePlus Lumina.',
      repeatClient: false,
      thumb: luminaThumb,
      thumbAlt: 'Lumina campaign video thumbnail',
    },
    {
      brand: 'AI Inspo',
      url: 'https://www.youtube.com/watch?v=KqYQ0xtB6Q0',
      title: 'Cheapest Seedance 2.5 Generator + Upscaler? Inspo Canvas Tested',
      scope: "Put the platform's price and its upscaler under a straight test against the alternatives.",
      repeatClient: false,
      thumb: aiinspoThumb,
      thumbAlt: 'AI Inspo campaign video thumbnail',
    },
  ],
  entryCta: 'Watch on YouTube →',
  repeatTag: 'Repeat',
};

export const process: ProcessSection = {
  label: '04 — Process',
  heading: 'Five steps, every time',
  intro:
    'So you know where the review point sits and when the link goes live. No surprises, no open-ended revision loop.',
  steps: [
    {
      number: '01',
      days: 'Day 0',
      title: 'Scope agreed',
      description:
        'Format, usage rights, deadline and fee confirmed in writing. Product access provided.',
      color: '#17B6FF',
      floatDelay: '0s',
    },
    {
      number: '02',
      days: 'Day 1-2',
      title: 'Angle approved',
      description:
        'I send the concept and exactly what gets built. You sign off before filming starts.',
      color: 'var(--accent)',
      floatDelay: '-1.4s',
    },
    {
      number: '03',
      days: 'Day 3-14',
      title: 'Production',
      description: 'Script, record, edit. Ten to fourteen days from sign-off.',
      color: '#5A7CFF',
      floatDelay: '-2.8s',
    },
    {
      number: '04',
      days: 'Day 15',
      title: 'Unlisted review',
      description: 'You watch the finished cut privately. One revision pass is included.',
      color: '#7B6BFF',
      floatDelay: '-4.2s',
    },
    {
      number: '05',
      days: 'Day 16+',
      title: 'Publish',
      description: 'Live with your tracking link and pinned comment. Analytics at 14 and 30 days.',
      color: '#00D94A',
      floatDelay: '-5.6s',
    },
  ],
};

export const faq: FaqSection = {
  label: '05 — FAQ',
  headingLine1: 'Answered',
  headingLine2: 'in advance',
  note: 'Anything else, email me. One business day, always.',
  items: [
    {
      question: 'What does it cost?',
      // Deliberately names no figure. Rates are on request; see CLAUDE.md.
      answer:
        "It depends on usage rights, exclusivity and how fast you need it — the same video can carry very different terms. Send the scope and you'll have a number the same day. I don't publish a fixed rate because a fixed rate would be wrong for most briefs.",
    },
    {
      question: 'Do you only cover AI tools?',
      answer:
        "No. AI is where a lot of the interesting work is right now, but the format works for any product I can genuinely build something with — creative software, developer tools, platforms, hardware. If I can't make something real with it, I'll tell you rather than take the booking.",
    },
    {
      question: 'Can we buy just an integration or a Short?',
      answer:
        "Not on their own. A short mention next to someone else's product doesn't convert well enough for me to sell it honestly. Supporting Shorts can be added to a dedicated video.",
    },
    {
      question: 'What usage rights are included?',
      answer:
        'Organic reposting on your own channels for 30 days is standard. Longer terms, paid media and whitelisting are available and priced separately.',
    },
    {
      question: 'Can we supply the script?',
      answer:
        "Send the brief, the key messages and the features that must appear. The script stays mine — my audience can hear the difference, and that difference is what you're paying for.",
    },
    {
      question: 'Will you take product instead of payment?',
      answer: "No. Product access is what makes the video possible; it isn't the fee.",
    },
    {
      question: 'Where are you, and how do you invoice?',
      answer:
        "Multan, Pakistan, working with brands worldwide. Invoiced in USD by PayPal or bank transfer. Physical products often can't be shipped here, so software and platforms are the easiest fit.",
    },
  ],
};

/* Single source for the business placeholders. src/data/legal.ts imports
   these, so filling them in here fills them in on the legal pages too. */
export const business: Business = {
  name: 'Abid Ali',
  address: 'House No D1, Raza Shah Road, near 2 Talwar Chowk, Cantonment Area, Multan, Pakistan',
  city: 'Multan',
  country: 'Pakistan',
  email: 'techaicenter@gmail.com',
  personalEmail: 'abidalishakir@yahoo.com',
  phone: '+92 333 6089123',
  whatsapp: '+92 333 6089123',
};

export const contact: ContactSection = {
  label: '06 — Contact',
  headingLine1: 'Book a',
  headingLine2: 'campaign',
  intro:
    'Product, timing, and what you want people to do after watching. Quote and an available slot back within one business day.',
  details: [
    {
      label: 'Business',
      value: business.email,
      href: `mailto:${business.email}`,
    },
    {
      label: 'Abid Ali — personal',
      value: business.personalEmail,
      href: `mailto:${business.personalEmail}`,
    },
    { label: 'WhatsApp', value: business.whatsapp },
    {
      label: 'Channel',
      value: 'youtube.com/@TechAi22',
      // URL defined once, on `profile`.
      href: profile.channelUrl,
      external: true,
    },
    { label: 'Based in', value: `${business.city}, ${business.country} · UTC+5` },
  ],
  fitCheck: {
    eyebrow: 'Instant fit check',
    body: "Paste your product URL. You'll get a first-pass angle — what I'd actually build with it on camera — before you commit to an email.",
    inputLabel: 'Product URL',
    placeholder: 'https://',
    buttonLabel: 'Generate angle',
  },
  formName: 'contact',
  /* Netlify redirects here on success instead of showing its own page. */
  formAction: '/thanks',
  fields: [
    { id: 'name', name: 'name', label: 'Name', type: 'text', autocomplete: 'name', half: true },
    {
      id: 'company',
      name: 'company',
      label: 'Company',
      type: 'text',
      autocomplete: 'organization',
      half: true,
    },
    { id: 'email', name: 'email', label: 'Work email', type: 'email', autocomplete: 'email' },
    { id: 'brief', name: 'brief', label: 'Product, timing, goal', multiline: true },
  ],
  submitLabel: 'Send enquiry',
};

/** Held back until the quotes are cleared for publication. */
export const showTestimonials = true;

export const testimonials: Testimonial[] = [
  {
    quote:
      'It looks amazing! I really liked how you described all the features and highlighted the main key points. The editing also turned out really professional.',
    name: 'Roksoliana Keda',
    brand: 'FORMA / OnlyDoc',
  },
  {
    quote: "The video looks great, and we're very satisfied with the content.",
    name: 'Poppy',
    brand: 'MonkeyCode (Chaitin Tech)',
  },
  {
    quote: 'Excellent, thank you for turning the title, thumbnail and hashtags around so quickly.',
    name: 'Whacka team',
    brand: 'Whacka',
  },
  {
    quote: 'The video content looks good. No further content changes are needed.',
    name: 'Ricky Chen',
    brand: 'VigilKids',
  },
];

/* Where the enquiry form lands after Netlify accepts it. */
export const thanks: ThanksPage = {
  title: 'Message received — Tech AI Center',
  description: 'Your enquiry reached me. I reply within one business day.',
  heading: 'Message received',
  body: 'Thanks — I reply within one business day, usually sooner.',
  primaryLabel: 'Back to home',
  primaryHref: '/',
  secondaryLabel: 'Watch the channel',
};

/** Wordmark shown at the left of the sticky nav. */
export const wordmark = 'techaicenter';

/** Section links in the sticky nav. Contact is reached via the CTA instead. */
export const nav: NavItem[] = [
  { label: 'Campaigns', href: '#work' },
  { label: 'Format', href: '#format' },
  { label: 'Audience', href: '#audience' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
];

export const navCta: NavCta = {
  label: 'Enquire',
  href: '#contact',
};

export const legalLinks: LegalLink[] = [
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
];


