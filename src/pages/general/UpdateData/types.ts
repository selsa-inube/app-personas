import { FormikProps } from "formik";
import { IFinancialOperationsEntry } from "./forms/FinancialOperationsForm/types";
import { IPersonalAssetEntries } from "./forms/PersonalAssetsForm/types";
import { IPersonalDebtEntries } from "./forms/PersonalDebtsForm/types";
import { IPersonalInformationEntry } from "./forms/PersonalInformationForm/types";
import { IContactDataEntry } from "./forms/ContactDataForm/types";
import { IPersonalReferenceEntries } from "./forms/PersonalReferencesForm/types";
import { IBankTransfersEntry } from "./forms/BankTransfersForm/types";
import { IPersonalResidenceEntry } from "./forms/PersonalResidenceForm/types";

interface IFormsUpdateData {
  personalInformation: IPersonalInformationEntry;
  contactData: IContactDataEntry;
  bankTransfers: IBankTransfersEntry;
  personalAssets: IPersonalAssetEntries;
  personalDebts: IPersonalDebtEntries;
  personalReferences: IPersonalReferenceEntries;
  financialOperations: IFinancialOperationsEntry;
  personalResidence: IPersonalResidenceEntry;
}

interface IFormsUpdateDataRefs {
  personalInformation: React.RefObject<FormikProps<IPersonalInformationEntry>>;
  contactData: React.RefObject<FormikProps<IContactDataEntry>>;
  bankTransfers: React.RefObject<FormikProps<IBankTransfersEntry>>;
  personalAssets: React.RefObject<FormikProps<IPersonalAssetEntries>>;
  personalDebts: React.RefObject<FormikProps<IPersonalDebtEntries>>;
  personalReferences: React.RefObject<FormikProps<IPersonalReferenceEntries>>;
  financialOperations: React.RefObject<FormikProps<IFinancialOperationsEntry>>;
  personalResidence: React.RefObject<FormikProps<IPersonalResidenceEntry>>;
}

export type { IFormsUpdateData, IFormsUpdateDataRefs };
