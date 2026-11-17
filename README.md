# @soffits/dsh-ui-kit

Small shared pieces for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) plugin pages. DSH already gives plugins its own controls through `@deepseek-ai/dsh-client-ui-primitives` (Button, Tag, Pill, StateDot, Tooltip and the rest), and you should use those first. This kit only adds what pages that show live data keep needing and DSH doesn't have:

- icons for things in the data (a plane, a pill bottle, a wallet), and the same icon on a tinted tile
- time that moves by itself: countdowns, "in 1d 19h", "5 min ago", "tomorrow"
- rings, sparklines and progress bars
- a live dot for the page header, and a client for a plugin's Server-Sent Events route
- a two-second wash on something that just changed, and a dot for what is new since you last looked
- a short history stack under an item
- a card surface, optionally over a blurred picture, and a strip of steps or episodes
- a phone-sized touch target for a plugin's own controls
- the slot where [@soffits/dsh-ui-actions](https://github.com/soffits/dsh-ui-actions) draws suggested next steps

Every piece is a small React component or hook that fits inside DSH's own rows and cards. Colours come only from DSH's theme tokens, so light and dark follow the app, and motion respects "reduce motion".

## Install

```sh
dsh plugin --profile web add @soffits/dsh-ui-kit
```

Then restart DSH. The kit adds nothing to the UI by itself; other plugins use it.

## Use it from a plugin

List the kit in your package's `dsh.client.inject`, so DSH loads it before your page, and take the service when it is there:

```json
"dsh": { "client": { "platform": "web", "inject": ["@soffits/dsh-ui-kit"] } }
```

```js
apply(ctx) {
  ctx.inject(['uiKit'], scope => {
    const { Tile, Countdown, LiveStatus, useEventStream, useWash } = scope.uiKit
    // …
  })
}
```

| Piece | What it does |
|---|---|
| `Icon({ name, size?, tone? })` | A [Lucide](https://lucide.dev) icon by its Lucide name. About 200 are bundled (`ICON_NAMES`, or `icons.json` in the package); an unknown name draws nothing. |
| `Tile({ icon, tone?, size? })` | The icon on a tile tinted with its tone. |
| `Chip({ icon?, tone?, to?, children })` | A fact in DSH's static `Pill`, with a tone-coloured icon. With `to` (an ISO time), a ticking "in 1d 19h" follows the text. |
| `useNow(stepMs?)` | The time now, redrawn every step (default a minute) while the tab is visible. One timer per step for the whole page. |
| `Countdown({ to, size? })` | Time left until `to`: big numbers with small units, or `size: 'inline'` text. Ticks every second in the last two minutes, then says "now". |
| `TimeUntil({ to })`, `TimeAgo({ at })`, `RelativeDay({ date })` | "in 3h", "5 min ago" (DSH's own buckets), "tomorrow" / "in 3 days" / a date. The full date and time show on hover. |
| `Ring({ value, max, size?, tone?, children? })` | A ring with anything in its middle. |
| `Spark({ values, tone?, height?, width?, area?, dot?, min?, max? })` | A sparkline that fills its box unless given a width. `null` values leave a gap. |
| `Progress({ value, max } \| { from, to }, tone?, start?, end? })` | A bar, by amount or through time (ticking), with optional things on either side. |
| `useEventStream(path, onMessage)` | Follows an SSE route (`api/<plugin>/events?…`) and returns `connecting`, `live` or `down`. It uses the page's own transport when the shell has one, else `EventSource`, and reconnects with a growing pause. Keep polling while it isn't `live`. |
| `LiveStatus({ status, updatedAt? })` | "● Live · updated 13:34" for a page header. |
| `useWash(version, key?)`, `Wash` | A class name for two seconds after `version` changes, nothing on first render or when `key` changed too. Put it on any row or card. |
| `JustNow`, `NewDot` | The "just now" label that goes with a wash, and the "new since you last looked" dot. Remembering what someone has seen is the plugin's job. |
| `History({ items, max?, moreLabel? })` | Earlier entries (`{ at, text }`, newest first) on a hairline, with "+N earlier". |
| `Suggested({ actions, about?, states?, onPress })` | The steps among an item's actions, drawn by dsh-ui-actions under a quiet "Suggested". Nothing shows without steps or without that plugin. |
| `Surface({ backdrop?, as?, className?, children })` | A card in DSH's colours. With `backdrop` (an image URL) the picture lies blurred behind the content under a veil of the page's background, readable in light and dark. |
| `Segments({ items, end?, label? })` | A strip with one segment per step or episode, each `done`, `current`, `ready` (available, not reached) or `todo`, filling its box, with `end` after it ("6 watched · next 5 on disk"). |
| `TOUCH` | A class for your own buttons and pills: at least 40 px tall where the pointer is a finger. Nothing else on the page changes. |
| `TONES`, `toneColor(tone)`, `tagTone(tone)` | The data tones (`ok`, `warn`, `bad`, `accent`, `violet`, `muted`), their theme colour, and the matching palette of DSH's `Tag`. |
| `formatDuration(ms, locale)`, `formatRelativeDay(date, now, locale)` | The same words as plain text, for titles and quotes. |

The kit's own words ("Live", "just now", "Suggested") are in `locale/<tag>.json`, one file per language, and follow DSH's language setting. A language is added by adding a file. The kit never names an assistant.

## Develop

```sh
npm install
npm run build   # client.js and icons.json from src/, locale/ and lucide-static
npm run check   # the built files are fresh, syntax
npm test
```

To bundle another icon, add its Lucide name to `src/icons.txt` and build.

## Licence

MIT. The bundled icons are from Lucide, under the ISC licence (and MIT for those that came from Feather); see `LICENSE-lucide`.
