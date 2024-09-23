import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { familyGroupRequiredFields } from "../../../config/formConfig";
import { ContactDataFormUI } from "./interface";
import { IContactDataEntry } from "./types";

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
  ref: React.Ref<FormikProps<IContactDataEntry>>,
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
        }),
      );

      setDynamicSchema(newValidationSchema);
    }
  }, []);

  useEffect(() => {
    if ((!readonly && formik.dirty) || readonly) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  return (
    <ContactDataFormUI
      loading={loading}
      formik={formik}
      readonly={readonly}
      validationSchema={dynamicSchema}
    />
  );
});

export { ContactDataForm };
export type { ContactDataFormProps };
