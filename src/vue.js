import { defineComponent, h } from 'vue';
import { normalize } from './core.js';

export const FormaIcon = defineComponent({
  name: 'FormaIcon', inheritAttrs: false,
  props: {
    icon: { type: Object, required: true }, variant: { type: String, default: 'outline' },
    size: { type: [Number, String], default: 256 }, color: { type: String, default: 'currentColor' },
    strokeWidth: { type: Number, default: 2 }, title: String,
  },
  setup(props, { attrs }) {
    return () => {
      const o = normalize(props.icon, props);
      const labelled = Boolean(o.title || attrs['aria-label'] || attrs['aria-labelledby']);
      const { innerHTML, textContent, ...safeAttrs } = attrs;
      return h('svg', {
        xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 512 512', width: o.size, height: o.size,
        color: o.color, focusable: 'false', role: labelled ? 'img' : undefined,
        'aria-hidden': labelled ? undefined : 'true', 'aria-label': o.title || undefined, ...safeAttrs,
      }, [o.title ? h('title', o.title) : null, h('path', {
        d: props.icon.d, 'fill-rule': 'evenodd', fill: o.variant === 'solid' ? 'currentColor' : 'none',
        stroke: o.variant === 'outline' ? 'currentColor' : 'none', 'stroke-width': o.strokeWidth, 'stroke-linejoin': 'round',
      })]);
    };
  },
});
