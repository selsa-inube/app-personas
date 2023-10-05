import { convertDomainToList, convertDomainToOptions } from "../helper";

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
  convertDomainToOptions(residenceTypeData).find(
    (residenceType) => residenceType.id === id
  );

const residenceTypeDM = {
  ...residenceTypeData,
  list: convertDomainToList(residenceTypeData),
  options: convertDomainToOptions(residenceTypeData),
  valueOf: residenceTypeDMValueOf,
};

export { residenceTypeDM };
