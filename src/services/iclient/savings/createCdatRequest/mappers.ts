import { IRequestCdatRequest, IRequestCdatResponse } from "./types";

const mapRequestCdatEntityToApi = (
  cdatRequest: IRequestCdatRequest,
): Record<string, string | number | object> => {
  return {
    customerCode: cdatRequest.customerCode,
    customerName: cdatRequest.customerName,
    comments: cdatRequest.comments,
    productRequest: {
      details: {
        customerCode: cdatRequest.customerCode,
        cdatTypeCode: cdatRequest.product,
        requestedAmount: cdatRequest.requestedAmount,
        termInDays: Number(cdatRequest.termInDays),
        interestRate: cdatRequest.interestRate,
        actionAfterExpiration: cdatRequest.actionAfterExpiration,
        disbursementMethod: {
          disbursementMethodCode: cdatRequest.disbursmentMethod.id,
          disbursementMethodDetail: cdatRequest.disbursmentMethod.name,
          savingsAccountNumber: cdatRequest.disbursmentMethod.accountNumber,
          bankCode: cdatRequest.disbursmentMethod.transferBankEntity,
          bankDetail: cdatRequest.disbursmentMethod.transferBankEntity,
          accountNumber: cdatRequest.disbursmentMethod.transferAccountNumber,
          accountTypeCode: cdatRequest.disbursmentMethod.transferAccountType,
          accountTypeDescription:
            cdatRequest.disbursmentMethod.transferBankEntity,
          identificationNumber: cdatRequest.disbursmentMethod.identification,
          internalCode: cdatRequest.disbursmentMethod.id,
          identificationTypeCode:
            cdatRequest.disbursmentMethod.identificationType,
          identificationDescription:
            cdatRequest.disbursmentMethod.identification,
          firstLastName: cdatRequest.disbursmentMethod.firstLastName,
          secondLastName: cdatRequest.disbursmentMethod.secondLastName,
          firstName: cdatRequest.disbursmentMethod.firstName,
          secondName: cdatRequest.disbursmentMethod.secondName,
          gender: cdatRequest.disbursmentMethod.gender,
          genderDetail: cdatRequest.disbursmentMethod.genderName,
        },
        acceptances: {
          codes: cdatRequest.termsConditions.ids,
          description: cdatRequest.termsConditions.description,
        },
      },
      issuer: "Personas",
    },
    paymentMethod: {
      paymentType: cdatRequest.paymentMethod.paymentType,
      accountNumber: cdatRequest.paymentMethod.accountNumber,
      descriptionPayment: cdatRequest.paymentMethod.descriptionPayment,
      value: cdatRequest.paymentMethod.value,
      urlRedirect: cdatRequest.paymentMethod.urlRedirect,
    },
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
