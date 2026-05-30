export function nextInterval(known: boolean, ease: number): number {
  if (!known) return 1
  return Math.round(ease * (ease + 1))
}