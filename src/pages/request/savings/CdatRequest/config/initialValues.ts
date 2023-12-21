import { IInvestmentEntry } from "../forms/InvestmentForm/types";
import { IInvestmentNameEntry } from "../forms/InvestmentNameForm/types";

const investment: IInvestmentEntry = {
  valueInvestment: "",
};

const investmentName: IInvestmentNameEntry = {
  productName: "",
};

const initalValuesCDAT = {
  investment,
  investmentName,
};

export { initalValuesCDAT };
