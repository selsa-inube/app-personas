import { convertDomainToList, convertDomainToOptions } from "../helper";

const professionData = {
  SYSTEMS_ENGINEER: {
    id: "systemsEngineer",
    value: "Ingeniero de sistemas, software o telecomunicaciones",
  },
  DOCTOR: {
    id: "doctor",
    value: "Médico",
  },
  LAWYER: {
    id: "lawyer",
    value: "Abogado",
  },
  TEACHER: {
    id: "teacher",
    value: "Profesor",
  },
  ACCOUNTANT: {
    id: "accountant",
    value: "Contador",
  },
  ARCHITECT: {
    id: "architect",
    value: "Arquitecto",
  },
};

const professionDMValueOf = (id: string) =>
  convertDomainToOptions(professionData).find(
    (profession) => profession.id === id
  );

const professionDM = {
  ...professionData,
  list: convertDomainToList(professionData),
  options: convertDomainToOptions(professionData),
  valueOf: professionDMValueOf,
};

export { professionDM };
