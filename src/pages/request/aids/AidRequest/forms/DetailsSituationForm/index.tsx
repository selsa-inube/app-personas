import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { IDetailsSituationEntry } from "./types";
import { DetailsSituationFormUI } from "./interface";

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
    detailsSituation: Yup.string().required(validationMessages.required),
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
