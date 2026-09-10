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
const configSrc = fs.readFileSync(path.join(DIR, 'config.js'), 'utf8');
const vm = configSrc.match(/GAME_VERSION\s*=\s*['"]([^'"]+)['"]/);
const version = vm ? vm[1] : 'dev';

let bundle = `/* game.bundle.js — BUILT ARTIFACT (do not edit). Run \`node build.js\` after editing modules. v${version} */\n`;
let rawTotal = 0;
for (const m of MODULES) {
  const src = fs.readFileSync(path.join(DIR, m), 'utf8');
  rawTotal += Buffer.byteLength(src);
  bundle += `\n/* ==== ${m} ==== */\n` + minify(src);
}
fs.writeFileSync(path.join(DIR, 'game.bundle.js'), bundle);

const outSize = Buffer.byteLength(bundle);
console.log(`built game.bundle.js  v${version}`);
console.log(`  modules: ${MODULES.length}  raw: ${rawTotal} bytes  bundled: ${outSize} bytes  (-${Math.round((1-outSize/rawTotal)*100)}%)`);
console.log(`  -> update index.html to load game.bundle.js?v=${version}`);
