import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import * as Yup from "yup";
import { IDocumentaryRequirementsEntry } from "./types";

const validationSchema = Yup.object().shape({});

interface DocumentaryRequirementsFormProps {
  initialValues: IDocumentaryRequirementsEntry;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocumentaryRequirementsForm = forwardRef(function DocumentaryRequirementsForm(
  props: DocumentaryRequirementsFormProps,
  ref: React.Ref<FormikProps<IDocumentaryRequirementsEntry>>,
) {
  const { initialValues, onFormValid } = props;

  const [dynamicSchema] = useState(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicSchema,
    validateOnBlur: false,
    onSubmit: async () => true,
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (onFormValid) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  return <></>;
});

export { DocumentaryRequirementsForm };
export type { DocumentaryRequirementsFormProps };
