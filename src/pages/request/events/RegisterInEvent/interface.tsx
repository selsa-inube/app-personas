import { DecisionModal } from "@components/modals/general/DecisionModal";
import { LoadingModal } from "@components/modals/general/LoadingModal";
import { RequestReceivedModal } from "@components/modals/saving/RequestReceivedModal";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { SystemValidationsForm } from "@forms/SystemValidationsForm";
import { TermsAndConditionsForm } from "@forms/TermsAndConditionsForm";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Assisted,
  Breadcrumbs,
  Button,
  IAssistedStep,
  Stack,
} from "@inubekit/inubekit";
import { MdArrowBack } from "react-icons/md";
import { Blocker } from "react-router-dom";
import { registerInEventSteps } from "./config/assisted";
import { crumbsRegisterInEvent } from "./config/navigation";
import { ChooseEntriesForm } from "./forms/ChooseEntriesForm";
import { LiquidationForm } from "./forms/LiquidationForm";
import { PaymentMethodForm } from "./forms/PaymentMethodForm";
import { RegisterInEventVerification } from "./forms/Verification";
import { IFormsRegisterInEvent, IFormsRegisterInEventRefs } from "./types";

const renderStepContent = (
  currentStep: number,
  formReferences: IFormsRegisterInEventRefs,
  registerInEvent: IFormsRegisterInEvent,
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>,
  onStepChange: (stepId: number) => void,
) => {
  return (
    <>
      {currentStep === registerInEventSteps.chooseEntries.number && (
        <ChooseEntriesForm
          initialValues={registerInEvent.chooseEntries.values}
          ref={formReferences.chooseEntries}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === registerInEventSteps.liquidation.number && (
        <LiquidationForm
          initialValues={registerInEvent.liquidation.values}
          ref={formReferences.liquidation}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === registerInEventSteps.paymentMethod.number && (
        <PaymentMethodForm
          initialValues={registerInEvent.paymentMethod.values}
          ref={formReferences.paymentMethod}
          noRequirePaymentMethod={
            registerInEvent.chooseEntries.values.totalValue === 0
          }
          onFormValid={setIsCurrentFormValid}
        />
      )}

      {currentStep === registerInEventSteps.systemValidations.number && (
        <SystemValidationsForm
          initialValues={registerInEvent.systemValidations.values}
          ref={formReferences.systemValidations}
          moneySources={[
            {
              type: registerInEvent.paymentMethod.values.paymentMethod,
              name: registerInEvent.paymentMethod.values.paymentMethodName,
              accountNumber: registerInEvent.paymentMethod.values.accountNumber,
              value: registerInEvent.chooseEntries.values.totalValue || 0,
            },
          ]}
          requestType="registerinevent"
          onFormValid={setIsCurrentFormValid}
        />
      )}

      {currentStep === registerInEventSteps.termsAndConditions.number && (
        <TermsAndConditionsForm
          initialValues={registerInEvent.termsAndConditions.values}
          ref={formReferences.termsAndConditions}
          productId={registerInEvent.chooseEntries.values.event?.id || ""}
          productType="registerinevent"
          onFormValid={setIsCurrentFormValid}
        />
      )}

      {currentStep === registerInEventSteps.verification.number && (
        <RegisterInEventVerification
          registerInEvent={registerInEvent}
          onStepChange={onStepChange}
        />
      )}
    </>
  );
};

interface RegisterInEventUIProps {
  currentStep: number;
  steps: IAssistedStep[];
  isCurrentFormValid: boolean;
  registerInEvent: IFormsRegisterInEvent;
  formReferences: IFormsRegisterInEventRefs;
  loadingSend: boolean;
  blocker: Blocker;
  redirectModal: boolean;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onStepChange: (stepId: number) => void;
  onFinishAssisted: () => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onLeaveRequest: () => void;
  onRedirectToHome: () => void;
  onRedirectToRequests: () => void;
}

function RegisterInEventUI(props: RegisterInEventUIProps) {
  const {
    currentStep,
    steps,
    isCurrentFormValid,
    registerInEvent,
    formReferences,
    loadingSend,
    blocker,
    redirectModal,
    setIsCurrentFormValid,
    onStepChange,
    onFinishAssisted,
    onNextStep,
    onPreviousStep,
    onLeaveRequest,
    onRedirectToHome,
    onRedirectToRequests,
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
          <Breadcrumbs crumbs={crumbsRegisterInEvent} />
          <Title
            title="Inscribirme"
            subtitle="Participa en los eventos dispuestos por Fondecom."
            icon={<MdArrowBack />}
            navigatePage="/events"
          />
        </Stack>

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
            registerInEvent,
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

      {loadingSend && (
        <LoadingModal
          title="Generando solicitud..."
          message="Espera unos segundos, estamos generando la solicitud."
        />
      )}

      {blocker.state === "blocked" && (
        <DecisionModal
          title="Salir de la solicitud de inscripción"
          description="¿Estás seguro? Se perderá todo el proceso de solicitud."
          cancelText="Continuar"
          actionText="Salir"
          onCloseModal={() => blocker.reset()}
          onClick={onLeaveRequest}
          portalId="modals"
        />
      )}

      {redirectModal && (
        <RequestReceivedModal
          portalId="modals"
          titleType="Solicitud"
          onRedirectToHome={onRedirectToHome}
          onRedirectToRequests={onRedirectToRequests}
        />
      )}
    </>
  );
}

export { RegisterInEventUI };
