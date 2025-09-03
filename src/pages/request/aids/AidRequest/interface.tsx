import { DecisionModal } from "@components/modals/general/DecisionModal";
import { LoadingModal } from "@components/modals/general/LoadingModal";
import { RequestReceivedModal } from "@components/modals/saving/RequestReceivedModal";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { ContactChannelsForm } from "@forms/ContactChannelsForm";
import { DisbursementForm } from "@forms/DisbursementForm";
import { DocumentaryRequirementsForm } from "@forms/DocumentaryRequirementsForm";
import { SystemValidationsForm } from "@forms/SystemValidationsForm";
import { TermsAndConditionsForm } from "@forms/TermsAndConditionsForm";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Assisted,
  Breadcrumbs,
  Button,
  IAssistedStep,
  IOption,
  Stack,
} from "@inubekit/inubekit";
import { IDomainType } from "@ptypes/domain.types";
import { MdArrowBack } from "react-icons/md";
import { Blocker } from "react-router";
import { aidRequestSteps } from "./config/assisted";
import { crumbsAidRequest } from "./config/navigation";
import { BeneficiariesForm } from "./forms/BeneficiariesForm";
import { DetailsSituationForm } from "./forms/DetailsSituationForm";
import { AidRequestVerification } from "./forms/Verification";
import { IFormsAidRequest, IFormsAidRequestRefs } from "./types";

const renderStepContent = (
  currentStep: number,
  formReferences: IFormsAidRequestRefs,
  aidRequest: IFormsAidRequest,
  aidType: IDomainType,
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>,
  onStepChange: (stepId: number) => void,
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
          beneficiaryId={
            aidRequest.beneficiaries.values.beneficiaries.find(
              (beneficiary) => beneficiary.selected,
            )?.identificationNumber || ""
          }
          onFormValid={setIsCurrentFormValid}
        />
      )}

      {currentStep === aidRequestSteps.systemValidations.number && (
        <SystemValidationsForm
          initialValues={aidRequest.systemValidations.values}
          ref={formReferences.systemValidations}
          disbursementValues={aidRequest.disbursement.values}
          requestType="aid"
          beneficiary={aidRequest.beneficiaries.values.beneficiaries.find(
            (beneficiary) => beneficiary.selected,
          )}
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
          requestType="aid"
          productId={aidType.id}
        />
      )}

      {currentStep === aidRequestSteps.termsAndConditions.number && (
        <TermsAndConditionsForm
          initialValues={aidRequest.termsAndConditions.values}
          ref={formReferences.termsAndConditions}
          productId={aidType.id}
          productType="aid"
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === aidRequestSteps.contactChannels.number && (
        <ContactChannelsForm
          initialValues={aidRequest.contactChannels.values}
          ref={formReferences.contactChannels}
          onFormValid={setIsCurrentFormValid}
        />
      )}

      {currentStep === aidRequestSteps.verification.number && (
        <AidRequestVerification
          aidRequest={aidRequest}
          onStepChange={onStepChange}
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
  aidType: IOption;
  redirectModal: boolean;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onStepChange: (stepId: number) => void;
  onFinishAssisted: () => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onRedirectToHome: () => void;
  onRedirectToRequests: () => void;
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
    redirectModal,
    setIsCurrentFormValid,
    onStepChange,
    onFinishAssisted,
    onNextStep,
    onPreviousStep,
    onRedirectToHome,
    onRedirectToRequests,
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
            title={aidType.label}
            subtitle="Genera tu solicitud de auxilio"
            icon={<MdArrowBack />}
            navigatePage="/aids"
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
            aidRequest,
            aidType,
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

export { AidRequestUI };
