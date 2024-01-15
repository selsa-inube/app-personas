import { useRef, useState } from "react";
import { IIdentificationDataEntry } from "./forms/IdentificationDataForm/types";
import {
  addFamilyMemberStepsRules,
  createMemberSteps,
} from "./config/assisted";
import { IFormsAddFamilyMember, IFormsAddFamilyMemberRefs } from "./types";
import { initalValuesAddFamilyMember } from "./config/initialValues";
import { FormikProps } from "formik";
import { AddFamilyMemberUI } from "./interface";
import { IPersonalDataEntry } from "./forms/PersonalDataForm/types";
import { IContactDataEntry } from "./forms/ContactDataForm/types";
import { IInformationDataEntry } from "./forms/InformationDataForm/types";

interface AddFamilyMemberProps {
  onAddMember: (
    identificationData: IIdentificationDataEntry,
    personalData: IPersonalDataEntry,
    contactData: IContactDataEntry,
    informationData: IInformationDataEntry
  ) => void;
}

function AddFamilyMember(props: AddFamilyMemberProps) {
  const { onAddMember } = props;
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const [currentStep, setCurrentStep] = useState(
    createMemberSteps.identificationData.id
  );

  const steps = Object.values(createMemberSteps);

  const [readOnly, setReadOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [familyMember, setFamilyMember] = useState<IFormsAddFamilyMember>({
    identificationData: {
      isValid: false,
      values: initalValuesAddFamilyMember.identificationData,
    },
    personalData: {
      isValid: true,
      values: initalValuesAddFamilyMember.personalData,
    },
    contactData: {
      isValid: true,
      values: initalValuesAddFamilyMember.contactData,
    },
    informationData: {
      isValid: true,
      values: initalValuesAddFamilyMember.informationData,
    },
  });

  const identificationDataRef =
    useRef<FormikProps<IIdentificationDataEntry>>(null);
  const personalDataRef = useRef<FormikProps<IPersonalDataEntry>>(null);
  const contactDataRef = useRef<FormikProps<IContactDataEntry>>(null);
  const informationDataRef = useRef<FormikProps<IInformationDataEntry>>(null);

  const formReferences: IFormsAddFamilyMemberRefs = {
    identificationData: identificationDataRef,
    personalData: personalDataRef,
    contactData: contactDataRef,
    informationData: informationDataRef,
  };

  const handleStepChange = (stepId: number) => {
    const { readonly, newAddFamilyMember } = addFamilyMemberStepsRules(
      currentStep,
      familyMember,
      formReferences,
      isCurrentFormValid
    );
    setReadOnly(readonly);
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
    if (currentStep === 1) {
      setIsLoading(true);
      setTimeout(() => {
        handleStepChange(currentStep + 1);
        setIsLoading(false);
      }, 1000);
      return;
    }
  
    if (currentStep === steps.length) {
      onAddMember(
        familyMember.identificationData.values,
        familyMember.personalData.values,
        familyMember.contactData.values,
        familyMember.informationData.values
      );
    }
    
    handleStepChange(currentStep + 1);
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
      readOnly={readOnly}
      loading={isLoading}
      handleFinishAssisted={handleFinishAssisted}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleStepChange={handleStepChange}
      setIsCurrentFormValid={setIsCurrentFormValid}
    />
  );
}

export { AddFamilyMember };
