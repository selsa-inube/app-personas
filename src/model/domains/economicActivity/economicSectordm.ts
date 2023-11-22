import { convertDomainToList, convertDomainToOptions } from "../helper";

const economicSectorData = {
  AGRICULTURE: {
    id: "agriculture",
    value: "Agricultura",
  },
  MANUFACTURING: {
    id: "manufacturing",
    value: "Manufactura",
  },
  CONSTRUCTION: {
    id: "construction",
    value: "Construcción",
  },
  RETAIL: {
    id: "retail",
    value: "Venta al por menor",
  },
  INFORMATION_TECHNOLOGY: {
    id: "informationTechnology",
    value: "Tecnología de la información",
  },
  SYSTEMS_DEVELOPMENT: {
    id: "systemsDevelopment",
    value: "Desarrollo de sistemas informáticos",
  },
  HEALTHCARE: {
    id: "healthcare",
    value: "Cuidado de la salud",
  },
  EDUCATION: {
    id: "education",
    value: "Educación",
  },
};

const economicSectorDMValueOf = (id: string) =>
  convertDomainToOptions(economicSectorData).find(
    (economicSector) => economicSector.id === id
  );

const economicSectorDM = {
  ...economicSectorData,
  list: convertDomainToList(economicSectorData),
  options: convertDomainToOptions(economicSectorData),
  valueOf: economicSectorDMValueOf,
};

export { economicSectorDM };
