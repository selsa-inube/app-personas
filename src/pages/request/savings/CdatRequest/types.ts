import { FormikProps } from "formik";
// import { ICommentsEntry } from "./forms/CommentsForm/types";
import { IInvestmentEntry } from "./forms/InvestmentForm/types";


interface IFormsCdatRequest {
    investment: { isValid: boolean; values: IInvestmentEntry };
    // communicationChannels: {
    //   isValid: boolean;
    //   values: ICommunicationChannelsEntry;
    // };
  }
  
  interface IFormsCdatRequestRefs {
    investment: React.RefObject<FormikProps<IInvestmentEntry>>;
    // communicationChannels: React.RefObject<
    //   FormikProps<ICommunicationChannelsEntry>
    // >;
  }

  export type {
    IFormsCdatRequest,
    IFormsCdatRequestRefs,
  }