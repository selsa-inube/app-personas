import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const residenceTypeData = {
  RENT: {
    id: "rent",
    value: "Arriendo",
  },
  FAMILIAR: {
    id: "familiar",
    value: "Familiar",
  },
  OTHER: {
    id: "other",
    value: "Otra",
  },
  OWN_WITH_MORTGAGE: {
    id: "ownWithMortgage",
    value: "Propia con hipoteca",
  },
  OWN_WITHOUT_MORTGAGE: {
    id: "ownWithoutMortgage",
    value: "Propia sin hipoteca",
  },
};

const residenceTypeDMValueOf = (id: string) =>
  Object.values(residenceTypeData).find(
    (residenceType) => residenceType.id === id,
  );

const residenceTypeDM = {
  ...residenceTypeData,
  list: convertDomainToList(residenceTypeData),
  options: convertDomainToOptions(residenceTypeData),
  valueOf: residenceTypeDMValueOf,
};

export { residenceTypeDM };
