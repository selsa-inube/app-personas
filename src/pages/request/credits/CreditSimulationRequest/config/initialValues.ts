import { IDestinationEntry } from "../forms/DestinationForm/types";
import { ISimulationEntry } from "../forms/SimulationForm/types";

const destination: IDestinationEntry = {
  creditDestination: "",
  product: "",
};

const simulation: ISimulationEntry = {
  creditDestination: "",
  product: "",
  amount: "",
  deadline: "",
  peridiocity: "",
};

const initalValuesCreditSimulation = {
  destination,
  simulation,
};

export { initalValuesCreditSimulation };
