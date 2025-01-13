import {
  IModifyQuotaProgrammedSavingRequest,
  IModifyQuotaProgrammedSavingResponse,
} from "./types";

const mapModifyQuotaProgrammedSavingEntityToApi = (
  programmedSavingRequest: IModifyQuotaProgrammedSavingRequest,
): Record<string, string | number | object> => {
  return {
    clientCode: programmedSavingRequest.customerCode,
    details: {
      productNumber: programmedSavingRequest.savingNumber,
      quotaValue: programmedSavingRequest.quotaValue,
    },
    issuer: "Personas",
    requestType: "modifyquotavalueprogrammedsaving",
  };
};

const mapModifyQuotaProgrammedSavingApiToEntity = (
  programmedSavingRequest: Record<string, string | object>,
): IModifyQuotaProgrammedSavingResponse => {
  return {
    cus: String(programmedSavingRequest.cus),
    destination: String(programmedSavingRequest.destination),
    productRequestId: String(programmedSavingRequest.productRequestId),
    requestDate: new Date(String(programmedSavingRequest.requestDate)),
    status: String(programmedSavingRequest.status),
  };
};
export {
  mapModifyQuotaProgrammedSavingApiToEntity,
  mapModifyQuotaProgrammedSavingEntityToApi,
};
