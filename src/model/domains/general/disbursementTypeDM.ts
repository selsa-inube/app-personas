import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const disbursementTypeDataDomain = {
  LOCAL_SAVINGS_DEPOSIT: {
    id: "ABOCTALOC",
    value: "Abono en cuenta de ahorros propia",
  },
  OWN_ACCOUNT_TRANSFER: {
    id: "TRAEXTPRO",
    value: "Transferencia externa a cuenta propia",
  },
  THIRD_PARTEXTERNAL_TRANSFER: {
    id: "TRAEXTTER",
    value: "Transferencia externa a un tercero",
  },
};

const disbursementTypeDMValueOf = (id: string) =>
  convertDomainToOptions(disbursementTypeDataDomain).find(
    (value) => value.id === id,
  );

const disbursementTypeDM = {
  ...disbursementTypeDataDomain,
  list: convertDomainToList(disbursementTypeDataDomain),
  options: convertDomainToOptions(disbursementTypeDataDomain),
  valueOf: disbursementTypeDMValueOf,
};

export { disbursementTypeDM };
