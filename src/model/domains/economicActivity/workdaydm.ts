import { convertDomainToList, convertDomainToOptions } from "../helper";

const workdayData = {
  DAYTIME: {
    id: "daytime",
    value: "Diurna",
  },
  NIGHTTIME: {
    id: "nighttime",
    value: "Nocturna",
  },
  MIXED: {
    id: "mixed",
    value: "Mixta",
  },
  FLEXIBLE: {
    id: "flexible",
    value: "Flexible",
  },
};

const workdayDMValueOf = (id: string) =>
  convertDomainToOptions(workdayData).find((workday) => workday.id === id);

const workdayDM = {
  ...workdayData,
  list: convertDomainToList(workdayData),
  options: convertDomainToOptions(workdayData),
  valueOf: workdayDMValueOf,
};

export { workdayDM };
