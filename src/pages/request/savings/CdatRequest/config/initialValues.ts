import { IConditionsEntry } from "../forms/ConditionsForm/types";
import { IInvestmentEntry } from "../forms/InvestmentForm/types";
import { IInvestmentNameEntry } from "../forms/InvestmentNameForm/types";
import { IRefundEntry } from "../forms/RefundForm/types";

const investment: IInvestmentEntry = {
  valueInvestment: "",
};

const conditions: IConditionsEntry = {
  valueInvestment: "",
  interestPayment: "",
  simulationWithDate: false,
  deadlineDate: "",
  deadlineDays: "",
};

const refund: IRefundEntry = {
  refundMethod: "",
  account: "",
};

const investmentName: IInvestmentNameEntry = {
  productName: "",
};

const initalValuesCDAT = {
  investment,
  conditions,
  refund,
  investmentName,
};

export { initalValuesCDAT };
