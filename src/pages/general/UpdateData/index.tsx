import { usersMock } from "@mocks/users/users.mocks";
import { FormikProps } from "formik";
import { useRef, useState } from "react";
import { updateDataSteps } from "./config/assisted";
import { mapPersonalInformation, mapPersonalResidence } from "./config/mappers";
import { IPersonalAssetEntries } from "./forms/PersonalAssetsForm/types";
import { IPersonalDebtEntries } from "./forms/PersonalDebtsForm/types";
import { IPersonalInformationEntry } from "./forms/PersonalInformationForm/types";
import { IPersonalResidenceEntry } from "./forms/PersonalResidenceForm/types";
import { UpdateDataUI } from "./interface";
import { IFormsUpdateData, IFormsUpdateDataRefs } from "./types";
import { IPersonalReferenceEntries } from "./forms/PersonalReferencesForm/types";

function UpdateData() {
  const [currentStep, setCurrentStep] = useState(
    updateDataSteps.personalInformation.id
  );
  const steps = Object.values(updateDataSteps);
  const [updateData, setUpdateData] = useState<IFormsUpdateData>({
    personalInformation: mapPersonalInformation(usersMock[0]),
    personalAssets: { entries: [] },
    personalDebts: { entries: [] },
    personalReferences: { entries: [] },
    personalResidence: mapPersonalResidence(usersMock[0].personalResidence),
  });
  const personalInfoRef = useRef<FormikProps<IPersonalInformationEntry>>(null);
  const personalAssetsRef = useRef<FormikProps<IPersonalAssetEntries>>(null);
  const personalDebtsRef = useRef<FormikProps<IPersonalDebtEntries>>(null);
  const personalReferencesRef =
    useRef<FormikProps<IPersonalReferenceEntries>>(null);
  const personalResidenceRef =
    useRef<FormikProps<IPersonalResidenceEntry>>(null);

  const formReferences: IFormsUpdateDataRefs = {
    personalInformation: personalInfoRef,
    personalAssets: personalAssetsRef,
    personalDebts: personalDebtsRef,
    personalReferences: personalReferencesRef,
    personalResidence: personalResidenceRef,
  };

  const handleStepChange = (stepId: number) => {
    const stepKey = Object.entries(updateDataSteps).find(
      ([, config]) => config.id === currentStep
    )?.[0];

    if (stepKey) {
      const values =
        formReferences[stepKey as keyof IFormsUpdateDataRefs]?.current?.values;

      setUpdateData((prevInvitationData) => ({
        ...prevInvitationData,
        [stepKey]: values,
      }));
    }

    setCurrentStep(stepId);
  };

  const handleFinishAssisted = () => {};

  const handleNextStep = () => {
    if (currentStep + 1 <= steps.length) {
      handleStepChange(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    handleStepChange(currentStep - 1);
  };

  return (
    <UpdateDataUI
      currentStep={currentStep}
      handleFinishAssisted={handleFinishAssisted}
      handleStepChange={handleStepChange}
      formReferences={formReferences}
      updateData={updateData}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      steps={steps}
    />
  );
}

export { UpdateData };
