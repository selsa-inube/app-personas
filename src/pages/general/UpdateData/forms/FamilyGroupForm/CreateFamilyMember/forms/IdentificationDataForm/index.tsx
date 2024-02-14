import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { familyGroupRequiredFields } from "../../../config/formConfig";
import { IdentificationDataFormUI } from "./interface";
import { IIdentificationDataEntry } from "./types";

const validationSchema = Yup.object().shape({
  identificationNumber: familyGroupRequiredFields.identificationNumber
    ? validationRules.identification.required(validationMessages.required)
    : validationRules.identification,
});

interface IdentificationDataFormProps {
  initialValues: IIdentificationDataEntry;
  loading?: boolean;
  isMobile?: boolean;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IIdentificationDataEntry) => void;
}

const IdentificationDataForm = forwardRef(function IdentificationDataForm(
  props: IdentificationDataFormProps,
  ref: React.Ref<FormikProps<IIdentificationDataEntry>>,
) {
  const { initialValues, loading, isMobile, onFormValid, onSubmit } = props;
  const [dynamicSchema] = useState(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  }, [formik.values]);

  const isRequired = (fieldName: string): boolean => {
    const fieldDescription = dynamicSchema.describe().fields[fieldName];
    if (!("nullable" in fieldDescription)) return false;
    return !fieldDescription.nullable && !fieldDescription.optional;
  };

  return (
    <IdentificationDataFormUI
      formik={formik}
      loading={loading}
      isMobile={isMobile}
      isRequired={isRequired}
    />
  );
});

export { IdentificationDataForm };
export type { IdentificationDataFormProps };
