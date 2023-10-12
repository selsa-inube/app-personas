import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { TermsAndConditionsFormUI } from "./interface";
import { ITermsAndConditionsEntry } from "./types";
import * as Yup from "yup";

const validationSchema = Yup.object({
  accept: Yup.boolean().test((value) => value === false),
});

interface TermsAndConditionsFormProps {
  initialValues: ITermsAndConditionsEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit?: (values: ITermsAndConditionsEntry) => void;
  loading?: boolean;
}

const TermsAndConditionsForm = forwardRef(function TermsAndConditionsForm(
  props: TermsAndConditionsFormProps,
  ref: React.Ref<FormikProps<ITermsAndConditionsEntry>>
) {
  const { initialValues, onFormValid, handleSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit || (() => {}),
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
