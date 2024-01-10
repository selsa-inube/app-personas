import { FormikProps } from "formik";
import { IGoalEntry } from "./forms/GoalForm/types";
import { IContactChannelsEntry } from "@forms/ContactChannelsForm/types";

interface IFormsProgrammedSavingFixedRequest {
  goal: { isValid: boolean; values: IGoalEntry };
  contactChannels: {
    isValid: boolean;
    values: IContactChannelsEntry;
  };
}

interface IFormsProgrammedSavingFixedRequestRefs {
  goal: React.RefObject<FormikProps<IGoalEntry>>;
  contactChannels: React.RefObject<FormikProps<IContactChannelsEntry>>;
}

export type {
  IFormsProgrammedSavingFixedRequest,
  IFormsProgrammedSavingFixedRequestRefs,
};
