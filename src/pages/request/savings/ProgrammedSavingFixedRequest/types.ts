import { FormikProps } from "formik";
import { IGoalEntry } from "./forms/GoalForm/types";
import { IReimbursementEntry } from "./forms/ReimbursementForm/types";
import { IPlanNameEntry } from "./forms/PlanNameForm/types";
import { IQuotaEntry } from "./forms/QuotaForm/types";
import { IContactChannelsEntry } from "src/shared/forms/ContactChannelsForm/types";
import { ICommentsEntry } from "./forms/CommentsForm/types";

interface IFormsProgrammedSavingFixedRequest {
  quota: { isValid: boolean; values: IQuotaEntry };
  goal: { isValid: boolean; values: IGoalEntry };
  reimbursement: { isValid: boolean; values: IReimbursementEntry };
  planName: { isValid: boolean; values: IPlanNameEntry };
  contactChannels: { isValid: boolean; values: IContactChannelsEntry };
  comments: { isValid: boolean; values: ICommentsEntry };
}

interface IFormsProgrammedSavingFixedRequestRefs {
  quota: React.RefObject<FormikProps<IQuotaEntry>>;
  goal: React.RefObject<FormikProps<IGoalEntry>>;
  reimbursement: React.RefObject<FormikProps<IReimbursementEntry>>;
  planName: React.RefObject<FormikProps<IPlanNameEntry>>;
  contactChannels: React.RefObject<FormikProps<IContactChannelsEntry>>;
  comments: React.RefObject<FormikProps<ICommentsEntry>>;
}

export type {
  IFormsProgrammedSavingFixedRequest,
  IFormsProgrammedSavingFixedRequestRefs,
};
