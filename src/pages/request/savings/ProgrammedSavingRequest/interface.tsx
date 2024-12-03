import { DecisionModal } from "@components/modals/general/DecisionModal";
import { LoadingModal } from "@components/modals/general/LoadingModal";
import { RequestReceivedModal } from "@components/modals/saving/RequestReceivedModal";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { ActionExpirationForm } from "@forms/ActionExpirationForm";
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
import { Blocker } from "react-router-dom";
import { ContactChannelsForm } from "src/shared/forms/ContactChannelsForm";
import { programmedSavingRequestSteps } from "./config/assisted";
import { crumbsProgrammedSavingRequest } from "./config/navigation";
import { DestinationForm } from "./forms/DestinationForm";
import { SavingConditionsForm } from "./forms/SavingConditionsForm";
import { ProgrammedSavingRequestVerification } from "./forms/Verification";
import {
  IFormsProgrammedSavingRequest,
  IFormsProgrammedSavingRequestRefs,
} from "./types";

const renderStepContent = (
  currentStep: number,
  formReferences: IFormsProgrammedSavingRequestRefs,
  programmedSavingRequest: IFormsProgrammedSavingRequest,
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>,
  onStepChange: (stepId: number) => void,
) => {
  return (
    <>
      {currentStep === programmedSavingRequestSteps.destination.number && (
        <DestinationForm
          initialValues={programmedSavingRequest.destination.values}
          ref={formReferences.destination}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === programmedSavingRequestSteps.savingConditions.number && (
        <SavingConditionsForm
          initialValues={programmedSavingRequest.savingConditions.values}
          product={programmedSavingRequest.destination.values.product}
          ref={formReferences.savingConditions}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === programmedSavingRequestSteps.paymentMethod.number && (
        <PaymentMethodForm
          initialValues={programmedSavingRequest.paymentMethod.values}
          ref={formReferences.paymentMethod}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === programmedSavingRequestSteps.actionExpiration.number && (
        <ActionExpirationForm
          initialValues={programmedSavingRequest.actionExpiration.values}
          productId={
            programmedSavingRequest.destination.values.product?.id || ""
          }
          ref={formReferences.actionExpiration}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === programmedSavingRequestSteps.disbursement.number && (
        <DisbursementForm
          initialValues={programmedSavingRequest.disbursement.values}
          ref={formReferences.disbursement}
          requestType="newprogrammedsaving"
          productId={
            programmedSavingRequest.destination.values.product?.id || ""
          }
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep ===
        programmedSavingRequestSteps.systemValidations.number && (
        <SystemValidationsForm
          initialValues={programmedSavingRequest.systemValidations.values}
          ref={formReferences.systemValidations}
          disbursementValues={programmedSavingRequest.disbursement.values}
          requestType="newprogrammedsaving"
          actionExpiration={
            programmedSavingRequest.actionExpiration.values.actionExpiration
          }
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep ===
        programmedSavingRequestSteps.termsAndConditions.number && (
        <TermsAndConditionsForm
          initialValues={programmedSavingRequest.termsAndConditions.values}
          ref={formReferences.termsAndConditions}
          productId={
            programmedSavingRequest.destination.values.product?.id || ""
          }
          productType="newprogrammedsaving"
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === programmedSavingRequestSteps.contactChannels.number && (
        <ContactChannelsForm
          initialValues={programmedSavingRequest.contactChannels.values}
          ref={formReferences.contactChannels}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === programmedSavingRequestSteps.verification.number && (
        <ProgrammedSavingRequestVerification
          programmedSavingRequest={programmedSavingRequest}
          onStepChange={onStepChange}
        />
      )}
    </>
  );
};

interface ProgrammedSavingRequestUIProps {
  currentStep: number;
  steps: IAssistedStep[];
  isCurrentFormValid: boolean;
  programmedSavingRequest: IFormsProgrammedSavingRequest;
  formReferences: IFormsProgrammedSavingRequestRefs;
  loadingSend: boolean;
  blocker: Blocker;
  redirectModal: boolean;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onStepChange: (stepId: number) => void;
  onFinishAssisted: () => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onRedirectToHome: () => void;
  onRedirectToRequests: () => void;
}

function ProgrammedSavingRequestUI(props: ProgrammedSavingRequestUIProps) {
  const {
    currentStep,
    steps,
    isCurrentFormValid,
    programmedSavingRequest,
    formReferences,
    loadingSend,
    blocker,
    redirectModal,
    setIsCurrentFormValid,
    onStepChange,
    onFinishAssisted,
    onNextStep,
    onPreviousStep,
    onRedirectToHome,
    onRedirectToRequests,
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
          <Breadcrumbs crumbs={crumbsProgrammedSavingRequest} />
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
            onNextClick={onNextStep}
            onBackClick={onPreviousStep}
            onSubmitClick={onFinishAssisted}
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
              programmedSavingRequest,
              setIsCurrentFormValid,
              onStepChange,
            )}

            <Stack gap={inube.spacing.s150} justifyContent="flex-end">
              <Button
                onClick={onPreviousStep}
                type="button"
                disabled={currentStep === steps[0].id}
                spacing="compact"
                variant="outlined"
                appearance="gray"
              >
                Atrás
              </Button>

              <Button
                onClick={onNextStep}
                spacing="compact"
                disabled={!isCurrentFormValid}
              >
                {currentStep === steps.length ? "Enviar" : "Siguiente"}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {loadingSend && (
        <LoadingModal
          title="Solicitando ahorro programado..."
          message="Espera unos segundos, estamos procesando la transacción."
        />
      )}

      {blocker.state === "blocked" && (
        <DecisionModal
          title="Salir de la solicitud de ahorro programado"
          description="¿Estás seguro? Se perderá todo el proceso de solicitud."
          cancelText="Continuar"
          actionText="Salir"
          onCloseModal={() => blocker.reset()}
          onClick={() => blocker.proceed()}
          portalId="modals"
        />
      )}

      {redirectModal && (
        <RequestReceivedModal
          portalId="modals"
          onRedirectToHome={onRedirectToHome}
          onRedirectToRequests={onRedirectToRequests}
        />
      )}
    </>
  );
}

export { ProgrammedSavingRequestUI };
