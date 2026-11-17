import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import vm from 'node:vm'

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8')
const locales = Object.fromEntries(readdirSync(new URL('../locale/', import.meta.url)).filter(name => name.endsWith('.json')).map(name => [name.slice(0, -5), JSON.parse(read(`../locale/${name}`))]))
const placeholders = text => [...text.matchAll(/\{(\w+)\}/g)].map(m => m[1]).sort()

function load() {
  let registration
  const window = { __ModuleLoader__: { load: value => { registration = value } } }
  vm.runInNewContext(read('../client.js'), { window, console })
  const react = { createElement: (type, props, ...children) => ({ type, props, children }), useState: v => [typeof v === 'function' ? v() : v, () => {}], useEffect: () => {}, useRef: v => ({ current: v }), useLayoutEffect: () => {}, useCallback: f => f, useSyncExternalStore: (s, get) => get() }
  const primitives = { Pill: 'Pill', Tag: 'Tag', Button: 'Button', StateDot: 'StateDot', Tooltip: 'Tooltip', IconSparkleRegular: 'IconSparkle', relativeTime: () => ({ unit: 'now', n: 0 }) }
  const modules = { react, '@deepseek-ai/dsh-client-ui-primitives': primitives }
  return { registration, exports: registration.factory(id => { assert.ok(id in modules, `unexpected require ${id}`); return modules[id] }) }
}

function applied() {
  const { exports } = load()
  const provided = {}
  const words = []
  const effects = []
  exports.apply({
    effect: fn => effects.push(fn),
    locale: { register: (ns, tag) => { words.push(tag); return () => {} }, bind: () => key => key, subscribe: () => () => {}, getSnapshot: () => ({ active: 'en' }) },
    provide: (name, value) => { provided[name] = value },
    inject: () => {},
  })
  for (const fn of effects) fn()
  return { provided, words }
}

test('the built client registers under the package name and needs only React and DSH’s own components', () => {
  const { registration, exports } = load()
  assert.equal(registration.id, '@soffits/dsh-ui-kit')
  assert.equal(exports.name, 'ui-kit')
  assert.deepEqual([...exports.inject], ['locale'])
})

test('apply provides the whole service and registers every language file', () => {
  const { provided, words } = applied()
  assert.deepEqual(Object.keys(provided.uiKit).sort(), [
    'ChatBubble', 'ChatDivider', 'Chip', 'Composer', 'ConversationRow', 'DayLabel', 'MentionText', 'mentionsIn', 'splitMentions', 'Countdown', 'History', 'ICON_NAMES', 'Icon', 'JustNow', 'LiveStatus', 'NewDot', 'Progress', 'RelativeDay', 'Ring', 'Segments', 'Spark', 'Suggested', 'Surface', 'TOUCH',
    'TONES', 'Tile', 'TimeAgo', 'TimeUntil', 'Wash', 'formatDuration', 'formatRelativeDay', 'tagTone', 'toneColor', 'useEventStream', 'useNow', 'useWash',
  ].sort())
  assert.deepEqual(words.sort(), Object.keys(locales).sort())
})

test('every icon in src/icons.txt is bundled, icons.json lists them, and an unknown name draws nothing', () => {
  const { provided } = applied()
  const listed = read('../src/icons.txt').split('\n').filter(line => !line.startsWith('#')).flatMap(line => line.trim().split(/\s+/)).filter(Boolean)
  assert.deepEqual([...provided.uiKit.ICON_NAMES], listed)
  assert.deepEqual(JSON.parse(read('../icons.json')).names, listed)
  const { Icon } = provided.uiKit
  assert.equal(Icon({ name: 'no-such-icon' }), null)
  const plane = Icon({ name: 'plane', size: 20 })
  assert.equal(plane.type, 'svg')
  assert.equal(plane.props.width, 20)
  assert.ok(plane.children[0].length > 0)
})

test('every language file has en’s keys with the same placeholders, and the code asks only for words that exist', () => {
  const base = locales.en.ui
  for (const [tag, file] of Object.entries(locales)) {
    assert.deepEqual(Object.keys(file.meta).sort(), ['description', 'title'], `${tag} meta`)
    assert.deepEqual(Object.keys(file.ui).sort(), Object.keys(base).sort(), `${tag} keys`)
    for (const [key, text] of Object.entries(base)) assert.deepEqual(placeholders(file.ui[key]), placeholders(text), `${tag} ${key}`)
  }
  const source = readdirSync(new URL('../src/client/', import.meta.url)).map(name => read(`../src/client/${name}`)).join('\n')
  const used = new Set([...source.matchAll(/\bt\('(\w+)'/g)].map(m => m[1]))
  for (const key of used) assert.equal(typeof base[key], 'string', key)
  for (const key of Object.keys(base)) assert.ok(used.has(key), `${key} is never used`)
})

test('the client names no language and no assistant', () => {
  const source = readdirSync(new URL('../src/client/', import.meta.url)).map(name => read(`../src/client/${name}`)).join('\n')
  assert.doesNotMatch(source, /\b(?:English|French|Chinese|zh-CN|en-US)\b/)
  assert.doesNotMatch(source, /\b(?:Sakina|Claude|assistant name)\b/i)
})

test('everything the kit takes from DSH’s own components exists in the oldest DSH it supports', () => {
  const shipped = read('../node_modules/@deepseek-ai/dsh-client-ui-primitives/lib/index.js')
  const exported = new Set([...shipped.matchAll(/^export \{([^}]*)\}/gm)].flatMap(m => m[1].split(',').map(name => name.trim().split(/\s+as\s+/).pop())))
  assert.ok(exported.has('Button'), 'read the export list')
  const source = readdirSync(new URL('../src/client/', import.meta.url)).map(name => read(`../src/client/${name}`)).join('\n')
  const imported = [...source.matchAll(/import \{([^}]*)\} from '@deepseek-ai\/dsh-client-ui-primitives'/g)].flatMap(m => m[1].split(',').map(name => name.trim()).filter(Boolean))
  assert.ok(imported.length > 0)
  for (const name of imported) assert.ok(exported.has(name), `${name} is not in dsh-client-ui-primitives`)
})

test('a strip draws one segment per item, an unknown state as todo, and a surface lays its picture behind the content', () => {
  const { Segments, Surface, TOUCH } = applied().provided.uiKit
  const strip = Segments({ items: ['done', { state: 'current', title: 'Episode 2' }, 'ready', 'odd'], label: '1 watched' })
  assert.deepEqual(strip.children[0].map(segment => segment.props['data-state']), ['done', 'current', 'ready', 'todo'])
  assert.equal(strip.children[0][1].props.title, 'Episode 2')
  assert.equal(Segments({ items: ['done'], end: 'next 5 on disk' }).props.className, 'uk-segmentsLabelled')
  const plain = Surface({ as: 'section', children: 'text' })
  assert.equal(plain.type, 'section')
  assert.equal(plain.props.className, 'uk-surface')
  const card = Surface({ backdrop: 'covers/a"b', className: 'mine', children: 'text' })
  assert.equal(card.props.className, 'uk-surface uk-surfaceBackdropped mine')
  assert.equal(card.children[0].props.style.backgroundImage, 'url("covers/a\\"b")')
  assert.equal(TOUCH, 'uk-touch')
})
