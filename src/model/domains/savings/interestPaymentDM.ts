import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const interestPaymentDataDomain = {
  AT_EXPIRATION: {
    id: "AT_EXPIRATION",
    value: "Al vencimiento",
  },
};

const interestPaymentDMValueOf = (id: string) =>
  convertDomainToOptions(interestPaymentDataDomain).find(
    (value) => value.id === id,
  );

const interestPaymentDM = {
  ...interestPaymentDataDomain,
  list: convertDomainToList(interestPaymentDataDomain),
  options: convertDomainToOptions(interestPaymentDataDomain),
  valueOf: interestPaymentDMValueOf,
};

export { interestPaymentDM };
