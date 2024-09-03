import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { ICreditConditionsEntry } from "../forms/CreditConditionsForm/types";
import { IDestinationEntry } from "../forms/DestinationForm/types";
import { IDisbursementEntry } from "../forms/DisbursementForm/types";
import { IDocumentaryRequirementsEntry } from "../forms/DocumentaryRequirementsForm/types";
import { IPaymentMethodEntry } from "../forms/PaymentMethodForm/types";
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
    maxAmountForUser: 0,
    amortizationType: "",
  },
  simulationWithQuota: false,
  netValue: 0,
  anticipatedInterest: 0,
  discounts: 0,
  rate: 0,
  hasResult: false,
  minWarrantyRequired: "",
  paymentMethods: [],
  periodicity: {
    id: "",
    description: "",
    periodicityInMonths: 0,
    periodicityInDays: 0,
  },
  periodicities: [],
  charges: 0,
};

const paymentMethod: IPaymentMethodEntry = {
  paymentMethods: [],
  paymentMethodType: "",
};

const systemValidations: ISystemValidationsEntry = {
  validations: [],
  documents: [],
  productId: "",
  productName: "",
  destinationId: "",
  destinationName: "",
  paymentMethod: "",
  paymentMethodName: "",
  amount: 0,
  periodicity: "",
  deadline: 0,
  rate: 0,
  amortizationType: "",
  quota: 0,
  netValue: 0,
};

const documentaryRequirements: IDocumentaryRequirementsEntry = {
  requiredDocuments: [],
  selectedDocuments: [],
};

const disbursement: IDisbursementEntry = {
  disbursements: [],
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
  productId: "",
  termsConditions: [],
  ids: "",
  dataPolicyUrl: "",
  accept: false,
  acceptDataPolicy: false,
};

const initalValuesCreditDestination = {
  destination,
  creditConditions,
  paymentMethod,
  systemValidations,
  documentaryRequirements,
  disbursement,
  comments,
  termsAndConditions,
};

export { initalValuesCreditDestination };
