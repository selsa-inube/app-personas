import { IPeriodicity } from "src/model/entity/periodicity";
import { capitalizeText } from "src/utils/texts";

const mapPeriodicityApiToEntity = (
  periodicity: Record<string, string | number | object>,
): IPeriodicity => {
  return {
    id: String(Object(periodicity.periodicityPayroll).code),
    description: capitalizeText(
      String(Object(periodicity.periodicityPayroll).value),
    ),
    periodicityInMonths: Number(periodicity.periodicityPayrollInMonths || 0),
    periodicityInDays: Number(periodicity.periodicityPayrollInDays || 0),
  };
};

const mapPeriodicitiesApiToEntities = (
  peridiocities: Record<string, string | number | object>[],
): IPeriodicity[] => {
  return peridiocities.map((peridiocities) =>
    mapPeriodicityApiToEntity(peridiocities),
  );
};

export { mapPeriodicitiesApiToEntities, mapPeriodicityApiToEntity };
