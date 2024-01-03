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
import { ContactChannelsForm } from "@forms/ContactChannelsForm";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdArrowBack } from "react-icons/md";
import { cdatRequestSteps } from "./config/assisted";
import { crumbsCdatRequest } from "./config/navigation";
import { InvestmentForm } from "./forms/InvestmentForm";
import { InvestmentNameForm } from "./forms/InvestmentNameForm";
import { RefundForm } from "./forms/RefundForm";
import { CdatRequestSummary } from "./forms/Summary";
import { IFormsCdatRequest, IFormsCdatRequestRefs } from "./types";

const renderStepContent = (
  currentStep: number,
  formReferences: IFormsCdatRequestRefs,
  cdatRequest: IFormsCdatRequest,
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>,
  handleStepChange: (stepId: number) => void
) => {
  return (
    <>
      {currentStep === cdatRequestSteps.investment.id && (
        <InvestmentForm
          initialValues={cdatRequest.investment.values}
          ref={formReferences.investment}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === cdatRequestSteps.refund.id && (
        <RefundForm
          initialValues={cdatRequest.refund.values}
          ref={formReferences.refund}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === cdatRequestSteps.investmentName.id && (
        <InvestmentNameForm
          initialValues={cdatRequest.investmentName.values}
          ref={formReferences.investmentName}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === cdatRequestSteps.contactChannels.id && (
        <ContactChannelsForm
          initialValues={cdatRequest.contactChannels.values}
          ref={formReferences.contactChannels}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === cdatRequestSteps.summary.id && (
        <CdatRequestSummary
          cdatRequest={cdatRequest}
          handleStepChange={handleStepChange}
        />
      )}
    </>
  );
};

interface CdatRequestUIProps {
  currentStep: number;
  steps: IStep[];
  isCurrentFormValid: boolean;
  cdatRequest: IFormsCdatRequest;
  formReferences: IFormsCdatRequestRefs;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleStepChange: (stepId: number) => void;
  handleFinishAssisted: () => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

function CdatRequestUI(props: CdatRequestUIProps) {
  const {
    currentStep,
    steps,
    isCurrentFormValid,
    cdatRequest,
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
        <Breadcrumbs crumbs={crumbsCdatRequest} />
        <Title
          title="CDAT"
          subtitle="Simula tu solicitud de CDAT"
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
              cdatRequest,
              setIsCurrentFormValid,
              handleStepChange
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

export { CdatRequestUI };
