import {
  IRequestProgrammedSavingRequest,
  IRequestProgrammedSavingResponse,
} from "./types";

const mapRequestProgrammedSavingEntityToApi = (
  programmedSavingRequest: IRequestProgrammedSavingRequest,
): Record<string, string | number | object> => {
  return {
    clientCode: programmedSavingRequest.customerCode,
    details: {
      acceptances: {
        codes: programmedSavingRequest.termsConditions.ids,
        description: programmedSavingRequest.termsConditions.description,
      },
      comment: programmedSavingRequest.comments,
      conditions: {
        actionAfterExpiration:
          programmedSavingRequest.conditions.actionExpiration,
        numQuotas: programmedSavingRequest.conditions.deadline,
        paymentMethod: programmedSavingRequest.conditions.paymentMethod,
        paymentMethodName: programmedSavingRequest.conditions.paymentMethodName,
        periodicity: programmedSavingRequest.conditions.periodicity,
        quotaValue: programmedSavingRequest.conditions.quota,
      },
      customerCode: programmedSavingRequest.customerCode,
      cus: "",
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
      documentRequirements: [],
      productAlias: "",
      productCode: programmedSavingRequest.product,
      productName: programmedSavingRequest.productName,
    },
    issuer: "Personas",
    requestType: "newprogrammedsaving",
  };
};

const mapRequestProgrammedSavingApiToEntity = (
  programmedSavingRequest: Record<string, string | object>,
): IRequestProgrammedSavingResponse => {
  return {
    cus: String(programmedSavingRequest.cus),
    destination: String(programmedSavingRequest.destinationCode),
    productRequestId: String(programmedSavingRequest.productRequestId),
    requestDate: new Date(String(programmedSavingRequest.requestDate)),
    status: String(programmedSavingRequest.status),
  };
};
export {
  mapRequestProgrammedSavingApiToEntity,
  mapRequestProgrammedSavingEntityToApi,
};
