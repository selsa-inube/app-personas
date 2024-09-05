import { FormikProps } from "formik";
import { IAmountEntry } from "./forms/AmountForm/types";
import { IBeneficiariesEntry } from "./forms/BeneficiariesForm/types";
import { IDetailsSituationEntry } from "./forms/DetailsSituationForm/types";
import { IDocumentaryRequirementsEntry } from "./forms/DocumentaryRequirementsForm/types";
import { IRegulationValidationsEntry } from "./forms/RegulationValidationsForm/types";
import { IDisbursementEntry } from "@forms/DisbursementForm/types";

interface IFormsAidRequest {
  beneficiaries: { isValid: boolean; values: IBeneficiariesEntry };
  amount: { isValid: boolean; values: IAmountEntry };
  detailsSituation: { isValid: boolean; values: IDetailsSituationEntry };
  regulationValidations: {
    isValid: boolean;
    values: IRegulationValidationsEntry;
  };
  documentaryRequirements: {
    isValid: boolean;
    values: IDocumentaryRequirementsEntry;
  };
  disbursement: { isValid: boolean; values: IDisbursementEntry };
}

interface IFormsAidRequestRefs {
  beneficiaries: React.RefObject<FormikProps<IBeneficiariesEntry>>;
  amount: React.RefObject<FormikProps<IAmountEntry>>;
  detailsSituation: React.RefObject<FormikProps<IDetailsSituationEntry>>;
  regulationValidations: React.RefObject<
    FormikProps<IRegulationValidationsEntry>
  >;
  documentaryRequirements: React.RefObject<
    FormikProps<IDocumentaryRequirementsEntry>
  >;
  disbursement: React.RefObject<FormikProps<IDisbursementEntry>>;
}

export type { IFormsAidRequest, IFormsAidRequestRefs };
