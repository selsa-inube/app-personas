import { ISelectOption } from "@design/input/Select/types";
import { convertDomainToList, convertDomainToOptions } from "../helper";

const genderData = {
  FEMALE: {
    id: "female",
    value: "Femenino",
  },
  MASCULINO: {
    id: "masculino",
    value: "Masculino",
  },
};

const genderDM: typeof genderData & {
  list: string[];
  options: ISelectOption[];
} = {
  ...genderData,
  list: convertDomainToList(genderData),
  options: convertDomainToOptions(genderData),
};

export { genderDM };
