import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import * as Yup from "yup";
import { DestinationFormUI } from "./interface";
import { IDestinationEntry } from "./types";

const validationSchema = Yup.object({});

interface DestinationFormProps {
  initialValues: IDestinationEntry;
  handleSubmit?: (values: IDestinationEntry) => void;
  loading?: boolean;
}

const DestinationForm = forwardRef(function DestinationForm(
  props: DestinationFormProps,
  ref: React.Ref<FormikProps<IDestinationEntry>>
) {
  const { initialValues, handleSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  return <DestinationFormUI loading={loading} formik={formik} />;
});

export { DestinationForm };
export type { DestinationFormProps };
