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
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IDestinationEntry) => void;
  loading?: boolean;
}

const DestinationForm = forwardRef(function DestinationForm(
  props: DestinationFormProps,
  ref: React.Ref<FormikProps<IDestinationEntry>>
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: onSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const customHandleChange = (fieldName: string, value: string) => {
    formik.setFieldValue(fieldName, value);
  };

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);

    if (onSubmit) return;

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  };

  return (
    <DestinationFormUI
      loading={loading}
      formik={formik}
      customHandleChange={customHandleChange}
      customHandleBlur={customHandleBlur}
    />
  );
});

export { DestinationForm };
export type { DestinationFormProps };
