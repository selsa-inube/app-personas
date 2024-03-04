import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { financialOperationsRequiredFields } from "./config/formConfig";
import { FinancialOperationsFormUI } from "./interface";
import { IFinancialOperationsEntry } from "./types";

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
    ? validationRules.country.required(validationMessages.required)
    : validationRules.country,
  bankEntity: financialOperationsRequiredFields.bankEntity
    ? Yup.string()
        .min(3, validationMessages.minCharacters(3))
        .required(validationMessages.required)
    : Yup.string().min(3, validationMessages.minCharacters(3)),
  currency: financialOperationsRequiredFields.currency
    ? validationRules.currency.required(validationMessages.required)
    : validationRules.currency,
});

interface FinancialOperationsFormProps {
  loading?: boolean;
  initialValues: IFinancialOperationsEntry;
  withSubmit?: boolean;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IFinancialOperationsEntry) => void;
}

const FinancialOperationsForm = forwardRef(function FinancialOperationsForm(
  props: FinancialOperationsFormProps,
  ref: React.Ref<FormikProps<IFinancialOperationsEntry>>,
) {
  const { loading, initialValues, withSubmit, onFormValid, onSubmit } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (onFormValid) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  const isRequired = (fieldName: string): boolean => {
    const fieldDescription = validationSchema.describe().fields[fieldName];
    if (!("nullable" in fieldDescription)) return false;
    return !fieldDescription.nullable && !fieldDescription.optional;
  };

  return (
    <FinancialOperationsFormUI
      loading={loading}
      formik={formik}
      withSubmit={withSubmit}
      isRequired={isRequired}
    />
  );
});

export { FinancialOperationsForm };
export type { FinancialOperationsFormProps };
