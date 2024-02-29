import { convertDomainToList, convertDomainToOptions } from "../helper";

const departmentData = {
  AMAZONAS: {
    id: "AMAZONAS",
    value: "Amazonas",
  },
  ANTIOQUIA: {
    id: "ANTIOQUIA",
    value: "Antioquia",
  },
  ARAUCA: {
    id: "ARAUCA",
    value: "Arauca",
  },
  ATLANTICO: {
    id: "ATLANTICO",
    value: "Atlántico",
  },
  BOLIVAR: {
    id: "BOLIVAR",
    value: "Bolívar",
  },
  BOYACA: {
    id: "BOYACA",
    value: "Boyacá",
  },
  CALDAS: {
    id: "CALDAS",
    value: "Caldas",
  },
  CAQUETA: {
    id: "CAQUETA",
    value: "Caquetá",
  },
  CUNDINAMARCA: {
    id: "CUNDINAMARCA",
    value: "Cundinamarca",
  },
};

const departmentDMValueOf = (id: string) =>
  convertDomainToOptions(departmentData).find(
    (department) => department.id === id
  );

const departmentDM = {
  ...departmentData,
  list: convertDomainToList(departmentData),
  options: convertDomainToOptions(departmentData),
  valueOf: departmentDMValueOf,
};

export { departmentDM };
