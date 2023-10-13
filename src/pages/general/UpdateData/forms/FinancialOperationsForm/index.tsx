import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { FinancialOperationsFormUI } from "./interface";
import { validationRules } from "src/validations/validationRules";
import { IFinancialOperationsEntry } from "./types";

const validationSchema = Yup.object({
  hasForeignCurrencyTransactions: Yup.string().required(
    validationMessages.required
  ),
  hasForeignCurrencyAccounts: Yup.string().required(
    validationMessages.required
  ),
  accountNumber: validationRules.accountNumber.required(
    validationMessages.required
  ),
  descriptionOperationsForeignCurrency: Yup.string()
    .required(validationMessages.required)
    .min(1)
    .max(300),
});

interface FinancialOperationsFormProps {
  initialValues: IFinancialOperationsEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit?: (values: IFinancialOperationsEntry) => void;
  loading?: boolean;
}

const FinancialOperationsForm = forwardRef(function FinancialOperationsForm(
  props: FinancialOperationsFormProps,
  ref: React.Ref<FormikProps<IFinancialOperationsEntry>>
) {
  const { initialValues, onFormValid, handleSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);

    if (handleSubmit) return;

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  };

  return (
    <FinancialOperationsFormUI
      loading={loading}
      formik={formik}
      customHandleBlur={customHandleBlur}
    />
  );
});

export { FinancialOperationsForm };
export type { FinancialOperationsFormProps };
