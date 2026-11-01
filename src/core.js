/** Validate an icon definition and normalize options shared by all renderers. */
export function normalize(icon, options = {}) {
  if (!icon || typeof icon.d !== 'string' || !/^[MLZ0-9.,\s-]+$/.test(icon.d)) {
    throw new TypeError('Expected a Forma icon definition imported from forma-country-icons/icons/<code>');
  }
  const { variant = 'outline', size = 256, color = 'currentColor', strokeWidth = 2, title } = options;
  if (variant !== 'outline' && variant !== 'solid') throw new TypeError('variant must be outline or solid');
  if (!Number.isFinite(Number(strokeWidth)) || Number(strokeWidth) < 0) throw new TypeError('strokeWidth must be non-negative');
  return { variant, size, color, strokeWidth, title };
}
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[char]));
/** Render a trusted icon definition to an escaped SVG string. Works in Node and browsers. */
export function toSvg(icon, options = {}) {
  const o = normalize(icon, options);
  const accessibility = o.title ? `role="img" aria-label="${escape(o.title)}"` : 'aria-hidden="true"';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${escape(o.size)}" height="${escape(o.size)}" color="${escape(o.color)}" focusable="false" ${accessibility}>${o.title ? `<title>${escape(o.title)}</title>` : ''}<path d="${icon.d}" fill-rule="evenodd" fill="${o.variant === 'solid' ? 'currentColor' : 'none'}" stroke="${o.variant === 'outline' ? 'currentColor' : 'none'}" stroke-width="${escape(o.strokeWidth)}" stroke-linejoin="round"/></svg>`;
}
/** Create an SVG DOM node. Call only in a browser; toSvg is SSR-safe. */
export function createSvg(icon, options = {}) {
  if (typeof document === 'undefined') throw new Error('createSvg requires a browser document; use toSvg for SSR');
  const template = document.createElement('template');
  template.innerHTML = toSvg(icon, options);
  return template.content.firstElementChild;
}
