import { IGoalEntry } from "../forms/GoalForm/types";
import { IPlanNameEntry } from "../forms/PlanNameForm/types";
import { IQuotaEntry } from "../forms/QuotaForm/types";
import { IReimbursementEntry } from "../forms/ReimbursementForm/types";

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

const reimbursement: IReimbursementEntry = {
  reimbursementType: "",
  accountReimbursement: "",
};

const planName: IPlanNameEntry = {
  productName: "",
};

const initalValuesProgrammedSavingFixed = {
  quota,
  goal,
  reimbursement,
  planName,
};

export { initalValuesProgrammedSavingFixed };
