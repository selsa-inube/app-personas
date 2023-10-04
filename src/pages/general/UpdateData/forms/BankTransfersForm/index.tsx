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
  handleSubmit?: (values: IBankTransfersEntry) => void;
  loading?: boolean;
}

const BankTransfersForm = forwardRef(function BankTransfersForm(
  props: BankTransfersFormProps,
  ref: React.Ref<FormikProps<IBankTransfersEntry>>
) {
  const { initialValues, handleSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  return <BankTransfersFormUI loading={loading} formik={formik} />;
});

export { BankTransfersForm };
export type { BankTransfersFormProps };
