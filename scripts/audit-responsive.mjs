/* Responsive audit. Run against `npm run preview`:
   node scripts/audit-responsive.mjs            (audit only)
   SHOTS=1 node scripts/audit-responsive.mjs    (also write screenshots) */

import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE ?? 'http://localhost:4321';
const OUT = process.env.OUT ?? '/tmp/resp';
const KEEP = new Set([390, 834, 1366]);

const SIZES = [
  { w: 360, h: 800, label: 'phone' },
  { w: 390, h: 844, label: 'phone' },
  { w: 430, h: 932, label: 'phone' },
  { w: 768, h: 1024, label: 'tablet' },
  { w: 834, h: 1112, label: 'tablet' },
  { w: 1024, h: 1366, label: 'tablet' },
  { w: 1280, h: 800, label: 'laptop' },
  { w: 1366, h: 768, label: 'laptop' },
  { w: 1440, h: 900, label: 'laptop' },
  { w: 1920, h: 1080, label: 'desktop' },
  { w: 844, h: 390, label: 'phone-landscape' },
];

mkdirSync(OUT, { recursive: true });

const audit = () => {
  const docW = document.documentElement.clientWidth;
  const name = (el) => {
    const cls = ((el.className?.baseVal ?? el.className ?? '') + '').trim().split(/\s+/)[0];
    return el.tagName.toLowerCase() + (cls ? '.' + cls : '');
  };
  const visible = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };

  // An element inside a clipping ancestor cannot affect page width, and
  // visually-hidden text is not read at its font size.
  const clippedAway = (el) => {
    for (let p = el.parentElement; p; p = p.parentElement) {
      const cs = getComputedStyle(p);
      if (['hidden', 'clip', 'auto', 'scroll'].includes(cs.overflowX)) return true;
      if (cs.clipPath.startsWith('inset(50%')) return true;
    }
    return false;
  };

  const all = Array.from(document.querySelectorAll('body *')).filter(visible);

  const overflow = [];
  all.forEach((el) => {
    const r = el.getBoundingClientRect();
    if ((r.right > docW + 0.5 || r.left < -0.5) && !clippedAway(el)) {
      overflow.push(`${name(el)} [${Math.round(r.left)}..${Math.round(r.right)}]`);
    }
  });

  // text smaller than 14px that actually carries sentence-like content
  const smallText = [];
  all.forEach((el) => {
    const own = Array.from(el.childNodes)
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join(' ')
      .trim();
    if (own.length < 25) return; // labels/chips/numbers are small by design
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs < 14 && !clippedAway(el)) smallText.push(`${name(el)} ${fs}px "${own.slice(0, 32)}"`);
  });

  // interactive targets under 44px
  const taps = [];
  document.querySelectorAll('a, button, input, textarea, select').forEach((el) => {
    if (!visible(el) || el.closest('.form__honeypot') || el.tabIndex < 0) return;
    const r = el.getBoundingClientRect();
    if (r.height < 44 || r.width < 24) {
      taps.push(`${name(el)} ${Math.round(r.width)}x${Math.round(r.height)}`);
    }
  });

  // overlap between the fixed launcher and anything interactive
  const overlaps = [];
  const launcher = document.querySelector('.launcher');
  if (launcher) {
    const L = launcher.getBoundingClientRect();
    document.querySelectorAll('a, button, input, textarea').forEach((el) => {
      if (el === launcher || launcher.contains(el) || !visible(el)) return;
      const r = el.getBoundingClientRect();
      const hit =
        r.left < L.right && r.right > L.left && r.top < L.bottom && r.bottom > L.top;
      // A fixed launcher will always sit over *something* on a long page;
      // what matters is that it does not cover a control you must press.
      const small = r.height < 120;
      if (hit && small) overlaps.push(`launcher over ${name(el)}`);
    });
  }

  // headings whose text is wider than the box painting it
  const clipped = [];
  document.querySelectorAll('h1, h2, h3').forEach((el) => {
    if (!visible(el)) return;
    if (el.scrollWidth > el.clientWidth + 1) {
      clipped.push(`${name(el)} ${el.scrollWidth}>${el.clientWidth}`);
    }
  });

  return {
    docW,
    scrollW: document.documentElement.scrollWidth,
    overflow: [...new Set(overflow)],
    smallText: [...new Set(smallText)],
    taps: [...new Set(taps)],
    overlaps: [...new Set(overlaps)],
    clipped: [...new Set(clipped)],
  };
};

const browser = await chromium.launch();
let failures = 0;

for (const { w, h, label } of SIZES) {
  const page = await browser.newPage({
    viewport: { width: w, height: h },
    hasTouch: label.startsWith('phone') || label === 'tablet',
    isMobile: label.startsWith('phone'),
  });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(900);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  const r = await page.evaluate(audit);
  const bad =
    r.scrollW > r.docW || r.overflow.length || r.taps.length || r.overlaps.length || r.clipped.length;
  if (bad) failures += 1;

  console.log(`\n=== ${w}x${h} (${label}) ===`);
  console.log(`  scrollWidth ${r.scrollW} / ${r.docW} ${r.scrollW <= r.docW ? 'OK' : 'OVERFLOW'}`);
  if (r.overflow.length) console.log('  overflow:', r.overflow.slice(0, 6).join(' | '));
  if (r.clipped.length) console.log('  clipped headings:', r.clipped.join(' | '));
  if (r.taps.length) console.log('  tap<44:', r.taps.slice(0, 8).join(' | '));
  if (r.overlaps.length) console.log('  overlap:', r.overlaps.slice(0, 6).join(' | '));
  if (r.smallText.length) console.log('  text<14px:', r.smallText.slice(0, 5).join(' | '));

  if (process.env.SHOTS) {
    const file = `${OUT}/${w}x${h}.png`;
    await page.screenshot({ path: file, fullPage: true });
    if (KEEP.has(w)) await page.screenshot({ path: `scripts/shot-${w}.png`, fullPage: true });
  }
  await page.close();
}

await browser.close();
console.log(`\n${failures === 0 ? 'AUDIT CLEAN' : failures + ' viewport(s) with findings'}`);
