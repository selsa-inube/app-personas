import { usersMock } from "@mocks/users/users.mocks";
import { FormikProps } from "formik";
import { useRef, useState } from "react";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import {
  mapBankTransfers,
  mapComments,
  mapContactData,
  mapEconomicActivity,
  mapExpenses,
  mapFamilyGroups,
  mapFinancialOperations,
  mapIncomes,
  mapPersonalInformation,
  mapPersonalResidence,
  mapRelationshipWithDirectors,
  mapSocioeconomicInformation,
} from "../UpdateData/config/mappers";
import { IBankTransfersEntry } from "../UpdateData/forms/BankTransfersForm/types";
import { IBeneficiariesEntry } from "../UpdateData/forms/BeneficiariesForm/types";
import { IContactDataEntry } from "../UpdateData/forms/ContactDataForm/types";
import { IEconomicActivityEntry } from "../UpdateData/forms/EconomicActivityForm/types";
import { IExpensesEntry } from "../UpdateData/forms/ExpensesForm/types";
import { IFamilyGroupEntries } from "../UpdateData/forms/FamilyGroupForm/types";
import { IFinancialOperationsEntry } from "../UpdateData/forms/FinancialOperationsForm/types";
import { IIncomesEntry } from "../UpdateData/forms/IncomesForm/types";
import { IPersonalAssetEntries } from "../UpdateData/forms/PersonalAssetsForm/types";
import { IPersonalDebtEntries } from "../UpdateData/forms/PersonalDebtsForm/types";
import { IPersonalInformationEntry } from "../UpdateData/forms/PersonalInformationForm/types";
import { IPersonalReferenceEntries } from "../UpdateData/forms/PersonalReferencesForm/types";
import { IPersonalResidenceEntry } from "../UpdateData/forms/PersonalResidenceForm/types";
import { IRelationshipWithDirectorsEntry } from "../UpdateData/forms/RelationshipWithDirectorsForm/types";
import { ISocioeconomicInformationEntry } from "../UpdateData/forms/SocioeconomicInformationForm/types";
import { IFormsUpdateData, IFormsUpdateDataRefs } from "../UpdateData/types";
import { updateDataTabs } from "./config/tabs";
import { UpdateDataUnassistedUI } from "./interface";

function UpdateDataUnassisted() {
  const [selectedTab, setSelectedTab] = useState(
    updateDataTabs.personalInformation.id,
  );

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(true);

  const [updateData /* setUpdateData */] = useState<IFormsUpdateData>({
    personalInformation: {
      isValid: true,
      values: mapPersonalInformation(usersMock[0]),
    },
    contactData: {
      isValid: true,
      values: mapContactData(usersMock[0].contact[0]),
    },
    familyGroup: {
      isValid: true,
      values: { entries: mapFamilyGroups(usersMock[0].familyGroup || []) },
    },
    beneficiaries: { isValid: true, values: {} },
    bankTransfers: {
      isValid: true,
      values: mapBankTransfers(usersMock[0].bankTransfersAccount),
    },
    personalAssets: { isValid: true, values: { entries: [] } },
    personalDebts: { isValid: true, values: { entries: [] } },
    personalReferences: { isValid: true, values: { entries: [] } },
    financialOperations: {
      isValid: true,
      values: mapFinancialOperations(usersMock[0].financialOperations),
    },
    personalResidence: {
      isValid: true,
      values: mapPersonalResidence(usersMock[0].personalData.residence),
    },
    socioeconomicInformation: {
      isValid: true,
      values: mapSocioeconomicInformation(),
    },
    economicActivity: {
      isValid: true,
      values: mapEconomicActivity(usersMock[0].economicActivity),
    },
    income: {
      isValid: true,
      values: mapIncomes(),
    },
    expenses: { isValid: true, values: mapExpenses() },
    relationshipWithDirectors: {
      isValid: true,
      values: mapRelationshipWithDirectors(
        usersMock[0].relationshipWithDirectors,
      ),
    },
    comments: { isValid: true, values: mapComments() },
  });

  const personalInfoRef = useRef<FormikProps<IPersonalInformationEntry>>(null);
  const contactDataRef = useRef<FormikProps<IContactDataEntry>>(null);
  const familyGroupRef = useRef<FormikProps<IFamilyGroupEntries>>(null);
  const beneficiariesRef = useRef<FormikProps<IBeneficiariesEntry>>(null);
  const bankTransfersRef = useRef<FormikProps<IBankTransfersEntry>>(null);
  const personalAssetsRef = useRef<FormikProps<IPersonalAssetEntries>>(null);
  const personalDebtsRef = useRef<FormikProps<IPersonalDebtEntries>>(null);
  const personalReferencesRef =
    useRef<FormikProps<IPersonalReferenceEntries>>(null);
  const financialOperationsRef =
    useRef<FormikProps<IFinancialOperationsEntry>>(null);
  const personalResidenceRef =
    useRef<FormikProps<IPersonalResidenceEntry>>(null);
  const socioeconomicsRef =
    useRef<FormikProps<ISocioeconomicInformationEntry>>(null);
  const economicActivityRef = useRef<FormikProps<IEconomicActivityEntry>>(null);
  const incomeRef = useRef<FormikProps<IIncomesEntry>>(null);
  const expensesRef = useRef<FormikProps<IExpensesEntry>>(null);
  const relationshipWithDirectorsRef =
    useRef<FormikProps<IRelationshipWithDirectorsEntry>>(null);
  const commentsRef = useRef<FormikProps<ICommentsEntry>>(null);

  const formReferences: IFormsUpdateDataRefs = {
    personalInformation: personalInfoRef,
    contactData: contactDataRef,
    familyGroup: familyGroupRef,
    beneficiaries: beneficiariesRef,
    bankTransfers: bankTransfersRef,
    personalAssets: personalAssetsRef,
    personalDebts: personalDebtsRef,
    personalReferences: personalReferencesRef,
    financialOperations: financialOperationsRef,
    personalResidence: personalResidenceRef,
    socioeconomicInformation: socioeconomicsRef,
    economicActivity: economicActivityRef,
    income: incomeRef,
    expenses: expensesRef,
    relationshipWithDirectors: relationshipWithDirectorsRef,
    comments: commentsRef,
  };

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
  };

  /*  const handleCancelChanges = () => {
    
  }

  const handleCancelChanges = () => {
    
  } */

  return (
    <UpdateDataUnassistedUI
      selectedTab={selectedTab}
      formReferences={formReferences}
      updateData={updateData}
      isCurrentFormValid={isCurrentFormValid}
      onTabChange={handleTabChange}
      setIsCurrentFormValid={setIsCurrentFormValid}
      /* onCancelChanges={handleCancelChanges} */
    />
  );
}

export { UpdateDataUnassisted };
