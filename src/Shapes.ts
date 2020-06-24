export const LINE = 'LINE';
export const RECTANGLE = 'RECTANGLE';
export const ELLIPSE = 'ELLIPSE';
export const CIRCLE = 'CIRCLE';
export const POLYGON = 'POLYGON';

export type Shapes = typeof LINE | typeof RECTANGLE | typeof ELLIPSE | typeof CIRCLE | typeof POLYGON;
export type Tools = Shapes | 'EDIT'

export type ShapeMetadata = {
    type: Shapes,
    external: any,
}
