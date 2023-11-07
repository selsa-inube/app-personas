import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { IncomeFormUI } from "./interface";
import { IIncomeEntry } from "./types";

const validationSchema = Yup.object({
  basicSalary: validationRules.money,
  bonds: validationRules.money,
  commissions: validationRules.money,
  overtime: validationRules.money,
  transportationAssistance: validationRules.money,
  foodAssistance: validationRules.money,
  others: validationRules.money,
});

interface IncomeFormProps {
  initialValues: IIncomeEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit?: (values: IIncomeEntry) => void;
  loading?: boolean;
}

const IncomeForm = forwardRef(function IncomeForm(
  props: IncomeFormProps,
  ref: React.Ref<FormikProps<IIncomeEntry>>
) {
  const { initialValues, onFormValid, handleSubmit, loading } = props;
  const [totalIncome, setTotalIncome] = useState(0);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);
    getTotalIncome();

    if (handleSubmit) return;

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  };

  const getTotalIncome = () => {
    const totalIncome = Object.values(formik.values).reduce((acc, curr) => {
      return Number(acc) + Number(curr);
    }, 0);

    setTotalIncome(totalIncome);
  };

  return (
    <IncomeFormUI
      loading={loading}
      formik={formik}
      totalIncome={totalIncome}
      customHandleBlur={customHandleBlur}
    />
  );
});

export { IncomeForm };
export type { IncomeFormProps };
