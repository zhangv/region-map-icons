import type { ReactElement, SVGProps } from 'react';
import type { IconDefinition, IconOptions } from './index.js';
export type FormaIconProps = Omit<SVGProps<SVGSVGElement>, 'color' | 'children' | 'dangerouslySetInnerHTML' | 'ref'> & IconOptions & { icon: Readonly<IconDefinition> };
export declare function FormaIcon(props: FormaIconProps): ReactElement;
