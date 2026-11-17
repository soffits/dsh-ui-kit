/**
 * Pure helpers behind the chat pieces: finding @mentions in text and the
 * partial mention being typed at the caret. Letters and digits of any script
 * count, so `@小明` and `@build-bot` are both names, and a mention may follow
 * CJK text without a space ("问一下@小明"); only a Latin letter, digit, `.`, `_`
 * or `@` right before the `@` makes it part of something else (an address).
 * A package scope (`@scope/name`), code in backticks and links name nobody.
 */

/** A mention: `@` not glued to a word or another `@`, then a name that starts and ends with a letter or digit. */
export const MENTION = /(?<![A-Za-z0-9_.@])@([\p{L}\p{N}](?:[\p{L}\p{N}._-]*[\p{L}\p{N}])?)(?![\p{L}\p{N}_/])/gu
/** Quoted text where an @ is not a mention: code spans and blocks, and links. */
export const NOT_SPOKEN = /```[\s\S]*?```|`[^`\n]*`|\b[a-z][a-z0-9+.-]*:\/\/\S+/gi
const spoken = text => String(text ?? '').replace(NOT_SPOKEN, quoted => ' '.repeat(quoted.length))

/** Text cut into plain runs and mentions: `[{ text }, { mention: 'name', text: '@name' }, ...]`. */
export function splitMentions(text) {
  const parts = []
  let at = 0
  for (const match of spoken(text).matchAll(MENTION)) {
    if (match.index > at) parts.push({ text: text.slice(at, match.index) })
    parts.push({ mention: match[1], text: match[0] })
    at = match.index + match[0].length
  }
  if (at < String(text ?? '').length) parts.push({ text: text.slice(at) })
  return parts
}

/** The names a text mentions, lower-cased, each once. */
export function mentionsIn(text) {
  return [...new Set(splitMentions(text).filter(part => part.mention).map(part => part.mention.toLowerCase()))]
}

/** The mention being typed just before `caret`: `{ start, query }` (start is the `@`), or null. */
export function mentionAt(text, caret) {
  const before = String(text ?? '').slice(0, caret)
  const match = /(?:^|[^A-Za-z0-9_.@])@([\p{L}\p{N}._-]*)$/u.exec(before)
  if (match === null) return null
  return { start: caret - match[1].length - 1, query: match[1] }
}

/** Candidates that fit a typed query: names starting with it first, then names containing it. */
export function rankCandidates(candidates, query, max = 8) {
  const q = query.toLowerCase()
  const scored = []
  for (const candidate of candidates ?? []) {
    const keys = [candidate.token, candidate.label, ...(candidate.aliases ?? [])].filter(Boolean).map(key => String(key).toLowerCase())
    const score = q === '' ? 1 : keys.some(key => key.startsWith(q)) ? 0 : keys.some(key => key.includes(q)) ? 1 : -1
    if (score >= 0) scored.push([score, candidate])
  }
  return scored.sort((a, b) => a[0] - b[0]).slice(0, max).map(([, candidate]) => candidate)
}

/** `text` with the partial mention at `spot` replaced by `@token `; returns the new text and caret. */
export function insertMention(text, spot, token) {
  const end = spot.start + 1 + spot.query.length
  const after = text.slice(end)
  const insert = `@${token}${/^\s/.test(after) ? '' : ' '}`
  return { text: text.slice(0, spot.start) + insert + after, caret: spot.start + insert.length }
}
