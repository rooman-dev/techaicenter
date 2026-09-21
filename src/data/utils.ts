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
