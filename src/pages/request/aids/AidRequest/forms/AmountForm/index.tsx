import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { AmountFormUI } from "./interface";
import { IAmountEntry } from "./types";

interface AmountFormProps {
  initialValues: IAmountEntry;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AmountForm = forwardRef(function AmountForm(
  props: AmountFormProps,
  ref: React.Ref<FormikProps<IAmountEntry>>,
) {
  const { initialValues, onFormValid } = props;

  const validationSchema = Yup.object().shape({
    applicationValue: Yup.number()
      .min(1, "El valor de la solicitud debe ser mayor a 0")
      .max(initialValues.quotaAvailable, "Has superado el cupo máximo")
      .required(validationMessages.required),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
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

  return <AmountFormUI formik={formik} />;
});

export { AmountForm };
export type { AmountFormProps };
