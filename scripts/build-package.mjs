import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const lib = new URL('lib/', root);
await mkdir(new URL('icons/', lib), { recursive: true });
const items = JSON.parse(await readFile(new URL('docs/data.json', root), 'utf8'));
for (const name of ['core', 'react', 'vue']) await copyFile(new URL(`src/${name}.js`, root), new URL(`${name}.js`, lib));
await writeFile(new URL('index.js', lib), "export { toSvg, createSvg } from './core.js';\n");
for (const item of items) {
  await writeFile(new URL(`icons/${item.code}.js`, lib), `export default Object.freeze(${JSON.stringify(item)});\n`);
  await writeFile(new URL(`icons/${item.code}.d.ts`, lib), "import type { IconDefinition } from '../index.js';\ndeclare const icon: Readonly<IconDefinition>;\nexport default icon;\n");
}
await copyFile(new URL('src/index.d.ts', root), new URL('index.d.ts', lib));
for (const name of ['react', 'vue']) await copyFile(new URL(`src/${name}.d.ts`, root), new URL(`${name}.d.ts`, lib));
console.log(`Built ${items.length} per-icon modules and React / Vue adapters`);
