import { FormikProps, useFormik } from "formik";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { DestinationFormUI } from "./interface";
import { IDestinationEntry } from "./types";

const validationSchema = Yup.object({
  creditDestination: Yup.string().required(validationMessages.required),
  product: Yup.string().required(validationMessages.required),
});

interface DestinationFormProps {
  initialValues: IDestinationEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IDestinationEntry) => void;
  loading?: boolean;
}

const DestinationForm = forwardRef(function DestinationForm(
  props: DestinationFormProps,
  ref: React.Ref<FormikProps<IDestinationEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

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

  const radioHandleChange = (fieldName: string, value: string) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <DestinationFormUI
      loading={loading}
      formik={formik}
      radioHandleChange={radioHandleChange}
    />
  );
});

export { DestinationForm };
export type { DestinationFormProps };
