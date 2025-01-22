import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Assisted, Button, IAssistedStep, Stack } from "@inubekit/inubekit";
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
      {currentStep === createFamilyMemberSteps.identificationData.number && (
        <IdentificationDataForm
          isMobile={isMobile}
          initialValues={createFamilyMember.identificationData.values}
          ref={formReferences.identificationData}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === createFamilyMemberSteps.personalData.number && (
        <PersonalDataForm
          initialValues={createFamilyMember.personalData.values}
          ref={formReferences.personalData}
          onFormValid={setIsCurrentFormValid}
          readonly={readOnly}
        />
      )}
      {currentStep === createFamilyMemberSteps.contactData.number && (
        <ContactDataForm
          initialValues={createFamilyMember.contactData.values}
          ref={formReferences.contactData}
          onFormValid={setIsCurrentFormValid}
          readonly={readOnly}
        />
      )}
      {currentStep === createFamilyMemberSteps.informationData.number && (
        <InformationDataForm
          initialValues={createFamilyMember.informationData.values}
          ref={formReferences.informationData}
          onFormValid={setIsCurrentFormValid}
          readonly={readOnly}
        />
      )}
      {currentStep === createFamilyMemberSteps.verification.number && (
        <UpdateDataVerification updatedData={createFamilyMember} />
      )}
    </>
  );
};

interface CreateFamilyMemberUIProps {
  currentStep: number;
  steps: IAssistedStep[];
  isCurrentFormValid: boolean;
  createFamilyMember: IFormsCreateFamilyMember;
  formReferences: IFormsCreateFamilyMemberRefs;
  readOnly: boolean;
  loading: boolean;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
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
    handleFinishAssisted,
    handleNextStep,
    handlePreviousStep,
  } = props;

  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <Stack direction="column" width="100%" gap={inube.spacing.s300}>
      <Assisted
        step={steps[currentStep - 1]}
        totalSteps={steps.length}
        onNextClick={handleNextStep}
        onBackClick={handlePreviousStep}
        onSubmitClick={handleFinishAssisted}
        disableNext={!isCurrentFormValid}
        size="small"
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
