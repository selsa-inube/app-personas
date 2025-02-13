import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const stratumData = {
  STRATUM_1: {
    id: "stratum_1",
    value: "1",
  },
  STRATUM_2: {
    id: "stratum_2",
    value: "2",
  },
  STRATUM_3: {
    id: "stratum_3",
    value: "3",
  },
  STRATUM_4: {
    id: "stratum_4",
    value: "4",
  },
  STRATUM_5: {
    id: "stratum_5",
    value: "5",
  },
  STRATUM_6: {
    id: "stratum_6",
    value: "6",
  },
};

const stratumDMValueOf = (id: string) =>
  Object.values(stratumData).find((stratum) => stratum.id === id);

const stratumDM = {
  ...stratumData,
  list: convertDomainToList(stratumData),
  options: convertDomainToOptions(stratumData),
  valueOf: stratumDMValueOf,
};

export { stratumDM };
