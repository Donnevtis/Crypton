export default function(arr: { x: number }[], coord: number): number {
  let l: number = 0
  let r: number = arr.length - 1

  const filter = (m: number) => {
    const f = arr[Math.max(m - 1, 0)].x
    const l: number = arr[m].x

    return f <= coord && l >= coord
  }

  while (l < r) {
    const m: number = Math.floor((r + l) / 2)

    if (arr[m].x >= coord) r = m
    else l = m + 1
  }

  return filter(l) ? l : -1
}
