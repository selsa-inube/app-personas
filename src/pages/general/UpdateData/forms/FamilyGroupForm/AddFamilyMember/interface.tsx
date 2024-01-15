import { IStep } from "@design/feedback/Assisted/types";
import { createMemberSteps } from "./config/assisted";
import { IdentificationDataForm } from "./forms/IdentificationDataForm";
import { IFormsAddFamilyMember, IFormsAddFamilyMemberRefs } from "./types";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Assisted } from "@design/feedback/Assisted";
import { Stack } from "@design/layout/Stack";
import { StyledScroller } from "./styles";
import { Button } from "@design/input/Button";
import { PersonalDataForm } from "./forms/PersonalDataForm";
import { ContactDataForm } from "./forms/ContactDataForm";
import { InformationDataForm } from "./forms/InformationDataForm";
import { UpdateDataVerification } from "./forms/Verification";

const renderStepContent = (
  currentStep: number,
  formReferences: IFormsAddFamilyMemberRefs,
  addFamilyMember: IFormsAddFamilyMember,
  isMobile: boolean,
  readOnly: boolean,
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>,
  handleStepChange: (stepId: number) => void
) => {
  return (
    <>
      {currentStep === createMemberSteps.identificationData.id && (
        <IdentificationDataForm
          isMobile={isMobile}
          initialValues={addFamilyMember.identificationData.values}
          ref={formReferences.identificationData}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === createMemberSteps.personalData.id && (
        <PersonalDataForm
          initialValues={addFamilyMember.personalData.values}
          ref={formReferences.personalData}
          onFormValid={setIsCurrentFormValid}
          readonly={readOnly}
        />
      )}
      {currentStep === createMemberSteps.contactData.id && (
        <ContactDataForm
          initialValues={addFamilyMember.contactData.values}
          ref={formReferences.contactData}
          onFormValid={setIsCurrentFormValid}
          readOnly={readOnly}
        />
      )}
      {currentStep === createMemberSteps.informationData.id && (
        <InformationDataForm
          initialValues={addFamilyMember.informationData.values}
          ref={formReferences.informationData}
          onFormValid={setIsCurrentFormValid}
          readonly={readOnly}
        />
      )}
      {currentStep === createMemberSteps.verification.id && (
        <UpdateDataVerification updatedData={addFamilyMember} />
      )}
    </>
  );
};

interface AddFamilyMemberUIProps {
  currentStep: number;
  steps: IStep[];
  isCurrentFormValid: boolean;
  addFamilyMember: IFormsAddFamilyMember;
  formReferences: IFormsAddFamilyMemberRefs;
  readOnly: boolean;
  loading: boolean;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleStepChange: (stepId: number) => void;
  handleFinishAssisted: () => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

function AddFamilyMemberUI(props: AddFamilyMemberUIProps) {
  const {
    currentStep,
    steps,
    isCurrentFormValid,
    addFamilyMember,
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
    <>
      <Assisted
        steps={steps}
        currentStep={currentStep}
        onFinishAssisted={handleFinishAssisted}
        onStepChange={handleStepChange}
        disableNextStep={!isCurrentFormValid}
        showTexts={false}
      />

      <Stack direction="column" gap="s300">
        <StyledScroller smallScreen={isMobile}>
          {renderStepContent(
            currentStep,
            formReferences,
            addFamilyMember,
            isMobile,
            readOnly,
            setIsCurrentFormValid,
            handleStepChange
          )}
        </StyledScroller>

        <Stack gap="s150" justifyContent="flex-end">
          <Button
            onClick={handlePreviousStep}
            type="button"
            disabled={currentStep === steps[0].id}
            spacing={isMobile ? "compact" : "wide"}
            appearance="gray"
          >
            Atrás
          </Button>

          <Button
            onClick={handleNextStep}
            spacing={isMobile ? "compact" : "wide"}
            disabled={!isCurrentFormValid}
            load={loading}
          >
            {currentStep === steps.length ? "Adicionar" : "Siguiente"}
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

export { AddFamilyMemberUI };
