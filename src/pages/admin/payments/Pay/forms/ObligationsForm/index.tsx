import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { ObligationsFormUI } from "./interface";
import { IObligationsEntry } from "./types";

const validationSchema = Yup.object({
  expeditionDate: Yup.string().required(validationMessages.required),
  birthDate: Yup.string().required(validationMessages.required),
});

interface ObligationsFormProps {
  initialValues: IObligationsEntry;
  loading?: boolean;
  withSubmit?: boolean;
  onSubmit?: (values: IObligationsEntry) => void;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ObligationsForm = forwardRef(function ObligationsForm(
  props: ObligationsFormProps,
  ref: React.Ref<FormikProps<IObligationsEntry>>,
) {
  const { initialValues, loading, withSubmit, onFormValid, onSubmit,  } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (onFormValid) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  return (
    <ObligationsFormUI
      loading={loading}
      formik={formik}
      withSubmit={withSubmit}
    />
  );
});

export { ObligationsForm };
export type { ObligationsFormProps };
