import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const relationshipData = {
  FATHER: {
    id: "Father",
    value: "Padre",
  },
  MOTHER: {
    id: "Mother",
    value: "Madre",
  },
  GRANDFATHER: {
    id: "Grandfather",
    value: "Abuelo",
  },
  BROTHER: {
    id: "Brother",
    value: "Hermano",
  },
  SON: {
    id: "Son",
    value: "Hijo",
  },
  PARTNER: {
    id: "Associate",
    value: "Asociado",
  },
  GRANDPA_UNCLE: {
    id: "GrandpaUncle",
    value: "Tío abuelo",
  },
  CHILD_FOSTER: {
    id: "ChildFoster",
    value: "Hijo adoptivo",
  },
  STEPFATHER: {
    id: "Stepfather",
    value: "Padrastro",
  },
  STEPBROTHER: {
    id: "Stepbrother",
    value: "Hermanastro",
  },
  PARENT_FOSTER: {
    id: "ParentFoster",
    value: "Padre adoptivo",
  },
  SON_IN_LAW: {
    id: "SonInLaw",
    value: "Yerno",
  },
  DAUGHTER_IN_LAW: {
    id: "DaughterInLaw",
    value: "Nuera",
  },
  GREAT_GRANDFATHER: {
    id: "GreatGrandfather",
    value: "Bisabuelo",
  },
  GREAT_FRANDSON: {
    id: "GreatFrandson",
    value: "Bisnieto",
  },
  NEPHEW: {
    id: "Nephew",
    value: "Sobrino",
  },
  SPOUSE: {
    id: "Spouse",
    value: "Cónyuge",
  },
  PARENT_ADOPTIVE: {
    id: "ParentAdoptive",
    value: "Padre adoptivo",
  },
  BINDING_ENTITY: {
    id: "BindingEntity",
    value: "Entidad vinculada",
  },
  SON_ADOPTED: {
    id: "SonAdopted",
    value: "Hijo adoptado",
  },
  MOTHER_ADOPTIVE: {
    id: "MotherAdoptive",
    value: "Madre adoptiva",
  },
  GRANDSON: {
    id: "Grandson",
    value: "Nieto",
  },
  OTHERS: {
    id: "Others",
    value: "Otros",
  },
  COUSIN: {
    id: "Cousin",
    value: "Primo",
  },
  FATHER_IN_LAW: {
    id: "FatherInLaw",
    value: "Suegro",
  },
  UNCLE: {
    id: "Uncle",
    value: "Tío",
  },
  BROTHER_IN_LAW: {
    id: "BrotherInLaw",
    value: "Cuñado",
  },
  THIRD_PARTY_BENEFICIARY_NON_FAMILY: {
    id: "ThirdPartyBeneficiaryNonFamily",
    value: "Beneficiario de tercero no familiar",
  },
  NANNY: {
    id: "Nanny",
    value: "Niñera",
  },
  BENEFICIARY_PERCENTAGE_DIFFERENTIAL_RELIEF: {
    id: "BeneficiaryByPercentageDifferentialForRelief",
    value: "Beneficiario por porcentaje diferencial para alivio",
  },
  EMPLOYEE_DOMESTIC: {
    id: "EmployeeDomestic",
    value: "Empleado doméstico",
  },
  PERMANENT_PARTNER: {
    id: "PermanentPartner",
    value: "Compañero permanente",
  },
};

const relationshipDMValueOf = (id: string) =>
  convertDomainToOptions(relationshipData).find(
    (relationship) => relationship.id === id,
  );

const relationshipDM = {
  ...relationshipData,
  list: convertDomainToList(relationshipData),
  options: convertDomainToOptions(relationshipData),
  valueOf: relationshipDMValueOf,
};

export { relationshipDM };
