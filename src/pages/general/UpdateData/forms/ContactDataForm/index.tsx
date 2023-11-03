import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { useState } from "react";
import { ContactDataFormUI } from "./interface";
import { IContactDataEntry } from "./types";
import { contactDataRequiredFields } from "./config/formConfig";

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
  postalCode: contactDataRequiredFields.postalCode
    ? validationRules.postalCode.required(validationMessages.required)
    : validationRules.postalCode,
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
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit?: (values: IContactDataEntry) => void;
  loading?: boolean;
}

const ContactDataForm = forwardRef(function ContactDataForm(
  props: ContactDataFormProps,
  ref: React.Ref<FormikProps<IContactDataEntry>>
) {
  const { initialValues, onFormValid, handleSubmit, loading } = props;

  const [dynamicSchema, setDynamicSchema] = useState(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicSchema,
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
      validationSchema={dynamicSchema}
    />
  );
});

export { ContactDataForm };
export type { ContactDataFormProps };
