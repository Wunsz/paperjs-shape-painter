export const LINE = 'LINE';
export const RECTANGLE = 'RECTANGLE';
export const ELLIPSE = 'ELLIPSE';
export const CIRCLE = 'CIRCLE';
export const POLYGON = 'POLYGON';

export type Shapes = typeof LINE | typeof RECTANGLE | typeof ELLIPSE | typeof CIRCLE | typeof POLYGON;
export type Tools = Shapes | 'EDIT' | 'REMOVE'

export type ActionFinishedCallback = (id: number, item: paper.Item) => any;

export type ShapeMetadata = {
    type: Shapes,
    ext: any,
}
