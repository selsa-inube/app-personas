import { ITransfer } from "src/model/entity/transfer";

const staticAttributes = [
  { id: "destination", label: "Destino", value: "" },
  { id: "source", label: "Origen", value: "" },
  { id: "date", label: "Fecha", value: "" },
];

const generateAttributes = (transfer: ITransfer) =>
  staticAttributes.map((attr) => ({
    ...attr,
    value: transfer[attr.id as keyof ITransfer] as string | number | Date,
  }));

export { generateAttributes };
