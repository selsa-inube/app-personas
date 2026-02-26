import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const collectMethodDataDomain = {
  PSE: {
    id: "PSE",
    value: "Pagar con PSE",
  },
  SAVINGACCOUNT: {
    id: "SavingAccount",
    value: "Débito automático",
  },
  CARD: {
    id: "Card",
    value: "Tarjeta",
  },
  MULTIPLE: {
    id: "Multiple",
    value: "Múltiple",
  },
};

const collectMethodDMValueOf = (id: string) =>
  Object.values(collectMethodDataDomain).find((value) => value.id === id);

const collectMethodDM = {
  ...collectMethodDataDomain,
  list: convertDomainToList(collectMethodDataDomain),
  options: convertDomainToOptions(collectMethodDataDomain),
  valueOf: collectMethodDMValueOf,
};

export { collectMethodDM };
