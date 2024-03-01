import { Title } from "@design/data/Title";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { Tabs } from "@design/navigation/Tabs";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdArrowBack } from "react-icons/md";
import { BankTransfersForm } from "../UpdateData/forms/BankTransfersForm";
import { BeneficiariesForm } from "../UpdateData/forms/BeneficiariesForm";
import { FamilyGroupForm } from "../UpdateData/forms/FamilyGroupForm";
import { FinancialOperationsForm } from "../UpdateData/forms/FinancialOperationsForm";
import { PersonalInformationForm } from "../UpdateData/forms/PersonalInformationForm";
import { IFormsUpdateData } from "../UpdateData/types";
import { crumbsUpdateData } from "./config/navigation";
import { updateDataTabs } from "./config/tabs";

const renderTabContent = (
  selectedTab: string,
  updateData: IFormsUpdateData,
) => {
  return (
    <>
      {selectedTab === updateDataTabs.personalInformation.id && (
        <PersonalInformationForm
          initialValues={updateData.personalInformation.values}
          withSubmit
        />
      )}
      {selectedTab === updateDataTabs.familyGroup.id && (
        <FamilyGroupForm
          initialValues={updateData.familyGroup.values}
          withSubmit
        />
      )}
      {selectedTab === updateDataTabs.beneficiaries.id && (
        <BeneficiariesForm
          initialValues={updateData.beneficiaries.values}
          withSubmit
        />
      )}
      {selectedTab === updateDataTabs.bankTransfers.id && (
        <BankTransfersForm
          initialValues={updateData.bankTransfers.values}
          withSubmit
        />
      )}
      {selectedTab === updateDataTabs.financialOperations.id && (
        <FinancialOperationsForm
          initialValues={updateData.financialOperations.values}
          withSubmit
        />
      )}
    </>
  );
};

interface UpdateDataUnassistedUIProps {
  selectedTab: string;
  updateData: IFormsUpdateData;
  onTabChange: (id: string) => void;
}

function UpdateDataUnassistedUI(props: UpdateDataUnassistedUIProps) {
  const { selectedTab, updateData, onTabChange } = props;

  const isMobile = useMediaQuery("(max-width: 450px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <Stack
      direction="column"
      gap={isMobile ? "s300" : isTablet ? "s500" : "s600"}
    >
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsUpdateData} />
        <Title
          title="Actualización de datos"
          subtitle="Actualiza tu información personal y de contacto"
          icon={<MdArrowBack />}
          navigatePage="/"
        />
      </Stack>
      <Tabs
        onChange={onTabChange}
        selectedTab={selectedTab}
        tabs={Object.values(updateDataTabs)}
      />
      <Stack direction="column" gap="s300">
        {renderTabContent(selectedTab, updateData)}
      </Stack>
    </Stack>
  );
}

export { UpdateDataUnassistedUI };
