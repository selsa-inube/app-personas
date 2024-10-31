import { IRequest } from "src/model/entity/request";

const staticAttributes = [
  { id: "product", label: "Producto", value: "" },
  { id: "destination", label: "Destino", value: "" },
  { id: "beneficiary", label: "Beneficiario", value: "" },
  { id: "trackingCode", label: "Código de seguimiento", value: "" },
  { id: "requestDate", label: "Fecha de solicitud", value: "" },
];

const generateAttributes = (request: IRequest) =>
  staticAttributes.map((attr) => ({
    ...attr,
    value: request[attr.id as keyof IRequest] as string | number | Date,
  }));

export { generateAttributes };
