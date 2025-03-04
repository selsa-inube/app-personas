import { ITermsConditionsResponse } from "./types";

const mapTermsConditionsApiToEntity = (
  termCondition: Record<string, string | number | object>,
): ITermsConditionsResponse => {
  return {
    codes: Array.isArray(termCondition.productCode)
      ? termCondition.productCode.join(",")
      : "",
    termsConditions: termCondition.description
      ? String(termCondition.description)
          .split("\n")
          .map((paragraph) => paragraph)
      : [],
  };
};

export { mapTermsConditionsApiToEntity };
