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

const cityDMValueOf = (id: string) =>
  convertDomainToOptions(cityData).find((city) => city.id === id);

const cityDM = {
  ...cityData,
  list: convertDomainToList(cityData),
  options: convertDomainToOptions(cityData),
  valueOf: cityDMValueOf,
};

export { cityDM, cityDMValueOf };
