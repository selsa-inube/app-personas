import { IMovement } from "src/model/entity/product";

const staticAttributes = [
  { id: "date", label: "Fecha", value: "" },
  { id: "reference", label: "Referencia", value: "" },
];

const generateAttributes = (movement: IMovement) =>
  staticAttributes.map((attr) => ({
    ...attr,
    value: movement[attr.id as keyof IMovement] as string | number | Date,
  }));

export { generateAttributes };
