import { FormikProps } from "formik";
import { IQuotaEntry } from "./forms/QuotaForm/types";
import { IGoalEntry } from "./forms/GoalForm/types";
import { IContactChannelsEntry } from "@forms/ContactChannelsForm/types";
import { IReimbursementEntry } from "./forms/ReimbursementForm/types";

interface IFormsProgrammedSavingFixedRequest {
  quota: { isValid: boolean; values: IQuotaEntry };
  goal: { isValid: boolean; values: IGoalEntry };
  reimbursement:{isValid: boolean; values: IReimbursementEntry};
  contactChannels: {
    isValid: boolean;
    values: IContactChannelsEntry;
  };
}

interface IFormsProgrammedSavingFixedRequestRefs {
  quota: React.RefObject<FormikProps<IQuotaEntry>>;
  goal: React.RefObject<FormikProps<IGoalEntry>>;
  reimbursement:React.RefObject<FormikProps<IReimbursementEntry>>;
  contactChannels: React.RefObject<FormikProps<IContactChannelsEntry>>;
}

export type {
  IFormsProgrammedSavingFixedRequest,
  IFormsProgrammedSavingFixedRequestRefs,
};
