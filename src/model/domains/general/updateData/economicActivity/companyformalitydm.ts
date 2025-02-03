import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const companyFormalityData = {
  FORMAL: {
    id: "formal",
    value: "Formal",
  },
  INFORMAL: {
    id: "informal",
    value: "Informal",
  },
  SEMI_FORMAL: {
    id: "semiFormal",
    value: "Semi formal",
  },
};

const companyFormalityDMValueOf = (id: string) =>
  Object.values(companyFormalityData).find((item) => item.id === id);

const companyFormalityDM = {
  ...companyFormalityData,
  list: convertDomainToList(companyFormalityData),
  options: convertDomainToOptions(companyFormalityData),
  valueOf: companyFormalityDMValueOf,
};

export { companyFormalityDM };
