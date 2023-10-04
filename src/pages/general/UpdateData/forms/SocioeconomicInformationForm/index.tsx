import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { ISocioeconomicInformationEntry } from "./types";
import { SocioeconomicInformationFormUI } from "./interface";
import * as Yup from "yup";
import { validationRules } from "src/validations/validationRules";
import { validationMessages } from "src/validations/validationMessages";

const validationSchema = Yup.object({
  dependants: validationRules.dependants.required(validationMessages.required),
});

interface SocioeconomicInformationFormProps {
  initialValues: ISocioeconomicInformationEntry;
  handleSubmit?: (values: ISocioeconomicInformationEntry) => void;
  loading?: boolean;
}

const SocioeconomicInformationForm = forwardRef(
  function SocioeconomicInformationForm(
    props: SocioeconomicInformationFormProps,
    ref: React.Ref<FormikProps<ISocioeconomicInformationEntry>>
  ) {
    const { initialValues, handleSubmit, loading } = props;

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: false,
        onSubmit: handleSubmit || (() => {}),
      });

      useImperativeHandle(ref, () => formik);

      return <SocioeconomicInformationFormUI loading={loading} formik={formik} />;
  }
);

export { SocioeconomicInformationForm };
export type { SocioeconomicInformationFormProps };
