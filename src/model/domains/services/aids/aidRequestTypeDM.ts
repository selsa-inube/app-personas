import { convertDomainToList, convertDomainToOptions } from "../../helper";

const aidRequestTypeDataDomain = {
  HOSPITALIZATION_SURGERY: {
    id: "hospitalization_surgery",
    value: "Hospitalizacion y cirugia",
  },
  DIAGNOSTIC_AIDS: {
    id: "diagnostic_aids",
    value: "Ayudas diagnosticas",
  },
  ORTHOPEDIC_IMPLEMENTS: {
    id: "orthopedic_implements",
    value: "Por implementos ortopedicos",
  },
  INITIAL_DISABILITY: {
    id: "initial_disability",
    value: "Incapacidad inicial",
  },
  DEATH_ASSOCIATE: {
    id: "death_associate",
    value: "Fallecimiento del asociado",
  },
  ADDICTION_PROBLEMS: {
    id: "addiction_problems",
    value: "Problemas de adiccion",
  },
  PARTIAL_DAMAGE_HOUSE: {
    id: "partial_damage_house",
    value: "Daño parcial de vivienda",
  },
  TOTAL_HOUSING_DAMAGE: {
    id: "total_housing_damage",
    value: "Daño total de vivienda",
  },
  DEATH_BENEFICIARY: {
    id: "death_beneficiary",
    value: "Fallecimiento de beneficiario",
  },
  EXHUMATION_OSSUARY_ASSISTANCE: {
    id: "exhumation_ossuary_assistance",
    value: "Auxilio por exhumacion u osario",
  },
  ORTHOPEDIC_BOOTS: {
    id: "orthopedic_boots",
    value: "Botas ortopedicas",
  },
  MEDICATIONS: {
    id: "MEDICATIONS",
    value: "Medicamentos",
  },
  MEDICAL_TRANSFERS: {
    id: "medical_transfers",
    value: "Traslados medicos",
  },
  TEMPORARY_CARE_ACCOMPANIMENT: {
    id: "temporary_care_accompaniment",
    value: "Acompañamiento asistencial temporal",
  },
  LENSES: {
    id: "lenses",
    value: "Lentes",
  },
  INCAPACITY_180_DAYS: {
    id: "incapacity_180_days",
    value: "Incapacidad superior a 180 dias",
  },
  AIDS_SPORTS_ARTISTIC_ACTIVITIES: {
    id: "aids_sports_artistic_activities",
    value: "Auxilios para actividades deportivas o artisticas",
  },
  DISABILITY_EXTENSION: {
    id: "disability_extension",
    value: "Incapacidad prorroga",
  },
  DAMAGE_BASIC_HOUSEHOLD: {
    id: "damage_basic_household",
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
