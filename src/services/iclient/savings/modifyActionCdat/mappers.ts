import { IModifyActionCdatRequest, IModifyActionCdatResponse } from "./types";

const mapModifyActionCdatEntityToApi = (
  cdatRequest: IModifyActionCdatRequest,
): Record<string, string | number | object> => {
  return {
    clientCode: cdatRequest.customerCode,
    details: {
      productNumber: cdatRequest.savingNumber,
      actionAfterExpiration: cdatRequest.actionExpiration,
    },
    issuer: "Personas",
    requestType: "modifydeadlineactioncdat",
  };
};

const mapModifyActionCdatApiToEntity = (
  cdatRequest: Record<string, string | object>,
): IModifyActionCdatResponse => {
  return {
    cus: String(cdatRequest.cus),
    destination: String(cdatRequest.destination),
    productRequestId: String(cdatRequest.productRequestId),
    requestDate: new Date(String(cdatRequest.requestDate)),
    status: String(cdatRequest.status),
  };
};
export { mapModifyActionCdatApiToEntity, mapModifyActionCdatEntityToApi };
