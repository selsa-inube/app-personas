import { Title } from "@design/data/Title";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { Tabs } from "@design/navigation/Tabs";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdArrowBack } from "react-icons/md";
import { CommentsForm } from "src/shared/forms/CommentsForm";
import { BankTransfersForm } from "../UpdateData/forms/BankTransfersForm";
import { BeneficiariesForm } from "../UpdateData/forms/BeneficiariesForm";
import { ContactDataForm } from "../UpdateData/forms/ContactDataForm";
import { EconomicActivityForm } from "../UpdateData/forms/EconomicActivityForm";
import { ExpensesForm } from "../UpdateData/forms/ExpensesForm";
import { FamilyGroupForm } from "../UpdateData/forms/FamilyGroupForm";
import { FinancialOperationsForm } from "../UpdateData/forms/FinancialOperationsForm";
import { IncomesForm } from "../UpdateData/forms/IncomesForm";
import { PersonalAssetsForm } from "../UpdateData/forms/PersonalAssetsForm";
import { PersonalDebtsForm } from "../UpdateData/forms/PersonalDebtsForm";
import { PersonalInformationForm } from "../UpdateData/forms/PersonalInformationForm";
import { PersonalReferencesForm } from "../UpdateData/forms/PersonalReferencesForm";
import { PersonalResidenceForm } from "../UpdateData/forms/PersonalResidenceForm";
import { RelationshipWithDirectorsForm } from "../UpdateData/forms/RelationshipWithDirectorsForm";
import { SocioeconomicInformationForm } from "../UpdateData/forms/SocioeconomicInformationForm";
import { IFormsUpdateData, IFormsUpdateDataRefs } from "../UpdateData/types";
import { crumbsUpdateData } from "./config/navigation";
import { updateDataTabs } from "./config/tabs";

const renderTabContent = (
  selectedTab: string,
  formReferences: IFormsUpdateDataRefs,
  updateData: IFormsUpdateData,
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return (
    <>
      {selectedTab === updateDataTabs.personalInformation.id && (
        <PersonalInformationForm
          initialValues={updateData.personalInformation.values}
          ref={formReferences.personalInformation}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {selectedTab === updateDataTabs.contactData.id && (
        <ContactDataForm
          initialValues={updateData.contactData.values}
          ref={formReferences.contactData}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {selectedTab === updateDataTabs.familyGroup.id && (
        <FamilyGroupForm
          initialValues={updateData.familyGroup.values}
          ref={formReferences.familyGroup}
        />
      )}
      {selectedTab === updateDataTabs.beneficiaries.id && (
        <BeneficiariesForm
          initialValues={updateData.beneficiaries.values}
          ref={formReferences.beneficiaries}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {selectedTab === updateDataTabs.bankTransfers.id && (
        <BankTransfersForm
          initialValues={updateData.bankTransfers.values}
          ref={formReferences.bankTransfers}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {selectedTab === updateDataTabs.personalAssets.id && (
        <PersonalAssetsForm
          initialValues={updateData.personalAssets.values}
          ref={formReferences.personalAssets}
        />
      )}
      {selectedTab === updateDataTabs.personalDebts.id && (
        <PersonalDebtsForm
          initialValues={updateData.personalDebts.values}
          ref={formReferences.personalDebts}
        />
      )}
      {selectedTab === updateDataTabs.personalReferences.id && (
        <PersonalReferencesForm
          initialValues={updateData.personalReferences.values}
          ref={formReferences.personalReferences}
        />
      )}
      {selectedTab === updateDataTabs.financialOperations.id && (
        <FinancialOperationsForm
          initialValues={updateData.financialOperations.values}
          ref={formReferences.financialOperations}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {selectedTab === updateDataTabs.personalResidence.id && (
        <PersonalResidenceForm
          initialValues={updateData.personalResidence.values}
          ref={formReferences.personalResidence}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {selectedTab === updateDataTabs.socioeconomicInformation.id && (
        <SocioeconomicInformationForm
          initialValues={updateData.socioeconomicInformation.values}
          ref={formReferences.socioeconomicInformation}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {selectedTab === updateDataTabs.economicActivity.id && (
        <EconomicActivityForm
          initialValues={updateData.economicActivity.values}
          ref={formReferences.economicActivity}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {selectedTab === updateDataTabs.income.id && (
        <IncomesForm
          initialValues={updateData.income.values}
          ref={formReferences.income}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {selectedTab === updateDataTabs.expenses.id && (
        <ExpensesForm
          initialValues={updateData.expenses.values}
          ref={formReferences.expenses}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {selectedTab === updateDataTabs.relationshipWithDirectors.id && (
        <RelationshipWithDirectorsForm
          initialValues={updateData.relationshipWithDirectors.values}
          ref={formReferences.relationshipWithDirectors}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {selectedTab === updateDataTabs.comments.id && (
        <CommentsForm
          initialValues={updateData.comments.values}
          ref={formReferences.comments}
          onFormValid={setIsCurrentFormValid}
        />
      )}
    </>
  );
};

interface UpdateDataUnassistedUIProps {
  selectedTab: string;
  updateData: IFormsUpdateData;
  formReferences: IFormsUpdateDataRefs;
  isCurrentFormValid: boolean;
  onTabChange: (id: string) => void;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
}

function UpdateDataUnassistedUI(props: UpdateDataUnassistedUIProps) {
  const {
    selectedTab,
    updateData,
    formReferences,
    /* isCurrentFormValid, */
    onTabChange,
    setIsCurrentFormValid,
  } = props;

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
        {renderTabContent(
          selectedTab,
          formReferences,
          updateData,
          setIsCurrentFormValid,
        )}

        {/* <Stack gap="s150" justifyContent="flex-end">
          <Button
            onClick={handlePreviousStep}
            type="button"
            disabled={selectedTab === steps[0].id}
            spacing="compact"
            variant="outlined"
            appearance="gray"
          >
            Cancelar
          </Button>

          <Button
            onClick={handleNextStep}
            spacing="compact"
            disabled={!isCurrentFormValid}
          >
            Guardar
          </Button>
        </Stack> */}
      </Stack>
    </Stack>
  );
}

export { UpdateDataUnassistedUI };
