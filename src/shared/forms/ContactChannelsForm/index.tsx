import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { ContactChannelsFormUI } from "./interface";
import { IContactChannelsEntry } from "./types";

const validationSchema = Yup.object({
  landlinePhone: validationRules.landlinePhone,
  cellPhone: validationRules.phone.required(validationMessages.required),
  email: validationRules.email.required(validationMessages.required),
  acceptDataPolicy: Yup.boolean().test((value) => value === true),
  acceptNotifications: Yup.boolean().test((value) => value === true),
});

interface ContactChannelsFormProps {
  initialValues: IContactChannelsEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IContactChannelsEntry) => void;
  loading?: boolean;
}

const ContactChannelsForm = forwardRef(function ContactChannelsForm(
  props: ContactChannelsFormProps,
  ref: React.Ref<FormikProps<IContactChannelsEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  }, [formik.values]);

  return <ContactChannelsFormUI loading={loading} formik={formik} />;
});

export { ContactChannelsForm };
export type { ContactChannelsFormProps };
