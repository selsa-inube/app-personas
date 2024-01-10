import { FormikProps } from "formik";
import { IGoalEntry } from "./forms/GoalForm/types";
import { IQuotaEntry } from "./forms/QuotaForm/types";

interface IFormsProgrammedSavingFixedRequest {
  quota: { isValid: boolean; values: IQuotaEntry };
  goal: { isValid: boolean; values: IGoalEntry };
}

interface IFormsProgrammedSavingFixedRequestRefs {
  quota: React.RefObject<FormikProps<IQuotaEntry>>;
  goal: React.RefObject<FormikProps<IGoalEntry>>;
}

export type {
  IFormsProgrammedSavingFixedRequest,
  IFormsProgrammedSavingFixedRequestRefs,
};
