import { convertDomainToList, convertDomainToOptions } from "../helper";

const professionData = {
    LAWYER: {
    id: "lawyer",
    value: "Abogada",
  },
  SOFTWARE_DEVELOPER: {
    id: "softwareDeveloper",
    value: "Desarrollador de software",
  },
  DOCTOR: {
    id: "doctor",
    value: "Médico",
  },
  TEACHER: {
    id: "teacher",
    value: "Profesor",
  },
  CIVIL_ENGINEER: {
    id: "civilEngineer",
    value: "Ingeniero civil",
  },
  PSYCHOLOGIST: {
    id: "psychologist",
    value: "Psicólogo",
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