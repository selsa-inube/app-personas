import { FormikProps, useFormik } from "formik";
import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { PersonalInformationFormUI } from "./interface";
import { IPersonalInformationEntry } from "./types";
import { AppContext } from "src/context/app";

const validationSchema = Yup.object({
  expeditionDate: Yup.string().required(validationMessages.required),
  birthDate: Yup.string().required(validationMessages.required),
});

interface PersonalInformationFormProps {
  initialValues: IPersonalInformationEntry;
  loading?: boolean;
  withSubmit?: boolean;
  onSubmit?: (values: IPersonalInformationEntry) => void;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PersonalInformationForm = forwardRef(function PersonalInformationForm(
  props: PersonalInformationFormProps,
  ref: React.Ref<FormikProps<IPersonalInformationEntry>>,
) {
  const { initialValues, loading, withSubmit, onFormValid, onSubmit } = props;
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
    <PersonalInformationFormUI
      loading={loading}
      formik={formik}
      withSubmit={withSubmit}
      serviceDomains={serviceDomains}
    />
  );
});

export { PersonalInformationForm };
export type { PersonalInformationFormProps };
