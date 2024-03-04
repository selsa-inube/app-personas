import { convertDomainToList, convertDomainToOptions } from "../helper";

const cityData = {
  BARRANQUILLA: {
    id: "barranquilla",
    value: "Barranquilla",
  },
  BOGOTA: {
    id: "bogota",
    value: "Bogotá D.C",
  },
  BUCARAMANGA: {
    id: "bucaramanga",
    value: "Bucaramanga",
  },
  CARTAGENA: {
    id: "cartagena",
    value: "Cartagena",
  },
  CUCUTA: {
    id: "cucuta",
    value: "Cúcuta",
  },
  IBAGUE: {
    id: "ibague",
    value: "Ibagué",
  },
  PEREIRA: {
    id: "pereira",
    value: "Pereira",
  },
  SANTAMARTA: {
    id: "santamarta",
    value: "Santa Marta",
  },
  VILLAVICENCIO: {
    id: "villavicencio",
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
