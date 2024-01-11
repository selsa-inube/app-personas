import { IGoalEntry } from "../forms/GoalForm/types";
import { IQuotaEntry } from "../forms/QuotaForm/types";

const quota: IQuotaEntry = {
  periodicValue: "",
  paymentMethod: "",
  periodicity:"",
  paydayTypeToSelect:"",
  paydayByDate: "",
};

const goal: IGoalEntry = {
  goalWithDate: false,
  daysNumber: "",
  refundDate: "",
};

const initalValuesProgrammedSavingFixed = {
  quota,
  goal,
};

export { initalValuesProgrammedSavingFixed };
