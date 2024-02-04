import * as Yup from "yup";
import { familyGroupRequiredFields } from "../../../config/formConfig";
import { validationRules } from "src/validations/validationRules";
import { validationMessages } from "src/validations/validationMessages";
import { IPersonalDataEntry } from "./types";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { FormikProps, useFormik } from "formik";
import { PersonalDataFormUI } from "./interface";

const validationSchema = Yup.object().shape({
  identificationNumber: familyGroupRequiredFields.identificationNumber
    ? validationRules.identification.required(validationMessages.required)
    : validationRules.identification,
  type: familyGroupRequiredFields.type
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  firstName: familyGroupRequiredFields.firstName
    ? validationRules.name.required(validationMessages.required)
    : validationRules.name,
  secondName: familyGroupRequiredFields.secondName
    ? validationRules.name.required(validationMessages.required)
    : validationRules.name,
  firstLastName: familyGroupRequiredFields.firstLastName
    ? validationRules.name.required(validationMessages.required)
    : validationRules.name,
  secondLastName: familyGroupRequiredFields.secondLastName
    ? validationRules.name.required(validationMessages.required)
    : validationRules.name,
  relationship: familyGroupRequiredFields.relationship
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  isDependent: familyGroupRequiredFields.isDependent
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
});

interface PersonalDataFormProps {
  initialValues: IPersonalDataEntry;
  loading?: boolean;
  readonly?: boolean;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IPersonalDataEntry) => void;
}

const PersonalDataForm = forwardRef(function IdentificationForm(
  props: PersonalDataFormProps,
  ref: React.Ref<FormikProps<IPersonalDataEntry>>,
) {
  const { initialValues, loading, readonly, onFormValid, onSubmit } = props;

  const [dynamicSchema, setDynamicSchema] = useState(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (!readonly) {
      const newValidationSchema = validationSchema.concat(
        Yup.object({
          relationship: Yup.string(),
          isDependent: Yup.string(),
        }),
      );

      setDynamicSchema(newValidationSchema);
    }
  }, []);

  useEffect(() => {
    if (formik.dirty) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  const isRequired = (fieldName: string): boolean => {
    const fieldDescription = dynamicSchema.describe().fields[fieldName];
    if (!("nullable" in fieldDescription)) return false;
    return !fieldDescription.nullable && !fieldDescription.optional;
  };

  return (
    <PersonalDataFormUI
      loading={loading}
      formik={formik}
      readonly={readonly}
      isRequired={isRequired}
    />
  );
});

export { PersonalDataForm };
export type { PersonalDataFormProps };
