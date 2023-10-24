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
import { creditSimulationRequestSteps } from "./config/assisted";
import { crumbsCreditSimulationRequest } from "./config/navigation";
import { CommentsForm } from "./forms/CommentsForm";
import { DestinationForm } from "./forms/DestinationForm";
import { DisbursementForm } from "./forms/DisbursementForm";
import { PreliquidationForm } from "./forms/PreliquidationForm";
import { SimulationForm } from "./forms/SimulationForm";
import { TermsAndConditionsForm } from "./forms/TermsAndConditionsForm";
import {
  IFormsCreditSimulationRequest,
  IFormsCreditSimulationRequestRefs,
} from "./types";
import { CreditSimulationRequestVerification } from "./forms/Verification";

const renderStepContent = (
  currentStep: number,
  formReferences: IFormsCreditSimulationRequestRefs,
  creditSimulationRequest: IFormsCreditSimulationRequest,
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return (
    <>
      {currentStep === creditSimulationRequestSteps.destination.id && (
        <DestinationForm
          initialValues={creditSimulationRequest.destination.values}
          ref={formReferences.destination}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === creditSimulationRequestSteps.simulation.id && (
        <SimulationForm
          initialValues={creditSimulationRequest.simulation.values}
          ref={formReferences.simulation}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === creditSimulationRequestSteps.preliquidation.id && (
        <PreliquidationForm
          initialValues={creditSimulationRequest.preliquidation.values}
          ref={formReferences.preliquidation}
        />
      )}
      {currentStep === creditSimulationRequestSteps.disbursement.id && (
        <DisbursementForm
          initialValues={creditSimulationRequest.disbursement.values}
          ref={formReferences.disbursement}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === creditSimulationRequestSteps.comments.id && (
        <CommentsForm
          initialValues={creditSimulationRequest.comments.values}
          ref={formReferences.comments}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === creditSimulationRequestSteps.termsAndConditions.id && (
        <TermsAndConditionsForm
          initialValues={creditSimulationRequest.termsAndConditions.values}
          ref={formReferences.termsAndConditions}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === creditSimulationRequestSteps.verification.id && (
        <CreditSimulationRequestVerification
          creditSimulationRequest={creditSimulationRequest}
          handleStepChange={handleStepChange}
        />
      )}
    </>
  );
};

interface CreditSimulationRequestUIProps {
  currentStep: number;
  steps: IStep[];
  isCurrentFormValid: boolean;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleStepChange: (stepId: number) => void;
  handleFinishAssisted: () => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  creditSimulationRequest: IFormsCreditSimulationRequest;
  formReferences: IFormsCreditSimulationRequestRefs;
}

function CreditSimulationRequestUI(props: CreditSimulationRequestUIProps) {
  const {
    currentStep,
    steps,
    isCurrentFormValid,
    setIsCurrentFormValid,
    handleStepChange,
    handleFinishAssisted,
    handleNextStep,
    handlePreviousStep,
    creditSimulationRequest,
    formReferences,
  } = props;

  const mquery = useMediaQuery("(min-width: 1400px)");
  const isMobile = useMediaQuery("(max-width: 450px)");

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsCreditSimulationRequest} />
        <Title
          title="Solicitud por simulación"
          subtitle="Simula tu solicitud de crédito"
          icon={<MdArrowBack />}
          navigatePage="/credit"
        />
      </Stack>

      <Grid
        margin={
          mquery ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        gap="s600"
        templateColumns={mquery ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap={isMobile ? "s300" : "s500"}>
          <Assisted
            steps={steps}
            currentStep={currentStep}
            handleFinishAssisted={handleFinishAssisted}
            handleStepChange={handleStepChange}
            disableNextStep={!isCurrentFormValid}
          />

          <Stack direction="column" gap="s300">
            {renderStepContent(
              currentStep,
              formReferences,
              creditSimulationRequest,
              setIsCurrentFormValid
            )}

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
                {currentStep === steps.length ? "Enviar" : "Siguiente"}
              </Button>
            </Stack>
          </Stack>
        </Stack>
        {mquery && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { CreditSimulationRequestUI };
