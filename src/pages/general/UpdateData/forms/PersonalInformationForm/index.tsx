import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { PersonalInformationFormUI } from "./interface";
import { IPersonalInformationEntry } from "./types";

const validationSchema = Yup.object({
  expeditionDate: validationRules.date.required(validationMessages.required),
  birthDate: validationRules.date.required(validationMessages.required),
});

interface PersonalInformationFormProps {
  initialValues: IPersonalInformationEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IPersonalInformationEntry) => void;
  loading?: boolean;
}

const PersonalInformationForm = forwardRef(function PersonalInformationForm(
  props: PersonalInformationFormProps,
  ref: React.Ref<FormikProps<IPersonalInformationEntry>>
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: onSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);

    if (onSubmit) return;

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  };

  return (
    <PersonalInformationFormUI
      loading={loading}
      formik={formik}
      customHandleBlur={customHandleBlur}
    />
  );
});

export { PersonalInformationForm };
export type { PersonalInformationFormProps };
