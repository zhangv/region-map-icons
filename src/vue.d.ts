import type { DefineComponent, PropType } from 'vue';
import type { IconDefinition } from './index.js';
export declare const RegionMapIcon: DefineComponent<{
  icon: { type: PropType<Readonly<IconDefinition>>; required: true };
  variant: { type: PropType<'outline' | 'solid'>; default: 'outline' };
  size: { type: PropType<number | string>; default: 256 };
  color: { type: StringConstructor; default: 'currentColor' };
  strokeWidth: { type: NumberConstructor; default: 2 };
  title: StringConstructor;
}>;
