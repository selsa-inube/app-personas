import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { useState } from "react";
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
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  currency: financialOperationsRequiredFields.currency
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
});

interface FinancialOperationsFormProps {
  loading?: boolean;
  initialValues: IFinancialOperationsEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IFinancialOperationsEntry) => void;
}

const FinancialOperationsForm = forwardRef(function FinancialOperationsForm(
  props: FinancialOperationsFormProps,
  ref: React.Ref<FormikProps<IFinancialOperationsEntry>>
) {
  const { loading, initialValues, onFormValid, onSubmit } = props;

  const [dynamicSchema, setDynamicSchema] = useState(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicSchema,
    validateOnChange: false,
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

  const isRequired = (fieldName: string): boolean => {
    const fieldDescription = dynamicSchema.describe().fields[fieldName] as any;
    return !fieldDescription.nullable && !fieldDescription.optional;
  };

  return (
    <FinancialOperationsFormUI
      loading={loading}
      formik={formik}
      isRequired={isRequired}
      customHandleBlur={customHandleBlur}
    />
  );
});

export { FinancialOperationsForm };
export type { FinancialOperationsFormProps };
