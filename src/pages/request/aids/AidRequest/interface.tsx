import { DecisionModal } from "@components/modals/general/DecisionModal";
import { LoadingModal } from "@components/modals/general/LoadingModal";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { DisbursementForm } from "@forms/DisbursementForm";
import { SystemValidationsForm } from "@forms/SystemValidationsForm";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Assisted, IAssistedStep } from "@inubekit/assisted";
import { Breadcrumbs } from "@inubekit/breadcrumbs";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { IDomainType } from "@ptypes/domain.types";
import { MdArrowBack } from "react-icons/md";
import { Blocker } from "react-router-dom";
import { aidRequestSteps } from "./config/assisted";
import { crumbsAidRequest } from "./config/navigation";
import { BeneficiariesForm } from "./forms/BeneficiariesForm";
import { DetailsSituationForm } from "./forms/DetailsSituationForm";
import { AidRequestVerification } from "./forms/Verification";
import { IFormsAidRequest, IFormsAidRequestRefs } from "./types";
import { DocumentaryRequirementsForm } from "@forms/DocumentaryRequirementsForm";

const renderStepContent = (
  currentStep: number,
  formReferences: IFormsAidRequestRefs,
  aidRequest: IFormsAidRequest,
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>,
  handleStepChange: (stepId: number) => void,
) => {
  return (
    <>
      {currentStep === aidRequestSteps.beneficiaries.number && (
        <BeneficiariesForm
          initialValues={aidRequest.beneficiaries.values}
          ref={formReferences.beneficiaries}
          onFormValid={setIsCurrentFormValid}
        />
      )}

      {currentStep === aidRequestSteps.detailsSituation.number && (
        <DetailsSituationForm
          initialValues={aidRequest.detailsSituation.values}
          ref={formReferences.detailsSituation}
          onFormValid={setIsCurrentFormValid}
        />
      )}

      {currentStep === aidRequestSteps.systemValidations.number && (
        <SystemValidationsForm
          initialValues={aidRequest.systemValidations.values}
          ref={formReferences.systemValidations}
          disbursementValues={aidRequest.disbursement.values}
          test
          onFormValid={setIsCurrentFormValid}
        />
      )}

      {currentStep === aidRequestSteps.documentaryRequirements.number && (
        <DocumentaryRequirementsForm
          initialValues={aidRequest.documentaryRequirements.values}
          ref={formReferences.documentaryRequirements}
          onFormValid={setIsCurrentFormValid}
        />
      )}

      {currentStep === aidRequestSteps.disbursement.number && (
        <DisbursementForm
          initialValues={aidRequest.disbursement.values}
          ref={formReferences.disbursement}
          onFormValid={setIsCurrentFormValid}
        />
      )}

      {currentStep === aidRequestSteps.verification.number && (
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
  steps: IAssistedStep[];
  isCurrentFormValid: boolean;
  aidRequest: IFormsAidRequest;
  formReferences: IFormsAidRequestRefs;
  loadingSend: boolean;
  blocker: Blocker;
  aidType: IDomainType;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleStepChange: (stepId: number) => void;
  handleFinishAssisted: () => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

function AidRequestUI(props: AidRequestUIProps) {
  const {
    currentStep,
    steps,
    isCurrentFormValid,
    aidRequest,
    formReferences,
    loadingSend,
    blocker,
    aidType,
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
          <Breadcrumbs crumbs={crumbsAidRequest(aidType)} />
          <Title
            title={aidType.value}
            subtitle="Genera tu solicitud de auxilio"
            icon={<MdArrowBack />}
            navigatePage="/aids"
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
