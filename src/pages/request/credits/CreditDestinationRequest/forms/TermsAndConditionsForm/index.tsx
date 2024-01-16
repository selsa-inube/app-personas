import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import * as Yup from "yup";
import { TermsAndConditionsFormUI } from "./interface";
import { ITermsAndConditionsEntry } from "./types";

const validationSchema = Yup.object({
  accept: Yup.boolean().test((value) => value === false),
});

interface TermsAndConditionsFormProps {
  initialValues: ITermsAndConditionsEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: ITermsAndConditionsEntry) => void;
  loading?: boolean;
}

const TermsAndConditionsForm = forwardRef(function TermsAndConditionsForm(
  props: TermsAndConditionsFormProps,
  ref: React.Ref<FormikProps<ITermsAndConditionsEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  const customHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event);

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  };

  return (
    <TermsAndConditionsFormUI
      loading={loading}
      formik={formik}
      customHandleChange={customHandleChange}
    />
  );
});

export { TermsAndConditionsForm };
export type { TermsAndConditionsFormProps };
