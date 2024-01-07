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
  informationData: {
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

        if (!selectedReferenceUser) {
          newAddFamilyMember.personalData = {
            isValid: true,
            values: {
              ...initalValuesAddFamilyMember.personalData,
              identificationNumber: values?.identificationNumber,
            },
          };
        } else {
          newAddFamilyMember.personalData = {
            isValid: true,
            values: {
              ...initalValuesAddFamilyMember.personalData,
              identificationNumber: values?.identificationNumber,
              type: selectedReferenceUser.identification.type,
              firstName: selectedReferenceUser.identification.firstName,
              secondName: selectedReferenceUser.identification.secondName,
              firstLastName: selectedReferenceUser.identification.firstLastName,
              secondLastName:
                selectedReferenceUser.identification.secondLastName,
            },
          };

          newAddFamilyMember.contactData = {
            isValid: true,
            values: {
              ...initalValuesAddFamilyMember.contactData,
              cellPhone: selectedReferenceUser.contact.cellPhone,
              email: selectedReferenceUser.contact.email,
            },
          };

          newAddFamilyMember.informationData = {
            isValid: true,
            values: {
              ...initalValuesAddFamilyMember.personalData,
              relationship: selectedReferenceUser.information.relationship,
              isDependent: selectedReferenceUser.information.isDependent,
              educationLevel: selectedReferenceUser.information.educationLevel,
              profession: selectedReferenceUser.information.profession,
              gender: selectedReferenceUser.information.gender,
              birthDate: selectedReferenceUser.information.birthDate,
              businessActivity:
                selectedReferenceUser.information.businessActivity,
            },
          };
        }
      }
      return newAddFamilyMember;
    }

    case createMemberSteps.personalData.id: {
      const values = formReferences.personalData.current?.values;

      if (!values) return currentAddFamilyMember;

      newAddFamilyMember.personalData = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentAddFamilyMember.personalData.values)
      ) {
        newAddFamilyMember.personalData = {
          isValid: true,
          values: {
            ...initalValuesAddFamilyMember.personalData,
            identificationNumber: values?.identificationNumber,
            type: values.type,
            firstName: values?.firstName,
            secondName: values?.secondName,
            firstLastName: values?.firstLastName,
            secondLastName: values?.secondLastName,
            relationship: values?.relationship,
            isDependent: values?.isDependent,
          },
        };
      }

      return newAddFamilyMember;
    }

    case createMemberSteps.contactData.id: {
      const values = formReferences.contactData.current?.values;

      if (!values) return currentAddFamilyMember;

      newAddFamilyMember.contactData = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentAddFamilyMember.contactData.values)
      ) {
        newAddFamilyMember.contactData = {
          isValid: true,
          values: {
            ...initalValuesAddFamilyMember.personalData,
            cellPhone: values?.cellPhone,
            email: values?.email,
          },
        };
      }

      return newAddFamilyMember;
    }

    case createMemberSteps.informationData.id: {
      const values = formReferences.informationData.current?.values;

      if (!values) return currentAddFamilyMember;

      newAddFamilyMember.informationData = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentAddFamilyMember.informationData.values)
      ) {
        newAddFamilyMember.informationData = {
          isValid: true,
          values: {
            ...initalValuesAddFamilyMember.informationData,
            relationship: values?.relationship,
            isDependent: values?.isDependent,
            educationLevel: values?.educationLevel,
            profession: values?.profession,
            gender: values?.gender,
            birthDate: values?.birthDate,
            businessActivity: values?.businessActivity,
          },
        };
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
