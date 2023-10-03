import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { FinancialOperationsFormUI } from "./interface";
import { IFinancialOperationsEntry } from "./types";

const validationSchema = Yup.object({
  hasForeignCurrencyTransactions: Yup.string().required(
    validationMessages.required
  ),
  hasForeignCurrencyAccounts: Yup.string().required(
    validationMessages.required
  ),
});

interface FinancialOperationsFormProps {
  initialValues: IFinancialOperationsEntry;
  handleSubmit?: (values: IFinancialOperationsEntry) => void;
  loading?: boolean;
}

const FinancialOperationsForm = forwardRef(function FinancialOperationsForm(
  props: FinancialOperationsFormProps,
  ref: React.Ref<FormikProps<IFinancialOperationsEntry>>
) {
  const { initialValues, handleSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  return <FinancialOperationsFormUI loading={loading} formik={formik} />;
});

export { FinancialOperationsForm };
export type { FinancialOperationsFormProps };
