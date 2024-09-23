import { IContactChannelsEntry } from "@forms/ContactChannelsForm/types";
import { IDisbursementEntry } from "@forms/DisbursementForm/types";
import { ISystemValidationsEntry } from "@forms/SystemValidationsForm/types";
import { ITermsAndConditionsEntry } from "@forms/TermsAndConditionsForm/types";
import { FormikProps } from "formik";
import { IBeneficiariesEntry } from "./forms/BeneficiariesForm/types";
import { IDetailsSituationEntry } from "./forms/DetailsSituationForm/types";
import { IDocumentaryRequirementsEntry } from "./forms/DocumentaryRequirementsForm/types";

interface IFormsAidRequest {
  beneficiaries: { isValid: boolean; values: IBeneficiariesEntry };
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
  beneficiaries: React.RefObject<FormikProps<IBeneficiariesEntry>>;
  detailsSituation: React.RefObject<FormikProps<IDetailsSituationEntry>>;
  systemValidations: React.RefObject<FormikProps<ISystemValidationsEntry>>;
  documentaryRequirements: React.RefObject<
    FormikProps<IDocumentaryRequirementsEntry>
  >;
  disbursement: React.RefObject<FormikProps<IDisbursementEntry>>;
  termsAndConditions: React.RefObject<FormikProps<ITermsAndConditionsEntry>>;
  contactChannels: React.RefObject<FormikProps<IContactChannelsEntry>>;
}

export type { IFormsAidRequest, IFormsAidRequestRefs };
