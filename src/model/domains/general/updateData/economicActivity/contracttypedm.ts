import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const contractTypeData = {
  PERMANENT: {
    id: "permanent",
    value: "Indefinido",
  },
  FIXED_TERM: {
    id: "fixedTerm",
    value: "Termino fijo",
  },
  TEMPORARY: {
    id: "temporary",
    value: "Temporal",
  },
  PART_TIME: {
    id: "partTime",
    value: "Medio tiempo",
  },
  FULL_TIME: {
    id: "fullTime",
    value: "Tiempo completo",
  },
};

const contractTypeDMValueOf = (id: string) =>
  Object.values(contractTypeData).find((item) => item.id === id);

const contractTypeDM = {
  ...contractTypeData,
  list: convertDomainToList(contractTypeData),
  options: convertDomainToOptions(contractTypeData),
  valueOf: contractTypeDMValueOf,
};

export { contractTypeDM };
