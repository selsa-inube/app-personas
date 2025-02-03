import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const creditMovementTypeDataDomain = {
  BANK_DEPOSIT: {
    id: "CB",
    value: "Consignación bancaria",
  },
  PAYROLL_DISCOUNT: {
    id: "DN",
    value: "Descuento de nómina",
  },
};

const creditMovementTypeDMValueOf = (id: string) =>
  Object.values(creditMovementTypeDataDomain).find((item) => item.id === id);

const creditMovementTypeDM = {
  ...creditMovementTypeDataDomain,
  list: convertDomainToList(creditMovementTypeDataDomain),
  options: convertDomainToOptions(creditMovementTypeDataDomain),
  valueOf: creditMovementTypeDMValueOf,
};

export { creditMovementTypeDM };
