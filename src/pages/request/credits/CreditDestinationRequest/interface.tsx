import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { Assisted } from "@design/feedback/Assisted";
import { IStep } from "@design/feedback/Assisted/types";
import { Button } from "@design/input/Button";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdArrowBack } from "react-icons/md";
import { ContactChannelsForm } from "src/shared/forms/ContactChannelsForm";
import { creditDestinationRequestSteps } from "./config/assisted";
import { crumbsCreditDestinationRequest } from "./config/navigation";
import { CommentsForm } from "./forms/CommentsForm";
import { CreditConditionsForm } from "./forms/CreditConditionsForm";
import { DestinationForm } from "./forms/DestinationForm";
import { DisbursementForm } from "./forms/DisbursementForm";
import { PreliquidationForm } from "./forms/PreliquidationForm";
import { TermsAndConditionsForm } from "./forms/TermsAndConditionsForm";
import { CreditDestinationRequestVerification } from "./forms/Verification";
import {
  IFormsCreditDestinationRequest,
  IFormsCreditDestinationRequestRefs,
} from "./types";

const renderStepContent = (
  currentStep: number,
  formReferences: IFormsCreditDestinationRequestRefs,
  creditDestinationRequest: IFormsCreditDestinationRequest,
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>,
  handleStepChange: (stepId: number) => void,
) => {
  return (
    <>
      {currentStep === creditDestinationRequestSteps.destination.id && (
        <DestinationForm
          initialValues={creditDestinationRequest.destination.values}
          ref={formReferences.destination}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === creditDestinationRequestSteps.creditConditions.id && (
        <CreditConditionsForm
          initialValues={creditDestinationRequest.creditConditions.values}
          ref={formReferences.creditConditions}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === creditDestinationRequestSteps.preliquidation.id && (
        <PreliquidationForm
          initialValues={creditDestinationRequest.preliquidation.values}
          ref={formReferences.preliquidation}
        />
      )}
      {currentStep === creditDestinationRequestSteps.disbursement.id && (
        <DisbursementForm
          initialValues={creditDestinationRequest.disbursement.values}
          ref={formReferences.disbursement}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === creditDestinationRequestSteps.comments.id && (
        <CommentsForm
          initialValues={creditDestinationRequest.comments.values}
          ref={formReferences.comments}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === creditDestinationRequestSteps.termsAndConditions.id && (
        <TermsAndConditionsForm
          initialValues={creditDestinationRequest.termsAndConditions.values}
          ref={formReferences.termsAndConditions}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === creditDestinationRequestSteps.contactChannels.id && (
        <ContactChannelsForm
          initialValues={creditDestinationRequest.contactChannels.values}
          ref={formReferences.contactChannels}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === creditDestinationRequestSteps.verification.id && (
        <CreditDestinationRequestVerification
          creditDestinationRequest={creditDestinationRequest}
          handleStepChange={handleStepChange}
        />
      )}
    </>
  );
};

interface CreditDestinationRequestUIProps {
  currentStep: number;
  steps: IStep[];
  isCurrentFormValid: boolean;
  creditDestinationRequest: IFormsCreditDestinationRequest;
  formReferences: IFormsCreditDestinationRequestRefs;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleStepChange: (stepId: number) => void;
  handleFinishAssisted: () => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

function CreditDestinationRequestUI(props: CreditDestinationRequestUIProps) {
  const {
    currentStep,
    steps,
    isCurrentFormValid,
    creditDestinationRequest,
    formReferences,
    setIsCurrentFormValid,
    handleStepChange,
    handleFinishAssisted,
    handleNextStep,
    handlePreviousStep,
  } = props;

  const isDesktop = useMediaQuery("(min-width: 1400px)");
  const isMobile = useMediaQuery("(max-width: 450px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsCreditDestinationRequest} />
        <Title
          title="Solicitud por destinación"
          subtitle="Simula tu solicitud de crédito"
          icon={<MdArrowBack />}
          navigatePage="/credit"
        />
      </Stack>

      <Grid
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        gap={isMobile ? "s300" : isTablet ? "s500" : "s600"}
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap={isMobile ? "s300" : "s500"}>
          <Assisted
            steps={steps}
            currentStep={currentStep}
            onFinishAssisted={handleFinishAssisted}
            onStepChange={handleStepChange}
            disableNextStep={!isCurrentFormValid}
          />

          <Stack direction="column" gap="s300">
            {renderStepContent(
              currentStep,
              formReferences,
              creditDestinationRequest,
              setIsCurrentFormValid,
              handleStepChange,
            )}

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
              >
                {currentStep === steps.length ? "Enviar" : "Siguiente"}
              </Button>
            </Stack>
          </Stack>
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { CreditDestinationRequestUI };
