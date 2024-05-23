import { convertDomainToList, convertDomainToOptions } from "../../../helper";

const relationshipData = {
  FATHER: {
    id: "father",
    value: "Padre",
  },
  MOTHER: {
    id: "mother",
    value: "Madre",
  },
  GRANDFATHER: {
    id: "grandfather",
    value: "Abuelo",
  },
  GRANDMOTHER: {
    id: "grandmother",
    value: "Abuela",
  },
  BROTHER: {
    id: "brother",
    value: "Hermano",
  },
  SISTER: {
    id: "sister",
    value: "Hermana",
  },
  SON: {
    id: "son",
    value: "Hijo",
  },
  DAUGHTER: {
    id: "daughter",
    value: "Hija",
  },
  WIFE: {
    id: "wife",
    value: "Esposa",
  },
  HUSBAND: {
    id: "husband",
    value: "Esposo",
  },
  PARTNER: {
    id: "partner",
    value: "Asociado",
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
