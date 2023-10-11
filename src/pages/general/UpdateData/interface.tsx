import { Title } from "@design/data/Title";
import { Assisted } from "@design/feedback/Assisted";
import { IStep } from "@design/feedback/Assisted/types";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdArrowBack } from "react-icons/md";
import { updateDataSteps } from "./config/assisted";
import { crumbsUpdateData } from "./config/navigation";
import { FinancialOperationsForm } from "./forms/FinancialOperationsForm";
import { PersonalAssetsForm } from "./forms/PersonalAssetsForm";
import { PersonalDebtsForm } from "./forms/PersonalDebtsForm";
import { PersonalResidenceForm } from "./forms/PersonalResidenceForm";
import { PersonalInformationForm } from "./forms/PersonalInformationForm";
import { ContactDataForm } from "./forms/ContactDataForm";
import { PersonalReferencesForm } from "./forms/PersonalReferencesForm";
import { BankTransfersForm } from "./forms/BankTransfersForm";
import { IFormsUpdateData, IFormsUpdateDataRefs } from "./types";
import { SocioeconomicInformationForm } from "./forms/SocioeconomicInformationForm";

const renderStepContent = (
  currentStep: number,
  formReferences: IFormsUpdateDataRefs,
  updateData: IFormsUpdateData,
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return (
    <>
      {currentStep === updateDataSteps.personalInformation.id && (
        <PersonalInformationForm
          initialValues={updateData.personalInformation.values}
          ref={formReferences.personalInformation}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === updateDataSteps.contactData.id && (
        <ContactDataForm
          initialValues={updateData.contactData.values}
          ref={formReferences.contactData}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === updateDataSteps.bankTransfers.id && (
        <BankTransfersForm
          initialValues={updateData.bankTransfers.values}
          ref={formReferences.bankTransfers}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === updateDataSteps.personalAssets.id && (
        <PersonalAssetsForm
          initialValues={updateData.personalAssets.values}
          ref={formReferences.personalAssets}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === updateDataSteps.personalDebts.id && (
        <PersonalDebtsForm
          initialValues={updateData.personalDebts.values}
          ref={formReferences.personalDebts}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === updateDataSteps.personalReferences.id && (
        <PersonalReferencesForm
          initialValues={updateData.personalReferences.values}
          ref={formReferences.personalReferences}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === updateDataSteps.financialOperations.id && (
        <FinancialOperationsForm
          initialValues={updateData.financialOperations.values}
          ref={formReferences.financialOperations}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === updateDataSteps.personalResidence.id && (
        <PersonalResidenceForm
          initialValues={updateData.personalResidence.values}
          ref={formReferences.personalResidence}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === updateDataSteps.socioeconomicInformation.id && (
        <SocioeconomicInformationForm
          initialValues={updateData.socioeconomicInformation.values}
          ref={formReferences.socioeconomicInformation}
          onFormValid={setIsCurrentFormValid}
        />
      )}
    </>
  );
};

interface UpdateDataUIProps {
  currentStep: number;
  steps: IStep[];
  isCurrentFormValid: boolean;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>
  handleStepChange: (stepId: number) => void;
  handleFinishAssisted: () => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  updateData: IFormsUpdateData;
  formReferences: IFormsUpdateDataRefs;
}

function UpdateDataUI(props: UpdateDataUIProps) {
  const {
    currentStep,
    steps,
    isCurrentFormValid,
    setIsCurrentFormValid,
    handleStepChange,
    handleFinishAssisted,
    handleNextStep,
    handlePreviousStep,
    updateData,
    formReferences,
  } = props;

  const isMobile = useMediaQuery("(max-width: 450px)");

  return (
    <Stack direction="column" gap="s600">
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsUpdateData} />
        <Title
          title="Actualización de datos"
          subtitle="Actualiza tu información personal y de contacto"
          icon={<MdArrowBack />}
          navigatePage="/"
        />
      </Stack>

      <Assisted
        steps={steps}
        currentStep={currentStep}
        handleFinishAssisted={handleFinishAssisted}
        handleStepChange={handleStepChange}
        disableNextStep={!isCurrentFormValid}
      />

      <Stack direction="column" gap="s300">
        {renderStepContent(currentStep, formReferences, updateData, setIsCurrentFormValid)}

        <Stack gap="s150" justifyContent="flex-end">
          <Button
            handleClick={handlePreviousStep}
            type="button"
            disabled={currentStep === steps[0].id}
            spacing={isMobile ? "compact" : "wide"}
            appearance="gray"
          >
            Atrás
          </Button>

          <Button
            handleClick={handleNextStep}
            spacing={isMobile ? "compact" : "wide"}
            disabled={!isCurrentFormValid}
          >
            Siguiente
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export { UpdateDataUI };
