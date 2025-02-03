import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const residenceTypeData = {
  OWN_WITHOUT_MORTGAGE: {
    id: "ownWithoutMortgage",
    value: "Propia sin hipoteca",
  },
  OWN_WITH_MORTGAGE: {
    id: "ownWithMortgage",
    value: "Propia con hipoteca",
  },
  RENT: {
    id: "rent",
    value: "Arriendo",
  },
  FAMILIAR: {
    id: "familiar",
    value: "Familiar",
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
