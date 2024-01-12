import { IGoalEntry } from "../forms/GoalForm/types";
import { IQuotaEntry } from "../forms/QuotaForm/types";
import { IReimbursementEntry } from "../forms/ReimbursementForm/types";

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

const reimbursement:IReimbursementEntry={
  reimbursementType:"creditToInternalAccount",
  accountReimbursement:"",

}

const initalValuesProgrammedSavingFixed = {
  quota,
  goal,
  reimbursement,
};

export { initalValuesProgrammedSavingFixed };
