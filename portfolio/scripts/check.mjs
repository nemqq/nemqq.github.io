import { readFile, access } from 'node:fs/promises';
import { Script } from 'node:vm';
import assert from 'node:assert/strict';
const root = new URL('../', import.meta.url);
const configSource = await readFile(new URL('dist/site.config.js', root), 'utf8');
const context = { window: {} };
new Script(configSource, { filename: 'site.config.js' }).runInNewContext(context);
const config = context.window.SITE_CONFIG;
assert(config.profile.email.includes('@'), 'Uzupełnij poprawny adres e-mail.');
assert(config.profile.headline.length > 0, 'Nagłówek nie może być pusty.');
new Script(await readFile(new URL('dist/app.js', root), 'utf8'), { filename: 'app.js' });
const html = await readFile(new URL('dist/index.html', root), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(ids.length, new Set(ids).size, 'Identyfikatory HTML muszą być unikalne.');
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(match[1]), `Brak sekcji #${match[1]}`);
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (/^(https?:|mailto:)/.test(match[1])) continue;
  await access(new URL(`dist/${match[1]}`, root));
}
for (const item of [...config.projects, { image: config.cvUrl }]) {
  if (item.image && !/^https?:\/\//.test(item.image)) await access(new URL(`dist/${item.image}`, root));
}
const manifest = JSON.parse(await readFile(new URL('.openai/hosting.json', root), 'utf8'));
assert.equal(manifest.static.directory, 'dist');
console.log('OK: składnia JavaScript, konfiguracja, linki sekcji, pliki statyczne i manifest.');
