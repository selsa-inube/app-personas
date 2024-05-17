import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import * as Yup from "yup";
import { IAmountEntry } from "./types";

const validationSchema = Yup.object().shape({});

interface AmountFormProps {
  initialValues: IAmountEntry;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AmountForm = forwardRef(function AmountForm(
  props: AmountFormProps,
  ref: React.Ref<FormikProps<IAmountEntry>>,
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

export { AmountForm };
export type { AmountFormProps };
