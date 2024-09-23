import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
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

  return (
    <IdentificationDataFormUI
      formik={formik}
      loading={loading}
      isMobile={isMobile}
      validationSchema={validationSchema}
    />
  );
});

export { IdentificationDataForm };
export type { IdentificationDataFormProps };
