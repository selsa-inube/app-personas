import { IRequestCdatRequest, IRequestCdatResponse } from "./types";

const mapRequestCdatEntityToApi = (
  cdatRequest: IRequestCdatRequest,
): Record<string, string | number | object> => {
  return {
    clientCode: cdatRequest.customerCode,
    details: {
      acceptances: {
        codes: cdatRequest.termsConditions.ids,
        description: cdatRequest.termsConditions.description,
      },
      comment: cdatRequest.comments,
      customerCode: cdatRequest.customerCode,
      cus: "",
      disbursementMethod: {
        disbursementMethodCode: cdatRequest.disbursmentMethod.id,
        disbursementMethodDetail: cdatRequest.disbursmentMethod.name,
        savingsAccountNumber: cdatRequest.disbursmentMethod.accountNumber,
        accountNumber: cdatRequest.disbursmentMethod.transferAccountNumber,
        accountTypeCode: cdatRequest.disbursmentMethod.transferAccountType,
        accountTypeDetail: cdatRequest.disbursmentMethod.transferBankEntity,
        bankCode: cdatRequest.disbursmentMethod.transferBankEntity,
        bankDetail: cdatRequest.disbursmentMethod.transferBankEntity,
        businessName: cdatRequest.disbursmentMethod.businessName,
        firstName: cdatRequest.disbursmentMethod.firstName,
        secondName: cdatRequest.disbursmentMethod.secondName,
        genderCode: cdatRequest.disbursmentMethod.gender,
        genderDetail: cdatRequest.disbursmentMethod.genderName,
        identificationDetail: cdatRequest.disbursmentMethod.identification,
        identificationNumber: cdatRequest.disbursmentMethod.identification,
        identificationTypeCode:
          cdatRequest.disbursmentMethod.identificationType,
        firstLastName: cdatRequest.disbursmentMethod.firstLastName,
        secondLastName: cdatRequest.disbursmentMethod.secondLastName,
      },
      documentRequirements: [],
      savingAlias: "",
      savingCode: cdatRequest.product,
      savingName: cdatRequest.productName,
      systemRequirements: cdatRequest.validations.map((validation) => ({
        evaluationDescription: validation.evaluationDescription,
        profile: validation.profile,
        requirementCode: validation.id,
        requirementName: validation.label,
        responseCode: validation.responseCode,
      })),
    },
    issuer: "Personas",
    requestType: "programmedsaving",
  };
};

const mapRequestCdatApiToEntity = (
  cdatRequest: Record<string, string | object>,
): IRequestCdatResponse => {
  const causes = cdatRequest.causas;
  let state = "";
  let message = "";

  if (causes && Array.isArray(causes)) {
    state = String(causes[0].id);
    message = String(causes[0].message);
  }

  return {
    trackingCode: String(cdatRequest.trackingCode),
    url: cdatRequest.url ? String(cdatRequest.url) : undefined,
    state,
    message,
  };
};
export { mapRequestCdatApiToEntity, mapRequestCdatEntityToApi };
