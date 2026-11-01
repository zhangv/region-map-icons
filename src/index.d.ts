export interface IconDefinition { readonly code: string; readonly name: string; readonly zh: string; readonly continent: string; readonly d: string; readonly source: string }
export interface IconOptions { variant?: 'outline' | 'solid'; size?: number | string; color?: string; strokeWidth?: number; title?: string }
export declare function toSvg(icon: Readonly<IconDefinition>, options?: IconOptions): string;
export declare function createSvg(icon: Readonly<IconDefinition>, options?: IconOptions): SVGSVGElement;
