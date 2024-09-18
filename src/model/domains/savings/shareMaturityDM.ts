import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const shareMaturityDataDomain = {
  PAYMENT: {
    id: "payment",
    value: "Pago",
  },
  RENEWAL: {
    id: "renewal",
    value: "Renovación",
  },
};

const shareMaturityDMValueOf = (id: string) =>
  convertDomainToOptions(shareMaturityDataDomain).find(
    (value) => value.id === id,
  );

const shareMaturityDM = {
  ...shareMaturityDataDomain,
  list: convertDomainToList(shareMaturityDataDomain),
  options: convertDomainToOptions(shareMaturityDataDomain),
  valueOf: shareMaturityDMValueOf,
};

export { shareMaturityDM };
