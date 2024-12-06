import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const actionExpirationDataDomain = {
  RENEWAL: {
    id: "AutomaticRenewalAtExpiration",
    value: "Sí",
  },
  AT_EXPIRATION: {
    id: "PayAtExpiration",
    value: "No",
  },
};

const actionExpirationDMValueOf = (id: string) =>
  convertDomainToOptions(actionExpirationDataDomain).find(
    (value) => value.id === id,
  );

const actionExpirationDM = {
  ...actionExpirationDataDomain,
  list: convertDomainToList(actionExpirationDataDomain),
  options: convertDomainToOptions(actionExpirationDataDomain),
  valueOf: actionExpirationDMValueOf,
};

export { actionExpirationDM };
