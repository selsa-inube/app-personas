import { FormikProps } from "formik";
import { useRef, useState } from "react";
import { createFamilyMemberSteps } from "./config/assisted";
import { initialValuesCreateFamilyMember } from "./config/initialValues";
import { IContactDataEntry } from "./forms/ContactDataForm/types";
import { IIdentificationDataEntry } from "./forms/IdentificationDataForm/types";
import { IInformationDataEntry } from "./forms/InformationDataForm/types";
import { IPersonalDataEntry } from "./forms/PersonalDataForm/types";
import { CreateFamilyMemberUI } from "./interface";
import {
  IFormsCreateFamilyMember,
  IFormsCreateFamilyMemberRefs,
} from "./types";
import { createFamilyMemberStepsRules } from "./utils";

interface CreateFamilyMemberProps {
  onAddMember: (
    identificationData: IIdentificationDataEntry,
    personalData: IPersonalDataEntry,
    contactData: IContactDataEntry,
    informationData: IInformationDataEntry,
  ) => void;
}

function CreateFamilyMember(props: CreateFamilyMemberProps) {
  const { onAddMember } = props;
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(true);
  const [currentStep, setCurrentStep] = useState(
    createFamilyMemberSteps.identificationData.number,
  );

  const steps = Object.values(createFamilyMemberSteps);

  const [readOnly, setReadOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [familyMember, setFamilyMember] = useState<IFormsCreateFamilyMember>({
    identificationData: {
      isValid: false,
      values: initialValuesCreateFamilyMember.identificationData,
    },
    personalData: {
      isValid: true,
      values: initialValuesCreateFamilyMember.personalData,
    },
    contactData: {
      isValid: true,
      values: initialValuesCreateFamilyMember.contactData,
    },
    informationData: {
      isValid: true,
      values: initialValuesCreateFamilyMember.informationData,
    },
  });

  const identificationDataRef =
    useRef<FormikProps<IIdentificationDataEntry>>(null);
  const personalDataRef = useRef<FormikProps<IPersonalDataEntry>>(null);
  const contactDataRef = useRef<FormikProps<IContactDataEntry>>(null);
  const informationDataRef = useRef<FormikProps<IInformationDataEntry>>(null);

  const formReferences: IFormsCreateFamilyMemberRefs = {
    identificationData: identificationDataRef,
    personalData: personalDataRef,
    contactData: contactDataRef,
    informationData: informationDataRef,
  };

  const handleStepChange = (stepId: number) => {
    const { selectedReferenceUser, newCreateFamilyMember } =
      createFamilyMemberStepsRules(
        currentStep,
        familyMember,
        formReferences,
        isCurrentFormValid,
      );

    setFamilyMember(newCreateFamilyMember);

    if (selectedReferenceUser) {
      setReadOnly(true);
    }

    const changeStepKey = Object.entries(createFamilyMemberSteps).find(
      ([, config]) => config.number === stepId)?.[0];

    if (!changeStepKey) return;

    const changeIsVerification = stepId === steps.length;
    setIsCurrentFormValid(
      changeIsVerification ||
        newCreateFamilyMember[changeStepKey as keyof IFormsCreateFamilyMember]
          ?.isValid ||
        false,
    );

    setCurrentStep(stepId);

    document.getElementsByTagName("main")[0].scrollTo(0, 0);
  };

  const handleFinishAssisted = () => {
    onAddMember(
      familyMember.identificationData.values,
      familyMember.personalData.values,
      familyMember.contactData.values,
      familyMember.informationData.values,
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
    }

    handleStepChange(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      handleStepChange(currentStep - 1);
    }
  };

  return (
    <CreateFamilyMemberUI
      steps={steps}
      isCurrentFormValid={isCurrentFormValid}
      createFamilyMember={familyMember}
      currentStep={currentStep}
      formReferences={formReferences}
      readOnly={readOnly}
      loading={isLoading}
      handleFinishAssisted={handleFinishAssisted}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      setIsCurrentFormValid={setIsCurrentFormValid}
    />
  );
}

export { CreateFamilyMember };
