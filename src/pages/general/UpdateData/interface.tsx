import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Assisted, IAssistedStep } from "@inubekit/assisted";
import { Button } from "@inubekit/button";
import { Breadcrumbs, Stack } from "@inubekit/inubekit";
import { MdArrowBack } from "react-icons/md";
import { CommentsForm } from "src/shared/forms/CommentsForm";
import { updateDataSteps } from "./config/assisted";
import { crumbsUpdateData } from "./config/navigation";
import { BankTransfersForm } from "./forms/BankTransfersForm";
import { BeneficiariesForm } from "./forms/BeneficiariesForm";
import { ContactDataForm } from "./forms/ContactDataForm";
import { EconomicActivityForm } from "./forms/EconomicActivityForm";
import { ExpensesForm } from "./forms/ExpensesForm";
import { FamilyGroupForm } from "./forms/FamilyGroupForm";
import { FinancialOperationsForm } from "./forms/FinancialOperationsForm";
import { IncomesForm } from "./forms/IncomesForm";
import { PersonalAssetsForm } from "./forms/PersonalAssetsForm";
import { PersonalDebtsForm } from "./forms/PersonalDebtsForm";
import { PersonalInformationForm } from "./forms/PersonalInformationForm";
import { PersonalReferencesForm } from "./forms/PersonalReferencesForm";
import { PersonalResidenceForm } from "./forms/PersonalResidenceForm";
import { RelationshipWithDirectorsForm } from "./forms/RelationshipWithDirectorsForm";
import { SocioeconomicInformationForm } from "./forms/SocioeconomicInformationForm";
import { UpdateDataVerification } from "./forms/Verification";
import { IFormsUpdateData, IFormsUpdateDataRefs } from "./types";

const renderStepContent = (
  currentStep: number,
  formReferences: IFormsUpdateDataRefs,
  updateData: IFormsUpdateData,
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>,
  handleStepChange: (stepId: number) => void,
) => {
  return (
    <>
      {currentStep === updateDataSteps.personalInformation.number && (
        <PersonalInformationForm
          initialValues={updateData.personalInformation.values}
          ref={formReferences.personalInformation}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === updateDataSteps.contactData.number && (
        <ContactDataForm
          initialValues={updateData.contactData.values}
          ref={formReferences.contactData}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === updateDataSteps.familyGroup.number && (
        <FamilyGroupForm
          initialValues={updateData.familyGroup.values}
          ref={formReferences.familyGroup}
        />
      )}
      {currentStep === updateDataSteps.beneficiaries.number && (
        <BeneficiariesForm
          initialValues={updateData.beneficiaries.values}
          ref={formReferences.beneficiaries}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === updateDataSteps.bankTransfers.number && (
        <BankTransfersForm
          initialValues={updateData.bankTransfers.values}
          ref={formReferences.bankTransfers}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === updateDataSteps.personalAssets.number && (
        <PersonalAssetsForm
          initialValues={updateData.personalAssets.values}
          ref={formReferences.personalAssets}
        />
      )}
      {currentStep === updateDataSteps.personalDebts.number && (
        <PersonalDebtsForm
          initialValues={updateData.personalDebts.values}
          ref={formReferences.personalDebts}
        />
      )}
      {currentStep === updateDataSteps.personalReferences.number && (
        <PersonalReferencesForm
          initialValues={updateData.personalReferences.values}
          ref={formReferences.personalReferences}
        />
      )}
      {currentStep === updateDataSteps.financialOperations.number && (
        <FinancialOperationsForm
          initialValues={updateData.financialOperations.values}
          ref={formReferences.financialOperations}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === updateDataSteps.personalResidence.number && (
        <PersonalResidenceForm
          initialValues={updateData.personalResidence.values}
          ref={formReferences.personalResidence}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === updateDataSteps.socioeconomicInformation.number && (
        <SocioeconomicInformationForm
          initialValues={updateData.socioeconomicInformation.values}
          ref={formReferences.socioeconomicInformation}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === updateDataSteps.economicActivity.number && (
        <EconomicActivityForm
          initialValues={updateData.economicActivity.values}
          ref={formReferences.economicActivity}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === updateDataSteps.income.number && (
        <IncomesForm
          initialValues={updateData.income.values}
          ref={formReferences.income}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === updateDataSteps.expenses.number && (
        <ExpensesForm
          initialValues={updateData.expenses.values}
          ref={formReferences.expenses}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === updateDataSteps.relationshipWithDirectors.number && (
        <RelationshipWithDirectorsForm
          initialValues={updateData.relationshipWithDirectors.values}
          ref={formReferences.relationshipWithDirectors}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === updateDataSteps.comments.number && (
        <CommentsForm
          initialValues={updateData.comments.values}
          ref={formReferences.comments}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === updateDataSteps.verification.number && (
        <UpdateDataVerification
          updatedData={updateData}
          handleStepChange={handleStepChange}
        />
      )}
    </>
  );
};

interface UpdateDataUIProps {
  currentStep: number;
  steps: IAssistedStep[];
  isCurrentFormValid: boolean;
  updateData: IFormsUpdateData;
  formReferences: IFormsUpdateDataRefs;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleStepChange: (stepId: number) => void;
  handleFinishAssisted: () => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

function UpdateDataUI(props: UpdateDataUIProps) {
  const {
    currentStep,
    steps,
    isCurrentFormValid,
    updateData,
    formReferences,
    setIsCurrentFormValid,
    handleStepChange,
    handleFinishAssisted,
    handleNextStep,
    handlePreviousStep,
  } = props;

  const isMobile = useMediaQuery("(max-width: 450px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <Stack
      direction="column"
      gap={
        isMobile
          ? inube.spacing.s300
          : isTablet
            ? inube.spacing.s500
            : inube.spacing.s600
      }
    >
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsUpdateData} />
        <Title
          title="Actualización de datos"
          subtitle="Actualiza tu información personal y de contacto"
          icon={<MdArrowBack />}
          navigatePage="/"
        />
      </Stack>

      <Assisted
        step={steps[currentStep - 1]}
        totalSteps={steps.length}
        onNextClick={handleNextStep}
        onBackClick={handlePreviousStep}
        onSubmitClick={handleFinishAssisted}
        disableNext={!isCurrentFormValid}
        size={isTablet ? "small" : "large"}
        controls={{
          goBackText: "Anterior",
          goNextText: "Siguiente",
          submitText: "Enviar",
        }}
      />

      <Stack direction="column" gap={inube.spacing.s300} margin={`0 0 320px 0`}>
        {renderStepContent(
          currentStep,
          formReferences,
          updateData,
          setIsCurrentFormValid,
          handleStepChange,
        )}

        <Stack gap={inube.spacing.s150} justifyContent="flex-end">
          <Button
            onClick={handlePreviousStep}
            type="button"
            disabled={currentStep === steps[0].id}
            spacing="compact"
            variant="outlined"
            appearance="gray"
          >
            Atrás
          </Button>

          <Button
            onClick={handleNextStep}
            spacing="compact"
            disabled={!isCurrentFormValid}
          >
            {currentStep === steps.length ? "Enviar" : "Siguiente"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export { UpdateDataUI };
