/* Placeholder guard.

   Unfilled copy is written as [UPPERCASE IN BRACKETS] (see the header of
   ./site.ts). Anything still in that form must not reach the page: a visible
   "[VIEWS]" beside a real brand name reads as an unmeasured campaign.

   Components call isFilled() and skip the individual element — a stat, a row,
   a clause — never the whole section, so layouts collapse without gaps. */

const PLACEHOLDER = /\[[A-Z][^\]]*\]/;

/** False when the value is empty or still contains a [PLACEHOLDER]. */
export function isFilled(value: string | null | undefined): boolean {
  if (!value) return false;
  return !PLACEHOLDER.test(value);
}

/* Inline style for a .tw typewriter heading.

   Duration scales with the line but is clamped to 300-600ms: a long heading
   should not take twice as long to read in as a short one, and anything past
   ~600ms reads as the page being slow rather than as an effect. */
export function twStyle(text: string): string {
  const steps = Math.max(text.trim().length, 1);
  const ms = Math.min(600, Math.max(300, 260 + steps * 9));
  return `animation-duration:${ms}ms; animation-timing-function: steps(${steps}, end);`;
}
