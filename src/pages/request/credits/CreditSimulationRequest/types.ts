import { FormikProps } from "formik";
import { IDestinationEntry } from "./forms/DestinationForm/types";

interface IFormsCreditSimulationRequest {
  destination: IDestinationEntry;
}

interface IFormsCreditSimulationRequestRefs {
  destination: React.RefObject<FormikProps<IDestinationEntry>>;
}

export type {
  IFormsCreditSimulationRequest,
  IFormsCreditSimulationRequestRefs,
};
