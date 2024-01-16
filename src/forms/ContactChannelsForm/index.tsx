import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { ContactChannelsFormUI } from "./interface";
import { IContactChannelsEntry } from "./types";

const validationSchema = Yup.object({
  landlinePhone: validationRules.landlinePhone.required(
    validationMessages.required,
  ),
  cellPhone: validationRules.phone.required(validationMessages.required),
  email: validationRules.email.required(validationMessages.required),
  acceptDataPolicy: Yup.bool().oneOf([true]),
  acceptNotifications: Yup.bool().oneOf([true]),
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
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  }, [formik, onFormValid]);

  const customHandleChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    await formik.setFieldValue(event.target.name, event.target.checked);

    const errors = await formik.validateForm();
    onFormValid(Object.keys(errors).length === 0);
  };

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);

    if (onSubmit) return;

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  };

  return (
    <ContactChannelsFormUI
      loading={loading}
      formik={formik}
      customHandleChange={customHandleChange}
      customHandleBlur={customHandleBlur}
    />
  );
});

export { ContactChannelsForm };
export type { ContactChannelsFormProps };
