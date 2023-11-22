import { convertDomainToList, convertDomainToOptions } from "../helper";

const dependenceData = {
  SPECIAL_PROJECT_DEVELOPMENT: {
    id: "specialProjectDevelopment",
    value: "Desarrollo de proyecto especiales",
  },
  HUMAN_RESOURCES: {
    id: "humanResources",
    value: "Recursos humanos",
  },
  FINANCE: {
    id: "finance",
    value: "Finanzas",
  },
  OPERATIONS: {
    id: "operations",
    value: "Operaciones",
  },
  MARKETING: {
    id: "marketing",
    value: "Marketing",
  },
};

const dependenceDMValueOf = (id: string) =>
  convertDomainToOptions(dependenceData).find(
    (dependence) => dependence.id === id
  );

const dependenceDM = {
  ...dependenceData,
  list: convertDomainToList(dependenceData),
  options: convertDomainToOptions(dependenceData),
  valueOf: dependenceDMValueOf,
};

export { dependenceDM };
