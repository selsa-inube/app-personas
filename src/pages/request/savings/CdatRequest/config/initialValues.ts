import { IConditionsEntry } from "../forms/ConditionsForm/types";
import { IInvestmentEntry } from "../forms/InvestmentForm/types";

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

const initalValuesCDAT = {
    investment,
    conditions,
  };
  
  export { initalValuesCDAT };
  