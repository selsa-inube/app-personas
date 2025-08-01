import {
  ICalculatedProgramedSavingConditionsRequest,
  ICalculatedProgramedSavingConditionsResponse,
} from "./types";

const mapConditionsEntityToApi = (
  condition: ICalculatedProgramedSavingConditionsRequest,
): Record<string, string | number | undefined> => {
  return {
    paymentMethod: condition.paymentMethod,
    customerCode: condition.userIdentification,
    savingCode: condition.productId,
    periodicity: condition.periodicity,
    deadlineType: condition.deadlineType,
    numQuotas: condition.deadline,
    quotaValue: condition.quotaValue,
  };
};

const mapConditionsApiToEntity = (
  conditionOption: Record<string, string | object>,
): ICalculatedProgramedSavingConditionsResponse => {
  return {
    netValue: Number(conditionOption.netValue),
    returns: Number(conditionOption.returns),
    withholdingTax: Number(conditionOption.withholdingTax),
    gmf: Number(conditionOption.gmf),
    disbursement: Number(conditionOption.disbursement),
    rate: Number(conditionOption.rate),
    numQuotas: Number(conditionOption.numQuotas || 0),
    deadlineDate: String(conditionOption.deadlineDate),
  };
};

export { mapConditionsApiToEntity, mapConditionsEntityToApi };
