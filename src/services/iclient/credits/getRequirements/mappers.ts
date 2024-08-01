import {
  IRequirementRequest,
  IRequirementRequestResponse,
} from "src/model/entity/request";
import { IValidation, ValidationValueType } from "src/model/entity/service";
import { capitalizeText } from "src/utils/texts";

const mapRequirementEntityToApi = (
  requirement: IRequirementRequest,
): Record<string, string | number | object> => {
  const requestDate = new Date();

  return {
    productId: requirement.productId,
    productName: requirement.productName,
    destinationId: requirement.destinationId,
    destinationName: requirement.destinationName,
    customerCode: requirement.customerCode,
    customerName: requirement.customerName,
    paymentMethodCode: requirement.paymentMethodCode,
    paymentMethodName: requirement.paymentMethodName,
    requestAmount: requirement.requestAmount,
    creditAmount: requirement.creditAmount,
    capitalPaymentPeriod: requirement.capitalPaymentPeriod,
    numQuotas: requirement.numQuotas,
    nominalRate: requirement.nominalRate,
    amortizationType: requirement.amortizationType,
    interestPaymentPeriod: requirement.interestPaymentPeriod,
    periodicity: requirement.periodicity,
    quotaValue: requirement.quotaValue,
    amountToTurn: requirement.amountToTurn,
    requestDate,
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
    label: capitalizeText(String(requirement.requirementName)),
    failDetails: capitalizeText(String(requirement.errorDescription)),
    value: resultValues[String(requirement.responseCode)] || "pending",
  };
};

const mapRequirementsApiToEntities = (
  requirements: Record<string, string | number | object>[],
): IRequirementRequestResponse => {
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
