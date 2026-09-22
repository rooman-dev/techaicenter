/* Browser check for the heading reveal + outline hover.
   Run against `npm run preview`: node scripts/verify-headings.mjs */

import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:4321';
const HEADINGS = ['#format', '#audience', '#work', '#process', '#faq', '#contact'];

const fail = [];

const browser = await chromium.launch();

// --- desktop: reveal + hover ---
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE, { waitUntil: 'networkidle' });

const heroState = await page.$eval('h1.oh', (el) => ({
  color: getComputedStyle(el).color,
  visible: el.getBoundingClientRect().height > 0,
}));
console.log('hero h1:', JSON.stringify(heroState));
if (!heroState.visible) fail.push('hero h1 not visible');

for (const id of HEADINGS) {
  // The page sets scroll-behavior: smooth, so a fixed wait races the scroll.
  // Jump instantly, then wait for the reveal to actually finish.
  await page.evaluate((sel) => {
    document.querySelector(sel)?.scrollIntoView({ behavior: 'instant', block: 'center' });
  }, `${id} h2.oh`);
  await page
    .waitForFunction(
      (sel) => {
        const tw = document.querySelector(`${sel} .tw`);
        return !tw || getComputedStyle(tw).clipPath === 'inset(0px 0% 0px 0px)';
      },
      `${id} h2.oh`,
      { timeout: 5000 }
    )
    .catch(() => {});

  const state = await page.$eval(`${id} h2.oh`, (h2) => {
    const tw = h2.querySelector('.tw');
    const cs = getComputedStyle(tw ?? h2);
    return {
      text: h2.innerText.replace(/\s+/g, ' ').trim().slice(0, 28),
      clip: cs.clipPath,
      color: getComputedStyle(h2).color,
      height: h2.getBoundingClientRect().height,
      typed: tw ? tw.classList.contains('is-typed') : null,
    };
  });

  // Revealed means the right-hand inset has reached zero, in px or %.
  const right = state.clip === 'none' ? 0 : parseFloat((state.clip.match(/inset\([^)]*\)/)?.[0] ?? '').split(/\s+/)[1] ?? '0');
  const revealed = state.clip === 'none' || right === 0;
  const ok = revealed && state.height > 0 && state.color !== 'rgba(0, 0, 0, 0)';
  console.log(`${id}: ${ok ? 'VISIBLE' : 'HIDDEN'} typed=${state.typed} clip=${state.clip} "${state.text}"`);
  if (!ok) fail.push(`${id} heading not visible (clip=${state.clip})`);
}

// --- hover: hero h1 and one section h2 ---
for (const sel of ['h1.oh', '#work h2.oh']) {
  await page.locator(sel).scrollIntoViewIfNeeded();
  await page.hover(sel);
  await page.waitForTimeout(600);

  const hovered = await page.$eval(sel, (el) => {
    const cs = getComputedStyle(el);
    return { color: cs.color, stroke: cs.webkitTextStrokeWidth, strokeColor: cs.webkitTextStrokeColor };
  });
  const ok = hovered.color === 'rgba(0, 0, 0, 0)' && parseFloat(hovered.stroke) === 1.5;
  console.log(`hover ${sel}: ${ok ? 'OK' : 'FAIL'} color=${hovered.color} stroke=${hovered.stroke} ${hovered.strokeColor}`);
  if (!ok) fail.push(`hover ${sel}: color=${hovered.color} stroke=${hovered.stroke}`);

  await page.mouse.move(0, 0);
  await page.waitForTimeout(400);
}

// coloured run stays solid while its heading is hovered
await page.locator('#contact h2.oh').scrollIntoViewIfNeeded();
await page.hover('#contact h2.oh');
await page.waitForTimeout(600);
const hl = await page.$eval('#contact h2.oh .hl', (el) => {
  const cs = getComputedStyle(el);
  return { color: cs.color, strokeColor: cs.webkitTextStrokeColor };
});
console.log('hl run while hovered:', JSON.stringify(hl));
if (hl.color === 'rgba(0, 0, 0, 0)') fail.push('hl run went transparent');
await page.mouse.move(0, 0);

await page.screenshot({ path: 'scripts/shot-1440.png', fullPage: true });
await page.close();

// --- mobile ---
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(BASE, { waitUntil: 'networkidle' });
for (const id of HEADINGS) {
  await mobile.locator(`${id} h2.oh`).scrollIntoViewIfNeeded();
  await mobile.waitForTimeout(700);
}
const mobileHidden = await mobile.$$eval('h2.oh', (els) =>
  els.filter((el) => el.getBoundingClientRect().height === 0).length
);
console.log('mobile headings with zero height:', mobileHidden);
if (mobileHidden > 0) fail.push(`${mobileHidden} headings collapsed at 390px`);
await mobile.screenshot({ path: 'scripts/shot-390.png', fullPage: true });
await mobile.close();

await browser.close();

console.log(fail.length === 0 ? '\nALL CHECKS PASSED' : '\nFAILURES:\n' + fail.join('\n'));
process.exit(fail.length === 0 ? 0 : 1);
