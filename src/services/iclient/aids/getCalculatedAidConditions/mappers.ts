import {
  ICalculatedAidConditionsRequest,
  ICalculatedAidConditionsResponse,
} from "./types";

const mapConditionsEntityToApi = (
  condition: ICalculatedAidConditionsRequest,
): Record<string, string | number> => {
  return {
    aidCode: condition.aidId,
    beneficiaryPublicCode: condition.beneficiaryId,
    customerPublicCode: condition.userIdentification,
  };
};

const mapConditionsApiToEntity = (
  conditionOption: Record<string, string | object>,
): ICalculatedAidConditionsResponse => {
  return {
    aidLimit: Number(conditionOption.aidLimit),
    hasUtilization: Boolean(conditionOption.hasUtilization),
    utilizationLimit: Number(conditionOption.utilizationLimit),
  };
};

export { mapConditionsApiToEntity, mapConditionsEntityToApi };
