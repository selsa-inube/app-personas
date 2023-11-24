import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
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
  ref: React.Ref<FormikProps<IIncomesEntry>>
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: onSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);
    getTotalIncomes();

    if (onSubmit) return;

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  };

  const getTotalIncomes = () => {
    const totalIncomes = Object.entries(formik.values).reduce(
      (acc, [key, value]) => {
        if (key !== "totalIncomes") {
          return acc + (typeof value === "number" ? value : 0);
        }

        return acc;
      },
      0
    );

    formik.setFieldValue("totalIncomes", totalIncomes);
  };

  return (
    <IncomesFormUI
      loading={loading}
      formik={formik}
      customHandleBlur={customHandleBlur}
    />
  );
});

export { IncomesForm };
export type { IncomesFormProps };
