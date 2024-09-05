import { Assisted } from "@design/feedback/Assisted";
import { IStep } from "@design/feedback/Assisted/types";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Stack } from "@inubekit/stack";
import { createFamilyMemberSteps } from "./config/assisted";
import { ContactDataForm } from "./forms/ContactDataForm";
import { IdentificationDataForm } from "./forms/IdentificationDataForm";
import { InformationDataForm } from "./forms/InformationDataForm";
import { PersonalDataForm } from "./forms/PersonalDataForm";
import { UpdateDataVerification } from "./forms/Verification";
import { StyledScroller } from "./styles";
import {
  IFormsCreateFamilyMember,
  IFormsCreateFamilyMemberRefs,
} from "./types";
import { Button } from "@inubekit/button";

const renderStepContent = (
  currentStep: number,
  formReferences: IFormsCreateFamilyMemberRefs,
  createFamilyMember: IFormsCreateFamilyMember,
  isMobile: boolean,
  readOnly: boolean,
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return (
    <>
      {currentStep === createFamilyMemberSteps.identificationData.id && (
        <IdentificationDataForm
          isMobile={isMobile}
          initialValues={createFamilyMember.identificationData.values}
          ref={formReferences.identificationData}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === createFamilyMemberSteps.personalData.id && (
        <PersonalDataForm
          initialValues={createFamilyMember.personalData.values}
          ref={formReferences.personalData}
          onFormValid={setIsCurrentFormValid}
          readonly={readOnly}
        />
      )}
      {currentStep === createFamilyMemberSteps.contactData.id && (
        <ContactDataForm
          initialValues={createFamilyMember.contactData.values}
          ref={formReferences.contactData}
          onFormValid={setIsCurrentFormValid}
          readonly={readOnly}
        />
      )}
      {currentStep === createFamilyMemberSteps.informationData.id && (
        <InformationDataForm
          initialValues={createFamilyMember.informationData.values}
          ref={formReferences.informationData}
          onFormValid={setIsCurrentFormValid}
          readonly={readOnly}
        />
      )}
      {currentStep === createFamilyMemberSteps.verification.id && (
        <UpdateDataVerification updatedData={createFamilyMember} />
      )}
    </>
  );
};

interface CreateFamilyMemberUIProps {
  currentStep: number;
  steps: IStep[];
  isCurrentFormValid: boolean;
  createFamilyMember: IFormsCreateFamilyMember;
  formReferences: IFormsCreateFamilyMemberRefs;
  readOnly: boolean;
  loading: boolean;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleStepChange: (stepId: number) => void;
  handleFinishAssisted: () => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

function CreateFamilyMemberUI(props: CreateFamilyMemberUIProps) {
  const {
    currentStep,
    steps,
    isCurrentFormValid,
    createFamilyMember,
    formReferences,
    readOnly,
    loading,
    setIsCurrentFormValid,
    handleStepChange,
    handleFinishAssisted,
    handleNextStep,
    handlePreviousStep,
  } = props;

  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <Stack direction="column" width="100%" gap={inube.spacing.s300}>
      <Assisted
        steps={steps}
        currentStep={currentStep}
        onFinishAssisted={handleFinishAssisted}
        onStepChange={handleStepChange}
        disableNextStep={!isCurrentFormValid}
        showButtonsLabels={false}
      />

      <StyledScroller $smallScreen={isMobile}>
        {renderStepContent(
          currentStep,
          formReferences,
          createFamilyMember,
          isMobile,
          readOnly,
          setIsCurrentFormValid,
        )}
      </StyledScroller>

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
          loading={loading}
        >
          {currentStep === steps.length ? "Adicionar" : "Siguiente"}
        </Button>
      </Stack>
    </Stack>
  );
}

export { CreateFamilyMemberUI };
