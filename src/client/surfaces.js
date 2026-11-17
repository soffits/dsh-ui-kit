/**
 * A card surface (optionally over a blurred picture), a strip of segments
 * for steps or episodes, and the class that gives a plugin's own controls a
 * phone-sized touch target.
 */
import { createElement as h } from 'react'
import { SEGMENT_STATES } from '../shapes.js'

/** Add to a plugin's own buttons and pills: at least 40 px tall where the pointer is a finger. */
export const TOUCH = 'uk-touch'

/**
 * A card in DSH's colours. With `backdrop` (an image URL) the picture lies
 * blurred behind the content under a veil of the page's own background, so
 * text stays readable in light and dark.
 * @param {object} props
 * @param {string} [props.backdrop]
 * @param {string} [props.as] - the element (default `div`): `section`, `li`, `article`…
 * @param {string} [props.className]
 */
export function Surface({ backdrop, as = 'div', className, children, ...rest }) {
  const classes = ['uk-surface', backdrop ? 'uk-surfaceBackdropped' : '', className ?? ''].filter(Boolean).join(' ')
  return h(as, { ...rest, className: classes },
    backdrop && h('span', { className: 'uk-surfaceBackdrop', 'aria-hidden': true, style: { backgroundImage: `url(${JSON.stringify(backdrop)})` } }),
    children)
}

/**
 * A row of segments, one per step or episode, each in a state: `done`,
 * `current`, `ready` (available, not reached yet) or `todo`. It fills its
 * box; `end` sits after it (a count, a note).
 * @param {object} props
 * @param {Array<string | { state: string, title?: string }>} props.items
 * @param {*} [props.end]
 * @param {string} [props.label] - what it shows, for screen readers
 */
export function Segments({ items, end, label }) {
  const strip = h('span', { className: 'uk-segments', role: label ? 'img' : undefined, 'aria-label': label },
    (items ?? []).map((item, i) => {
      const { state, title } = typeof item === 'string' ? { state: item } : item
      return h('span', { key: i, className: 'uk-segment', 'data-state': SEGMENT_STATES.includes(state) ? state : 'todo', title })
    }))
  if (end === undefined) return strip
  return h('span', { className: 'uk-segmentsLabelled' }, strip, h('span', { className: 'uk-segmentsEnd' }, end))
}
