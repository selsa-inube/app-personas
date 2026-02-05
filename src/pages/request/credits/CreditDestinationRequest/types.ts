import { ISystemValidationsEntry } from "@forms/SystemValidationsForm/types";
import { ITermsAndConditionsEntry } from "@forms/TermsAndConditionsForm/types";
import { FormikProps } from "formik";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { IContactChannelsEntry } from "src/shared/forms/ContactChannelsForm/types";
import { IDisbursementEntry } from "../../../../shared/forms/DisbursementForm/types";
import { IDocumentaryRequirementsEntry } from "../../../../shared/forms/DocumentaryRequirementsForm/types";
import { IPaymentMethodEntry } from "../../../../shared/forms/PaymentMethodForm/types";
import { ISimulateCreditEntry } from "./forms/SimulateCreditForm/types";
import { IDestinationEntry } from "./forms/DestinationForm/types";

interface IFormsCreditDestinationRequest {
  destination: { isValid: boolean; values: IDestinationEntry };
  simulateCredit: { isValid: boolean; values: ISimulateCreditEntry };
  paymentMethod: { isValid: boolean; values: IPaymentMethodEntry };
  disbursement: { isValid: boolean; values: IDisbursementEntry };
  systemValidations: { isValid: boolean; values: ISystemValidationsEntry };
  documentaryRequirements: {
    isValid: boolean;
    values: IDocumentaryRequirementsEntry;
  };
  comments: { isValid: boolean; values: ICommentsEntry };
  termsAndConditions: { isValid: boolean; values: ITermsAndConditionsEntry };
  contactChannels: {
    isValid: boolean;
    values: IContactChannelsEntry;
  };
}

interface IFormsCreditDestinationRequestRefs {
  destination: React.RefObject<FormikProps<IDestinationEntry> | null>;
  simulateCredit: React.RefObject<FormikProps<ISimulateCreditEntry> | null>;
  paymentMethod: React.RefObject<FormikProps<IPaymentMethodEntry> | null>;
  disbursement: React.RefObject<FormikProps<IDisbursementEntry> | null>;
  systemValidations: React.RefObject<FormikProps<ISystemValidationsEntry> | null>;
  documentaryRequirements: React.RefObject<
    FormikProps<IDocumentaryRequirementsEntry> | null
  >;
  comments: React.RefObject<FormikProps<ICommentsEntry> | null>;
  termsAndConditions: React.RefObject<FormikProps<ITermsAndConditionsEntry> | null>;
  contactChannels: React.RefObject<FormikProps<IContactChannelsEntry> | null>;
}

export type {
  IFormsCreditDestinationRequest,
  IFormsCreditDestinationRequestRefs,
};
