import {
  ICalculatedCdatConditionsRequest,
  ICalculatedCdatConditionsResponse,
} from "./types";

const mapConditionsEntityToApi = (
  condition: ICalculatedCdatConditionsRequest,
): Record<string, string | number> => {
  return {
    customerCode: condition.userIdentification,
    cdatCode: condition.productId,
    termInDays: condition.deadline,
    amount: condition.investmentValue,
  };
};

const mapConditionsApiToEntity = (
  conditionOption: Record<string, string | object>,
): ICalculatedCdatConditionsResponse => {
  return {
    expirationDate: new Date(conditionOption.expirationDate.toString()),
    returns: Number(conditionOption.returns),
    withholdingTax: Number(conditionOption.withholdingTax),
    rate: Number(conditionOption.effectiveAnnualInterestRate),
  };
};

export { mapConditionsApiToEntity, mapConditionsEntityToApi };
