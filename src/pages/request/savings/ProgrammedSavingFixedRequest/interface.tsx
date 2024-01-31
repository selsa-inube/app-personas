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
import { CommentsForm } from "../../../../shared/forms/CommentsForm";
import { programmedSavingFixedRequestSteps } from "./config/assisted";
import { crumbsProgrammedSavingFixedRequest } from "./config/navigation";
import { GoalForm } from "./forms/GoalForm";
import { PlanNameForm } from "./forms/PlanNameForm";
import { QuotaForm } from "./forms/QuotaForm";
import { ReimbursementForm } from "./forms/ReimbursementForm";
import { ProgrammedSavingFixedRequestSummary } from "./forms/Summary";
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
      {currentStep === programmedSavingFixedRequestSteps.quota.id && (
        <QuotaForm
          initialValues={programmedSavingFixedRequest.quota.values}
          ref={formReferences.quota}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === programmedSavingFixedRequestSteps.goal.id && (
        <GoalForm
          initialValues={programmedSavingFixedRequest.goal.values}
          ref={formReferences.goal}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === programmedSavingFixedRequestSteps.reimbursement.id && (
        <ReimbursementForm
          initialValues={programmedSavingFixedRequest.reimbursement.values}
          ref={formReferences.reimbursement}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === programmedSavingFixedRequestSteps.planName.id && (
        <PlanNameForm
          initialValues={programmedSavingFixedRequest.planName.values}
          ref={formReferences.planName}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === programmedSavingFixedRequestSteps.contactChannels.id && (
        <ContactChannelsForm
          initialValues={programmedSavingFixedRequest.contactChannels.values}
          ref={formReferences.contactChannels}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === programmedSavingFixedRequestSteps.comments.id && (
        <CommentsForm
          initialValues={programmedSavingFixedRequest.comments.values}
          ref={formReferences.comments}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === programmedSavingFixedRequestSteps.summary.id && (
        <ProgrammedSavingFixedRequestSummary
          programmedSavingFixedRequest={programmedSavingFixedRequest}
          handleStepChange={handleStepChange}
        />
      )}
    </>
  );
};

interface ProgrammedSavingFixedRequestUIProps {
  currentStep: number;
  steps: IStep[];
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

  const isDesktop = useMediaQuery("(min-width: 1400px)");
  const isMobile = useMediaQuery("(max-width: 450px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsProgrammedSavingFixedRequest} />
        <Title
          title="Ahorro programado"
          subtitle="Simula tu solicitud de ahorro programado."
          icon={<MdArrowBack />}
          navigatePage="/savings"
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
              programmedSavingFixedRequest,
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

export { ProgrammedSavingFixedRequestUI };
