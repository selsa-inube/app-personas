import { IRateTerm } from "@pages/request/savings/CdatRequest/forms/DeadlineForm/types";

const mapRateTermApiToEntity = (
  rateTerm: Record<string, string | number | object>,
): IRateTerm => {
  return {
    deadlineFrom: Number(rateTerm.investmentDurationFrom),
    deadlineTo: Number(rateTerm.investmentDurationTo),
    rate: Number(rateTerm.effectivePlacementRateFrom),
  };
};

const mapRateTermsApiToEntities = (
  rateTerms: Record<string, string | number | object>[],
): IRateTerm[] => {
  return rateTerms.map((rateTerm) => mapRateTermApiToEntity(rateTerm));
};

export { mapRateTermsApiToEntities, mapRateTermApiToEntity };
