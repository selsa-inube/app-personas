import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { InvestmentFormUI } from "./interface";
import { IInvestmentEntry } from "./types";

const validationSchema = Yup.object({
  valueInvestment: validationRules.money.required(validationMessages.required),
});

interface InvestmentFormProps {
  initialValues: IInvestmentEntry;
  loading?: boolean;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IInvestmentEntry) => void;
}

const InvestmentForm = forwardRef(function InvestmentForm(
  props: InvestmentFormProps,
  ref: React.Ref<FormikProps<IInvestmentEntry>>,
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
    if (formik.dirty) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  return (
    <InvestmentFormUI
      loading={loading}
      formik={formik}
      onFormValid={onFormValid}
    />
  );
});

export { InvestmentForm };
export type { InvestmentFormProps };
