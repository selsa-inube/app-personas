import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const pqrsTypeDataDomain = {
  REQUEST: {
    id: "Request",
    value: "Petición",
  },
  COMPLAINT: {
    id: "Complaint",
    value: "Queja",
  },
  CLAIM: {
    id: "Claim",
    value: "Reclamo",
  },
  SUGGESTION: {
    id: "Suggestion",
    value: "Sugerencia",
  },
  CONGRATULATIONS: {
    id: "Congratulations",
    value: "Felicitaciones",
  },
};

const pqrsTypeDMValueOf = (id: string) =>
  convertDomainToOptions(pqrsTypeDataDomain).find((type) => type.id === id);

const pqrsTypeDM = {
  ...pqrsTypeDataDomain,
  list: convertDomainToList(pqrsTypeDataDomain),
  options: convertDomainToOptions(pqrsTypeDataDomain),
  valueOf: pqrsTypeDMValueOf,
};

export { pqrsTypeDM };
