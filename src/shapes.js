/**
 * Geometry of the small charts, and the tones they are drawn in. Pure.
 */

/** Data tones, each one meaning: ok, warn, bad, accent (informational), violet (rest, sleep, a second series), muted. */
export const TONES = Object.freeze(['ok', 'warn', 'bad', 'accent', 'violet', 'muted'])

/** States of a segment in a strip: reached, where one is now, available ahead, not yet. */
export const SEGMENT_STATES = Object.freeze(['done', 'current', 'ready', 'todo'])

/** The DSH theme colour of each tone. */
export const TONE_COLOR = Object.freeze({
  ok: 'var(--dsw-alias-state-success-primary)',
  warn: 'var(--dsw-alias-state-warn-primary)',
  bad: 'var(--dsw-alias-state-error-primary)',
  accent: 'var(--dsw-alias-state-business-primary)',
  violet: 'var(--dsw-alias-state-done-primary)',
  muted: 'var(--dsw-alias-label-tertiary)',
})

/** A tone as the matching palette of DSH's own `Tag`. */
export const TAG_TONE = Object.freeze({ ok: 'success', warn: 'warning', bad: 'danger', accent: 'info', violet: 'info', muted: 'neutral' })

export const toneColor = tone => TONE_COLOR[tone] ?? TONE_COLOR.muted
export const tagTone = tone => TAG_TONE[tone] ?? 'neutral'

/**
 * A sparkline through `values` inside `width` × `height`: the line, the area
 * under it, and the last point. Null values break the line. `min`/`max` fix
 * the scale (else the values' own range).
 */
export function sparkPath(values, width, height, { pad = 2, min, max } = {}) {
  const numbers = values.filter(v => typeof v === 'number' && Number.isFinite(v))
  if (numbers.length === 0 || width <= 0) return { line: '', area: '', last: null }
  const lo = min ?? Math.min(...numbers)
  const hi = max ?? Math.max(...numbers)
  const span = hi - lo || 1
  const step = values.length > 1 ? (width - 2 * pad) / (values.length - 1) : 0
  const x = i => (values.length > 1 ? pad + i * step : width / 2)
  const y = v => pad + (height - 2 * pad) * (1 - (Math.min(hi, Math.max(lo, v)) - lo) / span)
  // Runs of consecutive numbers; a gap in the data is a gap in the line.
  const runs = [[]]
  values.forEach((v, i) => {
    if (typeof v === 'number' && Number.isFinite(v)) runs[runs.length - 1].push([x(i), y(v)])
    else if (runs[runs.length - 1].length > 0) runs.push([])
  })
  if (runs[runs.length - 1].length === 0) runs.pop()
  const trace = points => points.map(([px, py], i) => `${i ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)}`).join('')
  const line = runs.map(trace).join('')
  const area = runs.map(points => `${trace(points)}L${points[points.length - 1][0].toFixed(1)} ${height}L${points[0][0].toFixed(1)} ${height}Z`).join('')
  const lastRun = runs[runs.length - 1]
  return { line, area, last: lastRun[lastRun.length - 1] }
}

/** Share of `max` in [0, 1]; 0 when there is nothing to measure against. */
export function share(value, max) {
  return max > 0 && Number.isFinite(value) ? Math.min(1, Math.max(0, value / max)) : 0
}
