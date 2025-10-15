import {
  ICalculatedAidConditionsRequest,
  ICalculatedAidConditionsResponse,
} from "./types";

const mapConditionsEntityToApi = (
  condition: ICalculatedAidConditionsRequest,
): Record<string, string | number> => {
  const { aidCode, beneficiaryPublicCode, customerPublicCode, aidValue } = condition;
  return {
    aidCode,
    beneficiaryPublicCode,
    customerPublicCode,
    aidValue
  };
};

const mapConditionsApiToEntity = (
  conditionOption: Record<string, string | object>,
): ICalculatedAidConditionsResponse => {
  const { aidLimit, hasUtilization, utilizationLimit, aidValue, remainingQuota } = conditionOption;
  return {
    aidLimit: Number(aidLimit),
    hasUtilization: Boolean(hasUtilization),
    utilizationLimit: Number(utilizationLimit),
    aidValue: Number(aidValue),
    remainingQuota: Number(remainingQuota),
  };
};

export { mapConditionsApiToEntity, mapConditionsEntityToApi };
