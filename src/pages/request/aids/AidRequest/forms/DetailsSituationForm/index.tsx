import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { DetailsSituationFormUI } from "./interface";
import { IDetailsSituationEntry } from "./types";

interface DetailsSituationFormProps {
  initialValues: IDetailsSituationEntry;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetailsSituationForm = forwardRef(function DetailsSituationForm(
  props: DetailsSituationFormProps,
  ref: React.Ref<FormikProps<IDetailsSituationEntry>>,
) {
  const { initialValues, onFormValid } = props;

  const validationSchema = Yup.object().shape({
    applicationValue: Yup.number()
      .min(1, "El valor de la solicitud debe ser mayor a 0")
      .max(initialValues.quotaAvailable, "Has superado el cupo máximo")
      .required(validationMessages.required),
    message: Yup.string(),
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

  return <DetailsSituationFormUI formik={formik} />;
});

export { DetailsSituationForm };
export type { DetailsSituationFormProps };
