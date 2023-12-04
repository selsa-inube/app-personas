import { convertDomainToList, convertDomainToOptions } from "../helper";

const countryData = {
  ARG: {
    id: "ARG",
    value: "Argentina",
  },
  BRA: {
    id: "BRA",
    value: "Brasil",
  },
  CAN: {
    id: "CAN",
    value: "Canadá",
  },
  COL: {
    id: "COL",
    value: "Colombia",
  },
  ESP: {
    id: "ESP",
    value: "España",
  },
  USA: {
    id: "USA",
    value: "Estados Unidos",
  },
  FRA: {
    id: "FRA",
    value: "Francia",
  },
  GBR: {
    id: "GBR",
    value: "Reino Unido",
  },
  ITA: {
    id: "ITA",
    value: "Italia",
  },
  KOR: {
    id: "KOR",
    value: "Corea del Sur",
  },
  MEX: {
    id: "MEX",
    value: "México",
  },
  PER: {
    id: "PER",
    value: "Perú",
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
