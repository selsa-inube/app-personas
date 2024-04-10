import { usersMock } from "@mocks/users/users.mocks";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "src/context/app";
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
import { IFormsUpdateData } from "../UpdateData/types";
import { updateDataTabs } from "./config/tabs";
import { UpdateDataUnassistedUI } from "./interface";

function UpdateDataUnassisted() {
  const [selectedTab, setSelectedTab] = useState(
    updateDataTabs.personalInformation.id,
  );
  const { featuredFlags } = useContext(AppContext);

  const [updateData] = useState<IFormsUpdateData>({
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

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
  };

  if (featuredFlags && !featuredFlags["update-data-without-assisted"].value) {
    return <Navigate to="/" />;
  }

  return (
    <UpdateDataUnassistedUI
      selectedTab={selectedTab}
      updateData={updateData}
      onTabChange={handleTabChange}
    />
  );
}

export { UpdateDataUnassisted };
