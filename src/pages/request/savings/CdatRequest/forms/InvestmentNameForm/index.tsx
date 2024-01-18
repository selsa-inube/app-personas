import { FormikProps, useFormik } from "formik";
import React, { forwardRef, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { InvestmentNameFormUI } from "./interface";
import { IInvestmentNameEntry } from "./types";

const validationSchema = Yup.object({
  productName: Yup.string().required(validationMessages.required),
});

interface InvestmentNameFormProps {
  initialValues: IInvestmentNameEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IInvestmentNameEntry) => void;
  loading?: boolean;
}

const InvestmentNameForm = forwardRef(function InvestmentNameForm(
  props: InvestmentNameFormProps,
  ref: React.Ref<FormikProps<IInvestmentNameEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);

    if (onSubmit) return;

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  };

  return (
    <InvestmentNameFormUI
      loading={loading}
      formik={formik}
      customHandleBlur={customHandleBlur}
      onFormValid={onFormValid}
    />
  );
});

export { InvestmentNameForm };
export type { InvestmentNameFormProps };
