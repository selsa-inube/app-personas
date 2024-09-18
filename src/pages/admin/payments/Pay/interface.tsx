import { DecisionModal } from "@components/modals/general/DecisionModal";
import { LoadingModal } from "@components/modals/general/LoadingModal";
import { Title } from "@design/data/Title";
import { Assisted } from "@design/feedback/Assisted";
import { IStep } from "@design/feedback/Assisted/types";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdArrowBack } from "react-icons/md";
import { Blocker } from "react-router-dom";
import { CommentsForm } from "src/shared/forms/CommentsForm";
import { paySteps } from "./config/assisted";
import { crumbsPay } from "./config/navigation";
import { ObligationsForm } from "./forms/ObligationsForm";
import { PaymentMethodForm } from "./forms/PaymentMethodForm";
import { PayVerification } from "./forms/Verification";
import { StyledButtonsContainer } from "./styles";
import { IFormsPay, IFormsPayRefs } from "./types";
import { Stack } from "@inubekit/stack";
import { inube } from "@design/tokens";
import { Button } from "@inubekit/button";
import { Breadcrumbs } from "@inubekit/breadcrumbs";

const renderStepContent = (
  currentStep: number,
  formReferences: IFormsPayRefs,
  pay: IFormsPay,
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>,
  handleStepChange: (stepId: number) => void,
) => {
  return (
    <>
      {currentStep === paySteps.obligations.id && (
        <ObligationsForm
          initialValues={pay.obligations.values}
          ref={formReferences.obligations}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === paySteps.paymentMethod.id && (
        <PaymentMethodForm
          initialValues={pay.paymentMethod.values}
          ref={formReferences.paymentMethod}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === paySteps.comments.id && (
        <CommentsForm
          initialValues={pay.comments.values}
          ref={formReferences.comments}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === paySteps.verification.id && (
        <PayVerification pay={pay} handleStepChange={handleStepChange} />
      )}
    </>
  );
};

interface PayUIProps {
  currentStep: number;
  steps: IStep[];
  isCurrentFormValid: boolean;
  pay: IFormsPay;
  formReferences: IFormsPayRefs;
  loadingSend: boolean;
  blocker: Blocker;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleStepChange: (stepId: number) => void;
  handleFinishAssisted: () => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

function PayUI(props: PayUIProps) {
  const {
    currentStep,
    steps,
    isCurrentFormValid,
    pay,
    formReferences,
    loadingSend,
    blocker,
    setIsCurrentFormValid,
    handleStepChange,
    handleFinishAssisted,
    handleNextStep,
    handlePreviousStep,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

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
          <Breadcrumbs crumbs={crumbsPay} />
          <Title
            title="Realizar pagos"
            subtitle="Realiza el pago de obligaciones y transferencias"
            icon={<MdArrowBack />}
            navigatePage="/payments"
          />
        </Stack>

        <Assisted
          steps={steps}
          currentStep={currentStep}
          disableNextStep={!isCurrentFormValid}
          onFinishAssisted={handleFinishAssisted}
          onStepChange={handleStepChange}
        />

        <Stack direction="column" gap={inube.spacing.s300}>
          {renderStepContent(
            currentStep,
            formReferences,
            pay,
            setIsCurrentFormValid,
            handleStepChange,
          )}

          <StyledButtonsContainer
            $fixed={
              isMobile &&
              [paySteps.obligations.id, paySteps.paymentMethod.id].includes(
                currentStep,
              )
            }
          >
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
          </StyledButtonsContainer>
        </Stack>
      </Stack>

      {loadingSend && (
        <LoadingModal
          title="Procesando pago..."
          message="Espera unos segundos, estamos procesando la transacción."
        />
      )}

      {blocker.state === "blocked" && (
        <DecisionModal
          title="Salir del proceso de pago"
          description="¿Estás seguro? Se perderá todo el proceso de pago."
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

export { PayUI };
