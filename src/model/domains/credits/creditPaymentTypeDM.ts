import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const creditPaymentTypeDataDomain = {
  ORDINARY: {
    id: "Ordinary",
    value: "Ordinaria",
  },
  EXTRAORDINARY: {
    id: "Extraordinary",
    value: "Extraordinaria",
  },
};

const creditPaymentTypeDMValueOf = (id: string) =>
  Object.values(creditPaymentTypeDataDomain).find((item) => item.id === id);

const creditPaymentTypeDM = {
  ...creditPaymentTypeDataDomain,
  list: convertDomainToList(creditPaymentTypeDataDomain),
  options: convertDomainToOptions(creditPaymentTypeDataDomain),
  valueOf: creditPaymentTypeDMValueOf,
};

export { creditPaymentTypeDM };
