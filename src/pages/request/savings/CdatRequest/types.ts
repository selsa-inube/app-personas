import { FormikProps } from "formik";
import { IInvestmentEntry } from "./forms/InvestmentForm/types";
import { IConditionsEntry } from "./forms/ConditionsForm/types";



interface IFormsCdatRequest {
    investment: { isValid: boolean; values: IInvestmentEntry };
    conditions: { isValid: boolean; values: IConditionsEntry };

  }
  
  interface IFormsCdatRequestRefs {
    investment: React.RefObject<FormikProps<IInvestmentEntry>>;
    conditions: React.RefObject<FormikProps<IConditionsEntry>>;

  }

  export type {
    IFormsCdatRequest,
    IFormsCdatRequestRefs,
  }