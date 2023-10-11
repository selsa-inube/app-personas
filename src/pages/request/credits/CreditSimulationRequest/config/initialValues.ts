import { peridiocityDM } from "src/model/domains/general/peridiocity";
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
  peridiocity: peridiocityDM.MONTHLY.id,
  deadline: "",
  simulationWithQuota: false,
  quota: "",
  cycleInterest: "",
  netValue: "",
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
