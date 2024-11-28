import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const interestPaymentDataDomain = {
  AUTOMATIC_RENEWAL: {
    id: "AutomaticRenewalAtExpiration",
    value: "Renovación automática al vencimiento",
  },
  AT_EXPIRATION: {
    id: "PayAtExpiration",
    value: "Al vencimiento",
  },
  RENEW_AT_A_LATER_DATE: {
    id: "DecideToRenewAtALaterDate",
    value: "Renovar en una fecha posterior",
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
