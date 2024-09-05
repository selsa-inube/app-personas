import { IGoalEntry } from "../forms/GoalForm/types";
import { IPlanNameEntry } from "../forms/PlanNameForm/types";
import { IQuotaEntry } from "../forms/QuotaForm/types";

const quota: IQuotaEntry = {
  periodicValue: "",
  paymentMethod: "",
  periodicity: "",
  paydayTypeToSelect: "",
  paydayByDate: "",
};

const goal: IGoalEntry = {
  goalWithDate: false,
  daysNumber: "",
  refundDate: "",
};

const planName: IPlanNameEntry = {
  productName: "",
};

const initalValuesProgrammedSavingFixed = {
  quota,
  goal,
  planName,
};

export { initalValuesProgrammedSavingFixed };
