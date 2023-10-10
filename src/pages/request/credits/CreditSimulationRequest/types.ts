import { FormikProps } from "formik";
import { IDestinationEntry } from "./forms/DestinationForm/types";
import { ICommentsEntry } from "./forms/CommentsForm/types";

interface IFormsCreditSimulationRequest {
  destination: IDestinationEntry;
  comments: ICommentsEntry;
}

interface IFormsCreditSimulationRequestRefs {
  destination: React.RefObject<FormikProps<IDestinationEntry>>;
  comments: React.RefObject<FormikProps<ICommentsEntry>>;
}

export type {
  IFormsCreditSimulationRequest,
  IFormsCreditSimulationRequestRefs,
};
