import { FormikProps } from "formik";
import { IGoalEntry } from "./forms/GoalForm/types";
import { IReimbursementEntry } from "./forms/ReimbursementForm/types";

interface IFormsProgrammedSavingFixedRequest {
  goal: { isValid: boolean; values: IGoalEntry };
  reimbursement:{isValid: boolean; values: IReimbursementEntry}
}

interface IFormsProgrammedSavingFixedRequestRefs {
  goal: React.RefObject<FormikProps<IGoalEntry>>;
  reimbursement:React.RefObject<FormikProps<IReimbursementEntry>>;
}

export type {
  IFormsProgrammedSavingFixedRequest,
  IFormsProgrammedSavingFixedRequestRefs,
};
