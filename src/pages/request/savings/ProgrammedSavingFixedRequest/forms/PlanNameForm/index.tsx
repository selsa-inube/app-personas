import { FormikProps, useFormik } from "formik";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import * as Yup from "yup";
import { PlanNameFormUI } from "./interface";
import { IPlanNameEntry } from "./types";

const validationSchema = Yup.object({
  productName: Yup.string(),
});

interface PlanNameFormProps {
  initialValues: IPlanNameEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IPlanNameEntry) => void;
  loading?: boolean;
}

const PlanNameForm = forwardRef(function PlanNameForm(
  props: PlanNameFormProps,
  ref: React.Ref<FormikProps<IPlanNameEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  }, [formik, onFormValid]);

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);

    if (onSubmit) return;

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  };

  return (
    <PlanNameFormUI
      loading={loading}
      formik={formik}
      customHandleBlur={customHandleBlur}
      onFormValid={onFormValid}
    />
  );
});

export { PlanNameForm };
export type { PlanNameFormProps };
