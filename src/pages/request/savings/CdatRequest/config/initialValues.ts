import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { IConditionsEntry } from "../forms/ConditionsForm/types";
import { IInvestmentNameEntry } from "../forms/InvestmentNameForm/types";
import { IPaymentMethodEntry } from "../forms/PaymentMethodForm/types";
import { IRefundEntry } from "../forms/RefundForm/types";

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

const refund: IRefundEntry = {
  refundMethod: "",
  account: "",
};

const investmentName: IInvestmentNameEntry = {
  productName: "",
};

const comments: ICommentsEntry = {
  comments: "",
};

const initalValuesCDAT = {
  conditions,
  paymentMethod,
  refund,
  investmentName,
  comments,
};

export { initalValuesCDAT };
