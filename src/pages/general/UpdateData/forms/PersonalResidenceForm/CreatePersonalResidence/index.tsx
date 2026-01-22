import { FormikProps } from "formik";
import { useRef, useState } from "react";
import { personalResidenceSteps } from "./config/assisted";
import { initialValuesPersonalResidence } from "./config/initialValues";
import { IResidenceDetailsEntry } from "./forms/ResidenceDetailsForm/types";
import { IResidenceTypeEntry } from "./forms/ResidenceTypeForm/types";
import {
  IFormsCreatePersonalResidence,
  IFormsCreatePersonalResidenceRefs,
} from "./types";
import { createPersonalResidenceStepsRules } from "./utils";
import { CreatePersonalResidenceUI } from "./interface";

interface CreatePersonalResidenceProps {
  onAddResidence: (
    residenceType: IResidenceTypeEntry,
    residenceDetails: IResidenceDetailsEntry,
  ) => void;
}

function CreatePersonalResidence(props: CreatePersonalResidenceProps) {
  const { onAddResidence } = props;

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const [currentStep, setCurrentStep] = useState(
    personalResidenceSteps.residenceType.number,
  );

  const steps = Object.values(personalResidenceSteps);
  const [isLoading, setIsLoading] = useState(false);

  const [personalResidence, setPersonalResidence] =
    useState<IFormsCreatePersonalResidence>({
      residenceType: {
        isValid: false,
        values: initialValuesPersonalResidence.residenceType,
      },
      residenceDetails: {
        isValid: false,
        values: initialValuesPersonalResidence.residenceDetails,
      },
    });

  const residenceTypeRef = useRef<FormikProps<IResidenceTypeEntry>>(null);
  const residenceDetailsRef = useRef<FormikProps<IResidenceDetailsEntry>>(null);

  const formReferences: IFormsCreatePersonalResidenceRefs = {
    residenceType: residenceTypeRef,
    residenceDetails: residenceDetailsRef,
  };

  const handleStepChange = (stepId: number) => {
    const { newPersonalResidence } = createPersonalResidenceStepsRules(
      currentStep,
      personalResidence,
      formReferences,
      isCurrentFormValid,
    );

    setPersonalResidence(newPersonalResidence);

    const changeStepKey = Object.entries(personalResidenceSteps).find(
      ([, config]) => config.number === stepId,
    )?.[0];

    if (!changeStepKey) return;

    const changeIsVerification = stepId === steps.length;
    setIsCurrentFormValid(
      changeIsVerification ||
      newPersonalResidence[
        changeStepKey as keyof IFormsCreatePersonalResidence
      ]?.isValid || false,
    );

    setCurrentStep(stepId);

    document.getElementsByTagName("main")[0].scrollTo(0, 0);
  };

  const handleFinishAssisted = () => {
    const { newPersonalResidence } = createPersonalResidenceStepsRules(
      currentStep,
      personalResidence,
      formReferences,
      isCurrentFormValid,
    );

    onAddResidence(
      newPersonalResidence.residenceType.values,
      newPersonalResidence.residenceDetails.values,
    );
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setIsLoading(true);
      setTimeout(() => {
        handleStepChange(currentStep + 1);
        setIsLoading(false);
      }, 1000);
      return;
    }

    if (currentStep === steps.length) {
      handleFinishAssisted();
      return;
    }

    handleStepChange(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      handleStepChange(currentStep - 1);
    }
  };

  return (
    <CreatePersonalResidenceUI
      steps={steps}
      isCurrentFormValid={isCurrentFormValid}
      personalResidence={personalResidence}
      currentStep={currentStep}
      formReferences={formReferences}
      loading={isLoading}
      handleFinishAssisted={handleFinishAssisted}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      setIsCurrentFormValid={setIsCurrentFormValid}
    />
  );
}

export { CreatePersonalResidence };
export type { CreatePersonalResidenceProps };