import { FormikProps } from "formik";
import { IInvestmentEntry } from "./forms/InvestmentForm/types";
import { IInvestmentNameEntry } from "./forms/InvestmentNameForm/types";
import { IRefundEntry } from "./forms/RefundForm/types";

interface IFormsCdatRequest {
  investment: { isValid: boolean; values: IInvestmentEntry };
  refund: { isValid: boolean; values: IRefundEntry };
  investmentName: { isValid: boolean; values: IInvestmentNameEntry };
}

interface IFormsCdatRequestRefs {
  investment: React.RefObject<FormikProps<IInvestmentEntry>>;
  refund: React.RefObject<FormikProps<IRefundEntry>>;
  investmentName: React.RefObject<FormikProps<IInvestmentNameEntry>>;
}

export type { IFormsCdatRequest, IFormsCdatRequestRefs };
