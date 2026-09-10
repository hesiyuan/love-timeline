# Build & deploy — love-timeline

The game is written as **readable source modules** but shipped as **one bundled file**
for fast loading (1 HTTP request instead of 11). Zero dependencies — the build is a
single Node script.

## Source vs built artifact
- **Edit** the source modules under **`src/`**: `src/config.js`, `src/state.js`,
  `src/input.js`, `src/audio.js`, `src/helpers.js`, `src/ui.js`, `src/scenery.js`,
  `src/characters.js`, `src/effects.js`, `src/engine.js`, and `src/sprites.js` (base64
  sprite data). `timeline.json` (story data) stays at the repo root.
- **Never hand-edit** `game.bundle.js` (repo root) — it is generated from `src/`.

## Build
```
node build.js
```
Concatenates the modules in load order + light-minifies (strips comments/blank lines)
into `game.bundle.js`, and prints the version + bundle size. The modules share one
global scope, so ordered concatenation is equivalent to the old separate <script> tags
(verified byte-identical, minus comments).

## Release checklist
1. Edit the relevant source module(s) under `src/` and/or `timeline.json`.
2. Bump `GAME_VERSION` in `src/config.js`.
3. Run `node build.js`.
4. Update the `?v=X.Y.Z` on the `game.bundle.js` tag + the two `<link rel=preload>`
   hrefs in `index.html` to match the new version.
5. Deploy `game.bundle.js`, `index.html`, and any changed `timeline.json` / `sprites.js`
   via the GitHub Contents API. (The individual module .js files do NOT need to be
   deployed — only the bundle is loaded in production, but keeping them in the repo is
   fine and useful for source browsing.)

## What loads at runtime (production)
- `index.html` → `game.bundle.js` (1 request; preloaded) + `timeline.json` (small data
  file, preloaded, fetched by engine.js boot()). `audio/mood_piece.mp3` on first gesture.
- `timeline.json` is kept separate (not inlined) so the story stays editable without a
  rebuild. To inline it instead (one fewer request, but story edits need a rebuild),
  change build.js to embed it and engine.js to read the embedded copy.
