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
    capitalPaymentPeriod: requirement.periodicity,
    numQuotas: requirement.deadline,
    nominalRate: Number(requirement.rate.toFixed(2)),
    amortizationType: requirement.amortizationType,
    interestPaymentPeriod: "",
    periodicity: requirement.periodicity,
    quotaValue: requirement.quota,
    amountToTurn: requirement.netValue,
    requestDate: requirement.requestDate.toISOString(),
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
