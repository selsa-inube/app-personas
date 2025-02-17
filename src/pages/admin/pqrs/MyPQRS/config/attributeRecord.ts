import { IPQRS } from "src/model/entity/pqrs";

const staticAttributes = [
  { id: "type", label: "Tipo" },
  { id: "motive", label: "Motivo" },
  { id: "code", label: "Código de seguimiento" },
  { id: "date", label: "Fecha de solicitud" },
];

const generateAttributes = (pqrs: IPQRS) =>
  staticAttributes.map((attr) => ({
    ...attr,
    value: pqrs[attr.id as keyof IPQRS] as string | number | Date,
  }));

export { generateAttributes };
