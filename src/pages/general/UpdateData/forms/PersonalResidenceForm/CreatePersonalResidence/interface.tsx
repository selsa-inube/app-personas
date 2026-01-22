import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Assisted, Button, IAssistedStep, Stack } from "@inubekit/inubekit";
import { useContext } from "react";
import { AppContext } from "src/context/app";
import { IServiceDomains } from "src/context/app/types";
import { personalResidenceSteps } from "./config/assisted";
import { ResidenceDetailsForm } from "./forms/ResidenceDetailsForm";
import { ResidenceTypeForm } from "./forms/ResidenceTypeForm";
import { StyledScroller } from "./styles";
import {
  IFormsCreatePersonalResidence,
  IFormsCreatePersonalResidenceRefs,
} from "./types";

const renderStepContent = (
  currentStep: number,
  formReferences: IFormsCreatePersonalResidenceRefs,
  personalResidence: IFormsCreatePersonalResidence,
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>,
  serviceDomains: IServiceDomains,
) => {
  return (
    <>
      {currentStep === personalResidenceSteps.residenceType.number && (
        <ResidenceTypeForm
          initialValues={personalResidence.residenceType.values}
          ref={formReferences.residenceType}
          onFormValid={setIsCurrentFormValid}
        />
      )}
      {currentStep === personalResidenceSteps.residenceDetails.number && (
        <ResidenceDetailsForm
          initialValues={personalResidence.residenceDetails.values}
          ref={formReferences.residenceDetails}
          onFormValid={setIsCurrentFormValid}
          serviceDomains={serviceDomains}
          residenceType={personalResidence.residenceType.values.type}
        />
      )}
    </>
  );
};

interface CreatePersonalResidenceUIProps {
  currentStep: number;
  steps: IAssistedStep[];
  isCurrentFormValid: boolean;
  personalResidence: IFormsCreatePersonalResidence;
  formReferences: IFormsCreatePersonalResidenceRefs;
  loading: boolean;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleFinishAssisted: () => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

function CreatePersonalResidenceUI(props: CreatePersonalResidenceUIProps) {
  const {
    currentStep,
    steps,
    isCurrentFormValid,
    personalResidence,
    formReferences,
    loading,
    setIsCurrentFormValid,
    handleFinishAssisted,
    handleNextStep,
    handlePreviousStep,
  } = props;

  const isMobile = useMediaQuery("(max-width: 750px)");
  const { serviceDomains } = useContext(AppContext);

  return (
    <Stack direction="column" width="100%" gap={inube.spacing.s300}>
      <Assisted
        step={steps[currentStep - 1]}
        totalSteps={steps.length}
        onNextClick={handleNextStep}
        onBackClick={handlePreviousStep}
        onSubmitClick={handleFinishAssisted}
        disableNext={!isCurrentFormValid}
        size="small"
      />

      <StyledScroller $smallScreen={isMobile}>
        {renderStepContent(
          currentStep,
          formReferences,
          personalResidence,
          setIsCurrentFormValid,
          serviceDomains,
        )}
      </StyledScroller>

      <Stack gap={inube.spacing.s150} justifyContent="flex-end">
        <Button
          onClick={handlePreviousStep}
          type="button"
          disabled={currentStep === steps[0].id}
          spacing="compact"
          variant="outlined"
          appearance="gray"
        >
          Cancelar
        </Button>

        <Button
          onClick={handleNextStep}
          spacing="compact"
          disabled={!isCurrentFormValid}
          loading={loading}
        >
          {currentStep === steps.length ? "Agregar" : "Continuar"}
        </Button>
      </Stack>
    </Stack>
  );
}

export { CreatePersonalResidenceUI };
