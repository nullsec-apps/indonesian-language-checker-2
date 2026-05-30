export function fmtXp(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  return String(n)
}
export function fmtPct(n: number): string { return Math.round(n * 100) + '%' }
export function fmtTime(min: number): string {
  const h = Math.floor(min / 60)
  return h > 0 ? `${h}h ${min % 60}m` : `${min}m`
}