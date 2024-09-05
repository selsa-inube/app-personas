import { IDisbursementEntry } from "@forms/DisbursementForm/types";
import { FormikProps } from "formik";
import { IContactChannelsEntry } from "src/shared/forms/ContactChannelsForm/types";
import { ICommentsEntry } from "../../../../shared/forms/CommentsForm/types";
import { IGoalEntry } from "./forms/GoalForm/types";
import { IPlanNameEntry } from "./forms/PlanNameForm/types";
import { IQuotaEntry } from "./forms/QuotaForm/types";

interface IFormsProgrammedSavingFixedRequest {
  quota: { isValid: boolean; values: IQuotaEntry };
  goal: { isValid: boolean; values: IGoalEntry };
  disbursement: { isValid: boolean; values: IDisbursementEntry };
  planName: { isValid: boolean; values: IPlanNameEntry };
  contactChannels: { isValid: boolean; values: IContactChannelsEntry };
  comments: { isValid: boolean; values: ICommentsEntry };
}

interface IFormsProgrammedSavingFixedRequestRefs {
  quota: React.RefObject<FormikProps<IQuotaEntry>>;
  goal: React.RefObject<FormikProps<IGoalEntry>>;
  disbursement: React.RefObject<FormikProps<IDisbursementEntry>>;
  planName: React.RefObject<FormikProps<IPlanNameEntry>>;
  contactChannels: React.RefObject<FormikProps<IContactChannelsEntry>>;
  comments: React.RefObject<FormikProps<ICommentsEntry>>;
}

export type {
  IFormsProgrammedSavingFixedRequest,
  IFormsProgrammedSavingFixedRequestRefs,
};
