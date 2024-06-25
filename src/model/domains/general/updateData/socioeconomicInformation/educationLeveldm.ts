import { convertDomainToOptions, convertDomainToList } from "src/utils/domains";

const educationLevelData = {
  ILLITERACY: {
    id: "illiteracy",
    value: "Analfabetismo",
  },
  UNSCHOOLED: {
    id: "unschooled",
    value: "No escolarizado",
  },
  PHD: {
    id: "phd",
    value: "Doctorado",
  },
  SPECIALIZATION: {
    id: "specialization",
    value: "Especialización",
  },
  MASTER: {
    id: "master",
    value: "Maestría",
  },
  PRIMARY: {
    id: "primary",
    value: "Primaria",
  },
  SECONDARY: {
    id: "secondary",
    value: "Secundaria",
  },
  TECHNICAL: {
    id: "technical",
    value: "Técnica",
  },
  TECHNOLOGICAL: {
    id: "technological",
    value: "Tecnológica",
  },
  UNIVERSITY: {
    id: "university",
    value: "Universitaria",
  },
  NI: {
    id: "ni",
    value: "No indica",
  },
};

const educationLevelDMValueOf = (id: string) =>
  convertDomainToOptions(educationLevelData).find((level) => level.id === id);

const educationLevelTypeDM = {
  ...educationLevelData,
  list: convertDomainToList(educationLevelData),
  options: convertDomainToOptions(educationLevelData),
  valueOf: educationLevelDMValueOf,
};

export { educationLevelTypeDM };
