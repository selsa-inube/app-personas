import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import * as Yup from "yup";
import { IDetailsSituationEntry } from "./types";

const validationSchema = Yup.object().shape({});

interface DetailsSituationFormProps {
  initialValues: IDetailsSituationEntry;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetailsSituationForm = forwardRef(function DetailsSituationForm(
  props: DetailsSituationFormProps,
  ref: React.Ref<FormikProps<IDetailsSituationEntry>>,
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

export { DetailsSituationForm };
export type { DetailsSituationFormProps };
