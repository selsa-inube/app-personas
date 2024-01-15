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
  let readonly = false;

  switch (currentStep) {
    case createMemberSteps.identificationData.id: {
      const values = formReferences.identificationData.current?.values;

      if (!values) {
        return {
          readonly,
          newAddFamilyMember: currentAddFamilyMember,
        };
      }

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

        if (selectedReferenceUser) {
          readonly = true;
          newAddFamilyMember.personalData = {
            isValid: false,
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
            isValid: false,
            values: {
              ...initalValuesAddFamilyMember.contactData,
              cellPhone: selectedReferenceUser.contact.cellPhone,
              email: selectedReferenceUser.contact.email,
            },
          };

          newAddFamilyMember.informationData = {
            isValid: false,
            values: {
              ...initalValuesAddFamilyMember.personalData,
              identificationNumber: values?.identificationNumber,
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
        } else {
          readonly = false;
          newAddFamilyMember.personalData = {
            isValid: false,
            values: {
              ...initalValuesAddFamilyMember.personalData,
              identificationNumber: values?.identificationNumber,
            },
          };
          newAddFamilyMember.contactData = {
            isValid: false,
            values: {
              cellPhone: "",
              email: "",
            },
          };
          newAddFamilyMember.informationData = {
            isValid: false,
            values: {
              isDependent: false,
              relationship: "",
              educationLevel: "",
              profession: "",
              gender: "",
              birthDate: "",
              businessActivity: ""
            },
          };
        }
      }

      return {
        readonly,
        newAddFamilyMember,
      };
    }
  }

  const stepKey = Object.entries(createMemberSteps).find(
    ([, config]) => config.id === currentStep
  )?.[0];

  if (!stepKey)
    return {
      readonly,
      newAddFamilyMember: currentAddFamilyMember,
    };

  const values =
    formReferences[stepKey as keyof IFormsAddFamilyMember]?.current?.values;

  return {
    readonly,
    newAddFamilyMember: {
      ...newAddFamilyMember,
      [stepKey]: { isValid: isCurrentFormValid, values },
    },
  };
};

export { createMemberSteps, addFamilyMemberStepsRules };
