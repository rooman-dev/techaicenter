/* Mobile checks at 390: nav sheet opacity/coverage, stacking, caret fade. */
import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:4321';
const fail = [];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
await page.goto(BASE, { waitUntil: 'networkidle' });

// --- 9. caret gone once typing finishes ---
await page.waitForTimeout(6500);
const caret = await page.$eval('.type--two .type__caret', (el) => parseFloat(getComputedStyle(el).opacity));
console.log('caret opacity after typing:', caret);
if (caret > 0.05) fail.push(`caret still visible (opacity ${caret})`);

// --- 8. open the menu ---
await page.click('[data-nav-toggle]');
await page.waitForTimeout(600);

const menu = await page.evaluate(() => {
  const panel = document.querySelector('[data-nav-panel]');
  const nav = document.querySelector('[data-nav]');
  const cs = getComputedStyle(panel);
  const r = panel.getBoundingClientRect();
  const headerCta = document.querySelector('.site-nav__cta');
  const links = Array.from(panel.querySelectorAll('.panel__link'));
  return {
    position: cs.position,
    bg: cs.backgroundColor,
    covers: Math.round(r.left) === 0 && Math.round(r.right) === window.innerWidth && r.bottom >= window.innerHeight - 1,
    top: Math.round(r.top),
    navBottom: Math.round(nav.getBoundingClientRect().bottom),
    zIndex: cs.zIndex,
    htmlOverflow: getComputedStyle(document.documentElement).overflow,
    headerCtaShown: getComputedStyle(headerCta).display !== 'none',
    panelCtas: panel.querySelectorAll('.panel__cta').length,
    linkSize: links.map((l) => `${Math.round(l.getBoundingClientRect().height)}/${getComputedStyle(l).fontSize}`),
  };
});
console.log('panel:', JSON.stringify(menu));

const alpha = parseFloat((menu.bg.match(/[\d.]+\)$/) ?? ['1)'])[0]) || 1;
if (menu.position !== 'fixed') fail.push('panel not fixed');
if (alpha < 0.98) fail.push(`panel background alpha ${alpha} < 0.98`);
if (!menu.covers) fail.push('panel does not cover the viewport');
if (menu.top !== menu.navBottom) fail.push(`panel top ${menu.top} != header bottom ${menu.navBottom}`);
if (menu.htmlOverflow !== 'hidden') fail.push('body scroll not locked');
if (menu.headerCtaShown) fail.push('two Enquire buttons visible');
if (menu.panelCtas !== 1) fail.push('panel CTA missing');
if (menu.linkSize.some((s) => parseInt(s) < 56 || !s.endsWith('20px'))) fail.push(`link rows ${menu.linkSize.join(',')}`);

// nothing from the page reads through the sheet: sample the sheet's own
// pixels where bright hero type sits behind it and require a flat dark field
const shot = await page.screenshot({ clip: { x: 0, y: 200, width: 390, height: 260 } });
const px = shot.toString('base64').length;
const spread = await page.evaluate(() => {
  const panel = document.querySelector('[data-nav-panel]');
  const cs = getComputedStyle(panel);
  const m = cs.backgroundColor.match(/[\d.]+/g) ?? [];
  return m.length === 4 ? parseFloat(m[3]) : 1;
});
console.log('panel background alpha:', spread, '(1 = nothing shows through)');
if (spread < 1) fail.push(`panel background alpha ${spread}: page text can read through`);

const bleed = await page.evaluate(() => {
  const panel = document.querySelector('[data-nav-panel]');
  const out = [];
  document.querySelectorAll('main *').forEach((el) => {
    const t = (el.textContent ?? '').trim();
    if (!t || el.children.length) return;
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight || r.width === 0) return;
    const mid = document.elementFromPoint(Math.min(r.left + r.width / 2, window.innerWidth - 1), Math.min(Math.max(r.top + r.height / 2, 1), window.innerHeight - 1));
    if (mid && !panel.contains(mid) && mid !== panel) out.push(t.slice(0, 24));
  });
  return out.slice(0, 5);
});
console.log('page text reachable through the sheet:', bleed.length ? bleed : 'none');
if (bleed.length) fail.push(`page text visible through panel: ${bleed.join(' | ')}`);

await page.screenshot({ path: 'scripts/shot-390-menu.png' });

// --- Esc closes ---
await page.keyboard.press('Escape');
await page.waitForTimeout(500);
const closed = await page.evaluate(() => ({
  open: document.querySelector('[data-nav]').dataset.open,
  overflow: getComputedStyle(document.documentElement).overflow,
}));
console.log('after Esc:', JSON.stringify(closed));
if (closed.open !== 'false' || closed.overflow === 'hidden') fail.push('Esc did not close / unlock');

// --- backdrop closes ---
await page.click('[data-nav-toggle]');
await page.waitForTimeout(400);
await page.mouse.click(195, 700);
await page.waitForTimeout(400);
const afterBackdrop = await page.$eval('[data-nav]', (n) => n.dataset.open);
console.log('after backdrop tap:', afterBackdrop);
if (afterBackdrop !== 'false') fail.push('backdrop tap did not close');

// --- 10. layout stacking ---
const layout = await page.evaluate(() => {
  const pair = (sel) => {
    const label = document.querySelector(`${sel} [class$="__label"]`);
    const h2 = document.querySelector(`${sel} h2`);
    if (!label || !h2) return null;
    const l = label.getBoundingClientRect();
    const h = h2.getBoundingClientRect();
    return { stacked: l.bottom <= h.top + 1, labelLeft: Math.round(l.left), headingLeft: Math.round(h.left) };
  };
  const steps = Array.from(document.querySelectorAll('.step')).map((s) => Math.round(s.getBoundingClientRect().width));
  const cells = Array.from(document.querySelectorAll('.cell')).map((c) => Math.round(c.getBoundingClientRect().top));
  const cell = document.querySelector('.cell');
  const img = cell?.querySelector('.cell__img');
  const body = cell?.querySelector('.cell__body');
  return {
    sections: ['#format', '#audience', '#work', '#process', '#faq', '#contact'].map((s) => ({ s, ...pair(s) })),
    stepWidths: [...new Set(steps)],
    contentWidth: Math.round(document.querySelector('.process__content').getBoundingClientRect().width),
    cellsStacked: cells.every((t, i) => i === 0 || t > cells[i - 1]),
    captionBelow: img && body ? body.getBoundingClientRect().top >= img.getBoundingClientRect().bottom - 1 : null,
  };
});
layout.sections.forEach((s) => console.log(`${s.s}: label above heading = ${s.stacked} (label ${s.labelLeft}, heading ${s.headingLeft})`));
console.log('process card widths:', layout.stepWidths, 'content width', layout.contentWidth);
console.log('work cells stacked in one column:', layout.cellsStacked, '| caption below image:', layout.captionBelow);

if (layout.sections.some((s) => !s.stacked)) fail.push('a section label is not above its heading');
if (layout.stepWidths.length !== 1 || layout.stepWidths[0] < layout.contentWidth - 2) fail.push(`process cards not full width: ${layout.stepWidths}`);
if (!layout.cellsStacked) fail.push('work thumbs not single column');
if (layout.captionBelow === false) fail.push('cell caption not below image');

await page.screenshot({ path: 'scripts/shot-390.png', fullPage: true });
await browser.close();

console.log(fail.length === 0 ? '\nMOBILE CHECKS PASSED' : '\nFAILURES:\n' + fail.join('\n'));
process.exit(fail.length ? 1 : 0);
