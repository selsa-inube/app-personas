import { IRequestAidRequest, IRequestAidResponse } from "./types";

const mapRequestAidEntityToApi = (
  aidRequest: IRequestAidRequest,
): Record<string, string | number | object> => {
  return {
    clientCode: aidRequest.customerCode,
    details: {
      customerName: aidRequest.customerName,
      productCode: aidRequest.product,
      productDescription: aidRequest.productName,
      dateEvaluationConditions: new Date().toISOString(),
      requestedValue: aidRequest.amount,
      comments: aidRequest.comments,
      beneficiary: {
        relationship: aidRequest.beneficiary?.relationshipCode,
        customerCode: aidRequest.beneficiary?.identificationNumber,
        customerName: aidRequest.beneficiary?.name,
      },
      disbursementMethod: {
        disbursementMethodCode: aidRequest.disbursmentMethod.id,
        disbursementMethodDetail: aidRequest.disbursmentMethod.name,
        savingsAccountNumber: aidRequest.disbursmentMethod.accountNumber,
        accountNumber: aidRequest.disbursmentMethod.transferAccountNumber,
        accountTypeCode: aidRequest.disbursmentMethod.transferAccountType,
        accountTypeDetail: aidRequest.disbursmentMethod.transferBankEntity,
        bankCode: aidRequest.disbursmentMethod.transferBankEntity,
        bankDetail: aidRequest.disbursmentMethod.transferBankEntity,
        businessName: aidRequest.disbursmentMethod.businessName,
        firstName: aidRequest.disbursmentMethod.firstName,
        secondName: aidRequest.disbursmentMethod.secondName,
        genderCode: aidRequest.disbursmentMethod.gender,
        genderDetail: aidRequest.disbursmentMethod.genderName,
        identificationDetail: aidRequest.disbursmentMethod.identification,
        identificationNumber: aidRequest.disbursmentMethod.identification,
        identificationTypeCode: aidRequest.disbursmentMethod.identificationType,
        firstLastName: aidRequest.disbursmentMethod.firstLastName,
        secondLastName: aidRequest.disbursmentMethod.secondLastName,
      },
      documentRequirements: aidRequest.documentaryRequirements.map(
        (document) => ({
          documentTypeCode: document.documentType,
          sequence: document.sequence?.toString(),
          fileName: document.file.name,
          requirementCode: document.requirementCode,
          requirementName: document.label,
          profile: document.profile,
          responseCode: document.responseCode,
          evaluationDescription: document.evaluationDescription,
          documentTypeDescription: document.documentTypeDescription,
        }),
      ),
      acceptances: {
        codes: aidRequest.termsConditions.ids,
        description: aidRequest.termsConditions.description,
      },
    },
    issuer: "Personas",
    requestType: "aid",
  };
};

const mapRequestAidApiToEntity = (
  aidRequest: Record<string, string | object>,
): IRequestAidResponse => {
  return {
    cus: String(aidRequest.cus),
    destination: String(aidRequest.destinationCode),
    productRequestId: String(aidRequest.productRequestId),
    requestDate: new Date(String(aidRequest.requestDate)),
    status: String(aidRequest.status),
  };
};
export { mapRequestAidApiToEntity, mapRequestAidEntityToApi };
