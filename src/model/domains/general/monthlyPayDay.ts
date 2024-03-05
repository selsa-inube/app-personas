import { convertDomainToList, convertDomainToOptions } from "../helper";

const monthlyPayDayData = {
  DAY1: {
    id: "day1",
    value: "Día 1 del mes",
  },
  DAY15: {
    id: "day15",
    value: "Día 15 del mes",
  },
  DAY30: {
    id: "day30",
    value: "Día 30 del mes",
  },
};

const monthlyPayDayDMValueOf = (id: string) =>
  convertDomainToOptions(monthlyPayDayData).find((city) => city.id === id);

const monthlyPayDayDM = {
  ...monthlyPayDayData,
  list: convertDomainToList(monthlyPayDayData),
  options: convertDomainToOptions(monthlyPayDayData),
  valueOf: monthlyPayDayDMValueOf,
};

export { monthlyPayDayDM };
