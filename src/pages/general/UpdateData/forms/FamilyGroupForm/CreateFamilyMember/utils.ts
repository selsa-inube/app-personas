import { referenceUsersMocks } from "@mocks/users/referenceUsersMocks";
import { createFamilyMemberSteps } from "./config/assisted";
import { initialValuesCreateFamilyMember } from "./config/initialValues";
import {
  IFormsCreateFamilyMember,
  IFormsCreateFamilyMemberRefs,
} from "./types";

const createFamilyMemberStepsRules = (
  currentStep: number,
  currentCreateFamilyMember: IFormsCreateFamilyMember,
  formReferences: IFormsCreateFamilyMemberRefs,
  isCurrentFormValid: boolean
) => {
  const newCreateFamilyMember = { ...currentCreateFamilyMember };
  let readonly = false;

  switch (currentStep) {
    case createFamilyMemberSteps.identificationData.id: {
      const values = formReferences.identificationData.current?.values;

      if (!values) {
        return {
          readonly,
          newCreateFamilyMember: currentCreateFamilyMember,
        };
      }

      newCreateFamilyMember.identificationData = {
        isValid: isCurrentFormValid,
        values,
      };

      if (
        JSON.stringify(values) !==
        JSON.stringify(currentCreateFamilyMember.identificationData.values)
      ) {
        const selectedReferenceUser = referenceUsersMocks.find(
          (user) =>
            user.identification.identificationNumber ===
            Number(values.identificationNumber)
        );

        if (selectedReferenceUser) {
          readonly = true;
          newCreateFamilyMember.personalData = {
            isValid: false,
            values: {
              ...initialValuesCreateFamilyMember.personalData,
              identificationNumber: values?.identificationNumber,
              type: selectedReferenceUser.identification.type,
              firstName: selectedReferenceUser.identification.firstName,
              secondName: selectedReferenceUser.identification.secondName,
              firstLastName: selectedReferenceUser.identification.firstLastName,
              secondLastName:
                selectedReferenceUser.identification.secondLastName,
            },
          };

          newCreateFamilyMember.contactData = {
            isValid: false,
            values: {
              ...initialValuesCreateFamilyMember.contactData,
              cellPhone: selectedReferenceUser.contact.cellPhone,
              email: selectedReferenceUser.contact.email,
            },
          };

          newCreateFamilyMember.informationData = {
            isValid: false,
            values: {
              ...initialValuesCreateFamilyMember.personalData,
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
          newCreateFamilyMember.personalData = {
            isValid: false,
            values: {
              ...initialValuesCreateFamilyMember.personalData,
              identificationNumber: values?.identificationNumber,
            },
          };
          newCreateFamilyMember.contactData = {
            isValid: false,
            values: {
              cellPhone: "",
              email: "",
            },
          };
          newCreateFamilyMember.informationData = {
            isValid: false,
            values: {
              relationship: "",
              educationLevel: "",
              profession: "",
              gender: "",
              birthDate: "",
              businessActivity: "",
            },
          };
        }
      }

      return {
        readonly,
        newCreateFamilyMember,
      };
    }
  }

  const stepKey = Object.entries(createFamilyMemberSteps).find(
    ([, config]) => config.id === currentStep
  )?.[0];

  if (!stepKey)
    return {
      readonly,
      newCreateFamilyMember: currentCreateFamilyMember,
    };

  const values =
    formReferences[stepKey as keyof IFormsCreateFamilyMember]?.current?.values;

  return {
    readonly,
    newCreateFamilyMember: {
      ...newCreateFamilyMember,
      [stepKey]: { isValid: isCurrentFormValid, values },
    },
  };
};

export { createFamilyMemberStepsRules };
