import { ICommentsEntry } from "../forms/CommentsForm/types";
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
  peridiocity: "",
  deadline: "",
  simulationWithQuota: false,
};

const comments: ICommentsEntry = {
  comments: "",
};

const initalValuesCreditSimulation = {
  destination,
  simulation,
  comments,
};

export { initalValuesCreditSimulation };
