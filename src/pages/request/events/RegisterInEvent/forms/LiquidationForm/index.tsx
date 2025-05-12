import { FormikProps, useFormik } from "formik";
import React, { forwardRef, useImperativeHandle } from "react";
import { LiquidationFormUI } from "./interface";
import { ILiquidationEntry } from "./types";

interface LiquidationFormProps {
  initialValues: ILiquidationEntry;
  loading?: boolean;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: ILiquidationEntry) => void;
}

const LiquidationForm = forwardRef(function LiquidationForm(
  props: LiquidationFormProps,
  ref: React.Ref<FormikProps<ILiquidationEntry>>,
) {
  const { initialValues, onSubmit } = props;

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
    enableReinitialize: true,
  });

  useImperativeHandle(ref, () => formik);

  return <LiquidationFormUI formik={formik} />;
});

export { LiquidationForm };
export type { LiquidationFormProps };
