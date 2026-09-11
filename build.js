#!/usr/bin/env node
/* love-timeline build step (zero dependencies).
 * Concatenates the source modules IN LOAD ORDER into a single game.bundle.js,
 * then lightly minifies (strips comments + trailing whitespace + blank lines).
 * The modules share one global scope, so ordered concatenation is equivalent to
 * the separate <script> tags — just one HTTP request instead of 11.
 *
 * Usage:  node build.js            (reads GAME_VERSION from config.js)
 * Output: game.bundle.js  (+ prints the version so index.html cache-bust can match)
 *
 * timeline.json is NOT inlined — it stays a separately-fetched, editable data file
 * (loaded non-blocking by engine.js). Sprite/icon base64 IS in the bundle (sprites.js).
 */
const fs = require('fs');
const path = require('path');
const DIR = __dirname;
const SRC = path.join(DIR, 'src');   // source modules live in src/; bundle is written to root

// dependency-ordered module list (same order as the old <script> tags)
const MODULES = [
  'sprites.js', 'config.js', 'state.js', 'input.js', 'audio.js',
  'helpers.js', 'ui.js', 'scenery.js', 'characters.js', 'effects.js', 'engine.js',
];

// conservative minifier: safe line-based stripping only (no risky token surgery).
// Removes /* block comments */, whole-line // comments, trailing whitespace, blank lines.
// Leaves string/URL contents and inline `data:` URIs untouched (they live on code lines,
// and we never touch // inside a line that has code before it).
function minify(src) {
  let out = src.replace(/\/\*[\s\S]*?\*\//g, '');        // block comments
  out = out.split('\n').map(line => {
    const t = line.trim();
    if (t.startsWith('//')) return '';                   // whole-line // comment
    return line.replace(/\s+$/, '');                     // trailing whitespace
  }).join('\n');
  out = out.replace(/\n{2,}/g, '\n');                    // collapse blank lines
  return out.trim() + '\n';
}

// read version from config.js so the bundle self-reports and index.html can match
const configSrc = fs.readFileSync(path.join(SRC, 'config.js'), 'utf8');
const vm = configSrc.match(/GAME_VERSION\s*=\s*['"]([^'"]+)['"]/);
const version = vm ? vm[1] : 'dev';

let bundle = `/* game.bundle.js — BUILT ARTIFACT (do not edit). Run \`node build.js\` after editing src/ modules. v${version} */\n`;
let rawTotal = 0;
let joined = '';                                          // raw concatenation for Terser
for (const m of MODULES) {
  const src = fs.readFileSync(path.join(SRC, m), 'utf8');
  rawTotal += Buffer.byteLength(src);
  joined += `\n/* ==== ${m} ==== */\n` + src + '\n';
  bundle += `\n/* ==== ${m} ==== */\n` + minify(src);     // fallback content (light minify)
}

// Prefer a REAL minifier (Terser: name-mangling + compression) when available.
// The modules share one global scope, so we mangle top-level names too (toplevel:true)
// for smaller, harder-to-read output. Falls back to the light minify above if Terser
// or its deps are missing — keeps the build working with zero required dependencies.
let usedTerser = false;
try {
  const { minify: terserMinify } = require('terser');
  // terser v5 exposes an async API, but minify() also returns a promise; run sync-ish
  // via deasync-free trick: use the sync wrapper by awaiting in a small IIFE is not
  // possible at top level in CJS here, so use minify_sync if present, else async+writeFile.
  if (typeof terserMinify === 'function') {
    // terser >=5 supports minify_sync
    const terser = require('terser');
    if (typeof terser.minify_sync === 'function') {
      const res = terser.minify_sync(joined, TERSER_OPTS(version));
      if (res && res.code && !res.error) { bundle = res.code + '\n'; usedTerser = true; }
    }
  }
} catch (e) {
  // terser not installed — fall through to the light-minified `bundle` already built
}

function TERSER_OPTS(v) {
  return {
    module: false,
    compress: { passes: 2, drop_console: true, drop_debugger: true, booleans_as_integers: false },
    mangle: { toplevel: true },          // shorten top-level names across the shared scope
    format: {
      comments: false,
      preamble: `/* game.bundle.js v${v} — built artifact, minified. Do not edit. */`,
    },
  };
}
fs.writeFileSync(path.join(DIR, 'game.bundle.js'), bundle);

const outSize = Buffer.byteLength(bundle);
console.log(`built game.bundle.js  v${version}  [${usedTerser ? 'TERSER (mangled+compressed)' : 'light minify (terser unavailable)'}]`);
console.log(`  modules: ${MODULES.length}  raw: ${rawTotal} bytes  bundled: ${outSize} bytes  (-${Math.round((1-outSize/rawTotal)*100)}%)`);
console.log(`  -> update index.html to load game.bundle.js?v=${version}`);
