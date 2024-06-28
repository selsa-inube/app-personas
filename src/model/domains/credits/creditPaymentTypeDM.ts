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
  convertDomainToOptions(creditPaymentTypeDataDomain).find(
    (value) => value.id === id,
  );

const creditPaymentTypeDM = {
  ...creditPaymentTypeDataDomain,
  list: convertDomainToList(creditPaymentTypeDataDomain),
  options: convertDomainToOptions(creditPaymentTypeDataDomain),
  valueOf: creditPaymentTypeDMValueOf,
};

export { creditPaymentTypeDM };
