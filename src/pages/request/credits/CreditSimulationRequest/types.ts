import { FormikProps } from "formik";
import { ICommentsEntry } from "./forms/CommentsForm/types";
import { IDestinationEntry } from "./forms/DestinationForm/types";
import { ISimulationEntry } from "./forms/SimulationForm/types";

interface IFormsCreditSimulationRequest {
  destination: IDestinationEntry;
  simulation: ISimulationEntry;
  comments: ICommentsEntry;
}

interface IFormsCreditSimulationRequestRefs {
  destination: React.RefObject<FormikProps<IDestinationEntry>>;
  simulation: React.RefObject<FormikProps<ISimulationEntry>>;
  comments: React.RefObject<FormikProps<ICommentsEntry>>;
}

export type {
  IFormsCreditSimulationRequest,
  IFormsCreditSimulationRequestRefs,
};
