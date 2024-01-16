import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
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
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IInvestmentEntry) => void;
  loading?: boolean;
}

const InvestmentForm = forwardRef(function InvestmentForm(
  props: InvestmentFormProps,
  ref: React.Ref<FormikProps<IInvestmentEntry>>,
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
    <InvestmentFormUI
      loading={loading}
      formik={formik}
      customHandleBlur={customHandleBlur}
      onFormValid={onFormValid}
    />
  );
});

export { InvestmentForm };
export type { InvestmentFormProps };
