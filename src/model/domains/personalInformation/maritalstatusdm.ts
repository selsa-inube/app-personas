import { ISelectOption } from "@design/input/Select/types";
import { convertDomainToList, convertDomainToOptions } from "../helper";

const maritalStatusData = {
  SINGLE: {
    id: "single",
    value: "Soltero",
  },
  MARRIED: {
    id: "married",
    value: "Casado",
  },
  DIVORCED: {
    id: "divorced",
    value: "Divorciado",
  },
  WIDOWED: {
    id: "widowed",
    value: "Viudo",
  },
  SEPARATED: {
    id: "separated",
    value: "Separado",
  },
};

const maritalStatusDM: typeof maritalStatusData & {
  list: string[];
  options: ISelectOption[];
} = {
  ...maritalStatusData,
  list: convertDomainToList(maritalStatusData),
  options: convertDomainToOptions(maritalStatusData),
};

export { maritalStatusDM };
