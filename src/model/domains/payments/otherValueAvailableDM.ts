import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const otherValueAvailableDataDomain = {
  ALLOW: {
    id: "ALLOW",
    value: "En progreso",
  },
  NOT_ALLOW: {
    id: "DO_NOT_ALLOW",
    value: "Rechazado",
  },
};

const otherValueAvailableDMValueOf = (id: string) =>
  convertDomainToOptions(otherValueAvailableDataDomain).find(
    (value) => value.id === id,
  );

const otherValueAvailableDM = {
  ...otherValueAvailableDataDomain,
  list: convertDomainToList(otherValueAvailableDataDomain),
  options: convertDomainToOptions(otherValueAvailableDataDomain),
  valueOf: otherValueAvailableDMValueOf,
};

export { otherValueAvailableDM };
