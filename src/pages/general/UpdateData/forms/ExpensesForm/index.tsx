import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
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
});

interface ExpensesFormProps {
  initialValues: IExpensesEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit?: (values: IExpensesEntry) => void;
  loading?: boolean;
}

const ExpensesForm = forwardRef(function ExpensesForm(
  props: ExpensesFormProps,
  ref: React.Ref<FormikProps<IExpensesEntry>>
) {
  const { initialValues, onFormValid, handleSubmit, loading } = props;
  const [totalExpenses, setTotalExpenses] = useState(0);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);
    getTotalExpenses();

    if (handleSubmit) return;

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  };

  const getTotalExpenses = () => {
    const totalExpenses = Object.values(formik.values).reduce((acc, curr) => {
      return Number(acc) + Number(curr);
    }, 0);

    setTotalExpenses(totalExpenses);
  };

  return (
    <ExpensesFormUI
      loading={loading}
      formik={formik}
      totalExpenses={totalExpenses}
      customHandleBlur={customHandleBlur}
    />
  );
});

export { ExpensesForm };
export type { ExpensesFormProps };
