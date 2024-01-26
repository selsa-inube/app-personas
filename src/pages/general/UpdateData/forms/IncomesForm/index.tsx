import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import {
  handleChangeWithCurrency,
  parseCurrencyString,
} from "src/utils/currency";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { IncomesFormUI } from "./interface";
import { IIncomesEntry } from "./types";

const validationSchema = Yup.object({
  basicSalary: validationRules.money,
  bonds: validationRules.money,
  commissions: validationRules.money,
  overtime: validationRules.money,
  transportationAssistance: validationRules.money,
  foodAssistance: validationRules.money,
  others: validationRules.money,
  totalIncomes: validationRules.money,
});

interface IncomesFormProps {
  initialValues: IIncomesEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IIncomesEntry) => void;
  loading?: boolean;
}

const IncomesForm = forwardRef(function IncomesForm(
  props: IncomesFormProps,
  ref: React.Ref<FormikProps<IIncomesEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  }, [formik.values]);

  const customHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeWithCurrency(formik, event);
    const updatedValues = {
      ...formik.values,
      [event.target.name]: parseCurrencyString(event.target.value),
    };
    getTotalIncomes(updatedValues);
  };

  const getTotalIncomes = (values: IIncomesEntry) => {
    const totalIncomes = Object.entries(values).reduce((acc, [key, value]) => {
      if (key !== "totalIncomes") {
        return acc + (typeof value === "number" ? value : 0);
      }
      return acc;
    }, 0);
    formik.setFieldValue("totalIncomes", totalIncomes);
  };

  return (
    <IncomesFormUI
      loading={loading}
      formik={formik}
      customHandleChange={customHandleChange}
    />
  );
});

export { IncomesForm };
export type { IncomesFormProps };
