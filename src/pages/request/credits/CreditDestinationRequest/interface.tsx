import { DecisionModal } from "@components/modals/general/DecisionModal";
import { LoadingModal } from "@components/modals/general/LoadingModal";
import { Title } from "@design/data/Title";
import { Assisted } from "@design/feedback/Assisted";
import { IStep } from "@design/feedback/Assisted/types";
import { Button } from "@design/input/Button";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Stack } from "@inubekit/stack";
import { MdArrowBack } from "react-icons/md";
import { Blocker } from "react-router-dom";
import { CommentsForm } from "src/shared/forms/CommentsForm";
import { ContactChannelsForm } from "src/shared/forms/ContactChannelsForm";
import { creditDestinationRequestSteps } from "./config/assisted";
import { crumbsCreditDestinationRequest } from "./config/navigation";
import { CreditConditionsForm } from "./forms/CreditConditionsForm";
import { DestinationForm } from "./forms/DestinationForm";
import { DisbursementForm } from "./forms/DisbursementForm";
import { DocumentaryRequirementsForm } from "./forms/DocumentaryRequirementsForm";
import { PaymentMethodForm } from "./forms/PaymentMethodForm";
import { SystemValidationsForm } from "./forms/SystemValidationsForm";
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
      {currentStep === creditDestinationRequestSteps.paymentMethod.id && (
        <PaymentMethodForm
          initialValues={creditDestinationRequest.paymentMethod.values}
          ref={formReferences.paymentMethod}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === creditDestinationRequestSteps.disbursement.id && (
        <DisbursementForm
          initialValues={creditDestinationRequest.disbursement.values}
          ref={formReferences.disbursement}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === creditDestinationRequestSteps.systemValidations.id && (
        <SystemValidationsForm
          initialValues={creditDestinationRequest.systemValidations.values}
          ref={formReferences.systemValidations}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep ===
        creditDestinationRequestSteps.documentaryRequirements.id && (
        <DocumentaryRequirementsForm
          initialValues={
            creditDestinationRequest.documentaryRequirements.values
          }
          ref={formReferences.documentaryRequirements}
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
  loadingSend: boolean;
  blocker: Blocker;
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
    loadingSend,
    blocker,
    setIsCurrentFormValid,
    handleStepChange,
    handleFinishAssisted,
    handleNextStep,
    handlePreviousStep,
  } = props;

  const isMobile = useMediaQuery("(max-width: 450px)");
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
          <Breadcrumbs crumbs={crumbsCreditDestinationRequest} />
          <Title
            title="Solicitud por destinación"
            subtitle="Simula tu solicitud de crédito"
            icon={<MdArrowBack />}
            navigatePage="/credits"
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
            creditDestinationRequest,
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

      {loadingSend && (
        <LoadingModal
          title="Generando solicitud..."
          message="Espera unos segundos, estamos generando la solicitud."
        />
      )}

      {blocker.state === "blocked" && (
        <DecisionModal
          title="Salir de la solicitud de crédito"
          description="¿Estás seguro? Se perderá todo el proceso de solicitud."
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

export { CreditDestinationRequestUI };
