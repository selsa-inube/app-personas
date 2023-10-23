import { peridiocityDM } from "src/model/domains/general/peridiocity";
import { ICommentsEntry } from "../forms/CommentsForm/types";
import { IDestinationEntry } from "../forms/DestinationForm/types";
import { ISimulationEntry } from "../forms/SimulationForm/types";
import { IPreliquidationEntry } from "../forms/PreliquidationForm/types";
import { IDisbursementEntry } from "../forms/DisbursementForm/types";
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

const preliquidation: IPreliquidationEntry = {
  amount: 20500000,
  advanceInterestAdjustmentCycle: 49250,
  chargesAndDiscounts: 0,
  netValueToSend: 10444975,
};

const disbursement: IDisbursementEntry = {
  creditDisbursement: "",
  accountNumber: "",
  observations: "",
  supplier: "",
  identicationType: "",
  identification: "",
  socialReason: "",
  firstName: "",
  secondName: "",
  firstLastName: "",
  secondLastName: "",
  gender: "",
  others: "",
  account: "",
  entity: "",
  accountType: "",
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
  preliquidation,
  disbursement,
  comments,
  termsAndConditions,
};

export { initalValuesCreditSimulation };
