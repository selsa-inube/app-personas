import { ISelectOption } from "@design/input/Select/types";
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

const identificationTypeDM: typeof identificationTypeData & {
  list: string[];
  options: ISelectOption[];
} = {
  ...identificationTypeData,
  list: convertDomainToList(identificationTypeData),
  options: convertDomainToOptions(identificationTypeData),
};

export { identificationTypeDM };
