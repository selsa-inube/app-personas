import { FormikProps, useFormik } from "formik";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import * as Yup from "yup";
import { InvestmentNameFormUI } from "./interface";
import { IInvestmentNameEntry } from "./types";

const validationSchema = Yup.object({
  productName: Yup.string(),
});

interface InvestmentNameFormProps {
  initialValues: IInvestmentNameEntry;
  loading?: boolean;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IInvestmentNameEntry) => void;
}

const InvestmentNameForm = forwardRef(function InvestmentNameForm(
  props: InvestmentNameFormProps,
  ref: React.Ref<FormikProps<IInvestmentNameEntry>>,
) {
  const { initialValues, loading, onFormValid, onSubmit } = props;

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

  return (
    <InvestmentNameFormUI
      loading={loading}
      formik={formik}
      onFormValid={onFormValid}
    />
  );
});

export { InvestmentNameForm };
export type { InvestmentNameFormProps };
