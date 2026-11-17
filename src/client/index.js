/**
 * The Web client: provides `ctx.uiKit`, small pieces other plugins' pages put
 * inside DSH's own components (`@deepseek-ai/dsh-client-ui-primitives`).
 *
 *   Icon, Tile, Chip                          data glyphs (Lucide names), the tinted tile, a fact chip
 *   useNow, Countdown, TimeUntil, TimeAgo,    time that moves on its own
 *   RelativeDay
 *   Ring, Spark, Progress                     small measures
 *   useEventStream, LiveStatus                live updates and the header line that says so
 *   useWash, Wash, JustNow, NewDot            change cues
 *   History                                   earlier entries of one thing
 *   Suggested                                 suggested next steps, drawn by @soffits/dsh-ui-actions
 *   Surface, Segments, TOUCH                  a card (over a blurred picture), a strip of steps, phone-sized targets
 *   ChatBubble, ChatDivider, DayLabel,        chat: a message, the lines between runs, text with @mentions,
 *   MentionText, ConversationRow, Composer    a conversation in a list, the message box with its @ picker
 *   TONES, toneColor, tagTone, ICON_NAMES     the vocabulary
 *   formatDuration, formatRelativeDay         the same words as plain text, for titles and quotes
 */
import locales from 'virtual:locales'
import { formatDuration, formatRelativeDay } from '../time.js'
import { TONES, tagTone, toneColor } from '../shapes.js'
import { createChange, useWash, Wash } from './change.js'
import { createChip, ICON_NAMES, Icon, Tile } from './glyphs.js'
import { createHistory } from './history.js'
import { createLive, useEventStream } from './live.js'
import { CSS, STYLE_ID } from './look.js'
import { createProgress, Ring, Spark } from './measures.js'
import { createActionsStore, createSuggested } from './suggested.js'
import { Segments, Surface, TOUCH } from './surfaces.js'
import { createChat } from './chat.js'
import { createComposer } from './composer.js'
import { mentionsIn, splitMentions } from '../chat.js'
import { createTime, useNow } from './time.js'
import { createWords, NS } from './words.js'

export const name = 'ui-kit'
export const inject = ['locale']

export function apply(ctx) {
  ctx.effect(() => {
    const disposers = []
    for (const [tag, file] of Object.entries(locales)) {
      try {
        disposers.push(ctx.locale.register(NS, tag, file.ui))
      } catch (error) {
        // a language this DSH doesn't know yet; its file waits for a DSH that does
        console.warn(`dsh-ui-kit: no ${tag} words`, error)
      }
    }
    return () => { for (const dispose of disposers) dispose() }
  }, 'ui-kit: words')

  if (typeof document !== 'undefined') {
    ctx.effect(() => {
      const style = document.createElement('style')
      style.id = STYLE_ID
      style.dataset.plugin = '@soffits/dsh-ui-kit'
      style.textContent = CSS
      document.head.appendChild(style)
      return () => style.remove()
    }, 'ui-kit: styles')
  }

  const actionsStore = createActionsStore()
  ctx.inject(['uiActions'], scope => {
    scope.effect(() => {
      actionsStore.set(scope.uiActions)
      return () => actionsStore.set(null)
    }, 'ui-kit: suggested steps')
  })

  const { useWords } = createWords(ctx)
  const time = createTime({ useWords })
  const live = createLive({ useWords })
  const change = createChange({ useWords })
  ctx.provide('uiKit', Object.freeze({
    Icon,
    Tile,
    Chip: createChip({ TimeUntil: time.TimeUntil }),
    useNow,
    ...time,
    Ring,
    Spark,
    ...createProgress({ useNow }),
    useEventStream,
    ...live,
    useWash,
    Wash,
    ...change,
    ...createHistory({ useWords, useNow }),
    ...createSuggested({ useWords, actionsStore }),
    ...createChat({ useWords, useNow }),
    ...createComposer({ useWords }),
    splitMentions,
    mentionsIn,
    Surface,
    Segments,
    TOUCH,
    TONES,
    toneColor,
    tagTone,
    ICON_NAMES,
    formatDuration,
    formatRelativeDay,
  }))
}
