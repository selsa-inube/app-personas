import { ISelectOption } from "@design/input/Select/types";
import { convertDomainToList, convertDomainToOptions } from "../helper";

const cityData = {
  BOGOTA: {
    id: "bogota",
    value: "Bogotá - Distrito Capital",
  },
  MEDELLIN: {
    id: "medellin",
    value: "Medellín - Antioquia",
  },
  CALI: {
    id: "cali",
    value: "Cali - Valle del Cauca",
  },
};

const cityDM: typeof cityData & { list: string[]; options: ISelectOption[] } = {
  ...cityData,
  list: convertDomainToList(cityData),
  options: convertDomainToOptions(cityData),
};

export { cityDM };
