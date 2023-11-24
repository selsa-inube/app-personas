import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { CommentsFormUI } from "./interface";
import { ICommentsEntry } from "./types";

interface CommentsFormProps {
  initialValues: ICommentsEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: ICommentsEntry) => void;
  loading?: boolean;
}

const CommentsForm = forwardRef(function CommentsForm(
  props: CommentsFormProps,
  ref: React.Ref<FormikProps<ICommentsEntry>>
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    onSubmit: onSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);

    if (onSubmit) return;

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
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
