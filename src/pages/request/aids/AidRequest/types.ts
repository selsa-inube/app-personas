import { IContactChannelsEntry } from "@forms/ContactChannelsForm/types";
import { IDisbursementEntry } from "@forms/DisbursementForm/types";
import { ISystemValidationsEntry } from "@forms/SystemValidationsForm/types";
import { ITermsAndConditionsEntry } from "@forms/TermsAndConditionsForm/types";
import { FormikProps } from "formik";
import { IBeneficiariesEntry } from "./forms/BeneficiariesForm/types";
import { IDetailsSituationEntry } from "./forms/DetailsSituationForm/types";
import { IDocumentaryRequirementsEntry } from "@forms/DocumentaryRequirementsForm/types";
import { IEvaluateAmountsEntry } from "./forms/EvaluateAmountsForm/types";

interface IFormsAidRequest {
  beneficiaries: { isValid: boolean; values: IBeneficiariesEntry };
  evaluateAmounts: { isValid: boolean; values: IEvaluateAmountsEntry };
  detailsSituation: { isValid: boolean; values: IDetailsSituationEntry };
  systemValidations: {
    isValid: boolean;
    values: ISystemValidationsEntry;
  };
  documentaryRequirements: {
    isValid: boolean;
    values: IDocumentaryRequirementsEntry;
  };
  disbursement: { isValid: boolean; values: IDisbursementEntry };
  termsAndConditions: { isValid: boolean; values: ITermsAndConditionsEntry };
  contactChannels: {
    isValid: boolean;
    values: IContactChannelsEntry;
  };
}

interface IFormsAidRequestRefs {
  beneficiaries: React.RefObject<FormikProps<IBeneficiariesEntry> | null>;
  evaluateAmounts: React.RefObject<FormikProps<IEvaluateAmountsEntry> | null>;
  detailsSituation: React.RefObject<FormikProps<IDetailsSituationEntry> | null>;
  systemValidations: React.RefObject<FormikProps<ISystemValidationsEntry> | null>;
  documentaryRequirements: React.RefObject<
    FormikProps<IDocumentaryRequirementsEntry> | null
  >;
  disbursement: React.RefObject<FormikProps<IDisbursementEntry> | null>;
  termsAndConditions: React.RefObject<FormikProps<ITermsAndConditionsEntry> | null>;
  contactChannels: React.RefObject<FormikProps<IContactChannelsEntry> | null>;
}

export type { IFormsAidRequest, IFormsAidRequestRefs };
