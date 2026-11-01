import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toSvg, createSvg } from '../lib/index.js';
import cn from '../lib/icons/cn.js';
import tw from '../lib/icons/tw.js';

test('renders both styles from the same geometry, including a separate Taiwan icon', () => {
  assert.ok(cn.d.length > tw.d.length);
  const solid = toSvg(cn, { variant: 'solid', size: 320, color: '#305b47' });
  const outline = toSvg(cn, { strokeWidth: 4 });
  assert.ok(solid.includes(`d="${cn.d}"`));
  assert.match(solid, /fill="currentColor" stroke="none"/);
  assert.match(outline, /fill="none" stroke="currentColor" stroke-width="4"/);
  assert.match(solid, /width="320"/);
});
test('escapes custom values and supplies accessible semantics without labels in the shape', () => {
  const svg = toSvg(cn, { title: 'China <map>', color: '" onload="x' });
  assert.match(svg, /aria-label="China &lt;map&gt;"/);
  assert.ok(!svg.includes('color="" onload='));
  assert.match(toSvg(cn), /aria-hidden="true"/);
});
test('rejects invalid definitions, variant and stroke, and explains DOM-only API in Node', () => {
  assert.throws(() => toSvg({ d: '\"><script>' }), TypeError);
  assert.throws(() => toSvg(cn, { variant: 'bad' }), TypeError);
  assert.throws(() => toSvg(cn, { strokeWidth: -1 }), TypeError);
  assert.throws(() => createSvg(cn), /browser document/);
});
