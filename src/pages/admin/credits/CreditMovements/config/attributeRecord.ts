import { IMovement } from "src/model/entity/product";

const staticAttributes = [
  { id: "reference", label: "Código de seguimiento", value: "" },
  { id: "date", label: "Fecha de solicitud", value: "" },
];

const generateAttributes = (movement: IMovement) =>
  staticAttributes.map((attr) => ({
    ...attr,
    value: movement[attr.id as keyof IMovement] as string | number | Date,
  }));

export { generateAttributes };

