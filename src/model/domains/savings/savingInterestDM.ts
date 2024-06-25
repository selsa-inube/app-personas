import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const savingInterestDataDomain = {
  DUE_DATE: {
    id: "PaymentOnDueDate",
    value: "Al vencimiento",
  },
  PERIODIC: {
    id: "PeriodicPayment",
    value: "Periódico",
  },
};

const savingInterestDMValueOf = (id: string) =>
  convertDomainToOptions(savingInterestDataDomain).find(
    (value) => value.id === id,
  );

const savingInterestDM = {
  ...savingInterestDataDomain,
  list: convertDomainToList(savingInterestDataDomain),
  options: convertDomainToOptions(savingInterestDataDomain),
  valueOf: savingInterestDMValueOf,
};

export { savingInterestDM };
