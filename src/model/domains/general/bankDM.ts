import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const bankDataDomain = {
  BANCOLOMBIA: {
    id: "07-BANCOLOMBIA S.A.",
    value: "Bancolombia S.A.",
  },
  BBVA: {
    id: "13-BANCO BBVA - GANADERO",
    value: "BBVA",
  },
  DAVIVIENDA: {
    id: "51-BANCO DAVIVIENDA",
    value: "Davivienda",
  },
  BANCO_BOGOTA: {
    id: "01-BANCO DE BOGOTA",
    value: "Banco de Bogotá",
  },
  COLPATRIA: {
    id: "19-BANCO COLPATRIA",
    value: "Colpatria",
  },
  COLMENA: {
    id: "57-BANCO COLMENA S.A.",
    value: "Colmena",
  },
  CORPBANCA: {
    id: "06-BANCO ITAU CORPBANCA COLOMBIA",
    value: "Corpbanca",
  },
  AV_VILLAS: {
    id: "52-BANCO AV VILLAS",
    value: "Banco AV Villas",
  },
};

const bankDMValueOf = (id: string) =>
  Object.values(bankDataDomain).find((item) => item.id === id);

const bankDM = {
  ...bankDataDomain,
  list: convertDomainToList(bankDataDomain),
  options: convertDomainToOptions(bankDataDomain),
  valueOf: bankDMValueOf,
};

export { bankDM };
