import { FormikProps } from "formik";
import { IGoalEntry } from "./forms/GoalForm/types";

interface IFormsProgrammedSavingFixedRequest {
  goal: { isValid: boolean; values: IGoalEntry };
}

interface IFormsProgrammedSavingFixedRequestRefs {
  goal: React.RefObject<FormikProps<IGoalEntry>>;
}

export type {
  IFormsProgrammedSavingFixedRequest,
  IFormsProgrammedSavingFixedRequestRefs,
};
