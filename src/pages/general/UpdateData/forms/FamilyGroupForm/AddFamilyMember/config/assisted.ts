import { referenceUsersMocks } from "@mocks/users/referenceUsersMocks";
import { IFormsAddFamilyMember, IFormsAddFamilyMemberRefs } from "../types";
import { initalValuesAddFamilyMember } from "./initialValues";

const createMemberSteps = {
  identificationData: {
    id: 1,
    name: "Identificación",
    description: "Description",
  },
  personalData: {
    id: 2,
    name: "Datos personales",
    description: "Description",
  },
  contactData: {
    id: 3,
    name: "Datos de contacto",
    description: "Description",
  },
  information: {
    id: 4,
    name: "Información",
    description: "Description",
  },
  verification: {
    id: 5,
    name: "Verificación",
    description: "Description",
  },
};

const addFamilyMemberStepsRules = (
  currentStep: number,
  currentAddFamilyMember: IFormsAddFamilyMember,
  formReferences: IFormsAddFamilyMemberRefs,
  isCurrentFormValid: boolean
) => {
  let newAddFamilyMember = { ...currentAddFamilyMember };

  switch (currentStep) {
    case createMemberSteps.identificationData.id: {
      const values = formReferences.identificationData.current?.values;

      if (!values) return currentAddFamilyMember;

      newAddFamilyMember.identificationData = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentAddFamilyMember.identificationData.values)
      ) {
        const selectedReferenceUser = referenceUsersMocks.find(
          (user) =>
            user.identification.identificationNumber ===
            values.identificationNumber
        );

        const newAddFamilyMember = { ...currentAddFamilyMember };

        if (!selectedReferenceUser) {
          newAddFamilyMember.identificationData = {
            isValid: true,
            values: {
              ...newAddFamilyMember.identificationData.values,
              identificationNumber: values.identificationNumber,
            },
          };
        } else {
          newAddFamilyMember.identificationData = {
            isValid: true,
            values: {
              ...initalValuesAddFamilyMember.identificationData,
              identificationNumber:
                selectedReferenceUser.identification.identificationNumber,
            },
          };
        }
      }
      return newAddFamilyMember;
    }
  }

  const stepKey = Object.entries(addFamilyMemberStepsRules).find(
    ([, config]) => config.id === currentStep
  )?.[0];

  if (!stepKey) return currentAddFamilyMember;

  const values =
    formReferences[stepKey as keyof IFormsAddFamilyMember]?.current?.values;

  return (newAddFamilyMember = {
    ...newAddFamilyMember,
    [stepKey]: { isValid: isCurrentFormValid, values },
  });
};

export { createMemberSteps, addFamilyMemberStepsRules };
