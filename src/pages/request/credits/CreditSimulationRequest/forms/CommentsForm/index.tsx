import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { CommentsFormUI } from "./interface";
import { ICommentsEntry } from "./types";

interface CommentsFormProps {
  initialValues: ICommentsEntry;
  handleSubmit?: (values: ICommentsEntry) => void;
  loading?: boolean;
}

const CommentsForm = forwardRef(function CommentsForm(
  props: CommentsFormProps,
  ref: React.Ref<FormikProps<ICommentsEntry>>
) {
  const { initialValues, handleSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  return <CommentsFormUI loading={loading} formik={formik} />;
});

export { CommentsForm };
export type { CommentsFormProps };
