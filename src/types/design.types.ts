const variant = ["filled", "outlined", "none"] as const;

const shape = ["circle", "rectangle"] as const;

type VariantType = (typeof variant)[number];
type ShapeType = (typeof shape)[number];

export { shape, variant };
export type { ShapeType, VariantType };
