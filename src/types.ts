export const SHAPES = ["L", "J", "Z", "T", "I", "O"] as const;
export const ROTATIONS = ["W", "E", "S", "N"] as const;

export type TSelectors = Record<string, Element>;
export type TShape = (typeof SHAPES)[number];
export type TRotation = (typeof ROTATIONS)[number];
