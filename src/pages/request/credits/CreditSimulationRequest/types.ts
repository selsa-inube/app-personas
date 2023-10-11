import { FormikProps } from "formik";
import { ICommentsEntry } from "./forms/CommentsForm/types";
import { IDestinationEntry } from "./forms/DestinationForm/types";
import { ISimulationEntry } from "./forms/SimulationForm/types";
import { ITermsAndConditionsEntry } from "./forms/TermsAndConditionsForm/types";

interface IFormsCreditSimulationRequest {
  destination: { isValid: boolean; values: IDestinationEntry };
  simulation: { isValid: boolean; values: ISimulationEntry };
  comments: { isValid: boolean; values: ICommentsEntry };
  termsAndConditions: { isValid: boolean; values: ITermsAndConditionsEntry };
}

interface IFormsCreditSimulationRequestRefs {
  destination: React.RefObject<FormikProps<IDestinationEntry>>;
  simulation: React.RefObject<FormikProps<ISimulationEntry>>;
  comments: React.RefObject<FormikProps<ICommentsEntry>>;
  termsAndConditions: React.RefObject<FormikProps<ITermsAndConditionsEntry>>;
}

export type {
  IFormsCreditSimulationRequest,
  IFormsCreditSimulationRequestRefs,
};
