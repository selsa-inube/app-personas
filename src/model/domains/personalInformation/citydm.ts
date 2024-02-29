import { convertDomainToList, convertDomainToOptions } from "../helper";

const cityData = {
  BARRANQUILLA: {
    id: "BARRANQUILLA",
    value: "Barranquilla",
  },
  BOGOTA: {
    id: "BOGOTA",
    value: "Bogotá D.C",
  },
  BUCARAMANGA: {
    id: "BUCARAMANGA",
    value: "Bucaramanga",
  },
  CARTAGENA: {
    id: "CARTAGENA",
    value: "Cartagena",
  },
  CUCUTA: {
    id: "CUCUTA",
    value: "Cúcuta",
  },
  IBAGUE: {
    id: "IBAGUE",
    value: "Ibagué",
  },
  PEREIRA: {
    id: "PEREIRA",
    value: "Pereira",
  },
  SANTAMARTA: {
    id: "SANTAMARTA",
    value: "Santa Marta",
  },
  VILLAVICENCIO: {
    id: "VILLAVICENCIO",
    value: "Villavicencio",
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

export { cityDM };
