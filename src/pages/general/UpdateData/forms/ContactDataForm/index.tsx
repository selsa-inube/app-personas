import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { ContactDataFormUI } from "./interface";
import { IContactDataEntry } from "./types";

const validationSchema = Yup.object({
  country: validationRules.country.required(validationMessages.required),
  stateOrDepartment: validationRules.stateOrDepartment.required(
    validationMessages.required
  ),
  city: validationRules.city.required(validationMessages.required),
  address: validationRules.address.required(validationMessages.required),
  postalCode: validationRules.postalCode,
  landlinePhone: validationRules.landlinePhone,
  cellPhone: validationRules.phone.required(validationMessages.required),
  email: validationRules.email.required(validationMessages.required),
});

interface ContactDataFormProps {
  initialValues: IContactDataEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit?: (values: IContactDataEntry) => void;
  loading?: boolean;
}

const ContactDataForm = forwardRef(function ContactDataForm(
  props: ContactDataFormProps,
  ref: React.Ref<FormikProps<IContactDataEntry>>
) {
  const { initialValues, onFormValid, handleSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);

    if (handleSubmit) return;

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  };

  return (
    <ContactDataFormUI
      loading={loading}
      formik={formik}
      customHandleBlur={customHandleBlur}
    />
  );
});

export { ContactDataForm };
export type { ContactDataFormProps };
