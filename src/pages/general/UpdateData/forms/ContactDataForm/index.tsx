import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { contactDataRequiredFields } from "./config/formConfig";
import { ContactDataFormUI } from "./interface";
import { IContactDataEntry } from "./types";

const validationSchema = Yup.object().shape({
  country: contactDataRequiredFields.country
    ? validationRules.country.required(validationMessages.required)
    : validationRules.country,
  stateOrDepartment: contactDataRequiredFields.stateOrDepartment
    ? validationRules.stateOrDepartment.required(validationMessages.required)
    : validationRules.stateOrDepartment,
  city: contactDataRequiredFields.city
    ? validationRules.city.required(validationMessages.required)
    : validationRules.city,
  address: contactDataRequiredFields.address
    ? validationRules.address.required(validationMessages.required)
    : validationRules.address,
  zipCode: contactDataRequiredFields.zipCode
    ? validationRules.zipCode.required(validationMessages.required)
    : validationRules.zipCode,
  landlinePhone: contactDataRequiredFields.landlinePhone
    ? validationRules.landlinePhone.required(validationMessages.required)
    : validationRules.landlinePhone,
  cellPhone: contactDataRequiredFields.cellPhone
    ? validationRules.phone.required(validationMessages.required)
    : validationRules.phone,
  email: contactDataRequiredFields.email
    ? validationRules.email.required(validationMessages.required)
    : validationRules.email,
});

interface ContactDataFormProps {
  initialValues: IContactDataEntry;
  loading?: boolean;
  withSubmit?: boolean;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IContactDataEntry) => void;
}

const ContactDataForm = forwardRef(function ContactDataForm(
  props: ContactDataFormProps,
  ref: React.Ref<FormikProps<IContactDataEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading, withSubmit } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (formik.dirty && onFormValid) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  return (
    <ContactDataFormUI
      loading={loading}
      formik={formik}
      withSubmit={withSubmit}
      validationSchema={validationSchema}
    />
  );
});

export { ContactDataForm };
export type { ContactDataFormProps };
