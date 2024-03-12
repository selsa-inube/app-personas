import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { CommentsFormUI } from "./interface";
import { ICommentsEntry } from "./types";

interface CommentsFormProps {
  initialValues: ICommentsEntry;
  loading?: boolean;
  withSubmit?: boolean;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: ICommentsEntry) => void;
}

const CommentsForm = forwardRef(function CommentsForm(
  props: CommentsFormProps,
  ref: React.Ref<FormikProps<ICommentsEntry>>,
) {
  const { initialValues, loading, withSubmit, onFormValid, onSubmit } = props;

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (onFormValid) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  return (
    <CommentsFormUI loading={loading} formik={formik} withSubmit={withSubmit} />
  );
});

export { CommentsForm };
export type { CommentsFormProps };
