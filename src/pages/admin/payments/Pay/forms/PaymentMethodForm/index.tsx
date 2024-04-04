import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import * as Yup from "yup";
import { PaymentMethodFormUI } from "./interface";
import { IPaymentMethodEntry } from "./types";

const validationSchema = Yup.object().shape({});

interface PaymentMethodFormProps {
  initialValues: IPaymentMethodEntry;
  loading?: boolean;
  withSubmit?: boolean;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IPaymentMethodEntry) => void;
}

const PaymentMethodForm = forwardRef(function PaymentMethodForm(
  props: PaymentMethodFormProps,
  ref: React.Ref<FormikProps<IPaymentMethodEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading, withSubmit } = props;

  const [dynamicSchema] = useState(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicSchema,
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

  const isRequired = (fieldName: string): boolean => {
    const fieldDescription = dynamicSchema.describe().fields[fieldName];
    if (!("nullable" in fieldDescription)) return false;
    return !fieldDescription.nullable && !fieldDescription.optional;
  };

  return (
    <PaymentMethodFormUI
      loading={loading}
      formik={formik}
      isRequired={isRequired}
      withSubmit={withSubmit}
    />
  );
});

export { PaymentMethodForm };
export type { PaymentMethodFormProps };
