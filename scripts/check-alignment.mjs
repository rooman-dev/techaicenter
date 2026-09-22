/* All section headings must share one left edge. */
import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:4321';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE, { waitUntil: 'networkidle' });

const rows = await page.evaluate(() => {
  const pick = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { left: Math.round(r.left), right: Math.round(r.right) };
  };
  return {
    hero: pick('.hero__headline'),
    format: pick('#format h2'),
    audience: pick('#audience h2'),
    work: pick('#work h2'),
    process: pick('#process h2'),
    faq: pick('#faq h2'),
    contact: pick('#contact h2'),
    labels: {
      format: pick('.format__label'),
      audience: pick('.audience__label'),
      work: pick('.work__label'),
      process: pick('.process__label'),
      faq: pick('.faq__label'),
      contact: pick('.contact__label'),
    },
    cards: {
      feature: pick('.feature'),
      grid: pick('#work .grid'),
      formatPanel: pick('.format__panel'),
    },
    launcher: !!document.querySelector('.launcher'),
  };
});

const headings = ['format', 'audience', 'work', 'process', 'faq', 'contact'];
const lefts = headings.map((k) => rows[k].left);
const base = lefts[0];
const spread = Math.max(...lefts) - Math.min(...lefts);

headings.forEach((k) => console.log(`${k.padEnd(9)} heading left ${rows[k].left}  label left ${rows.labels[k].left}`));
console.log('hero     left', rows.hero.left);
console.log('cards    feature', JSON.stringify(rows.cards.feature), 'grid', JSON.stringify(rows.cards.grid), 'formatPanel', JSON.stringify(rows.cards.formatPanel));
console.log('launcher present:', rows.launcher);
// cards and panels must start at the same indent as the headings
const blocks = { feature: rows.cards.feature, grid: rows.cards.grid, formatPanel: rows.cards.formatPanel };
const strays = Object.entries(blocks).filter(([, r]) => r && Math.abs(r.left - base) > 2);
strays.forEach(([k, r]) => console.log(`  ${k} left ${r.left} != heading ${base}`));

console.log(`\nheading left spread: ${spread}px (base ${base}) -> ${spread <= 2 ? 'ALIGNED' : 'MISALIGNED'}`);
console.log(`content blocks aligned to heading: ${strays.length === 0 ? 'yes' : 'NO'}`);

await browser.close();
process.exit(spread <= 2 && strays.length === 0 && !rows.launcher ? 0 : 1);
