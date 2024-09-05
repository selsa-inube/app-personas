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

const investmentName: IInvestmentNameEntry = {
  productName: "",
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
  investmentName,
  termsAndConditions,
};

export { initalValuesCDAT };
