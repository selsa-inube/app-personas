import { FormikProps, useFormik } from "formik";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { shareMaturityDM } from "src/model/domains/savings/shareMaturityDM";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { ShareMaturityFormUI } from "./interface";
import { IShareMaturityEntry } from "./types";

const validationSchema = Yup.object({
  action: Yup.string().required(validationMessages.required),
  actionName: Yup.string().required(validationMessages.required),
});

interface ShareMaturityFormProps {
  initialValues: IShareMaturityEntry;
  loading?: boolean;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IShareMaturityEntry) => void;
}

const ShareMaturityForm = forwardRef(function ShareMaturityForm(
  props: ShareMaturityFormProps,
  ref: React.Ref<FormikProps<IShareMaturityEntry>>,
) {
  const { initialValues, loading, onFormValid, onSubmit } = props;

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

  const customHandleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { value } = event.target;
    formik.setFieldValue("action", value);

    formik.setFieldValue("actionName", shareMaturityDM.valueOf(value)?.value);
  };

  return (
    <ShareMaturityFormUI
      loading={loading}
      formik={formik}
      customHandleChange={customHandleChange}
    />
  );
});

export { ShareMaturityForm };
export type { ShareMaturityFormProps };
