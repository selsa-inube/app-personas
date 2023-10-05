import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { SimulationFormUI } from "./interface";
import { ISimulationEntry } from "./types";

const validationSchema = Yup.object({
  creditSimulation: Yup.string().required(validationMessages.required),
  product: Yup.string().required(validationMessages.required),
});

interface SimulationFormProps {
  initialValues: ISimulationEntry;
  handleSubmit?: (values: ISimulationEntry) => void;
  loading?: boolean;
}

const SimulationForm = forwardRef(function SimulationForm(
  props: SimulationFormProps,
  ref: React.Ref<FormikProps<ISimulationEntry>>
) {
  const { initialValues, handleSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const customHandleChange = (fieldName: string, value: string) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <SimulationFormUI
      loading={loading}
      formik={formik}
      customHandleChange={customHandleChange}
    />
  );
});

export { SimulationForm };
export type { SimulationFormProps };
