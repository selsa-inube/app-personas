import { IPQRS } from "src/model/entity/pqrs";

const staticAttributes = [
  { id: "type", label: "Tipo", value: "" },
  { id: "motive", label: "Motivo", value: "" },
  { id: "code", label: "Código de seguimiento", value: "" },
  { id: "date", label: "Fecha de solicitud", value: "" },
];

const generateAttributes = (pqrs: IPQRS) =>
  staticAttributes.map((attr) => ({
    ...attr,
    value: pqrs[attr.id as keyof IPQRS] as string | number | Date,
  }));

export { generateAttributes };