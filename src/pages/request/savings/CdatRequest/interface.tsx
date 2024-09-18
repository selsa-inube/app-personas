import { DecisionModal } from "@components/modals/general/DecisionModal";
import { LoadingModal } from "@components/modals/general/LoadingModal";
import { Title } from "@design/data/Title";
import { Assisted } from "@design/feedback/Assisted";
import { IStep } from "@design/feedback/Assisted/types";
import { inube } from "@design/tokens";
import { DisbursementForm } from "@forms/DisbursementForm";
import { SystemValidationsForm } from "@forms/SystemValidationsForm";
import { TermsAndConditionsForm } from "@forms/TermsAndConditionsForm";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Breadcrumbs } from "@inubekit/breadcrumbs";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { MdArrowBack } from "react-icons/md";
import { Blocker } from "react-router-dom";
import { CommentsForm } from "src/shared/forms/CommentsForm";
import { ContactChannelsForm } from "src/shared/forms/ContactChannelsForm";
import { cdatRequestSteps } from "./config/assisted";
import { crumbsCdatRequest } from "./config/navigation";
import { ConditionsForm } from "./forms/ConditionsForm";
import { InvestmentForm } from "./forms/InvestmentForm";
import { InvestmentNameForm } from "./forms/InvestmentNameForm";
import { PaymentMethodForm } from "./forms/PaymentMethodForm";
import { CdatRequestVerification } from "./forms/Verification";
import { IFormsCdatRequest, IFormsCdatRequestRefs } from "./types";

const renderStepContent = (
  currentStep: number,
  formReferences: IFormsCdatRequestRefs,
  cdatRequest: IFormsCdatRequest,
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>,
  handleStepChange: (stepId: number) => void,
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
      {currentStep === cdatRequestSteps.conditions.id && (
        <ConditionsForm
          initialValues={cdatRequest.conditions.values}
          ref={formReferences.conditions}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === cdatRequestSteps.paymentMethod.id && (
        <PaymentMethodForm
          initialValues={cdatRequest.paymentMethod.values}
          ref={formReferences.paymentMethod}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === cdatRequestSteps.disbursement.id && (
        <DisbursementForm
          initialValues={cdatRequest.disbursement.values}
          ref={formReferences.disbursement}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === cdatRequestSteps.systemValidations.id && (
        <SystemValidationsForm
          initialValues={cdatRequest.systemValidations.values}
          ref={formReferences.systemValidations}
          disbursementValues={cdatRequest.disbursement.values}
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
      {currentStep === cdatRequestSteps.comments.id && (
        <CommentsForm
          initialValues={cdatRequest.comments.values}
          ref={formReferences.comments}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === cdatRequestSteps.termsAndConditions.id && (
        <TermsAndConditionsForm
          initialValues={cdatRequest.termsAndConditions.values}
          ref={formReferences.termsAndConditions}
          productId="57"
          productType="credit"
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
      {currentStep === cdatRequestSteps.verification.id && (
        <CdatRequestVerification
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
  loadingSend: boolean;
  blocker: Blocker;
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
    loadingSend,
    blocker,
    setIsCurrentFormValid,
    handleStepChange,
    handleFinishAssisted,
    handleNextStep,
    handlePreviousStep,
  } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");
  const isMobile = useMediaQuery("(max-width: 450px)");

  return (
    <>
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
          <Breadcrumbs crumbs={crumbsCdatRequest} />
          <Title
            title="CDAT"
            subtitle="Simula tu solicitud de CDAT"
            icon={<MdArrowBack />}
            navigatePage="/savings"
          />
        </Stack>

        <Assisted
          steps={steps}
          currentStep={currentStep}
          onFinishAssisted={handleFinishAssisted}
          onStepChange={handleStepChange}
          disableNextStep={!isCurrentFormValid}
        />

        <Stack direction="column" gap={inube.spacing.s300}>
          {renderStepContent(
            currentStep,
            formReferences,
            cdatRequest,
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
              {currentStep === steps.length ? "Pagar" : "Siguiente"}
            </Button>
          </Stack>
        </Stack>
      </Stack>

      {loadingSend && (
        <LoadingModal
          title="Procesando pago..."
          message="Espera unos segundos, estamos generando la transacción."
        />
      )}

      {blocker.state === "blocked" && (
        <DecisionModal
          title="Abandonar solicitud"
          description="¿Estás seguro? Se perderá la solicitud en proceso."
          cancelText="Continuar"
          actionText="Salir"
          onCloseModal={() => blocker.reset()}
          onClick={() => blocker.proceed()}
          portalId="modals"
        />
      )}
    </>
  );
}

export { CdatRequestUI };
