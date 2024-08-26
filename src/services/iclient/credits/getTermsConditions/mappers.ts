const mapTermsConditionsApiToEntity = (
  termCondition: Record<string, string | number | object>,
): string[] => {
  return String(termCondition.description)
    .split("\n")
    .map((paragraph) => paragraph);
};

export { mapTermsConditionsApiToEntity };
