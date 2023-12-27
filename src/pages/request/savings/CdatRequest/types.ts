import { FormikProps } from "formik";
import { IContactChannelsEntry } from "src/forms/ContactChannelsForm/types";
import { IInvestmentEntry } from "./forms/InvestmentForm/types";
import { IInvestmentNameEntry } from "./forms/InvestmentNameForm/types";

interface IFormsCdatRequest {
  investment: { isValid: boolean; values: IInvestmentEntry };
  investmentName: { isValid: boolean; values: IInvestmentNameEntry };
  contactChannels: {
    isValid: boolean;
    values: IContactChannelsEntry;
  };
}

interface IFormsCdatRequestRefs {
  investment: React.RefObject<FormikProps<IInvestmentEntry>>;
  investmentName: React.RefObject<FormikProps<IInvestmentNameEntry>>;
  contactChannels: React.RefObject<FormikProps<IContactChannelsEntry>>;
}

export type { IFormsCdatRequest, IFormsCdatRequestRefs };
