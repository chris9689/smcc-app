/** Tiny classnames helper — filters falsy values and joins with spaces. */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}

/** Format an illustrative currency amount (¥, no decimals). */
export function formatYen(value: number): string {
  return `¥${value.toLocaleString('en-US')}`;
}
