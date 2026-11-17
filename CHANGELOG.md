# Changelog

## 0.4.1

The mention picker no longer closes as soon as the @ button opens it while the text box has focus: the box closed the picker on blur after a short delay, and the button's tap was that blur. Now the button keeps focus in the box (and a phone's keyboard up), and the picker closes only when focus leaves the composer. It stays an ARIA combobox list anchored to the text box rather than DSH's `Menu`, because a menu takes focus from the box and typing would stop.

## 0.4.0

- The pieces are no longer selectable by default (tiles, icons, chips, countdowns, times, rings, sparklines, progress, segments, the live line, change marks, Suggested, history times), and icons and backdrops don't drag, so a select-all copies only a page's content. `selectable` on `Chip` and `Countdown`, or the `uk-selectable` class on any element, opts back in.

## 0.3.0

Chat pieces: `ChatBubble` (the reader's own messages in DSH's user-bubble colour, a highlight for a mention of the reader, a folded one-line row for what is over), `ChatDivider` and `DayLabel`, `MentionText`, `ConversationRow` (unread count, quiet count, a red @ for a mention), and `Composer`, a message box that grows, sends with Enter on a keyboard and the button on touch, never mid-composition, with an @ picker (typed `@` or the @ button; arrows, Enter, Tab, Escape) and a "to" line. `splitMentions` and `mentionsIn` find mentions in any script, after CJK text too, and skip addresses, package scopes, code and links. Their chrome isn't selectable; message text is. Icons `hash`, `square-kanban`, `play` and `circle`. Words in English, French and Chinese.

## 0.2.0

`Surface`, a card in DSH's colours that can lay a blurred picture behind its content; `Segments`, a strip of steps or episodes (done, current, ready, todo); and `TOUCH`, an opt-in class that makes a plugin's own controls 40 px tall on touch screens. Two more icons, `bell-plus` and `circle-pause`.

## 0.1.1

The Suggested slot drew DSH's sparkle icon under a name DSH doesn't export, so it failed as soon as it had steps to show. A test now checks every name the kit takes from DSH's components against the oldest DSH it supports.

## 0.1.0

First release: `ctx.uiKit` with data icons (Lucide 1.74.0) and tinted tiles, chips, ticking countdowns and relative times, rings, sparklines and progress bars, an SSE client with a live status line, the "just changed" wash and "new since you looked" dot, a history stack, and the slot for suggested next steps. Words in English, French and Chinese.
