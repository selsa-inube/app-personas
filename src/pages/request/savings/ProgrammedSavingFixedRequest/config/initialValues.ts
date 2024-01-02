import { IQuotaEntry } from "../forms/QuotaForm/types";

const quota: IQuotaEntry = {
    periodicValue: "",
    paymentMethod: "",
    periodicity:"",
    weeklyPayDay:"",
    biweeklyPayDay:"",
    monthlyPayDay: "",
    semiannualPayDay: "",
    annualPayDay: "",
};

const initalValuesProgrammedSavingFixed = {
  quota,
};

export { initalValuesProgrammedSavingFixed };
