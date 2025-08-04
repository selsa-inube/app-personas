import { FormikProps, useFormik } from "formik";
import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { regex } from "src/validations/regularExpressions";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { SocioeconomicInformationFormUI } from "./interface";
import { ISocioeconomicInformationEntry } from "./types";
import { AppContext } from "src/context/app";

const validationSchema = Yup.object({
  numberPersonsInCharge: Yup.string()
    .matches(regex.onlyNumbers, validationMessages.onlyNumbers)
    .min(1, validationMessages.minNumbers(1))
    .max(2, validationMessages.maxNumbers(2)),
});

interface SocioeconomicInformationFormProps {
  loading?: boolean;
  initialValues: ISocioeconomicInformationEntry;
  withSubmit?: boolean;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: ISocioeconomicInformationEntry) => void;
}

const SocioeconomicInformationForm = forwardRef(
  function SocioeconomicInformationForm(
    props: SocioeconomicInformationFormProps,
    ref: React.Ref<FormikProps<ISocioeconomicInformationEntry>>,
  ) {
    const { loading, initialValues, withSubmit, onFormValid, onSubmit } = props;
    const { serviceDomains } = useContext(AppContext);

    const formik = useFormik({
      initialValues,
      validationSchema,
      validateOnBlur: false,
      onSubmit: onSubmit || (() => true),
    });

    useImperativeHandle(ref, () => formik);

    useEffect(() => {
      if (onFormValid) {
        formik.validateForm().then((errors) => {
          onFormValid(Object.keys(errors).length === 0);
        });
      }
    }, [formik.values]);

    return (
      <SocioeconomicInformationFormUI
        loading={loading}
        formik={formik}
        serviceDomains={serviceDomains}
        withSubmit={withSubmit}
      />
    );
  },
);

export { SocioeconomicInformationForm };
export type { SocioeconomicInformationFormProps };
