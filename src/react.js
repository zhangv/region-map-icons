import { createElement } from 'react';
import { normalize } from './core.js';

export function RegionMapIcon({ icon, variant, size, color, strokeWidth, title, children, dangerouslySetInnerHTML, ...props }) {
  const o = normalize(icon, { variant, size, color, strokeWidth, title });
  const labelled = Boolean(title || props['aria-label'] || props['aria-labelledby']);
  return createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 512 512', width: o.size, height: o.size,
    color: o.color, focusable: 'false', role: labelled ? 'img' : undefined,
    'aria-hidden': labelled ? undefined : true, 'aria-label': title || undefined, ...props,
  }, title ? createElement('title', null, title) : null, createElement('path', {
    d: icon.d, fillRule: 'evenodd', fill: o.variant === 'solid' ? 'currentColor' : 'none',
    stroke: o.variant === 'outline' ? 'currentColor' : 'none', strokeWidth: o.strokeWidth, strokeLinejoin: 'round',
  }));
}
