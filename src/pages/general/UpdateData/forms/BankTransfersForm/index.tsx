import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { BankTransfersFormUI } from "./interface";
import { IBankTransfersEntry } from "./types";

const validationSchema = Yup.object({
  accountNumber: validationRules.accountNumber.required(
    validationMessages.required
  ),
});

interface BankTransfersFormProps {
  initialValues: IBankTransfersEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit?: (values: IBankTransfersEntry) => void;
  loading?: boolean;
}

const BankTransfersForm = forwardRef(function BankTransfersForm(
  props: BankTransfersFormProps,
  ref: React.Ref<FormikProps<IBankTransfersEntry>>
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
    <BankTransfersFormUI
      loading={loading}
      formik={formik}
      customHandleBlur={customHandleBlur}
    />
  );
});

export { BankTransfersForm };
export type { BankTransfersFormProps };
