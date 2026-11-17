/**
 * The message box: a text area that grows with its text, a send button, an @ picker over the
 * people and sessions a message can reach, an optional "replying to" quote and a line saying who
 * will get the message. The mention chips and token tracking follow baixianger/dsh-chat (MIT); the
 * picker opens on a typed `@` as in Slack and Zulip, and from the @ button on touch screens.
 *
 * Enter sends on a keyboard device (Shift+Enter is a new line); on a touch screen Enter is a new
 * line and the button sends. Nothing is sent while an input method is composing (CJK).
 */
import { createElement as h, useEffect, useId, useRef, useState } from 'react'
import { Button, StateDot, IconSendOutlineRegular, IconCloseOutlineRegular } from '@deepseek-ai/dsh-client-ui-primitives'
import { insertMention, mentionAt, rankCandidates } from '../chat.js'

const coarse = () => typeof window !== 'undefined' && window.matchMedia?.('(pointer:coarse)').matches === true
const MAX_ROWS_PX = 168

export function createComposer({ useWords }) {
  /**
   * @param {object} props
   * @param {string} props.value
   * @param {(value: string) => void} props.onChange
   * @param {() => void} props.onSend
   * @param {Array<{ token: string, label?: string, detail?: string, state?: string, aliases?: string[] }>} [props.candidates]
   * @param {import('react').ReactNode} [props.recipients] - who will get it, shown above the box
   * @param {import('react').ReactNode} [props.quote] - what it answers; `onClearQuote` drops it
   */
  function Composer({ value, onChange, onSend, candidates, recipients, quote, onClearQuote, placeholder, label, sending, disabled, error }) {
    const { t } = useWords()
    const box = useRef(null)
    const listId = useId()
    const [spot, setSpot] = useState(null)
    const [active, setActive] = useState(0)
    const matches = spot === null ? [] : rankCandidates(candidates, spot.query)
    const open = spot !== null && (candidates?.length ?? 0) > 0

    useEffect(() => {
      const el = box.current
      if (el === null) return
      el.style.height = 'auto'
      el.style.height = `${Math.min(el.scrollHeight, MAX_ROWS_PX)}px`
    }, [value])
    useEffect(() => { setActive(0) }, [spot?.query])

    const look = (text, caret) => setSpot(mentionAt(text, caret))
    const pick = candidate => {
      if (spot === null) return
      const next = insertMention(value, spot, candidate.token)
      onChange(next.text)
      setSpot(null)
      requestAnimationFrame(() => {
        box.current?.focus()
        box.current?.setSelectionRange(next.caret, next.caret)
      })
    }
    const openPicker = () => {
      const el = box.current
      const caret = el?.selectionStart ?? value.length
      const before = value.slice(0, caret)
      const glue = before === '' || /\s$/.test(before) ? '' : ' '
      const text = `${before}${glue}@${value.slice(caret)}`
      const at = caret + glue.length + 1
      onChange(text)
      setSpot({ start: at - 1, query: '' })
      requestAnimationFrame(() => {
        el?.focus()
        el?.setSelectionRange(at, at)
      })
    }
    const send = () => {
      if (sending || disabled || value.trim() === '') return
      setSpot(null)
      onSend()
    }
    const onKeyDown = event => {
      if (event.nativeEvent.isComposing || event.keyCode === 229) return
      if (open && matches.length > 0) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault()
          setActive(i => (i + (event.key === 'ArrowDown' ? 1 : matches.length - 1)) % matches.length)
          return
        }
        if (event.key === 'Enter' || event.key === 'Tab') {
          event.preventDefault()
          pick(matches[active] ?? matches[0])
          return
        }
      }
      if (open && event.key === 'Escape') {
        event.preventDefault()
        setSpot(null)
        return
      }
      if (event.key === 'Enter' && !event.shiftKey && !coarse()) {
        event.preventDefault()
        send()
      }
    }

    return h('div', { className: 'uk-composer', 'data-disabled': disabled ? 'true' : undefined },
      open && h('div', { className: 'uk-picker', id: listId, role: 'listbox', 'aria-label': t('mentionPick') },
        matches.length === 0
          ? h('div', { className: 'uk-pickerEmpty' }, t('noMatch'))
          : matches.map((candidate, i) => h('button', {
            key: candidate.token,
            type: 'button',
            role: 'option',
            id: `${listId}-${i}`,
            className: 'uk-pickerItem',
            'aria-selected': i === active,
            onPointerDown: event => event.preventDefault(),
            onMouseEnter: () => setActive(i),
            onClick: () => pick(candidate),
          },
          candidate.state && h(StateDot, { state: candidate.state }),
          h('span', { className: 'uk-pickerName' }, candidate.label ?? candidate.token),
          candidate.label && candidate.label !== candidate.token && h('span', { className: 'uk-pickerToken' }, `@${candidate.token}`),
          candidate.detail && h('span', { className: 'uk-pickerDetail' }, candidate.detail)))),
      quote && h('div', { className: 'uk-composerQuote' },
        h('span', null, quote),
        onClearQuote && h(Button, { variant: 'ghost', size: 'sm', 'aria-label': t('cancel'), onClick: onClearQuote }, h(IconCloseOutlineRegular, { size: 14 }))),
      recipients && h('div', { className: 'uk-composerTo' }, recipients),
      error && h('div', { className: 'uk-composerError', role: 'alert' }, error),
      h('div', { className: 'uk-composerRow' },
        (candidates?.length ?? 0) > 0 && h(Button, {
          variant: 'ghost', size: 'sm', className: 'uk-composerAt', 'aria-label': t('mentionPick'), disabled, onClick: openPicker,
        }, '@'),
        h('textarea', {
          ref: box,
          className: 'uk-composerInput',
          rows: 1,
          value,
          placeholder,
          'aria-label': label ?? placeholder,
          disabled,
          role: 'combobox',
          'aria-expanded': open,
          'aria-controls': open ? listId : undefined,
          'aria-activedescendant': open && matches.length > 0 ? `${listId}-${active}` : undefined,
          'aria-autocomplete': 'list',
          onChange: event => { onChange(event.target.value); look(event.target.value, event.target.selectionStart) },
          onSelect: event => look(event.target.value, event.target.selectionStart),
          onBlur: () => setTimeout(() => setSpot(null), 120),
          onKeyDown,
        }),
        h(Button, { variant: 'primary', size: 'sm', className: 'uk-composerSend', disabled: disabled || sending || value.trim() === '', onClick: send, 'aria-label': t('send') },
          h(IconSendOutlineRegular, { size: 16 }), h('span', { className: 'uk-composerSendText' }, t('send')))))
  }

  return { Composer }
}
