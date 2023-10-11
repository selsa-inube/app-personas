import { FormikProps } from "formik";
import { IDestinationEntry } from "./forms/DestinationForm/types";
import { ICommentsEntry } from "./forms/CommentsForm/types";
import { ITermsAndConditionsEntry } from "./forms/TermsAndConditionsForm/types";

interface IFormsCreditSimulationRequest {
  destination: IDestinationEntry;
  comments: ICommentsEntry;
  termsAndConditions: ITermsAndConditionsEntry;
}

interface IFormsCreditSimulationRequestRefs {
  destination: React.RefObject<FormikProps<IDestinationEntry>>;
  comments: React.RefObject<FormikProps<ICommentsEntry>>;
  termsAndConditions: React.RefObject<FormikProps<ITermsAndConditionsEntry>>;
}

export type {
  IFormsCreditSimulationRequest,
  IFormsCreditSimulationRequestRefs,
};
