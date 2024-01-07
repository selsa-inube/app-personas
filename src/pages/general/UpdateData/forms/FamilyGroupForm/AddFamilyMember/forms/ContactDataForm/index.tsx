import * as Yup from "yup";
import { FamilyGroupRequiredFields } from "../../../config/formConfig";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import { IContactDataEntry } from "./types";
import { forwardRef, useImperativeHandle, useState } from "react";
import { FormikProps, useFormik } from "formik";
import { ContactDataFormUI } from "./interface";

const validationSchema = Yup.object().shape({
  cellPhone: FamilyGroupRequiredFields.cellPhone
    ? validationRules.phone.required(validationMessages.required)
    : validationRules.phone,
  email: FamilyGroupRequiredFields.email
    ? validationRules.email.required(validationMessages.required)
    : validationRules.email,
});

interface ContactDataFormProps {
  initialValues: IContactDataEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IContactDataEntry) => void;
  loading?: boolean;
}

const ContactDataForm = forwardRef(function ContactDataForm(
  props: ContactDataFormProps,
  ref: React.Ref<FormikProps<IContactDataEntry>>
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const [dynamicSchema, setDynamicSchema] = useState(validationSchema);

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

  const isRequired = (fieldName: string): boolean => {
    const fieldDescription = dynamicSchema.describe().fields[fieldName] as any;
    return !fieldDescription.nullable && !fieldDescription.optional;
  };

  return (
    <ContactDataFormUI
      loading={loading}
      formik={formik}
      customHandleBlur={customHandleBlur}
      isRequired={isRequired}
    />
  );
});

export { ContactDataForm };
export type { ContactDataFormProps };
