import { test } from 'node:test'
import assert from 'node:assert/strict'
import { insertMention, keepsPicker, mentionAt, mentionsIn, rankCandidates, splitMentions } from '../src/chat.js'

test('mentions are found in any script, after CJK text too, but not in addresses', () => {
  assert.deepEqual(mentionsIn('@build-bot ship it, cc @小明 and mail a@b.c; @@no @Ana.'), ['build-bot', '小明', 'ana'])
  assert.deepEqual(mentionsIn('问一下@小明，顺便看看'), ['小明'])
  assert.deepEqual(splitMentions('hi @ana!'), [{ text: 'hi ' }, { mention: 'ana', text: '@ana' }, { text: '!' }])
  assert.deepEqual(splitMentions(''), [])
  assert.deepEqual(mentionsIn('ship @scope/ui-kit, run `whoami --name @x`, see https://example.org/@ana, then @kit-ui'), ['kit-ui'])
  assert.deepEqual(splitMentions('`@x` @y').map(part => part.mention ?? null), [null, 'y'])
})

test('the mention being typed at the caret, CJK included', () => {
  assert.deepEqual(mentionAt('ask @bui', 8), { start: 4, query: 'bui' })
  assert.deepEqual(mentionAt('问一下@小', 5), { start: 3, query: '小' })
  assert.equal(mentionAt('mail a@b', 8), null)
  assert.deepEqual(mentionAt('@', 1), { start: 0, query: '' })
})

test('picking a candidate replaces the partial name and leaves one space', () => {
  assert.deepEqual(insertMention('ask @bui now', { start: 4, query: 'bui' }, 'build-bot'), { text: 'ask @build-bot now', caret: 14 })
  assert.deepEqual(insertMention('ask @s', { start: 4, query: 's' }, 'samir'), { text: 'ask @samir ', caret: 11 })
})

test('candidates starting with the query come first', () => {
  const people = [{ token: '5e1f0a77', label: 'build-bot' }, { token: 'ana' }, { token: '7c2d9e41', label: 'docs', aliases: ['bot-docs'] }]
  assert.deepEqual(rankCandidates(people, 'bot').map(c => c.token), ['7c2d9e41', '5e1f0a77'])
  assert.deepEqual(rankCandidates(people, 'an').map(c => c.token), ['ana'])
  assert.equal(rankCandidates(people, '').length, 3)
})

test('focus moving to the @ button or the picker keeps the picker open; anywhere else closes it', () => {
  const button = {}
  const item = {}
  const root = { contains: node => node === button || node === item }
  assert.equal(keepsPicker(root, button), true)
  assert.equal(keepsPicker(root, item), true)
  assert.equal(keepsPicker(root, {}), false)
  assert.equal(keepsPicker(root, null), false)
  assert.equal(keepsPicker(null, button), false)
})
