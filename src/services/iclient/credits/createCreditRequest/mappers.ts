import { IRequestCreditRequest, IRequestCreditResponse } from "./types";

const mapRequestCreditEntityToApi = (
  creditRequest: IRequestCreditRequest,
): Record<string, string | number | object> => {
  return {
    clientCode: creditRequest.customerCode,
    details: {
      cus: "",
      productCode: creditRequest.product,
      productDescription: creditRequest.productName,
      destinationCode: creditRequest.destination,
      destinationDescription: creditRequest.destinationName,
      amortizationType: creditRequest.amortizationType,
      conditions: {
        requestedAmount: creditRequest.conditions.amount,
        quotaValue: creditRequest.conditions.quota,
        quotas: creditRequest.conditions.deadline,
        capitalPaymentMethod: creditRequest.conditions.paymentMethod,
        capitalPaymentMethodDetail: creditRequest.conditions.paymentMethodName,
        capitalPeriodicity: creditRequest.conditions.periodicityInMonths,
        remunerativeInterestRate: creditRequest.conditions.rate,
        disbursementDetails: {
          charges: creditRequest.conditions.disbursement.charges,
          discounts: creditRequest.conditions.disbursement.discounts,
          interestAdjustmentCycle:
            creditRequest.conditions.disbursement.anticipatedInterest,
          netDisbursementApprox: creditRequest.conditions.disbursement.netValue,
        },
      },
      disbursementMethod: {
        disbursementMethodCode: creditRequest.disbursmentMethod.id,
        disbursementMethodDetail: creditRequest.disbursmentMethod.name,
        savingsAccountNumber: creditRequest.disbursmentMethod.accountNumber,
        accountNumber: creditRequest.disbursmentMethod.transferAccountNumber,
        accountTypeCode: creditRequest.disbursmentMethod.transferAccountType,
        accountTypeDetail: creditRequest.disbursmentMethod.transferBankEntity,
        bankCode: creditRequest.disbursmentMethod.transferBankEntity,
        bankDetail: creditRequest.disbursmentMethod.transferBankEntity,
        businessName: creditRequest.disbursmentMethod.businessName,
        firstName: creditRequest.disbursmentMethod.firstName,
        secondName: creditRequest.disbursmentMethod.secondName,
        genderCode: creditRequest.disbursmentMethod.gender,
        genderDetail: creditRequest.disbursmentMethod.genderName,
        identificationDetail: creditRequest.disbursmentMethod.identification,
        identificationNumber: creditRequest.disbursmentMethod.identification,
        identificationTypeCode:
          creditRequest.disbursmentMethod.identificationType,
        firstLastName: creditRequest.disbursmentMethod.firstLastName,
        secondLastName: creditRequest.disbursmentMethod.secondLastName,
      },
      systemRequirements: creditRequest.validations.map((validation) => ({
        evaluationDescription: validation.evaluationDescription,
        profile: validation.profile,
        requirementCode: validation.id,
        requirementName: validation.label,
        responseCode: validation.responseCode,
      })),
      documentRequirements: creditRequest.documentaryRequirements.map(
        (document) => ({
          documentTypeCode: document.documentType,
          sequence: document.sequence?.toString(),
          fileName: document.file.name,
        }),
      ),
      acceptances: {
        codes: creditRequest.termsConditions.ids,
        description: creditRequest.termsConditions.description,
      },
      comment: creditRequest.comments,
    },
    issuer: "Personas",
    requestType: "credit",
  };
};

const mapRequestCreditApiToEntity = (
  creditRequest: Record<string, string | object>,
): IRequestCreditResponse => {
  return {
    cus: String(creditRequest.cus),
    destination: String(creditRequest.destinationCode),
    productRequestId: String(creditRequest.productRequestId),
    requestDate: new Date(String(creditRequest.requestDate)),
    status: String(creditRequest.status),
  };
};
export { mapRequestCreditApiToEntity, mapRequestCreditEntityToApi };
