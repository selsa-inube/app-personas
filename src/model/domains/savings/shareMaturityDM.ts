import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const shareMaturityDataDomain = {
  PAYMENT: {
    id: "AutomaticRenewalAtExpiration",
    value: "Sí",
  },
  RENEWAL: {
    id: "DecideToRenewAtALaterDate",
    value: "No",
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
