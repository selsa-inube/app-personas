import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { useState } from "react";
import { ContactDataFormUI } from "./interface";
import { IContactDataEntry } from "./types";
import { requiredFields } from "./config/formConfig";

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

  const [requiredContactFields, setRequiredContactFields] =
    useState(requiredFields);

  const validationSchema = Yup.object().shape({
    country: requiredContactFields.country
      ? validationRules.country.required(validationMessages.required)
      : validationRules.country,
    stateOrDepartment: requiredContactFields.stateOrDepartment
      ? validationRules.stateOrDepartment.required(validationMessages.required)
      : validationRules.stateOrDepartment,
    city: requiredContactFields.city
      ? validationRules.city.required(validationMessages.required)
      : validationRules.city,
    address: requiredContactFields.address
      ? validationRules.address.required(validationMessages.required)
      : validationRules.address,
    postalCode: requiredContactFields.postalCode
      ? validationRules.postalCode.required(validationMessages.required)
      : validationRules.postalCode,
    landlinePhone: requiredContactFields.landlinePhone
      ? validationRules.landlinePhone.required(validationMessages.required)
      : validationRules.landlinePhone,
    cellPhone: requiredContactFields.cellPhone
      ? validationRules.phone.required(validationMessages.required)
      : validationRules.phone,
    email: requiredContactFields.email
      ? validationRules.email.required(validationMessages.required)
      : validationRules.email,
  });

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
      requiredContactFields={requiredContactFields}
    />
  );
});

export { ContactDataForm };
export type { ContactDataFormProps };
