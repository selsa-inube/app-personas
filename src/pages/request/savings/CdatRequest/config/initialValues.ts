import { IConditionsEntry } from "../forms/ConditionsForm/types";
import { IInvestmentEntry } from "../forms/InvestmentForm/types";
import { IInvestmentNameEntry } from "../forms/InvestmentNameForm/types";

const investment: IInvestmentEntry = {
  valueInvestment: "",
};

const conditions: IConditionsEntry= {
  valueInvestment: "",
  interestPayment: "",
  simulationWithDate: false,
  deadlineDate: "",
  deadlineDays: "",    
}

const investmentName: IInvestmentNameEntry = {
  productName: "",
};


const initalValuesCDAT = {
    investment,
    conditions,
    investmentName,
  };
  
  export { initalValuesCDAT };
  