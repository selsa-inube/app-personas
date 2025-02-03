import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

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
  Object.values(workdayData).find((item) => item.id === id);

const workdayDM = {
  ...workdayData,
  list: convertDomainToList(workdayData),
  options: convertDomainToOptions(workdayData),
  valueOf: workdayDMValueOf,
};

export { workdayDM };
