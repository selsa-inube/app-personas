import { useRef, useState } from "react";
import { IIdentificationDataEntry } from "./forms/IdentificationDataForm/types";
import { addFamilyMemberStepsRules, createMemberSteps } from "./config/assisted";
import { IFormsAddFamilyMember, IFormsAddFamilyMemberRefs } from "./types";
import { initalValuesAddFamilyMember } from "./config/initialValues";
import { FormikProps } from "formik";
import { AddFamilyMemberUI } from "./interface";

interface AddFamilyMemberProps {
  onAddMember: (identificationData: IIdentificationDataEntry) => void;
}

function AddFamilyMember(props: AddFamilyMemberProps) {
  const { onAddMember } = props;
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const [currentStep, setCurrentStep] = useState(
    createMemberSteps.identificationData.id
  );

  const steps = Object.values(createMemberSteps);

  const [familyMember, setFamilyMember] = useState<IFormsAddFamilyMember>({
    identificationData: {
      isValid: false,
      values: initalValuesAddFamilyMember.identificationData,
    },
  });

  const identificationDataRef = useRef<FormikProps<IIdentificationDataEntry>>(null);

  const formReferences: IFormsAddFamilyMemberRefs = {
    identificationData: identificationDataRef,
  };

  const handleStepChange = (stepId: number) => {
    const newAddFamilyMember = addFamilyMemberStepsRules(
      currentStep,
      familyMember,
      formReferences,
      isCurrentFormValid
    );
    setFamilyMember(newAddFamilyMember);

    const changeStepKey = Object.entries(createMemberSteps).find(
      ([, config]) => config.id === stepId
    )?.[0];

    if (!changeStepKey) return;

    const changeIsVerification = stepId === steps.length;
    setIsCurrentFormValid(
      changeIsVerification ||
        newAddFamilyMember[changeStepKey as keyof IFormsAddFamilyMember]
          ?.isValid ||
        false
    );

    setCurrentStep(stepId);

    document.getElementsByTagName("main")[0].scrollTo(0, 0);
  };

  const handleFinishAssisted = () => {};

  const handleNextStep = () => {
    if (currentStep + 1 <= steps.length) {
      handleStepChange(currentStep + 1);
    }
    if (currentStep == steps.length) {
      onAddMember(
        familyMember.identificationData.values,
      );
    }
  };

  const handlePreviousStep = () => {
    handleStepChange(currentStep - 1);
  };

  return (
    <AddFamilyMemberUI
      steps={steps}
      isCurrentFormValid={isCurrentFormValid}
      addFamilyMember={familyMember}
      currentStep={currentStep}
      formReferences={formReferences}
      handleFinishAssisted={handleFinishAssisted}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleStepChange={handleStepChange}
      setIsCurrentFormValid={setIsCurrentFormValid}
    />
  );
}

export { AddFamilyMember };
