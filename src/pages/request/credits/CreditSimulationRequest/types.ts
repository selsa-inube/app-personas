import { FormikProps } from "formik";
import { ICommentsEntry } from "./forms/CommentsForm/types";
import { IDestinationEntry } from "./forms/DestinationForm/types";
import { ISimulationEntry } from "./forms/SimulationForm/types";
import { IPreliquidationEntry } from "./forms/PreliquidationForm/types";

interface IFormsCreditSimulationRequest {
  destination: { isValid: boolean; values: IDestinationEntry };
  simulation: { isValid: boolean; values: ISimulationEntry };
  comments: { isValid: boolean; values: ICommentsEntry };
  preliquidation: { isValid: boolean; values: IPreliquidationEntry };
}

interface IFormsCreditSimulationRequestRefs {
  destination: React.RefObject<FormikProps<IDestinationEntry>>;
  simulation: React.RefObject<FormikProps<ISimulationEntry>>;
  comments: React.RefObject<FormikProps<ICommentsEntry>>;
  preliquidation: React.RefObject<FormikProps<IPreliquidationEntry>>;
}

export type {
  IFormsCreditSimulationRequest,
  IFormsCreditSimulationRequestRefs,
};
