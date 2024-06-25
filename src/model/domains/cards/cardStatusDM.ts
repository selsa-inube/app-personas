import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const cardStatusDataDomain = {
  ACTIVE: {
    id: "ActiveCard",
    value: "Activa",
  },
  INACTIVE: {
    id: "InactiveCard",
    value: "Inactiva",
  },
  BLOCKED: {
    id: "CardWithBlockedProduct",
    value: "Cupo bloqueado",
  },
};

const cardStatusDMValueOf = (id: string) =>
  convertDomainToOptions(cardStatusDataDomain).find((value) => value.id === id);

const cardStatusDM = {
  ...cardStatusDataDomain,
  list: convertDomainToList(cardStatusDataDomain),
  options: convertDomainToOptions(cardStatusDataDomain),
  valueOf: cardStatusDMValueOf,
};

export { cardStatusDM };
