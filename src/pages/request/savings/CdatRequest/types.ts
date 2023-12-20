import { FormikProps } from "formik";
import { IInvestmentEntry } from "./forms/InvestmentForm/types";


interface IFormsCdatRequest {
    investment: { isValid: boolean; values: IInvestmentEntry };
  }
  
  interface IFormsCdatRequestRefs {
    investment: React.RefObject<FormikProps<IInvestmentEntry>>;
  }

  export type {
    IFormsCdatRequest,
    IFormsCdatRequestRefs,
  }