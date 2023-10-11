import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { TermsAndConditionsFormUI } from "./interface";
import { ITermsAndConditionsEntry } from "./types";
import * as Yup from "yup";

const validationSchema = Yup.object({
  termsAndConditions: Yup.boolean().test((value) => value === true),
});

interface TermsAndConditionsFormProps {
  initialValues: ITermsAndConditionsEntry;
  handleSubmit?: (values: ITermsAndConditionsEntry) => void;
  loading?: boolean;
}

const TermsAndConditionsForm = forwardRef(function TermsAndConditionsForm(
  props: TermsAndConditionsFormProps,
  ref: React.Ref<FormikProps<ITermsAndConditionsEntry>>
) {
  const { initialValues, handleSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  return <TermsAndConditionsFormUI loading={loading} formik={formik} />;
});

export { TermsAndConditionsForm };
export type { TermsAndConditionsFormProps };
