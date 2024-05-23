import { convertDomainToList, convertDomainToOptions } from "../../../helper";

const departmentData = {
  AMAZONAS: {
    id: "amazonas",
    value: "Amazonas",
  },
  ANTIOQUIA: {
    id: "antioquia",
    value: "Antioquia",
  },
  ARAUCA: {
    id: "arauca",
    value: "Arauca",
  },
  ATLANTICO: {
    id: "atlantico",
    value: "Atlántico",
  },
  BOLIVAR: {
    id: "bolivar",
    value: "Bolívar",
  },
  BOYACA: {
    id: "boyaca",
    value: "Boyacá",
  },
  CALDAS: {
    id: "caldas",
    value: "Caldas",
  },
  CAQUETA: {
    id: "caqueta",
    value: "Caquetá",
  },
  CUNDINAMARCA: {
    id: "cundinamarca",
    value: "Cundinamarca",
  },
};

const departmentDMValueOf = (id: string) =>
  convertDomainToOptions(departmentData).find(
    (department) => department.id === id,
  );

const departmentDM = {
  ...departmentData,
  list: convertDomainToList(departmentData),
  options: convertDomainToOptions(departmentData),
  valueOf: departmentDMValueOf,
};

export { departmentDM };
