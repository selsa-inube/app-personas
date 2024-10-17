import { FormikProps, useFormik } from "formik";
import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { BankTransfersFormUI } from "./interface";
import { IBankTransfersEntry } from "./types";
import { AppContext } from "src/context/app";
import { useAuth } from "@inube/auth";

const validationSchema = Yup.object({
  accountNumber: validationRules.accountNumber.required(
    validationMessages.required,
  ),
});

interface BankTransfersFormProps {
  initialValues: IBankTransfersEntry;
  loading?: boolean;
  withSubmit?: boolean;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IBankTransfersEntry) => void;
}

const BankTransfersForm = forwardRef(function BankTransfersForm(
  props: BankTransfersFormProps,
  ref: React.Ref<FormikProps<IBankTransfersEntry>>,
) {
  const { initialValues, loading, withSubmit, onFormValid, onSubmit } = props;
  const { serviceDomains, getServiceDomains } = useContext(AppContext);
  const { accessToken } = useAuth();

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

  const validateEnums = async () => {
    if (!accessToken) return;

    if (serviceDomains.integratedbanks.length > 0) return;

    getServiceDomains(["integratedbanks"], accessToken);
  };

  useEffect(() => {
    validateEnums();
  }, []);

  return (
    <BankTransfersFormUI
      loading={loading}
      formik={formik}
      withSubmit={withSubmit}
    />
  );
});

export { BankTransfersForm };
export type { BankTransfersFormProps };
