import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { regex } from "src/validations/regularExpressions";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { SocioeconomicInformationFormUI } from "./interface";
import { ISocioeconomicInformationEntry } from "./types";

const validationSchema = Yup.object({
  dependants: Yup.string()
    .matches(regex.onlyNumbers, validationMessages.onlyNumbers)
    .min(1, validationMessages.minNumbers(1))
    .max(2, validationMessages.maxNumbers(2)),
});

interface SocioeconomicInformationFormProps {
  initialValues: ISocioeconomicInformationEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: ISocioeconomicInformationEntry) => void;
  loading?: boolean;
}

const SocioeconomicInformationForm = forwardRef(
  function SocioeconomicInformationForm(
    props: SocioeconomicInformationFormProps,
    ref: React.Ref<FormikProps<ISocioeconomicInformationEntry>>
  ) {
    const { initialValues, onFormValid, onSubmit, loading } = props;

    const formik = useFormik({
      initialValues,
      validationSchema,
      validateOnChange: false,
      onSubmit: onSubmit || (() => {}),
    });

    useImperativeHandle(ref, () => formik);

    const customHandleBlur = (
      event: React.FocusEvent<HTMLElement, Element>
    ) => {
      formik.handleBlur(event);

      if (onSubmit) return;

      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    };

    return (
      <SocioeconomicInformationFormUI
        loading={loading}
        formik={formik}
        customHandleBlur={customHandleBlur}
      />
    );
  }
);

export { SocioeconomicInformationForm };
export type { SocioeconomicInformationFormProps };
