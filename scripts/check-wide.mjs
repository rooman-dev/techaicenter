/* Cross-engine checks: descenders, campaign grid, rotator, wide screens. */
import { chromium, webkit } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:4321';
const WIDTHS = [390, 1024, 1440, 1512, 1728, 1920, 2560];
const fail = [];

for (const [name, engine] of [['chromium', chromium], ['webkit', webkit]]) {
  let browser;
  try {
    browser = await engine.launch();
  } catch (err) {
    console.log(`\n### ${name}: unavailable (${err.message.split('\n')[0]})`);
    fail.push(`${name} could not launch`);
    continue;
  }
  console.log(`\n### ${name}`);

  for (const w of WIDTHS) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    const r = await page.evaluate(() => {
      const clipped = [];
      document.querySelectorAll('h1, h2, h3, .cell__brand, .hero__stat-value').forEach((el) => {
        // a clipped descender shows up as content taller than the painted box
        if (el.scrollHeight > el.clientHeight + 1) clipped.push(`${el.tagName}.${(el.className + '').split(' ')[0]} ${el.scrollHeight}>${el.clientHeight}`);
      });
      const cells = Array.from(document.querySelectorAll('.cell')).map((c) => {
        const r = c.getBoundingClientRect();
        return { w: Math.round(r.width), top: Math.round(r.top) };
      });
      const widths = [...new Set(cells.map((c) => c.w))];
      const rows = [...new Set(cells.map((c) => c.top))].length;
      return {
        clipped,
        cellCount: cells.length,
        cellWidths: widths,
        rows,
        container: Math.round(document.querySelector('.hero').getBoundingClientRect().width),
        copy: getComputedStyle(document.querySelector('.hero__intro')).fontSize,
        scrollW: document.documentElement.scrollWidth,
        docW: document.documentElement.clientWidth,
        hasFeature: !!document.querySelector('.feature'),
        hasFrame: !!document.querySelector('.frame'),
      };
    });

    const equal = r.cellWidths.length === 1 || Math.max(...r.cellWidths) - Math.min(...r.cellWidths) <= 1;
    console.log(
      `${String(w).padStart(4)}: cells ${r.cellCount} in ${r.rows} row(s), widths ${r.cellWidths.join('/')} ${equal ? 'equal' : 'UNEQUAL'} | container ${r.container} | copy ${r.copy} | scroll ${r.scrollW}/${r.docW}` +
        (r.clipped.length ? ` | CLIPPED ${r.clipped.join(', ')}` : '')
    );
    if (r.clipped.length) fail.push(`${name} ${w}: clipped ${r.clipped.join(', ')}`);
    if (r.cellCount !== 6) fail.push(`${name} ${w}: ${r.cellCount} campaign cards, expected 6`);
    if (!equal) fail.push(`${name} ${w}: card widths ${r.cellWidths.join('/')}`);
    if (r.scrollW > r.docW) fail.push(`${name} ${w}: horizontal overflow`);
    if (r.hasFeature || r.hasFrame) fail.push(`${name} ${w}: hero frame / feature card still present`);

    if (name === 'chromium' && (w === 390 || w === 1440 || w === 2560)) {
      await page.waitForTimeout(5200); // mid-rotation
      await page.screenshot({ path: `scripts/shot-${w}.png`, fullPage: w === 390 });
    }
    await page.close();
  }
  await browser.close();
}

console.log(fail.length === 0 ? '\nWIDE + ENGINE CHECKS PASSED' : '\nFAILURES:\n' + fail.join('\n'));
process.exit(fail.length ? 1 : 0);
