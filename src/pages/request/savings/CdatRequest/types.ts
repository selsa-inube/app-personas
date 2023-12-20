import { FormikProps } from "formik";
import { IInvestmentEntry } from "./forms/InvestmentForm/types";
import { IContactChannelsEntry } from "src/forms/ContactChannelsForm/types";

interface IFormsCdatRequest {
  investment: { isValid: boolean; values: IInvestmentEntry };
  contactChannels: {
    isValid: boolean;
    values: IContactChannelsEntry;
  };
}

interface IFormsCdatRequestRefs {
  investment: React.RefObject<FormikProps<IInvestmentEntry>>;
  contactChannels: React.RefObject<FormikProps<IContactChannelsEntry>>;
}

export type { IFormsCdatRequest, IFormsCdatRequestRefs };
