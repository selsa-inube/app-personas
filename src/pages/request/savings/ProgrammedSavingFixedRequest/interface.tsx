import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { DisbursementForm } from "@forms/DisbursementForm";
import { PaymentMethodForm } from "@forms/PaymentMethodForm";
import { SystemValidationsForm } from "@forms/SystemValidationsForm";
import { TermsAndConditionsForm } from "@forms/TermsAndConditionsForm";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Assisted, IAssistedStep } from "@inubekit/assisted";
import { Breadcrumbs } from "@inubekit/breadcrumbs";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { MdArrowBack } from "react-icons/md";
import { ContactChannelsForm } from "src/shared/forms/ContactChannelsForm";
import { CommentsForm } from "../../../../shared/forms/CommentsForm";
import { programmedSavingFixedRequestSteps } from "./config/assisted";
import { crumbsProgrammedSavingFixedRequest } from "./config/navigation";
import { PlanNameForm } from "./forms/PlanNameForm";
import { SavingConditionsForm } from "./forms/SavingConditionsForm";
import { ShareMaturityForm } from "./forms/ShareMaturityForm";
import { ProgrammedSavingFixedRequestVerification } from "./forms/Verification";
import {
  IFormsProgrammedSavingFixedRequest,
  IFormsProgrammedSavingFixedRequestRefs,
} from "./types";

const renderStepContent = (
  currentStep: number,
  formReferences: IFormsProgrammedSavingFixedRequestRefs,
  programmedSavingFixedRequest: IFormsProgrammedSavingFixedRequest,
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>,
  handleStepChange: (stepId: number) => void,
) => {
  return (
    <>
      {currentStep ===
        programmedSavingFixedRequestSteps.savingConditions.number && (
        <SavingConditionsForm
          initialValues={programmedSavingFixedRequest.savingConditions.values}
          ref={formReferences.savingConditions}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep ===
        programmedSavingFixedRequestSteps.paymentMethod.number && (
        <PaymentMethodForm
          initialValues={programmedSavingFixedRequest.paymentMethod.values}
          ref={formReferences.paymentMethod}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep ===
        programmedSavingFixedRequestSteps.shareMaturity.number && (
        <ShareMaturityForm
          initialValues={programmedSavingFixedRequest.shareMaturity.values}
          ref={formReferences.shareMaturity}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep ===
        programmedSavingFixedRequestSteps.disbursement.number && (
        <DisbursementForm
          initialValues={programmedSavingFixedRequest.disbursement.values}
          ref={formReferences.disbursement}
          requestType="aid"
          productId="S002"
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep ===
        programmedSavingFixedRequestSteps.systemValidations.number && (
        <SystemValidationsForm
          initialValues={programmedSavingFixedRequest.systemValidations.values}
          ref={formReferences.systemValidations}
          disbursementValues={programmedSavingFixedRequest.disbursement.values}
          test
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === programmedSavingFixedRequestSteps.planName.number && (
        <PlanNameForm
          initialValues={programmedSavingFixedRequest.planName.values}
          ref={formReferences.planName}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === programmedSavingFixedRequestSteps.comments.number && (
        <CommentsForm
          initialValues={programmedSavingFixedRequest.comments.values}
          ref={formReferences.comments}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep ===
        programmedSavingFixedRequestSteps.termsAndConditions.number && (
        <TermsAndConditionsForm
          initialValues={programmedSavingFixedRequest.termsAndConditions.values}
          ref={formReferences.termsAndConditions}
          productId="57"
          productType="credit"
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep ===
        programmedSavingFixedRequestSteps.contactChannels.number && (
        <ContactChannelsForm
          initialValues={programmedSavingFixedRequest.contactChannels.values}
          ref={formReferences.contactChannels}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep ===
        programmedSavingFixedRequestSteps.verification.number && (
        <ProgrammedSavingFixedRequestVerification
          programmedSavingFixedRequest={programmedSavingFixedRequest}
          handleStepChange={handleStepChange}
        />
      )}
    </>
  );
};

interface ProgrammedSavingFixedRequestUIProps {
  currentStep: number;
  steps: IAssistedStep[];
  isCurrentFormValid: boolean;
  programmedSavingFixedRequest: IFormsProgrammedSavingFixedRequest;
  formReferences: IFormsProgrammedSavingFixedRequestRefs;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleStepChange: (stepId: number) => void;
  handleFinishAssisted: () => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

function ProgrammedSavingFixedRequestUI(
  props: ProgrammedSavingFixedRequestUIProps,
) {
  const {
    currentStep,
    steps,
    isCurrentFormValid,
    programmedSavingFixedRequest,
    formReferences,
    setIsCurrentFormValid,
    handleStepChange,
    handleFinishAssisted,
    handleNextStep,
    handlePreviousStep,
  } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");
  const isMobile = useMediaQuery("(max-width: 450px)");

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
        <Breadcrumbs crumbs={crumbsProgrammedSavingFixedRequest} />
        <Title
          title="Ahorro programado"
          subtitle="Simula tu solicitud de ahorro programado."
          icon={<MdArrowBack />}
          navigatePage="/savings"
        />
      </Stack>

      <Stack
        direction="column"
        gap={isMobile ? inube.spacing.s300 : inube.spacing.s500}
      >
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

        <Stack direction="column" gap={inube.spacing.s300}>
          {renderStepContent(
            currentStep,
            formReferences,
            programmedSavingFixedRequest,
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
    </Stack>
  );
}

export { ProgrammedSavingFixedRequestUI };
