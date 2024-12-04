import { IRequest } from "src/model/entity/request";

const staticCreditAttributes = [
  { id: "product", label: "Producto" },
  { id: "destination", label: "Destino" },
  { id: "trackingCode", label: "Código de seguimiento" },
  { id: "requestDate", label: "Fecha de solicitud" },
];

const staticAidAttributes = [
  { id: "product", label: "Producto" },
  { id: "beneficiary", label: "Beneficiario" },
  { id: "trackingCode", label: "Código de seguimiento" },
  { id: "requestDate", label: "Fecha de solicitud" },
];

const staticProgrammedSavingAttributes = [
  { id: "periodicityName", label: "Pago de intereses" },
  { id: "paymentMethodName", label: "Medio de pago" },
  { id: "trackingCode", label: "Código de seguimiento" },
  { id: "requestDate", label: "Fecha de solicitud" },
];

const staticCdatAttributes = [
  { id: "deadline", label: "Plazo" },
  { id: "actionAfterExpiration", label: "Pago de intereses" },
  { id: "trackingCode", label: "Código de seguimiento" },
  { id: "requestDate", label: "Fecha de solicitud" },
];

const staticCancelProgammedSavingAttributes = [
  { id: "product", label: "Número de producto" },
  { id: "trackingCode", label: "Código de seguimiento" },
  { id: "requestDate", label: "Fecha de solicitud" },
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

  if (request.requestType === "newprogrammedsaving") {
    return staticProgrammedSavingAttributes.map((attr) => ({
      ...attr,
      value: request[attr.id as keyof IRequest] as string | number | Date,
    }));
  }

  if (request.requestType === "newcdat") {
    return staticCdatAttributes.map((attr) => ({
      ...attr,
      value: request[attr.id as keyof IRequest] as string | number | Date,
    }));
  }

  if (request.requestType === "cancelprogrammedsaving") {
    return staticCancelProgammedSavingAttributes.map((attr) => ({
      ...attr,
      value: request[attr.id as keyof IRequest] as string | number | Date,
    }));
  }

  return [];
};

export { generateAttributes };
