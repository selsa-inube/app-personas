import {
  ICancelProgrammedSavingRequest,
  ICancelProgrammedSavingResponse,
} from "./types";

const mapCancelProgrammedSavingEntityToApi = (
  programmedSavingRequest: ICancelProgrammedSavingRequest,
): Record<string, string | number | object> => {
  return {
    clientCode: programmedSavingRequest.customerCode,
    details: {
      productNumber: programmedSavingRequest.savingNumber,
      productDescription: programmedSavingRequest.savingName,
      balanceSaving: programmedSavingRequest.balanceSaving,
      disbursementMethod: {
        disbursementMethodCode: programmedSavingRequest.disbursmentMethod.id,
        disbursementMethodDetail:
          programmedSavingRequest.disbursmentMethod.name,
        savingsAccountNumber:
          programmedSavingRequest.disbursmentMethod.accountNumber,
        accountNumber:
          programmedSavingRequest.disbursmentMethod.transferAccountNumber,
        accountTypeCode:
          programmedSavingRequest.disbursmentMethod.transferAccountType,
        accountTypeDetail:
          programmedSavingRequest.disbursmentMethod.transferBankEntity,
        bankCode: programmedSavingRequest.disbursmentMethod.transferBankEntity,
        bankDetail:
          programmedSavingRequest.disbursmentMethod.transferBankEntity,
        businessName: programmedSavingRequest.disbursmentMethod.businessName,
        firstName: programmedSavingRequest.disbursmentMethod.firstName,
        secondName: programmedSavingRequest.disbursmentMethod.secondName,
        genderCode: programmedSavingRequest.disbursmentMethod.gender,
        genderDetail: programmedSavingRequest.disbursmentMethod.genderName,
        identificationDetail:
          programmedSavingRequest.disbursmentMethod.identification,
        identificationNumber:
          programmedSavingRequest.disbursmentMethod.identification,
        identificationTypeCode:
          programmedSavingRequest.disbursmentMethod.identificationType,
        firstLastName: programmedSavingRequest.disbursmentMethod.firstLastName,
        secondLastName:
          programmedSavingRequest.disbursmentMethod.secondLastName,
      },
    },
    issuer: "Personas",
    requestType: "cancelprogrammedsaving",
  };
};

const mapCancelProgrammedSavingApiToEntity = (
  programmedSavingRequest: Record<string, string | object>,
): ICancelProgrammedSavingResponse => {
  return {
    cus: String(programmedSavingRequest.cus),
    destination: String(programmedSavingRequest.destination),
    productRequestId: String(programmedSavingRequest.productRequestId),
    requestDate: new Date(String(programmedSavingRequest.requestDate)),
    status: String(programmedSavingRequest.status),
  };
};
export {
  mapCancelProgrammedSavingApiToEntity,
  mapCancelProgrammedSavingEntityToApi,
};
