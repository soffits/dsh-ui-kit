/**
 * Chat pieces: a message bubble, the dividers between runs of messages, text
 * with its @mentions marked, and one row of a conversation list. Layout only
 * inside their own box; the page decides the column they sit in.
 */
import { createElement as h, Fragment } from 'react'
import { Tooltip } from '@deepseek-ai/dsh-client-ui-primitives'
import { splitMentions } from '../chat.js'
import { formatFull, toTime } from '../time.js'

const join = (...names) => names.filter(Boolean).join(' ')

export function createChat({ useWords, useNow }) {
  /** Text with each `@name` marked; names in `me` (lower case) are marked as the reader's own. */
  function MentionText({ text, me }) {
    const mine = new Set((me ?? []).map(name => String(name).toLowerCase()))
    return h(Fragment, null, splitMentions(text).map((part, i) => (part.mention
      ? h('span', { key: i, className: mine.has(part.mention.toLowerCase()) ? 'uk-mention uk-mentionMe' : 'uk-mention' }, part.text)
      : part.text)))
  }

  /** The time beside a bubble: the clock time today, the date before, the full date on hover. */
  function BubbleTime({ at }) {
    const { locale } = useWords()
    const now = useNow(60000)
    const time = toTime(at)
    if (!Number.isFinite(time)) return null
    const today = new Date(time).toDateString() === new Date(now).toDateString()
    const text = new Intl.DateTimeFormat(locale, today ? { hour: '2-digit', minute: '2-digit' } : { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(time)
    return h(Tooltip, { label: formatFull(time, locale), side: 'top' },
      h('time', { className: 'uk-msgTime', dateTime: new Date(time).toISOString() }, text))
  }

  /**
   * One message. `side` is 'start' (others) or 'end' (the reader's own); `highlight` marks one
   * that mentions the reader; `folded` draws a quiet one-line dashed row (something that is over).
   * `author` and `quote` are nodes or text; `footer` sits under the body (buttons, history).
   */
  function ChatBubble({ side = 'start', author, quote, time, highlight, folded, footer, id, className, children }) {
    return h('div', {
      id,
      className: join('uk-msg', className),
      'data-side': side === 'end' ? 'end' : 'start',
      'data-highlight': highlight ? 'true' : undefined,
      'data-folded': folded ? 'true' : undefined,
    },
    h('div', { className: 'uk-msgBubble' },
      author && h('div', { className: 'uk-msgAuthor' }, author),
      quote && h('div', { className: 'uk-msgQuote' }, quote),
      h('div', { className: 'uk-msgBody' }, children),
      footer && h('div', { className: 'uk-msgFooter' }, footer)),
    time && h(BubbleTime, { at: time }))
  }

  /** A line between runs of messages: a day ('muted', a small pill) or where unread starts ('accent', a rule). */
  function ChatDivider({ tone = 'muted', id, children }) {
    return h('div', { id, className: 'uk-chatDivider', 'data-tone': tone === 'accent' ? 'accent' : 'muted', role: 'separator' }, h('span', null, children))
  }

  /** The day a message belongs to, in words: today, yesterday, or the date. */
  function DayLabel({ at }) {
    const { locale } = useWords()
    const now = useNow(60000)
    const time = toTime(at)
    if (!Number.isFinite(time)) return null
    const day = d => new Date(new Date(d).getFullYear(), new Date(d).getMonth(), new Date(d).getDate()).getTime()
    const diff = Math.round((day(now) - day(time)) / 86400000)
    if (diff >= 0 && diff <= 1) return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-diff, 'day')
    return new Intl.DateTimeFormat(locale, { weekday: 'short', month: 'short', day: 'numeric' }).format(time)
  }

  /**
   * One conversation in a list. `icon` is a node (a Tile), `dot` a StateDot state shown after the
   * title, `unread` a count; `quiet` greys the count, `mention` adds an @ mark (someone asked the
   * reader). The row is a button: `onClick`, `active` for the open one.
   */
  function ConversationRow({ icon, title, dot, preview, time, unread, quiet, mention, active, onClick, id }) {
    const { t } = useWords()
    const count = unread > 99 ? '99+' : unread > 0 ? String(unread) : ''
    return h('button', {
      type: 'button',
      id,
      className: 'uk-convo',
      'aria-current': active ? 'true' : undefined,
      'data-unread': unread > 0 ? 'true' : undefined,
      onClick,
    },
    icon && h('span', { className: 'uk-convoIcon' }, icon),
    h('span', { className: 'uk-convoMain' },
      h('span', { className: 'uk-convoTop' },
        h('span', { className: 'uk-convoTitle' }, title),
        dot,
        time && h('span', { className: 'uk-convoTime' }, time)),
      h('span', { className: 'uk-convoBottom' },
        h('span', { className: 'uk-convoPreview' }, preview),
        mention && h('span', { className: 'uk-convoMention', role: 'img', 'aria-label': t('mentioned') }, '@'),
        count && h('span', { className: 'uk-convoCount', 'data-quiet': quiet ? 'true' : undefined, 'aria-label': t('unreadCount', { n: unread }) }, count))))
  }

  return { MentionText, ChatBubble, ChatDivider, DayLabel, ConversationRow }
}
