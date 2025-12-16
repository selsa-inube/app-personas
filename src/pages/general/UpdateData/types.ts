import { FormikProps } from "formik";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { IBankTransfersEntry } from "./forms/BankTransfersForm/types";
import { IBeneficiariesEntry } from "./forms/BeneficiariesForm/types";
import { IContactDataEntry } from "./forms/ContactDataForm/types";
import { IEconomicActivityEntry } from "./forms/EconomicActivityForm/types";
import { IExpensesEntry } from "./forms/ExpensesForm/types";
import { IFamilyGroupEntries } from "./forms/FamilyGroupForm/types";
import { IFinancialOperationsEntry } from "./forms/FinancialOperationsForm/types";
import { IIncomesEntry } from "./forms/IncomesForm/types";
import { IPersonalAssetEntries } from "./forms/PersonalAssetsForm/types";
import { IPersonalDebtEntries } from "./forms/PersonalDebtsForm/types";
import { IPersonalInformationEntry } from "./forms/PersonalInformationForm/types";
import { IPersonalReferenceEntries } from "./forms/PersonalReferencesForm/types";
import { IPersonalResidenceEntry } from "./forms/PersonalResidenceForm/types";
import { IRelationshipWithDirectorsEntry } from "./forms/RelationshipWithDirectorsForm/types";
import { ISocioeconomicInformationEntry } from "./forms/SocioeconomicInformationForm/types";

interface IFormsUpdateData {
  personalInformation: { isValid: boolean; values: IPersonalInformationEntry };
  contactData: { isValid: boolean; values: IContactDataEntry };
  familyGroup: { isValid: boolean; values: IFamilyGroupEntries };
  beneficiaries: { isValid: boolean; values: IBeneficiariesEntry };
  bankTransfers: { isValid: boolean; values: IBankTransfersEntry };
  personalAssets: { isValid: boolean; values: IPersonalAssetEntries };
  personalDebts: { isValid: boolean; values: IPersonalDebtEntries };
  personalReferences: { isValid: boolean; values: IPersonalReferenceEntries };
  financialOperations: { isValid: boolean; values: IFinancialOperationsEntry };
  personalResidence: { isValid: boolean; values: IPersonalResidenceEntry };
  socioeconomicInformation: {
    isValid: boolean;
    values: ISocioeconomicInformationEntry;
  };
  economicActivity: { isValid: boolean; values: IEconomicActivityEntry };
  income: { isValid: boolean; values: IIncomesEntry };
  expenses: { isValid: boolean; values: IExpensesEntry };
  relationshipWithDirectors: {
    isValid: boolean;
    values: IRelationshipWithDirectorsEntry;
  };
  comments: { isValid: boolean; values: ICommentsEntry };
}

interface IFormsUpdateDataRefs {
  personalInformation: React.RefObject<FormikProps<IPersonalInformationEntry> | null>;
  contactData: React.RefObject<FormikProps<IContactDataEntry> | null>;
  familyGroup: React.RefObject<FormikProps<IFamilyGroupEntries> | null>;
  beneficiaries: React.RefObject<FormikProps<IBeneficiariesEntry> | null>;
  bankTransfers: React.RefObject<FormikProps<IBankTransfersEntry> | null>;
  personalAssets: React.RefObject<FormikProps<IPersonalAssetEntries> | null>;
  personalDebts: React.RefObject<FormikProps<IPersonalDebtEntries> | null>;
  personalReferences: React.RefObject<FormikProps<IPersonalReferenceEntries> | null>;
  financialOperations: React.RefObject<FormikProps<IFinancialOperationsEntry> | null>;
  personalResidence: React.RefObject<FormikProps<IPersonalResidenceEntry> | null>;
  socioeconomicInformation: React.RefObject<
    FormikProps<ISocioeconomicInformationEntry> | null
  >;
  economicActivity: React.RefObject<FormikProps<IEconomicActivityEntry> | null>;
  income: React.RefObject<FormikProps<IIncomesEntry> | null>;
  expenses: React.RefObject<FormikProps<IExpensesEntry> | null>;
  relationshipWithDirectors: React.RefObject<
    FormikProps<IRelationshipWithDirectorsEntry> | null
  >;
  comments: React.RefObject<FormikProps<ICommentsEntry> | null>;
}

enum EModalActiveState {
  IDLE = 'idle',
  CREATE = 'create',
  EDIT = 'edit',
  DELETE = 'delete'
}

export type { IFormsUpdateData, IFormsUpdateDataRefs };
export { EModalActiveState };
