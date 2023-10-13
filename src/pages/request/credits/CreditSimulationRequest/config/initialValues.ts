import { peridiocityDM } from "src/model/domains/general/peridiocity";
import { ICommentsEntry } from "../forms/CommentsForm/types";
import { IDestinationEntry } from "../forms/DestinationForm/types";
import { ISimulationEntry } from "../forms/SimulationForm/types";
import { ITermsAndConditionsEntry } from "../forms/TermsAndConditionsForm/types";

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

const termsAndConditions: ITermsAndConditionsEntry = {
  accept: false,
};

const initalValuesCreditSimulation = {
  destination,
  simulation,
  comments,
  termsAndConditions,
};

export { initalValuesCreditSimulation };
