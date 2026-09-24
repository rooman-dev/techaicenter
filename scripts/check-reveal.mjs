/* Times each section heading's reveal from the moment it enters view. */
import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:4321';
const SECTIONS = ['#work', '#format', '#audience', '#process', '#faq', '#contact'];
const BUDGET = 800;
const fail = [];

const browser = await chromium.launch();

for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 900 } });
  await page.goto(BASE, { waitUntil: 'networkidle' });

  const counts = await page.evaluate(() => ({
    tw: document.querySelectorAll('.tw').length,
    observed: document.documentElement.classList.contains('tw-ready'),
  }));
  console.log(`\n=== ${width} === .tw elements: ${counts.tw} | tw-ready: ${counts.observed}`);
  if (!counts.observed) fail.push(`${width}: script never marked tw-ready`);

  for (const id of SECTIONS) {
    // Fresh load per section: a reveal is one-shot per element, so timing it
    // means arriving at that heading the way a visitor does.
    const p2 = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 900 } });
    // Wait for load: scrolling mid-load shifts the page as images land, which
    // measures the layout settling rather than the reveal.
    await p2.goto(BASE, { waitUntil: 'load' });

    const result = await p2.evaluate(
      async ({ id, budget }) => {
        const heading = document.querySelector(`${id} h2`);
        const spans = Array.from(heading.querySelectorAll('.tw'));

        const revealed = () =>
          spans.every((el) => {
            const clip = getComputedStyle(el).clipPath;
            if (clip === 'none') return true;
            const right = parseFloat((clip.match(/inset\(([^)]*)\)/)?.[1] ?? '0 0').split(/\s+/)[1] ?? '0');
            return right === 0;
          });

        const hiddenAtStart = !revealed();
        const start = performance.now();
        heading.scrollIntoView({ behavior: 'instant', block: 'center' });

        return await new Promise((resolve) => {
          const tick = () => {
            if (revealed()) {
              resolve({ ms: Math.round(performance.now() - start), ok: true, hiddenAtStart });
              return;
            }
            if (performance.now() - start > budget + 2500) {
              resolve({ ms: -1, ok: false, hiddenAtStart });
              return;
            }
            requestAnimationFrame(tick);
          };
          tick();
        });
      },
      { id, budget: BUDGET }
    );

    const label = result.ok ? `${result.ms}ms` : 'NEVER REVEALED';
    const within = result.ok && result.ms <= BUDGET;
    console.log(
      `  ${id.padEnd(10)} ${label.padStart(14)} ${within ? 'ok' : 'SLOW/FAIL'}${result.hiddenAtStart ? '' : ' (already shown on load)'}`
    );
    if (!within) fail.push(`${width} ${id}: ${label}`);
    await p2.close();
  }

  await page.close();
}

await browser.close();
console.log(fail.length === 0 ? '\nREVEAL TIMING PASSED' : '\nFAILURES:\n' + fail.join('\n'));
process.exit(fail.length ? 1 : 0);
