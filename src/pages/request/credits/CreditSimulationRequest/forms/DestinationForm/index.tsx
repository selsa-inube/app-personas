import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { DestinationFormUI } from "./interface";
import { IDestinationEntry } from "./types";

const validationSchema = Yup.object({
  creditDestination: Yup.string().required(validationMessages.required),
  product: Yup.string().required(validationMessages.required),
});

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

  const customHandleChange = (fieldName: string, value: string) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <DestinationFormUI
      loading={loading}
      formik={formik}
      customHandleChange={customHandleChange}
    />
  );
});

export { DestinationForm };
export type { DestinationFormProps };
