/**
 * Data glyphs: a Lucide icon by name, the same icon on a tinted tile, and a
 * chip (DSH's own static Pill) carrying an icon and, optionally, a ticking
 * "in 1d 19h". An icon name the kit doesn't have draws nothing.
 */
import { createElement as h } from 'react'
import { Pill } from '@deepseek-ai/dsh-client-ui-primitives'
import icons from 'virtual:icons'
import { toneColor } from '../shapes.js'

export const ICON_NAMES = Object.freeze(Object.keys(icons))

/**
 * @param {object} props
 * @param {string} props.name - a Lucide icon name, like `plane-takeoff`
 * @param {number} [props.size] - in px (default 16)
 * @param {string} [props.tone] - colour it with a data tone; else it takes the text colour
 * @param {string} [props.className]
 */
export function Icon({ name, size = 16, tone, className }) {
  const nodes = icons[name]
  if (nodes === undefined) return null
  return h('svg', {
    className: className ? `uk-icon ${className}` : 'uk-icon',
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2,
    strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: 'false',
    style: tone ? { color: toneColor(tone) } : undefined,
  }, nodes.map(([tag, attrs], i) => h(tag, { key: i, ...attrs })))
}

/**
 * An icon on a tile tinted with its tone. Without a known icon it is an empty
 * tinted square of the same size, so rows keep their alignment.
 * @param {object} props
 * @param {string} [props.icon]
 * @param {string} [props.tone] - ok, warn, bad, accent, violet or muted (default)
 * @param {number} [props.size] - the tile's edge in px (default 30)
 */
export function Tile({ icon, tone = 'muted', size = 30, className }) {
  return h('span', {
    className: className ? `uk-tile ${className}` : 'uk-tile',
    style: { '--uk-size': `${size}px`, color: toneColor(tone) },
    'aria-hidden': true,
  }, icon && h(Icon, { name: icon, size: Math.round(size * 0.53) }))
}

export function createChip({ TimeUntil }) {
  /**
   * A small fact with an icon, in DSH's static Pill.
   * @param {object} props
   * @param {string} [props.icon]
   * @param {string} [props.tone] - colours the icon only
   * @param {string} [props.to] - an ISO time: a ticking "in …" follows the text
   * @param {*} props.children - the text
   */
  return function Chip({ icon, tone = 'muted', to, className, selectable = false, children }) {
    return h(Pill, { className: ['uk-chip', selectable && 'uk-selectable', className].filter(Boolean).join(' ') },
      icon && h(Icon, { name: icon, size: 14, tone }),
      h('span', { className: 'uk-chipText' }, children, to && ' ', to && h(TimeUntil, { to })))
  }
}
