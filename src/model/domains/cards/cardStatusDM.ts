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
  Object.values(cardStatusDataDomain).find((item) => item.id === id);

const cardStatusDM = {
  ...cardStatusDataDomain,
  list: convertDomainToList(cardStatusDataDomain),
  options: convertDomainToOptions(cardStatusDataDomain),
  valueOf: cardStatusDMValueOf,
};

export { cardStatusDM };
