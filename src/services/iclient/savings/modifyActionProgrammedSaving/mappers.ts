import {
  IModifyActionProgrammedSavingRequest,
  IModifyActionProgrammedSavingResponse,
} from "./types";

const mapModifyActionProgrammedSavingEntityToApi = (
  programmedSavingRequest: IModifyActionProgrammedSavingRequest,
): Record<string, string | number | object> => {
  return {
    clientCode: programmedSavingRequest.customerCode,
    details: {
      productNumber: programmedSavingRequest.savingNumber,
      actionAfterExpiration: programmedSavingRequest.actionExpiration,
    },
    issuer: "Personas",
    requestType: "modifydeadlineactionprogrammedsaving",
  };
};

const mapModifyActionProgrammedSavingApiToEntity = (
  programmedSavingRequest: Record<string, string | object>,
): IModifyActionProgrammedSavingResponse => {
  return {
    cus: String(programmedSavingRequest.cus),
    destination: String(programmedSavingRequest.destinationCode),
    productRequestId: String(programmedSavingRequest.productRequestId),
    requestDate: new Date(String(programmedSavingRequest.requestDate)),
    status: String(programmedSavingRequest.status),
  };
};
export {
  mapModifyActionProgrammedSavingApiToEntity,
  mapModifyActionProgrammedSavingEntityToApi,
};
