# Maintainer notes

A DeepSeek Harness plugin with no Host behaviour: its Web client provides `ctx.uiKit`, small pieces for other plugins' pages. Users read `README.md`.

## Layout

- `src/time.js`, `src/sse.js`, `src/shapes.js`: pure logic (durations, relative days, the SSE line parser and backoff, sparkline geometry, tones). Tested directly.
- `src/client/`: `index.js` (apply: words, styles, the service), `words.js`, `glyphs.js` (Icon, Tile, Chip), `time.js` (the shared ticker and time components), `measures.js`, `live.js`, `change.js`, `history.js`, `suggested.js`, `look.js` (CSS).
- `src/icons.txt`: the Lucide icons bundled, by name.
- `client.js` and `icons.json`: built by `npm run build` (esbuild; `react` and `@deepseek-ai/dsh-client-ui-primitives` come from DSH's shared module table). Committed so a linked checkout runs as it is; `npm run check` fails when they are stale.
- `index.js`: an empty Host row; DSH serves a package's client only for a loaded row.

## Rules

- Use DSH's own components (`@deepseek-ai/dsh-client-ui-primitives`) for anything they cover. The kit holds only what DSH lacks; when DSH gains one of these pieces, use DSH's and drop the kit's.
- Every piece is a small component or hook that works inside DSH's own rows and cards: no page layout, no fixed widths beyond its own box.
- Colours only through `--dsw-alias-*` tokens; tones are semantic. Motion is at most two seconds and respects reduced motion.
- No assistant name and no language in code: words come from `locale/<tag>.json`.
- The service's shape is what other plugins build on: add to it freely, rename or remove only in a breaking release.
- Client scripts run as classic scripts in one global scope: everything stays inside the loader factory (the build wraps it).

## Checks

`npm run check` and `npm test`. Before a release, load it in a throwaway DSH home with a plugin that uses it, at phone and desktop widths, light and dark, in two languages.

## Git

Conventional Commits, one-line subjects, squash merges. Versions follow semver from the commit types (below 1.0: feat or breaking → minor, fix → patch). Releases: bump `package.json` and `CHANGELOG.md`, build, merge, then pushing the tag `vX.Y.Z` runs `.github/workflows/publish.yml`, which publishes to npm by trusted publishing (OIDC, with provenance, no stored token; the package's trusted publisher on npmjs.com names this repo and `publish.yml`, so renaming either breaks it) and creates the GitHub release. Don't publish by hand.
