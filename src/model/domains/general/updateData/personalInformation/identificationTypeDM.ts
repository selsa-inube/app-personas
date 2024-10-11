import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const identificationTypeData = {
  CC: {
    id: "C",
    value: "Cédula de ciudadanía",
  },
  CE: {
    id: "E",
    value: "Cédula de extranjería",
  },
  PA: {
    id: "P",
    value: "Pasaporte",
  },
  RC: {
    id: "R",
    value: "Registro civil",
  },
  TI: {
    id: "T",
    value: "Tarjeta de identidad",
  },
  NIT: {
    id: "A",
    value: "NIT",
  },
  NUIP: {
    id: "U",
    value: "NUIP",
  },
};

const identificationTypeDMValueOf = (id: string) =>
  convertDomainToOptions(identificationTypeData).find((city) => city.id === id);

const identificationTypeDM = {
  ...identificationTypeData,
  list: convertDomainToList(identificationTypeData),
  options: convertDomainToOptions(identificationTypeData),
  valueOf: identificationTypeDMValueOf,
};

export { identificationTypeDM };
