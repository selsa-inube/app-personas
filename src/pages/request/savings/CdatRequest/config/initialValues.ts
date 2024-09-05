import { IDisbursementEntry } from "@forms/DisbursementForm/types";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { IConditionsEntry } from "../forms/ConditionsForm/types";
import { IInvestmentNameEntry } from "../forms/InvestmentNameForm/types";
import { IPaymentMethodEntry } from "../forms/PaymentMethodForm/types";
import { ITermsAndConditionsEntry } from "../forms/TermsAndConditionsForm/types";

const conditions: IConditionsEntry = {
  interestPayment: "",
  simulationWithDate: false,
  deadlineDate: "",
  deadlineDays: "",
  hasResult: false,
};

const paymentMethod: IPaymentMethodEntry = {
  paymentMethod: "",
  valueToPay: 0,
  pendingValue: 0,
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

const investmentName: IInvestmentNameEntry = {
  productName: "",
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

const initalValuesCDAT = {
  conditions,
  paymentMethod,
  disbursement,
  investmentName,
  comments,
  termsAndConditions,
};

export { initalValuesCDAT };
