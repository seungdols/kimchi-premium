import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const src = readFileSync(join(root, 'index.mjs'), 'utf-8');

// Convert ESM to CJS for backward compatibility
const cjs = src
  .replace(/^import\s+(\w+)\s+from\s+'([^']+)';$/gm, "const $1 = require('$2');")
  .replace(/^export\s+function\s+/gm, 'function ')
  .replace(/^export\s+/gm, '');

writeFileSync(join(root, 'index.cjs'), cjs, 'utf-8');

console.log('Built index.cjs from index.mjs');
