import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { ResidenceTypeFormUI } from "./interface";
import { IResidenceTypeEntry } from "./types";

const validationSchema = Yup.object({
  type: Yup.string().required(validationMessages.required),
});

interface ResidenceTypeFormProps {
  initialValues: IResidenceTypeEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  loading?: boolean;
  onSubmit?: (values: IResidenceTypeEntry) => void;
}

const ResidenceTypeForm = forwardRef(function ResidenceTypeForm(
  props: ResidenceTypeFormProps,
  ref: React.Ref<FormikProps<IResidenceTypeEntry>>,
) {
  const { initialValues, loading, onFormValid, onSubmit } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (formik.dirty) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  return <ResidenceTypeFormUI loading={loading} validationSchema={validationSchema} formik={formik} />;
});

export { ResidenceTypeForm };
export type { ResidenceTypeFormProps };
