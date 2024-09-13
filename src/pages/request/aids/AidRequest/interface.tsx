import { DecisionModal } from "@components/modals/general/DecisionModal";
import { LoadingModal } from "@components/modals/general/LoadingModal";
import { Title } from "@design/data/Title";
import { Assisted } from "@design/feedback/Assisted";
import { IStep } from "@design/feedback/Assisted/types";
import { SectionMessage } from "@design/feedback/SectionMessage";
import { inube } from "@design/tokens";
import { DisbursementForm } from "@forms/DisbursementForm";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Breadcrumbs } from "@inubekit/breadcrumbs";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { IDomainType } from "@ptypes/domain.types";
import { IMessage } from "@ptypes/messages.types";
import { MdArrowBack } from "react-icons/md";
import { Blocker } from "react-router-dom";
import { aidRequestSteps } from "./config/assisted";
import { crumbsAidRequest } from "./config/navigation";
import { AmountForm } from "./forms/AmountForm";
import { BeneficiariesForm } from "./forms/BeneficiariesForm";
import { DetailsSituationForm } from "./forms/DetailsSituationForm";
import { DocumentaryRequirementsForm } from "./forms/DocumentaryRequirementsForm";
import { RegulationValidationsForm } from "./forms/RegulationValidationsForm";
import { AidRequestVerification } from "./forms/Verification";
import { IFormsAidRequest, IFormsAidRequestRefs } from "./types";

const renderStepContent = (
  currentStep: number,
  formReferences: IFormsAidRequestRefs,
  aidRequest: IFormsAidRequest,
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>,
  handleStepChange: (stepId: number) => void,
) => {
  return (
    <>
      {currentStep === aidRequestSteps.beneficiaries.id && (
        <BeneficiariesForm
          initialValues={aidRequest.beneficiaries.values}
          ref={formReferences.beneficiaries}
          onFormValid={setIsCurrentFormValid}
        />
      )}

      {currentStep === aidRequestSteps.amount.id && (
        <AmountForm
          initialValues={aidRequest.amount.values}
          ref={formReferences.amount}
          onFormValid={setIsCurrentFormValid}
        />
      )}

      {currentStep === aidRequestSteps.detailsSituation.id && (
        <DetailsSituationForm
          initialValues={aidRequest.detailsSituation.values}
          ref={formReferences.detailsSituation}
          onFormValid={setIsCurrentFormValid}
        />
      )}

      {currentStep === aidRequestSteps.regulationValidations.id && (
        <RegulationValidationsForm
          initialValues={aidRequest.regulationValidations.values}
          ref={formReferences.regulationValidations}
          onFormValid={setIsCurrentFormValid}
        />
      )}

      {currentStep === aidRequestSteps.documentaryRequirements.id && (
        <DocumentaryRequirementsForm
          initialValues={aidRequest.documentaryRequirements.values}
          ref={formReferences.documentaryRequirements}
          onFormValid={setIsCurrentFormValid}
        />
      )}

      {currentStep === aidRequestSteps.disbursement.id && (
        <DisbursementForm
          initialValues={aidRequest.disbursement.values}
          ref={formReferences.disbursement}
          onFormValid={setIsCurrentFormValid}
        />
      )}

      {currentStep === aidRequestSteps.verification.id && (
        <AidRequestVerification
          aidRequest={aidRequest}
          handleStepChange={handleStepChange}
        />
      )}
    </>
  );
};

interface AidRequestUIProps {
  currentStep: number;
  steps: IStep[];
  isCurrentFormValid: boolean;
  aidRequest: IFormsAidRequest;
  formReferences: IFormsAidRequestRefs;
  loadingSend: boolean;
  message: IMessage;
  blocker: Blocker;
  aidType: IDomainType;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleStepChange: (stepId: number) => void;
  handleFinishAssisted: () => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleCloseMessage: () => void;
}

function AidRequestUI(props: AidRequestUIProps) {
  const {
    currentStep,
    steps,
    isCurrentFormValid,
    aidRequest,
    formReferences,
    loadingSend,
    message,
    blocker,
    aidType,
    setIsCurrentFormValid,
    handleStepChange,
    handleFinishAssisted,
    handleNextStep,
    handlePreviousStep,
    handleCloseMessage,
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
          <Breadcrumbs crumbs={crumbsAidRequest(aidType)} />
          <Title
            title={aidType.value}
            subtitle="Genera tu solicitud de auxilio"
            icon={<MdArrowBack />}
            navigatePage="/aids"
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
            aidRequest,
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
          title="Solicitando auxilio..."
          message="Espera unos segundos, estamos procesando la transacción."
        />
      )}

      {message.show && (
        <SectionMessage
          title={message.title}
          description={message.description}
          appearance={message.appearance}
          icon={message.icon}
          onClose={handleCloseMessage}
          duration={5000}
        />
      )}

      {blocker.state === "blocked" && (
        <DecisionModal
          title="Salir de la solicitud de auxilio"
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

export { AidRequestUI };
