import { FormikProps } from "formik";
import { ICommentsEntry } from "./forms/CommentsForm/types";
import { ICommunicationChannelsEntry } from "./forms/CommunicationChannelsForm/types";
import { ICreditConditionsEntry } from "./forms/CreditConditionsForm/types";
import { IDestinationEntry } from "./forms/DestinationForm/types";
import { IDisbursementEntry } from "./forms/DisbursementForm/types";
import { IPreliquidationEntry } from "./forms/PreliquidationForm/types";
import { ITermsAndConditionsEntry } from "./forms/TermsAndConditionsForm/types";

interface IFormsCreditSimulationRequest {
  destination: { isValid: boolean; values: IDestinationEntry };
  creditConditions: { isValid: boolean; values: ICreditConditionsEntry };
  preliquidation: { isValid: boolean; values: IPreliquidationEntry };
  disbursement: { isValid: boolean; values: IDisbursementEntry };
  comments: { isValid: boolean; values: ICommentsEntry };
  termsAndConditions: { isValid: boolean; values: ITermsAndConditionsEntry };
  communicationChannels: {
    isValid: boolean;
    values: ICommunicationChannelsEntry;
  };
}

interface IFormsCreditSimulationRequestRefs {
  destination: React.RefObject<FormikProps<IDestinationEntry>>;
  creditConditions: React.RefObject<FormikProps<ICreditConditionsEntry>>;
  preliquidation: React.RefObject<FormikProps<IPreliquidationEntry>>;
  disbursement: React.RefObject<FormikProps<IDisbursementEntry>>;
  comments: React.RefObject<FormikProps<ICommentsEntry>>;
  termsAndConditions: React.RefObject<FormikProps<ITermsAndConditionsEntry>>;
  communicationChannels: React.RefObject<
    FormikProps<ICommunicationChannelsEntry>
  >;
}

export type {
  IFormsCreditSimulationRequest,
  IFormsCreditSimulationRequestRefs,
};
