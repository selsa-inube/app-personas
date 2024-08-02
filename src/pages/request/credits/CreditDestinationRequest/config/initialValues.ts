import { periodicityDM } from "src/model/domains/general/periodicityDM";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { ICreditConditionsEntry } from "../forms/CreditConditionsForm/types";
import { IDestinationEntry } from "../forms/DestinationForm/types";
import { IDisbursementEntry } from "../forms/DisbursementForm/types";
import { IDocumentaryRequirementsEntry } from "../forms/DocumentaryRequirementsForm/types";
import { ISystemValidationsEntry } from "../forms/SystemValidationsForm/types";
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
  periodicity: periodicityDM.MONTHLY.id,
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

const systemValidations: ISystemValidationsEntry = {
  validations: [],
  documents: [],
  productId: "",
  productName: "",
  destinationId: "",
  destinationName: "",
  paymentMethodCode: "",
  paymentMethodName: "",
  requestAmount: 0,
  creditAmount: 0,
  capitalPaymentPeriod: "",
  numQuotas: 0,
  nominalRate: "",
  amortizationType: "",
  interestPaymentPeriod: "",
  periodicity: "",
  quotaValue: 0,
  amountToTurn: 0,
};

const documentaryRequirements: IDocumentaryRequirementsEntry = {
  requiredDocuments: [],
  selectedDocuments: [],
  withDocumentaryRequirements: true,
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
  systemValidations,
  documentaryRequirements,
  disbursement,
  comments,
  termsAndConditions,
};

export { initalValuesCreditDestination };
