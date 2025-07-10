import { IPeriodicity } from "src/model/entity/periodicity";
import { capitalizeText } from "src/utils/texts";

const mapPeriodicityApiToEntity = (
  periodicity: Record<string, string | number | object>,
): IPeriodicity => {
  return {
    id: String(Object(periodicity.paymentPeriodicity).code),
    description: capitalizeText(
      String(Object(periodicity.paymentPeriodicity).value),
    ),
    periodicityInMonths: Number(periodicity.paymentPeriodicityInMonths || 0),
    periodicityInDays: Number(periodicity.paymentPeriodicityInDays || 0),
  };
};

const mapPeriodicitiesApiToEntities = (
  peridiocities: Record<string, string | number | object>[],
): IPeriodicity[] => {
  if (peridiocities.length === 0) {
    return [];
  }

  const paymentPeriodicities = peridiocities[0].paymentPeriodicitiesPerPayroll;
  if (Array.isArray(paymentPeriodicities)) {
    return paymentPeriodicities.map((periodicity) =>
      mapPeriodicityApiToEntity(periodicity),
    );
  }

  return [];
};

export { mapPeriodicitiesApiToEntities, mapPeriodicityApiToEntity };
