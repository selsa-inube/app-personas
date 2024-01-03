import { FormikProps, useFormik } from "formik";
import React, { forwardRef, useImperativeHandle } from "react";
import * as Yup from "yup";
import { RefundFormUI } from "./interface";
import { IRefundEntry } from "./types";

const validationSchema = Yup.object({
  refundMethod: Yup.string(),
  account: Yup.string(),
});

interface RefundFormProps {
  initialValues: IRefundEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IRefundEntry) => void;
  loading?: boolean;
}

const RefundForm = forwardRef(function RefundForm(
  props: RefundFormProps,
  ref: React.Ref<FormikProps<IRefundEntry>>
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);

    if (onSubmit) return;

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  };

  const handleRefundMethodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    formik.handleChange(event);
    if (event.target.value === "creditToInternalAccount") {
      formik.setFieldValue("account", "internalAccount");
    } else if (event.target.value === "transferToExternalAccount") {
      formik.setFieldValue("account", "externalAccount");
    }
  };

  return (
    <RefundFormUI
      loading={loading}
      formik={formik}
      customHandleBlur={customHandleBlur}
      onFormValid={onFormValid}
      onRefundMethodChange={handleRefundMethodChange}
    />
  );
});

export { RefundForm };
export type { RefundFormProps };
