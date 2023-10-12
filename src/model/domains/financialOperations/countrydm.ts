import { convertDomainToList, convertDomainToOptions } from "../helper";

const countryData = {
  USA: {
    id: "USA",
    value: "Estados Unidos",
  },
  COL: {
    id: "COL",
    value: "Colombia",
  },
  ARG: {
    id: "ARG",
    value: "Argentina",
  },
};

const countryDMValueOf = (id: string) =>
  convertDomainToOptions(countryData).find((country) => country.id === id);

const countryDM = {
  ...countryData,
  list: convertDomainToList(countryData),
  options: convertDomainToOptions(countryData),
  valueOf: countryDMValueOf,
};

export { countryDM };
