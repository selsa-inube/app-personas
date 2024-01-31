import { useRef, useState } from "react";
import { FormikProps } from "formik";
import { initialValuesCreateFamilyMember } from "./config/initialValues";
import { IIdentificationDataEntry } from "./forms/IdentificationDataForm/types";
import { IPersonalDataEntry } from "./forms/PersonalDataForm/types";
import { IContactDataEntry } from "./forms/ContactDataForm/types";
import { IInformationDataEntry } from "./forms/InformationDataForm/types";
import { createFamilyMemberSteps } from "./config/assisted";
import { CreateFamilyMemberUI } from "./interface";
import { createFamilyMemberStepsRules } from "./utils";
import {
  IFormsCreateFamilyMember,
  IFormsCreateFamilyMemberRefs,
} from "./types";

interface CreateFamilyMemberProps {
  onAddMember: (
    identificationData: IIdentificationDataEntry,
    personalData: IPersonalDataEntry,
    contactData: IContactDataEntry,
    informationData: IInformationDataEntry
  ) => void;
}

function CreateFamilyMember(props: CreateFamilyMemberProps) {
  const { onAddMember } = props;
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const [currentStep, setCurrentStep] = useState(
    createFamilyMemberSteps.identificationData.id
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
    const { readonly, newCreateFamilyMember } = createFamilyMemberStepsRules(
      currentStep,
      familyMember,
      formReferences,
      isCurrentFormValid
    );
    setFamilyMember(newCreateFamilyMember);

    if (stepId === createFamilyMemberSteps.personalData.id) {
      setReadOnly(readonly);
    }

    const changeStepKey = Object.entries(createFamilyMemberSteps).find(
      ([, config]) => config.id === stepId
    )?.[0];

    if (!changeStepKey) return;

    const changeIsVerification = stepId === steps.length;
    setIsCurrentFormValid(
      changeIsVerification ||
        newCreateFamilyMember[changeStepKey as keyof IFormsCreateFamilyMember]
          ?.isValid ||
        false
    );

    setCurrentStep(stepId);

    document.getElementsByTagName("main")[0].scrollTo(0, 0);
  };

  const handleFinishAssisted = () => {
    onAddMember(
      familyMember.identificationData.values,
      familyMember.personalData.values,
      familyMember.contactData.values,
      familyMember.informationData.values
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
    handleStepChange(currentStep - 1);
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
      handleStepChange={handleStepChange}
      setIsCurrentFormValid={setIsCurrentFormValid}
    />
  );
}

export { CreateFamilyMember };
