import { IRequest } from "src/model/entity/request";

const staticCreditAttributes = [
  { id: "product", label: "Producto", value: "" },
  { id: "destination", label: "Destino", value: "" },
  { id: "trackingCode", label: "Código de seguimiento", value: "" },
  { id: "requestDate", label: "Fecha de solicitud", value: "" },
];

const staticAidAttributes = [
  { id: "product", label: "Producto", value: "" },
  { id: "beneficiary", label: "Beneficiario", value: "" },
  { id: "trackingCode", label: "Código de seguimiento", value: "" },
  { id: "requestDate", label: "Fecha de solicitud", value: "" },
];

const staticProgrammedSavingAttributes = [
  { id: "periodicityName", label: "Pago de intereses", value: "" },
  { id: "paymentMethodName", label: "Medio de pago", value: "" },
  { id: "trackingCode", label: "Código de seguimiento", value: "" },
  { id: "requestDate", label: "Fecha de solicitud", value: "" },
];

const generateAttributes = (request: IRequest) => {
  if (request.requestType === "credit") {
    return staticCreditAttributes.map((attr) => ({
      ...attr,
      value: request[attr.id as keyof IRequest] as string | number | Date,
    }));
  }

  if (request.requestType === "aid") {
    return staticAidAttributes.map((attr) => ({
      ...attr,
      value: request[attr.id as keyof IRequest] as string | number | Date,
    }));
  }

  if (request.requestType === "programmedsaving") {
    return staticProgrammedSavingAttributes.map((attr) => ({
      ...attr,
      value: request[attr.id as keyof IRequest] as string | number | Date,
    }));
  }

  return [];
};

export { generateAttributes };
