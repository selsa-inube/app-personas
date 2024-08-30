import { ITermsConditionsResponse } from "./types";

const mapTermsConditionsApiToEntity = (
  termCondition: Record<string, string | number | object>,
): ITermsConditionsResponse => {
  return {
    codes: Array.isArray(termCondition.codes) ? termCondition.codes : [],
    termsConditions: String(termCondition.description)
      .split("\n")
      .map((paragraph) => paragraph),
  };
};

export { mapTermsConditionsApiToEntity };
