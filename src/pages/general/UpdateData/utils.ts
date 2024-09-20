import { updateDataSteps } from "./config/assisted";
import { IFormsUpdateData, IFormsUpdateDataRefs } from "./types";

const updateDataStepsRules = (
  currentStep: number,
  currentUpdateData: IFormsUpdateData,
  formReferences: IFormsUpdateDataRefs,
  isCurrentFormValid: boolean,
) => {
  let newUpdateData = { ...currentUpdateData };

  const adjustedStep = currentStep + 1;

  switch (adjustedStep) {
    case updateDataSteps.familyGroup.number: {
      const values = formReferences.familyGroup.current?.values;

      if (!values) return currentUpdateData;

      newUpdateData.familyGroup = {
        isValid: isCurrentFormValid,
        values,
      };

      const isDirty =
        JSON.stringify(values) !==
        JSON.stringify(currentUpdateData.familyGroup.values);

      const newBeneficiaries = values.entries.map((entry) => ({
        id: String(entry.identificationNumber || ""),
        name: `${entry.firstName} ${entry.secondName || ""} ${entry.firstLastName} ${entry.secondLastName || ""}`,
        percentage: isDirty
          ? undefined
          : newUpdateData.beneficiaries.values.beneficiaries.find(
              (b) => b.id === String(entry.identificationNumber),
            )?.percentage,
      }));

      newUpdateData.beneficiaries = {
        isValid: !isDirty,
        values: {
          beneficiaries: newBeneficiaries,
          totalPercentage: isDirty
            ? 0
            : newUpdateData.beneficiaries.values.totalPercentage,
        },
      };

      return newUpdateData;
    }
  }

  const stepKey = Object.entries(updateDataSteps).find(
    ([, config]) => config.number === adjustedStep,
  )?.[0];

  if (!stepKey) return currentUpdateData;

  const values =
    formReferences[stepKey as keyof IFormsUpdateData]?.current?.values;

  return (newUpdateData = {
    ...newUpdateData,
    [stepKey]: { isValid: isCurrentFormValid, values },
  });
};

export { updateDataStepsRules };
