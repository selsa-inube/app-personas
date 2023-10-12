import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { PreliquidationFormUI } from "./interface";
import { IPreliquidationEntry } from "./types";
import { useEffect } from "react";

interface PreliquidationFormProps {
  initialValues: IPreliquidationEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit?: (values: IPreliquidationEntry) => void;
  loading?: boolean;
}

const PreliquidationForm = forwardRef(function PreliquidationForm(
  props: PreliquidationFormProps,
  ref: React.Ref<FormikProps<IPreliquidationEntry>>
) {
  const { initialValues, onFormValid, handleSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    const validateAndSetFormValidity = async () => {
      const errors = await formik.validateForm();
      onFormValid(Object.keys(errors).length === 0);
    };

    validateAndSetFormValidity();
  }, []);

  return <PreliquidationFormUI loading={loading} formik={formik} />;
});

export { PreliquidationForm };
export type { PreliquidationFormProps };
