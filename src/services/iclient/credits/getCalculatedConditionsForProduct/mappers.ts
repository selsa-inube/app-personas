import {
  ICalculatedConditionsRequest,
  ICalculatedConditionsResponse,
} from "./types";

const mapConditionsEntityToApi = (
  condition: ICalculatedConditionsRequest,
): Record<string, string | number> => {
  return {
    productId: condition.productId,
    paymentMethodId: condition.paymentMethodId,
    customerCode: condition.userIdentification,
    amount: condition.amount,
  };
};

const mapConditionsApiToEntity = (
  conditionOption: Record<string, string | object>,
): ICalculatedConditionsResponse => {
  return {
    productId: String(conditionOption.productId),
    paymentMethodId: String(conditionOption.paymentMethodId),
    userIdentification: String(conditionOption.customerCode),
    amount: Number(conditionOption.amount),
    cutOffDate: String(conditionOption.cutOffDate),
    deadline: Number(conditionOption.deadline),
    rate: Number(conditionOption.rate),
  };
};

export { mapConditionsEntityToApi, mapConditionsApiToEntity };
