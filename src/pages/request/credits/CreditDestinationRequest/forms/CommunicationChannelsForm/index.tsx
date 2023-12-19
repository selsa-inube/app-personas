import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { CommunicationChannelsFormUI } from "./interface";
import { ICommunicationChannelsEntry } from "./types";

const validationSchema = Yup.object({
  landlinePhone: validationRules.landlinePhone.required(
    validationMessages.required
  ),
  cellPhone: validationRules.phone.required(validationMessages.required),
  email: validationRules.email.required(validationMessages.required),
  acceptDataPolicy: Yup.bool().oneOf([true]),
  acceptNotifications: Yup.bool().oneOf([true]),
});

interface CommunicationChannelsFormProps {
  initialValues: ICommunicationChannelsEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: ICommunicationChannelsEntry) => void;
  loading?: boolean;
}

const CommunicationChannelsForm = forwardRef(function CommunicationChannelsForm(
  props: CommunicationChannelsFormProps,
  ref: React.Ref<FormikProps<ICommunicationChannelsEntry>>
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  }, []);

  const customHandleChange = async (
    event: React.ChangeEvent<HTMLInputElement>
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
    <CommunicationChannelsFormUI
      loading={loading}
      formik={formik}
      customHandleChange={customHandleChange}
      customHandleBlur={customHandleBlur}
    />
  );
});

export { CommunicationChannelsForm };
export type { CommunicationChannelsFormProps };
