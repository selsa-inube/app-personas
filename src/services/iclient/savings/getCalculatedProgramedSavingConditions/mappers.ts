import {
  ICalculatedProgramedSavingConditionsRequest,
  ICalculatedProgramedSavingConditionsResponse,
} from "./types";

const mapConditionsEntityToApi = (
  condition: ICalculatedProgramedSavingConditionsRequest,
): Record<string, string | number> => {
  return {
    paymentMethod: condition.paymentMethod,
    customerCode: condition.userIdentification,
    savingCode: condition.productId,
    periodicity: condition.periodicity,
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
  };
};

export { mapConditionsApiToEntity, mapConditionsEntityToApi };
