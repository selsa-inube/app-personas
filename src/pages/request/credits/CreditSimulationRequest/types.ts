import { FormikProps } from "formik";
import { IDestinationEntry } from "./forms/DestinationForm/types";
import { ISimulationEntry } from "./forms/SimulationForm/types";

interface IFormsCreditSimulationRequest {
  destination: IDestinationEntry;
  simulation: ISimulationEntry;
}

interface IFormsCreditSimulationRequestRefs {
  destination: React.RefObject<FormikProps<IDestinationEntry>>;
  simulation: React.RefObject<FormikProps<ISimulationEntry>>;
}

export type {
  IFormsCreditSimulationRequest,
  IFormsCreditSimulationRequestRefs,
};
