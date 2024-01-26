import * as Yup from "yup";
import { familyGroupRequiredFields } from "../../../config/formConfig";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import { IContactDataEntry } from "./types";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { FormikProps, useFormik } from "formik";
import { ContactDataFormUI } from "./interface";

const validationSchema = Yup.object({
  cellPhone: familyGroupRequiredFields.cellPhone
    ? validationRules.phone.required(validationMessages.required)
    : validationRules.phone,
  email: familyGroupRequiredFields.email
    ? validationRules.email.required(validationMessages.required)
    : validationRules.email,
});

interface ContactDataFormProps {
  initialValues: IContactDataEntry;
  loading?: boolean;
  readonly?: boolean;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IContactDataEntry) => void;
}

const ContactDataForm = forwardRef(function ContactDataForm(
  props: ContactDataFormProps,
  ref: React.Ref<FormikProps<IContactDataEntry>>
) {
  const { initialValues, loading, readonly, onFormValid, onSubmit } = props;

  const [dynamicSchema, setDynamicSchema] =
    useState<Yup.ObjectSchema<IContactDataEntry>>(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (readonly) {
      const newValidationSchema = validationSchema.concat(
        Yup.object({
          cellPhone: validationRules.phone,
          email: validationRules.email,
        })
      );

      setDynamicSchema(newValidationSchema);
    }
  }, []);

  useEffect(() => {
    if (!readonly) {
      if (formik.dirty) {
        formik.validateForm().then((errors) => {
          onFormValid(Object.keys(errors).length === 0);
        });
      }
    } else {
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
    <ContactDataFormUI
      loading={loading}
      formik={formik}
      readonly={readonly}
      isRequired={isRequired}
    />
  );
});

export { ContactDataForm };
export type { ContactDataFormProps };
