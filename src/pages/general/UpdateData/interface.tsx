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
import { PersonalInformationForm } from "./forms/PersonalInformationForm";
import { ContactDataForm } from "./forms/ContactDataForm";
import { PersonalReferencesForm } from "./forms/PersonalReferencesForm";
import { BankTransfersForm } from "./forms/BankTransfersForm";
import { IFormsUpdateData, IFormsUpdateDataRefs } from "./types";
import { SocioeconomicInformationForm } from "./forms/SocioeconomicInformationForm";

const renderStepContent = (
  currentStep: number,
  formReferences: IFormsUpdateDataRefs,
  updateData: IFormsUpdateData
) => {
  return (
    <>
      {currentStep === updateDataSteps.personalInformation.id && (
        <PersonalInformationForm
          initialValues={updateData.personalInformation}
          ref={formReferences.personalInformation}
        />
      )}
      {currentStep === updateDataSteps.contactData.id && (
        <ContactDataForm
          initialValues={updateData.contactData}
          ref={formReferences.contactData}
        />
      )}
      {currentStep === updateDataSteps.bankTransfers.id && (
        <BankTransfersForm
          initialValues={updateData.bankTransfers}
          ref={formReferences.bankTransfers}
        />
      )}
      {currentStep === updateDataSteps.personalAssets.id && (
        <PersonalAssetsForm
          initialValues={updateData.personalAssets}
          ref={formReferences.personalAssets}
        />
      )}
      {currentStep === updateDataSteps.personalDebts.id && (
        <PersonalDebtsForm
          initialValues={updateData.personalDebts}
          ref={formReferences.personalDebts}
        />
      )}
      {currentStep === updateDataSteps.personalReferences.id && (
        <PersonalReferencesForm
          initialValues={updateData.personalReferences}
          ref={formReferences.personalReferences}
        />
      )}
      {currentStep === updateDataSteps.financialOperations.id && (
        <FinancialOperationsForm
          initialValues={updateData.financialOperations}
          ref={formReferences.financialOperations}
        />
      )}
      {currentStep === updateDataSteps.socioeconomicInformation.id && (
        <SocioeconomicInformationForm
          initialValues={updateData.socioeconomicInformation}
          ref={formReferences.socioeconomicInformation}
        />
      )}
    </>
  );
};

interface UpdateDataUIProps {
  currentStep: number;
  steps: IStep[];
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
      />

      <Stack direction="column" gap="s300">
        {renderStepContent(currentStep, formReferences, updateData)}

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
          >
            Siguiente
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export { UpdateDataUI };
