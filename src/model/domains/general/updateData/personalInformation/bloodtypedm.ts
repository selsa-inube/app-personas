import { convertDomainToOptions, convertDomainToList } from "src/utils/domains";

const bloodTypeData = {
  O_POSITIVE: {
    id: "o_positive",
    value: "O +",
  },
  O_NEGATIVE: {
    id: "o_negative",
    value: "O -",
  },
  A_POSITIVE: {
    id: "a_positive",
    value: "A +",
  },
  A_NEGATIVE: {
    id: "a_negative",
    value: "A -",
  },
  B_POSITIVE: {
    id: "b_positive",
    value: "B +",
  },
  B_NEGATIVE: {
    id: "b_negative",
    value: "B -",
  },
  AB_POSITIVE: {
    id: "ab_positive",
    value: "AB +",
  },
  AB_NEGATIVE: {
    id: "ab_negative",
    value: "AB -",
  },
};

const bloodTypeDMValueOf = (id: string) =>
  Object.values(bloodTypeData).find((item) => item.id === id);

const bloodTypeDM = {
  ...bloodTypeData,
  list: convertDomainToList(bloodTypeData),
  options: convertDomainToOptions(bloodTypeData),
  valueOf: bloodTypeDMValueOf,
};

export { bloodTypeDM };
