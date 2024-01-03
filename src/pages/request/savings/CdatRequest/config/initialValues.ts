import { IInvestmentEntry } from "../forms/InvestmentForm/types";
import { IInvestmentNameEntry } from "../forms/InvestmentNameForm/types";
import { IRefundEntry } from "../forms/RefundForm/types";

const investment: IInvestmentEntry = {
  valueInvestment: "",
};

const refund: IRefundEntry = {
  refundMethod: "creditToInternalAccount",
  account: "internalAccount",
};

const investmentName: IInvestmentNameEntry = {
  productName: "",
};

const initalValuesCDAT = {
  investment,
  refund,
  investmentName,
};

export { initalValuesCDAT };
