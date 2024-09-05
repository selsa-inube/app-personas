import { IDisbursementEntry } from "@forms/DisbursementForm/types";
import { ICommentsEntry } from "../../../../../shared/forms/CommentsForm/types";
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

const disbursement: IDisbursementEntry = {
  disbursements: [],
  accountNumber: "",
  writeAccountNumber: "",
  observations: "",
  supplier: "",
  identificationType: "",
  identification: "",
  socialReason: "",
  firstName: "",
  secondName: "",
  firstLastName: "",
  secondLastName: "",
  gender: "",
  others: "",
  entity: "",
  accountType: "",
};

const planName: IPlanNameEntry = {
  productName: "",
};

const comments: ICommentsEntry = {
  comments: "",
};

const initalValuesProgrammedSavingFixed = {
  quota,
  goal,
  disbursement,
  planName,
  comments,
};

export { initalValuesProgrammedSavingFixed };
