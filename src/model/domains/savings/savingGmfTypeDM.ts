import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const savingGmfTypeDataDomain = {
  ALL_TRANSACTIONS: {
    id: "AllTransactionsAreTaxed",
    value: "Todas las transacciones",
  },
  EXCEMPT: {
    id: "TotallyExcempt",
    value: "Totalmente exento",
  },
  EXCEMPT_MAX: {
    id: "ExcemptUntilMaximum",
    value: "Exento hasta el máximo",
  },
  EXCEMPT_MAX_PENSION: {
    id: "ExcemptUntilMaximumOnPensionAllowance",
    value: "Exento hasta el máximo de pensión",
  },
};

const savingGmfTypeDMValueOf = (id: string) =>
  Object.values(savingGmfTypeDataDomain).find((value) => value.id === id);

const savingGmfTypeDM = {
  ...savingGmfTypeDataDomain,
  list: convertDomainToList(savingGmfTypeDataDomain),
  options: convertDomainToOptions(savingGmfTypeDataDomain),
  valueOf: savingGmfTypeDMValueOf,
};

export { savingGmfTypeDM };
