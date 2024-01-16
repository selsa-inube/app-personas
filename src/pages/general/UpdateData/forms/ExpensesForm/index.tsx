import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
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
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IExpensesEntry) => void;
  loading?: boolean;
}

const ExpensesForm = forwardRef(function ExpensesForm(
  props: ExpensesFormProps,
  ref: React.Ref<FormikProps<IExpensesEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);
    getTotalExpenses();

    if (onSubmit) return;

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  };

  const getTotalExpenses = () => {
    const totalExpenses = Object.entries(formik.values).reduce(
      (acc, [key, value]) => {
        if (key !== "totalExpenses") {
          return acc + (typeof value === "number" ? value : 0);
        }

        return acc;
      },
      0,
    );

    formik.setFieldValue("totalExpenses", totalExpenses);
  };

  return (
    <ExpensesFormUI
      loading={loading}
      formik={formik}
      customHandleBlur={customHandleBlur}
    />
  );
});

export { ExpensesForm };
export type { ExpensesFormProps };
