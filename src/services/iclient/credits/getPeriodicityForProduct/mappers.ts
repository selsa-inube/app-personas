import { IPeriodicity } from "src/model/entity/periodicity";
import { capitalizeText } from "src/utils/texts";

const mapPeriodicityApiToEntity = (
  periodicity: Record<string, string | number | object>,
): IPeriodicity => {
  return {
    code: String(periodicity.code).toLowerCase(),
    description: capitalizeText(String(periodicity.description)),
    periodicityInMonths: Number(periodicity.periodicityInMonths),
    periodicityInDays: Number(periodicity.periodicityInDays),
  };
};

const mapPeriodicitiesApiToEntities = (
  peridiocities: Record<string, string | number | object>[],
): IPeriodicity[] => {
  return peridiocities.map((peridiocities) =>
    mapPeriodicityApiToEntity(peridiocities),
  );
};

export { mapPeriodicityApiToEntity, mapPeriodicitiesApiToEntities };
