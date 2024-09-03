import { IValidation, ValidationValueType } from "src/model/entity/service";
import { capitalizeText, correctSpecialCharacters } from "src/utils/texts";
import { IRequirementRequest, IRequirementResponse } from "./types";

const mapRequirementEntityToApi = (
  requirement: IRequirementRequest,
): Record<string, string | number | object> => {
  return {
    productId: requirement.productId,
    productName: requirement.productName,
    destinationId: requirement.destinationId,
    destinationName: requirement.destinationName,
    customerCode: requirement.customerCode,
    customerName: requirement.customerName,
    paymentMethod: requirement.paymentMethod,
    paymentMethodName: requirement.paymentMethodName,
    requestAmount: requirement.amount,
    creditAmount: requirement.amount,
    numQuotas: requirement.deadline,
    nominalRate: requirement.rate,
    amortizationType: requirement.amortizationType,
    periodicity: requirement.periodicity,
    quotaValue: requirement.quota,
    amountToTurn: requirement.netValue,
    requestDate: requirement.requestDate.toISOString(),
    disbursementMethod: {
      disbursementMethodCode: requirement.disbursmentMethod.id,
      disbursementMethodDetail: requirement.disbursmentMethod.name,
      savingsAccountNumber: requirement.disbursmentMethod.accountNumber,
      accountNumber: requirement.disbursmentMethod.transferAccountNumber,
      accountTypeCode: requirement.disbursmentMethod.transferAccountType,
      accountTypeDetail: requirement.disbursmentMethod.transferBankEntity,
      bankCode: requirement.disbursmentMethod.transferBankEntity,
      bankDetail: requirement.disbursmentMethod.transferBankEntity,
      businessName: requirement.disbursmentMethod.businessName,
      firstName: requirement.disbursmentMethod.firstName,
      genderCode: requirement.disbursmentMethod.gender,
      genderDetail: requirement.disbursmentMethod.genderName,
      identificationDetail: requirement.disbursmentMethod.identification,
      identificationNumber: requirement.disbursmentMethod.identification,
      identificationTypeCode: requirement.disbursmentMethod.identificationType,
      lastName: requirement.disbursmentMethod.lastName,
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
