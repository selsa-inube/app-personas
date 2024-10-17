import { DecisionModal } from "@components/modals/general/DecisionModal";
import { LoadingModal } from "@components/modals/general/LoadingModal";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { SystemValidationsForm } from "@forms/SystemValidationsForm";
import { TermsAndConditionsForm } from "@forms/TermsAndConditionsForm";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Assisted, IAssistedStep } from "@inubekit/assisted";
import { Breadcrumbs } from "@inubekit/breadcrumbs";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { MdArrowBack } from "react-icons/md";
import { Blocker } from "react-router-dom";
import { CommentsForm } from "src/shared/forms/CommentsForm";
import { ContactChannelsForm } from "src/shared/forms/ContactChannelsForm";
import { DisbursementForm } from "../../../../shared/forms/DisbursementForm";
import { DocumentaryRequirementsForm } from "../../../../shared/forms/DocumentaryRequirementsForm";
import { PaymentMethodForm } from "../../../../shared/forms/PaymentMethodForm";
import { creditDestinationRequestSteps } from "./config/assisted";
import { crumbsCreditDestinationRequest } from "./config/navigation";
import { CreditConditionsForm } from "./forms/CreditConditionsForm";
import { DestinationForm } from "./forms/DestinationForm";
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
      {currentStep === creditDestinationRequestSteps.destination.number && (
        <DestinationForm
          initialValues={creditDestinationRequest.destination.values}
          ref={formReferences.destination}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep ===
        creditDestinationRequestSteps.creditConditions.number && (
        <CreditConditionsForm
          initialValues={creditDestinationRequest.creditConditions.values}
          ref={formReferences.creditConditions}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === creditDestinationRequestSteps.paymentMethod.number && (
        <PaymentMethodForm
          initialValues={creditDestinationRequest.paymentMethod.values}
          ref={formReferences.paymentMethod}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === creditDestinationRequestSteps.disbursement.number && (
        <DisbursementForm
          initialValues={creditDestinationRequest.disbursement.values}
          transferAccountValues={{
            transferAccountNumber:
              creditDestinationRequest.creditConditions.values
                .transferAccountNumber,
            transferAccountType:
              creditDestinationRequest.creditConditions.values
                .transferAccountType,
            transferBankEntityCode:
              creditDestinationRequest.creditConditions.values
                .transferBankEntityCode,

            transferBankEntityName:
              creditDestinationRequest.creditConditions.values
                .transferBankEntityName,
          }}
          ref={formReferences.disbursement}
          requestType="credit"
          productId={
            creditDestinationRequest.destination.values.product?.id || ""
          }
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep ===
        creditDestinationRequestSteps.systemValidations.number && (
        <SystemValidationsForm
          initialValues={creditDestinationRequest.systemValidations.values}
          disbursementValues={creditDestinationRequest.disbursement.values}
          ref={formReferences.systemValidations}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep ===
        creditDestinationRequestSteps.documentaryRequirements.number && (
        <DocumentaryRequirementsForm
          initialValues={
            creditDestinationRequest.documentaryRequirements.values
          }
          ref={formReferences.documentaryRequirements}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === creditDestinationRequestSteps.comments.number && (
        <CommentsForm
          initialValues={creditDestinationRequest.comments.values}
          ref={formReferences.comments}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep ===
        creditDestinationRequestSteps.termsAndConditions.number && (
        <TermsAndConditionsForm
          initialValues={creditDestinationRequest.termsAndConditions.values}
          ref={formReferences.termsAndConditions}
          productId={
            creditDestinationRequest.destination.values.product?.id || ""
          }
          productType="credit"
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === creditDestinationRequestSteps.contactChannels.number && (
        <ContactChannelsForm
          initialValues={creditDestinationRequest.contactChannels.values}
          ref={formReferences.contactChannels}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === creditDestinationRequestSteps.verification.number && (
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
  steps: IAssistedStep[];
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
  onLeaveRequest: () => void;
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
    onLeaveRequest,
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
          onClick={onLeaveRequest}
          portalId="modals"
        />
      )}
    </>
  );
}

export { CreditDestinationRequestUI };
