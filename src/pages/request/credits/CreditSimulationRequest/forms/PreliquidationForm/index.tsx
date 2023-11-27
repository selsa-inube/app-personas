import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { PreliquidationFormUI } from "./interface";
import { IPreliquidationEntry } from "./types";

interface PreliquidationFormProps {
  initialValues: IPreliquidationEntry;
  onSubmit?: (values: IPreliquidationEntry) => void;
  loading?: boolean;
}

const PreliquidationForm = forwardRef(function PreliquidationForm(
  props: PreliquidationFormProps,
  ref: React.Ref<FormikProps<IPreliquidationEntry>>
) {
  const { initialValues, onSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    onSubmit: onSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  return <PreliquidationFormUI loading={loading} formik={formik} />;
});

export { PreliquidationForm };
export type { PreliquidationFormProps };
