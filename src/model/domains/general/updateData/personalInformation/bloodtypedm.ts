import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const rhFactorData = {
  O_POSITIVE: {
    id: "O+",
    value: "O +",
  },
  O_NEGATIVE: {
    id: "O-",
    value: "O -",
  },
  A_POSITIVE: {
    id: "A+",
    value: "A +",
  },
  A_NEGATIVE: {
    id: "A-",
    value: "A -",
  },
  B_POSITIVE: {
    id: "B+",
    value: "B +",
  },
  B_NEGATIVE: {
    id: "B-",
    value: "B -",
  },
  AB_POSITIVE: {
    id: "AB+",
    value: "AB +",
  },
  AB_NEGATIVE: {
    id: "AB-",
    value: "AB -",
  },
};

const rhFactorDMValueOf = (id: string) =>
  Object.values(rhFactorData).find((item) => item.id === id);

const rhFactorDM = {
  ...rhFactorData,
  list: convertDomainToList(rhFactorData),
  options: convertDomainToOptions(rhFactorData),
  valueOf: rhFactorDMValueOf,
};

export { rhFactorDM };
