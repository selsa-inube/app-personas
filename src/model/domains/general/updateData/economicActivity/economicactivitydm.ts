import { convertDomainToOptions, convertDomainToList } from "src/utils/domains";

const economicActivityData = {
  UNEMPLOYED: {
    id: "unemployed",
    value: "Cesante",
  },
  ECONOMICALLY_DEPENDENT: {
    id: "economicallyDependent",
    value: "Depende económicamente",
  },
  EMPLOYEE: {
    id: "employee",
    value: "Empleado",
  },
  STUDENT: {
    id: "student",
    value: "Estudiante",
  },
  HOME: {
    id: "home",
    value: "Hogar",
  },
  BUSINESS_OR_ENTREPRENEURIAL_ACTIVITIE: {
    id: "businessOrEntrepreneurialActivities",
    value: "Negocios o actividades empresariales",
  },
  INDEPENDENT: {
    id: "independent",
    value: "Independiente",
  },
  RENTIER: {
    id: "rentier",
    value: "Rentista",
  },
};

const economicActivityDMValueOf = (id: string) =>
  Object.values(economicActivityData).find((item) => item.id === id);

const economicActivityDM = {
  ...economicActivityData,
  list: convertDomainToList(economicActivityData),
  options: convertDomainToOptions(economicActivityData),
  valueOf: economicActivityDMValueOf,
};

export { economicActivityDM };
