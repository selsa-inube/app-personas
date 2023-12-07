import { peridiocityDM } from "src/model/domains/general/peridiocity";
import { ICommentsEntry } from "../forms/CommentsForm/types";
import { ICreditConditionsEntry } from "../forms/CreditConditionsForm/types";
import { IDestinationEntry } from "../forms/DestinationForm/types";
import { IDisbursementEntry } from "../forms/DisbursementForm/types";
import { IPreliquidationEntry } from "../forms/PreliquidationForm/types";
import { ITermsAndConditionsEntry } from "../forms/TermsAndConditionsForm/types";

const destination: IDestinationEntry = {
  creditDestination: "",
  product: "",
};

const creditConditions: ICreditConditionsEntry = {
  creditDestination: "",
  product: "",
  amount: "",
  peridiocity: peridiocityDM.MONTHLY.id,
  deadline: "",
  simulationWithQuota: false,
  quota: "",
  cycleInterest: "",
  netValue: "",
  interestRate: "",
};

const preliquidation: IPreliquidationEntry = {
  amount: 0,
  interestAdjustmentCycle: 0,
  chargesAndDiscounts: 0,
  netValue: 0,
};

const disbursement: IDisbursementEntry = {
  disbursementType: "",
  accountNumber: "",
  writeAccountNumber: "",
  observations: "",
  supplier: "",
  identificationType: "",
  identification: "",
  socialReason: "",
  firstName: "",
  secondName: "",
  firstLastName: "",
  secondLastName: "",
  gender: "",
  others: "",
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
  creditConditions,
  preliquidation,
  disbursement,
  comments,
  termsAndConditions,
};

export { initalValuesCreditSimulation };
