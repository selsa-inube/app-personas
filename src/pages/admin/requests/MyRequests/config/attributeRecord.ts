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

const staticModifyActionProgrammedSavingAttributes = [
  { id: "product", label: "Número de producto" },
  { id: "actionAfterExpiration", label: "Renovar producto al vencimiento" },
  { id: "trackingCode", label: "Código de seguimiento" },
  { id: "requestDate", label: "Fecha de solicitud" },
];

const staticCancelCdatAttributes = [
  { id: "product", label: "Número de producto" },
  { id: "trackingCode", label: "Código de seguimiento" },
  { id: "requestDate", label: "Fecha de solicitud" },
];

const staticModifyActionCdatAttributes = [
  { id: "product", label: "Número de producto" },
  { id: "actionAfterExpiration", label: "Pago de intereses" },
  { id: "trackingCode", label: "Código de seguimiento" },
  { id: "requestDate", label: "Fecha de solicitud" },
];

const staticModifyQuotaValueProgrammedSavingAttributes = [
  { id: "product", label: "Número de producto" },
  { id: "quotaValue", label: "Valor de la cuota" },
  { id: "trackingCode", label: "Código de seguimiento" },
  { id: "requestDate", label: "Fecha de solicitud" },
];

const generateAttributes = (request: IRequest) => {
  const attributeMap: { [key: string]: { id: string; label: string }[] } = {
    credit: staticCreditAttributes,
    aid: staticAidAttributes,
    newprogrammedsaving: staticProgrammedSavingAttributes,
    newcdat: staticCdatAttributes,
    cancelprogrammedsaving: staticCancelProgammedSavingAttributes,
    modifydeadlineactionprogrammedsaving: staticModifyActionProgrammedSavingAttributes,
    cancelcdat: staticCancelCdatAttributes,
    modifydeadlineactioncdat: staticModifyActionCdatAttributes,
    modifyquotavalueprogrammedsaving: staticModifyQuotaValueProgrammedSavingAttributes,
  };

  const attributes = attributeMap[request.requestType] || [];
  return attributes.map((attr) => ({
    ...attr,
    value: request[attr.id as keyof IRequest] as string | number | Date,
  }));
};

export { generateAttributes };
