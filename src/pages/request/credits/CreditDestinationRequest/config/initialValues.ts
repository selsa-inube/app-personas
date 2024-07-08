import { peridiocityDM } from "src/model/domains/general/peridiocityDM";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { ICreditConditionsEntry } from "../forms/CreditConditionsForm/types";
import { IDestinationEntry } from "../forms/DestinationForm/types";
import { IDisbursementEntry } from "../forms/DisbursementForm/types";
import { IDocumentaryRequirementsEntry } from "../forms/DocumentaryRequirementsForm/types";
import { IPreliquidationEntry } from "../forms/PreliquidationForm/types";
import { ITermsAndConditionsEntry } from "../forms/TermsAndConditionsForm/types";

const destination: IDestinationEntry = {
  products: [],
  destinations: [],
};

const creditConditions: ICreditConditionsEntry = {
  product: {
    id: "",
    title: "",
    description: "",
    maxRate: 0,
    maxDeadline: 0,
    maxAmount: 0,
  },
  amount: 0,
  peridiocity: peridiocityDM.MONTHLY.id,
  deadline: "",
  simulationWithQuota: false,
  quota: 0,
  netValue: 0,
  cycleInterest: 0,
  discounts: 0,
  interestRate: "",
  hasResult: false,
  minWarrantyRequired: "",
};

const preliquidation: IPreliquidationEntry = {
  amount: 0,
  interestAdjustmentCycle: 0,
  chargesAndDiscounts: 0,
  netValue: 0,
};

const documentaryRequirements: IDocumentaryRequirementsEntry = {
  requiredDocuments: [],
  selectedDocuments: [],
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

const initalValuesCreditDestination = {
  destination,
  creditConditions,
  preliquidation,
  documentaryRequirements,
  disbursement,
  comments,
  termsAndConditions,
};

export { initalValuesCreditDestination };

