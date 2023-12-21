import { FormikProps } from "formik";
import { IInvestmentEntry } from "./forms/InvestmentForm/types";
import { IInvestmentNameEntry } from "./forms/InvestmentNameForm/types";

interface IFormsCdatRequest {
  investment: { isValid: boolean; values: IInvestmentEntry };
  investmentName: { isValid: boolean; values: IInvestmentNameEntry };
}

interface IFormsCdatRequestRefs {
  investment: React.RefObject<FormikProps<IInvestmentEntry>>;
  investmentName: React.RefObject<FormikProps<IInvestmentNameEntry>>;
}

export type { IFormsCdatRequest, IFormsCdatRequestRefs };
