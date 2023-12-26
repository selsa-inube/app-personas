import { FormikProps } from "formik";
import { IInvestmentEntry } from "./forms/InvestmentForm/types";
import { IConditionsEntry } from "./forms/ConditionsForm/types";
import { IInvestmentNameEntry } from "./forms/InvestmentNameForm/types";

interface IFormsCdatRequest {
  investment: { isValid: boolean; values: IInvestmentEntry };
  conditions: { isValid: boolean; values: IConditionsEntry };
  investmentName: { isValid: boolean; values: IInvestmentNameEntry };
}

interface IFormsCdatRequestRefs {
  investment: React.RefObject<FormikProps<IInvestmentEntry>>;
  conditions: React.RefObject<FormikProps<IConditionsEntry>>;
  investmentName: React.RefObject<FormikProps<IInvestmentNameEntry>>;
}

export type { IFormsCdatRequest, IFormsCdatRequestRefs };
