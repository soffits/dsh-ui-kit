/**
 * Time that moves: one shared ticker per step (aligned to the clock, paused
 * while the tab is hidden), and the components that read it.
 */
import { createElement as h, useCallback, useSyncExternalStore } from 'react'
import { relativeTime, Tooltip } from '@deepseek-ai/dsh-client-ui-primitives'
import { durationParts, formatAgo, formatDuration, formatFull, formatRelativeDay, toTime, unitParts } from '../time.js'

const MINUTE = 60_000

/** step (ms) → { now, listeners, timer } */
const tickers = new Map()

function ticker(step) {
  let entry = tickers.get(step)
  if (entry === undefined) {
    entry = { now: Date.now(), listeners: new Set(), timer: null }
    tickers.set(step, entry)
  }
  return entry
}

function tick(entry) {
  entry.now = Date.now()
  for (const listener of entry.listeners) listener()
}

function start(step, entry) {
  if (entry.timer !== null || entry.listeners.size === 0) return
  if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return
  // The first tick lands on the next whole step, so every "in 3 min" on the page turns over together.
  entry.timer = setTimeout(function next() {
    tick(entry)
    entry.timer = setTimeout(next, step - (Date.now() % step))
  }, step - (Date.now() % step))
}

function stop(entry) {
  clearTimeout(entry.timer)
  entry.timer = null
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    for (const [step, entry] of tickers) {
      if (document.visibilityState === 'hidden') stop(entry)
      else { tick(entry); start(step, entry) }
    }
  })
}

/** The time now, redrawn every `step` ms (default a minute) while the page is visible. */
export function useNow(step = MINUTE) {
  const subscribe = useCallback(listener => {
    const entry = ticker(step)
    // An idle ticker's time is old; React reads the snapshot again after subscribing and redraws with this one.
    if (entry.listeners.size === 0) entry.now = Date.now()
    entry.listeners.add(listener)
    start(step, entry)
    return () => {
      entry.listeners.delete(listener)
      if (entry.listeners.size === 0) stop(entry)
    }
  }, [step])
  return useSyncExternalStore(subscribe, () => ticker(step).now)
}

/** Now, ticking each second when `target` is less than two minutes away and each minute otherwise. */
function useNowNear(target) {
  const minute = useNow(MINUTE)
  const near = Number.isFinite(target) && Math.abs(target - minute) < 2 * MINUTE
  const second = useNow(near ? 1000 : MINUTE)
  return near ? second : minute
}

export function createTime({ useWords }) {
  /**
   * How long until `to`, ticking. `big` draws large numbers with small units (1 d 19 h 11 m),
   * `inline` a short text (1d 19h). From `to` on it says "now".
   * @param {object} props
   * @param {string | number} props.to - an ISO time or epoch ms
   * @param {'big' | 'inline'} [props.size]
   * @param {number} [props.units] - how many units at most (default 3 big, 2 inline)
   */
  function Countdown({ to, size = 'big', units, className, selectable = false }) {
    const { t, locale } = useWords()
    const target = toTime(to)
    const now = useNowNear(target)
    const ms = target - now
    const cls = `uk-countdown uk-countdown-${size}${selectable ? ' uk-selectable' : ''}${className ? ` ${className}` : ''}`
    if (!Number.isFinite(target)) return null
    if (ms <= 0) return h('span', { className: cls }, t('now'))
    if (size === 'inline') return h('span', { className: cls }, formatDuration(ms, locale, units ?? 2))
    return h('span', { className: cls, role: 'timer' }, durationParts(ms, units ?? 3).map(({ n, unit }) => {
      const parts = unitParts(n, unit, locale)
      return h('span', { key: unit, className: 'uk-countdownPart' }, h('b', null, parts.number), h('small', null, parts.unit))
    }))
  }

  /** "in 1d 19h", ticking; "now" once it is due. */
  function TimeUntil({ to }) {
    const { t, locale } = useWords()
    const target = toTime(to)
    const now = useNowNear(target)
    if (!Number.isFinite(target)) return null
    const ms = target - now
    return h('span', { className: 'uk-time' }, ms <= 0 ? t('now') : t('inDuration', { duration: formatDuration(ms, locale) }))
  }

  /** "5 min ago" in DSH's own buckets, with the full date and time on hover. */
  function TimeAgo({ at }) {
    const { t, locale } = useWords()
    const now = useNow(MINUTE)
    const time = toTime(at)
    if (!Number.isFinite(time)) return null
    const text = formatAgo(relativeTime(time, now), locale) ?? t('justNow')
    return h(Tooltip, { label: formatFull(time, locale), side: 'top' }, h('time', { className: 'uk-time', dateTime: new Date(time).toISOString() }, text))
  }

  /** "today", "tomorrow", "in 3 days", or the date further out; a date-time today shows its time. The full date on hover. */
  function RelativeDay({ date }) {
    const { locale } = useWords()
    const now = useNow(MINUTE)
    const time = toTime(date)
    if (!Number.isFinite(time)) return null
    return h(Tooltip, { label: formatFull(time, locale), side: 'top' }, h('time', { className: 'uk-time', dateTime: String(date) }, formatRelativeDay(date, now, locale)))
  }

  return { Countdown, TimeUntil, TimeAgo, RelativeDay }
}
