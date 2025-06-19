import { FormikProps, useFormik } from "formik";
import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { financialOperationsRequiredFields } from "./config/formConfig";
import { FinancialOperationsFormUI } from "./interface";
import { IFinancialOperationsEntry } from "./types";
import { AppContext } from "src/context/app";

const validationSchema = Yup.object().shape({
  hasForeignCurrencyTransactions:
    financialOperationsRequiredFields.hasForeignCurrencyTransactions
      ? Yup.string().required(validationMessages.required)
      : Yup.string(),
  hasForeignCurrencyAccounts:
    financialOperationsRequiredFields.hasForeignCurrencyAccounts
      ? Yup.string().required(validationMessages.required)
      : Yup.string(),
  accountNumber: financialOperationsRequiredFields.accountNumber
    ? validationRules.accountNumber.required(validationMessages.required)
    : validationRules.accountNumber,
  descriptionOperations: financialOperationsRequiredFields.descriptionOperations
    ? Yup.string().required(validationMessages.required).min(1).max(300)
    : Yup.string(),
  country: financialOperationsRequiredFields.country
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  bankEntity: financialOperationsRequiredFields.bankEntity
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  currency: financialOperationsRequiredFields.currency
    ? validationRules.currency.required(validationMessages.required)
    : validationRules.currency,
});

interface FinancialOperationsFormProps {
  initialValues: IFinancialOperationsEntry;
  loading?: boolean;
  withSubmit?: boolean;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IFinancialOperationsEntry) => void;
}

const FinancialOperationsForm = forwardRef(function FinancialOperationsForm(
  props: FinancialOperationsFormProps,
  ref: React.Ref<FormikProps<IFinancialOperationsEntry>>,
) {
  const { loading, initialValues, withSubmit, onFormValid, onSubmit } = props;
  const { serviceDomains } = useContext(AppContext);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (formik.dirty && onFormValid) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  return (
    <FinancialOperationsFormUI
      loading={loading}
      formik={formik}
      withSubmit={withSubmit}
      validationSchema={validationSchema}
      serviceDomains={serviceDomains}
    />
  );
});

export { FinancialOperationsForm };
export type { FinancialOperationsFormProps };
