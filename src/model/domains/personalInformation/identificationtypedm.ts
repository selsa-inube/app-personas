import { convertDomainToList, convertDomainToOptions } from "../helper";

const identificationTypeData = {
  CC: {
    id: "cc",
    value: "Cédula de ciudadanía",
  },
  CE: {
    id: "ce",
    value: "Cédula de extranjería",
  },
  PA: {
    id: "pa",
    value: "Pasaporte",
  },
  RC: {
    id: "rc",
    value: "Registro civil",
  },
  TI: {
    id: "ti",
    value: "Tarjeta de identidad",
  },
  NIT: {
    id: "nit",
    value: "Número de identificación tributaria",
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
