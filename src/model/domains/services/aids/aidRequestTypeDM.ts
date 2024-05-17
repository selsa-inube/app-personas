import { convertDomainToList, convertDomainToOptions } from "../../helper";

const aidRequestTypeDataDomain = {
  HOSPITALIZATION_SURGERY: {
    id: "HOSPITALIZATION_SURGERY",
    value: "Hospitalizacion y cirugia",
  },
  DIAGNOSTIC_AIDS: {
    id: "DIAGNOSTIC_AIDS",
    value: "Ayudas diagnosticas",
  },
  ORTHOPEDIC_IMPLEMENTS: {
    id: "ORTHOPEDIC_IMPLEMENTS",
    value: "Por implementos ortopedicos",
  },
  INITIAL_DISABILITY: {
    id: "INITIAL_DISABILITY",
    value: "Incapacidad inicial",
  },
  DEATH_ASSOCIATE: {
    id: "DEATH_ASSOCIATE",
    value: "Fallecimiento del asociado",
  },
  ADDICTION_PROBLEMS: {
    id: "ADDICTION_PROBLEMS",
    value: "Problemas de adiccion",
  },
  PARTIAL_DAMAGE_HOUSE: {
    id: "PARTIAL_DAMAGE_HOUSE",
    value: "Daño parcial de vivienda",
  },
  TOTAL_HOUSING_DAMAGE: {
    id: "TOTAL_HOUSING_DAMAGE",
    value: "Daño total de vivienda",
  },
  DEATH_BENEFICIARY: {
    id: "DEATH_BENEFICIARY",
    value: "Fallecimiento de beneficiario",
  },
  EXHUMATION_OSSUARY_ASSISTANCE: {
    id: "EXHUMATION_OSSUARY_ASSISTANCE",
    value: "Auxilio por exhumacion u osario",
  },
  ORTHOPEDIC_BOOTS: {
    id: "ORTHOPEDIC_BOOTS",
    value: "Botas ortopedicas",
  },
  MEDICATIONS: {
    id: "MEDICATIONS",
    value: "Medicamentos",
  },
  MEDICAL_TRANSFERS: {
    id: "MEDICAL_TRANSFERS",
    value: "Traslados medicos",
  },
  TEMPORARY_CARE_ACCOMPANIMENT: {
    id: "TEMPORARY_CARE_ACCOMPANIMENT",
    value: "Acompañamiento asistencial temporal",
  },
  LENSES: {
    id: "LENSES",
    value: "Lentes",
  },
  INCAPACITY_180_DAYS: {
    id: "INCAPACITY_180_DAYS",
    value: "Incapacidad superior a 180 dias",
  },
  AIDS_SPORTS_ARTISTIC_ACTIVITIES: {
    id: "AIDS_SPORTS_ARTISTIC_ACTIVITIES",
    value: "Auxilios para actividades deportivas o artisticas",
  },
  DISABILITY_EXTENSION: {
    id: "DISABILITY_EXTENSION",
    value: "Incapacidad prorroga",
  },
  DAMAGE_BASIC_HOUSEHOLD: {
    id: "DAMAGE_BASIC_HOUSEHOLD",
    value: "Daño de enseres basicos",
  },
};

const aidRequestTypeDMValueOf = (id: string) =>
  convertDomainToOptions(aidRequestTypeDataDomain).find(
    (level) => level.id === id,
  );

const aidRequestTypeDM = {
  ...aidRequestTypeDataDomain,
  list: convertDomainToList(aidRequestTypeDataDomain),
  options: convertDomainToOptions(aidRequestTypeDataDomain),
  valueOf: aidRequestTypeDMValueOf,
};

export { aidRequestTypeDM };
