import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import {
  handleChangeWithCurrency,
  parseCurrencyString,
} from "src/utils/currency";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { ExpensesFormUI } from "./interface";
import { IExpensesEntry } from "./types";

const validationSchema = Yup.object({
  basicSalary: validationRules.money,
  bonds: validationRules.money,
  commissions: validationRules.money,
  overtime: validationRules.money,
  transportationAssistance: validationRules.money,
  foodAssistance: validationRules.money,
  others: validationRules.money,
  totalExpenses: validationRules.money,
});

interface ExpensesFormProps {
  initialValues: IExpensesEntry;
  loading?: boolean;
  withSubmit?: boolean;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IExpensesEntry) => void;
}

const ExpensesForm = forwardRef(function ExpensesForm(
  props: ExpensesFormProps,
  ref: React.Ref<FormikProps<IExpensesEntry>>,
) {
  const { initialValues, loading, withSubmit, onFormValid, onSubmit } = props;

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

  const customHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeWithCurrency(formik, event);
    const updatedValues = {
      ...formik.values,
      [event.target.name]: parseCurrencyString(event.target.value),
    };
    getTotalExpenses(updatedValues);
  };

  const getTotalExpenses = (values: IExpensesEntry) => {
    const totalExpenses = Object.entries(values).reduce((acc, [key, value]) => {
      if (key !== "totalExpenses") {
        return acc + (typeof value === "number" ? value : 0);
      }

      return acc;
    }, 0);

    formik.setFieldValue("totalExpenses", totalExpenses);
  };

  return (
    <ExpensesFormUI
      loading={loading}
      formik={formik}
      withSubmit={withSubmit}
      customHandleChange={customHandleChange}
    />
  );
});

export { ExpensesForm };
export type { ExpensesFormProps };
