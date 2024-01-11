import { IGoalEntry } from "../forms/GoalForm/types";
import { IReimbursementEntry } from "../forms/ReimbursementForm/types";


const goal: IGoalEntry = {
  goalWithDate: false,
  daysNumber: "",
  refundDate: "",
};

const reimbursement:IReimbursementEntry={
  reimbursementType:"",
  accountReimbursement:"",

}

const initalValuesProgrammedSavingFixed = {
  goal,
  reimbursement,
};

export { initalValuesProgrammedSavingFixed };
