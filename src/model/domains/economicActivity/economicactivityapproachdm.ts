import { convertDomainToList, convertDomainToOptions } from "../helper";

const economicActivityApproachData = {
  SERVICES: {
    id: "services",
    value: "Servicios",
  },
  AGRICULTURE: {
    id: "agriculture",
    value: "Agricultura",
  },
  MANUFACTURING: {
    id: "manufacturing",
    value: "Manufactura",
  },
  COMMERCE: {
    id: "commerce",
    value: "Comercio",
  },
  TOURISM: {
    id: "tourism",
    value: "Turismo",
  },
  TECHNOLOGY: {
    id: "technology",
    value: "Tecnología de la información y comunicación",
  },
};

const economicActivityApproachDMValueOf = (id: string) =>
  convertDomainToOptions(economicActivityApproachData).find(
    (economicActivityApproach) => economicActivityApproach.id === id
  );

const economicActivityApproachDM = {
  ...economicActivityApproachData,
  list: convertDomainToList(economicActivityApproachData),
  options: convertDomainToOptions(economicActivityApproachData),
  valueOf: economicActivityApproachDMValueOf,
};

export { economicActivityApproachDM };