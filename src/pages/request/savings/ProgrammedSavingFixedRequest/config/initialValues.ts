import { IQuotaEntry } from "../forms/QuotaForm/types";

const quota: IQuotaEntry = {
    periodicValue: "",
    paymentMethod: "",
    periodicity:"",
    paydayTypeToSelect:"",
    paydayByDate: "",
};

const initalValuesProgrammedSavingFixed = {
  quota,
};

export { initalValuesProgrammedSavingFixed };
