import { IValidation, ValidationValueType } from "src/model/entity/service";
import { capitalizeText, correctSpecialCharacters } from "src/utils/texts";
import { IRequirementRequest, IRequirementResponse } from "./types";

const mapRequirementEntityToApi = (
  requirement: IRequirementRequest,
): Record<string, string | number | object | undefined> => {
  if (requirement.requestType === "aid") {
    return {
      requestType: requirement.requestType,
      customerCode: requirement.customerCode,
      customerName: requirement.customerName,
      requestDate: requirement.requestDate.toISOString(),
      aidData: {
        aidCode: requirement.requestData.productId,
        aidName: requirement.requestData.productName,
        requestAmount: requirement.requestData.amount,
        disbursementMethod: {
          disbursementMethodCode: requirement.requestData.disbursmentMethod.id,
          disbursementMethodDetail:
            requirement.requestData.disbursmentMethod.name,
          savingsAccountNumber:
            requirement.requestData.disbursmentMethod.accountNumber,
          accountNumber:
            requirement.requestData.disbursmentMethod.transferAccountNumber,
          accountTypeCode:
            requirement.requestData.disbursmentMethod.transferAccountType,
          accountTypeDetail:
            requirement.requestData.disbursmentMethod.transferBankEntity,
          bankCode:
            requirement.requestData.disbursmentMethod.transferBankEntity,
          bankDetail:
            requirement.requestData.disbursmentMethod.transferBankEntity,
          businessName: requirement.requestData.disbursmentMethod.businessName,
          firstName: requirement.requestData.disbursmentMethod.firstName,
          genderCode: requirement.requestData.disbursmentMethod.gender,
          genderDetail: requirement.requestData.disbursmentMethod.genderName,
          identificationDetail:
            requirement.requestData.disbursmentMethod.identification,
          identificationNumber:
            requirement.requestData.disbursmentMethod.identification,
          identificationTypeCode:
            requirement.requestData.disbursmentMethod.identificationType,
          lastName: requirement.requestData.disbursmentMethod.lastName,
        },
      },
    };
  }

  return {
    requestType: requirement.requestType,
    customerCode: requirement.customerCode,
    customerName: requirement.customerName,
    requestDate: requirement.requestDate.toISOString(),
    creditData: {
      productId: requirement.requestData.productId,
      productName: requirement.requestData.productName,
      destinationId: requirement.requestData.destinationId,
      destinationName: requirement.requestData.destinationName,
      paymentMethod: requirement.requestData.paymentMethod,
      paymentMethodName: requirement.requestData.paymentMethodName,
      requestAmount: requirement.requestData.amount,
      creditAmount: requirement.requestData.amount,
      numQuotas: requirement.requestData.deadline,
      nominalRate: requirement.requestData.rate,
      amortizationType: requirement.requestData.amortizationType,
      periodicity: requirement.requestData.periodicity,
      quotaValue: requirement.requestData.quota,
      amountToTurn: requirement.requestData.netValue,
      disbursementMethod: {
        disbursementMethodCode: requirement.requestData.disbursmentMethod.id,
        disbursementMethodDetail:
          requirement.requestData.disbursmentMethod.name,
        savingsAccountNumber:
          requirement.requestData.disbursmentMethod.accountNumber,
        accountNumber:
          requirement.requestData.disbursmentMethod.transferAccountNumber,
        accountTypeCode:
          requirement.requestData.disbursmentMethod.transferAccountType,
        accountTypeDetail:
          requirement.requestData.disbursmentMethod.transferBankEntity,
        bankCode: requirement.requestData.disbursmentMethod.transferBankEntity,
        bankDetail:
          requirement.requestData.disbursmentMethod.transferBankEntity,
        businessName: requirement.requestData.disbursmentMethod.businessName,
        firstName: requirement.requestData.disbursmentMethod.firstName,
        genderCode: requirement.requestData.disbursmentMethod.gender,
        genderDetail: requirement.requestData.disbursmentMethod.genderName,
        identificationDetail:
          requirement.requestData.disbursmentMethod.identification,
        identificationNumber:
          requirement.requestData.disbursmentMethod.identification,
        identificationTypeCode:
          requirement.requestData.disbursmentMethod.identificationType,
        lastName: requirement.requestData.disbursmentMethod.lastName,
      },
    },
  };
};

const mapRequirementApiToEntity = (
  requirement: Record<string, string | number | object>,
): IValidation => {
  const resultValues: Record<string, ValidationValueType> = {
    CUMPLE: "success",
    NO_CUMPLE: "fail",
  };

  return {
    id: String(requirement.requirementCode),
    label: capitalizeText(
      correctSpecialCharacters(String(requirement.requirementName)),
    ),
    failDetails: capitalizeText(
      correctSpecialCharacters(String(requirement.errorDescription)),
    ),
    value: resultValues[String(requirement.responseCode)] || "pending",
    documentType: requirement.documentTypeCode
      ? String(requirement.documentTypeCode)
      : undefined,
    profile: requirement.profile ? String(requirement.profile) : undefined,
    responseCode: String(requirement.responseCode) || "",
    evaluationDescription: "",
    isRequired: !!requirement.isMandatory,
  };
};

const mapRequirementsApiToEntities = (
  requirements: Record<string, string | number | object>[],
): IRequirementResponse => {
  const validations = Array.isArray(Object(requirements).validations)
    ? Object(requirements).validations
    : [];

  const documents = Array.isArray(Object(requirements).documents)
    ? Object(requirements).documents
    : [];

  return {
    validations: validations.map(
      (requirement: Record<string, string | number | object>) =>
        mapRequirementApiToEntity(requirement),
    ),
    documents: documents.map(
      (requirement: Record<string, string | number | object>) =>
        mapRequirementApiToEntity(requirement),
    ),
  };
};

export {
  mapRequirementApiToEntity,
  mapRequirementEntityToApi,
  mapRequirementsApiToEntities,
};
