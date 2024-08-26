const mapTermsConditionsApiToEntity = (
  termCondition: Record<string, string | number | object>,
): string => {
  return String(termCondition.description);
};

export { mapTermsConditionsApiToEntity };
