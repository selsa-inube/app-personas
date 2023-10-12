import { peridiocityDM } from "src/model/domains/general/peridiocity";
import { ICommentsEntry } from "../forms/CommentsForm/types";
import { IDestinationEntry } from "../forms/DestinationForm/types";
import { ISimulationEntry } from "../forms/SimulationForm/types";
import { IPreliquidationEntry } from "../forms/PreliquidationForm/types";

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

const preliquidation: IPreliquidationEntry = {
  amount: 20500000,
  advanceInterestAdjustmentCycle: 49250,
  chargesAndDiscounts: 0,
  netValueToSend: 10444975,
};

const initalValuesCreditSimulation = {
  destination,
  simulation,
  comments,
  preliquidation,
};

export { initalValuesCreditSimulation };
