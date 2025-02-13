import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const weeklyPayDayData = {
  MONDAY: {
    id: "monday",
    value: "Lunes",
  },
  TUESDAY: {
    id: "tuesday",
    value: "Martes",
  },
  WEDNESDAY: {
    id: "wednesday",
    value: "Miércoles",
  },
  THURSDAY: {
    id: "thursday",
    value: "Jueves",
  },
  FRIDAY: {
    id: "friday",
    value: "Viernes",
  },
  SATURDAY: {
    id: "saturday",
    value: "Sabado",
  },
};

const weeklyPayDayDMValueOf = (id: string) =>
  Object.values(weeklyPayDayData).find((item) => item.id === id);

const weeklyPayDayDM = {
  ...weeklyPayDayData,
  list: convertDomainToList(weeklyPayDayData),
  options: convertDomainToOptions(weeklyPayDayData),
  valueOf: weeklyPayDayDMValueOf,
};

export { weeklyPayDayDM };
