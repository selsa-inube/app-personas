import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { CommentsFormUI } from "./interface";
import { ICommentsEntry } from "./types";

interface CommentsFormProps {
  initialValues: ICommentsEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit?: (values: ICommentsEntry) => void;
  loading?: boolean;
}

const CommentsForm = forwardRef(function CommentsForm(
  props: CommentsFormProps,
  ref: React.Ref<FormikProps<ICommentsEntry>>
) {
  const { initialValues, onFormValid, handleSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);

    if (handleSubmit) return;

    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        onFormValid(true);
      }
    });
  };

  return (
    <CommentsFormUI
      loading={loading}
      formik={formik}
      customHandleBlur={customHandleBlur}
    />
  );
});

export { CommentsForm };
export type { CommentsFormProps };
