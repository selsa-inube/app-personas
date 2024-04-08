import { IApplyPayOption } from "@components/modals/payments/CustomValueModal";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import * as Yup from "yup";
import { ObligationsFormUI } from "./interface";
import { IObligationsEntry } from "./types";

const validationSchema = Yup.object().shape({});

interface ObligationsFormProps {
  initialValues: IObligationsEntry;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ObligationsForm = forwardRef(function ObligationsForm(
  props: ObligationsFormProps,
  ref: React.Ref<FormikProps<IObligationsEntry>>,
) {
  const { initialValues, onFormValid } = props;

  const [dynamicSchema] = useState(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicSchema,
    validateOnBlur: false,
    onSubmit: async () => true,
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (onFormValid) {
      formik.values.totalPayment > 0 ? onFormValid(true) : onFormValid(false);
    }
  }, [formik.values.totalPayment]);

  const handleApplyPayOption = (payId: string, option: IApplyPayOption) => {
    formik.setFieldValue(
      "payments",
      formik.values.payments.map((payment) => {
        if (payment.id === payId) {
          return {
            ...payment,
            applyPayOption: option,
          };
        }
        return payment;
      }),
    );
  };

  const handleChangePaymentValue = (payId: string, valueToPay: number) => {
    const updatedPayments = formik.values.payments.map((payment) => {
      if (payment.id === payId) {
        return {
          ...payment,
          valueToPay,
        };
      }
      return payment;
    });

    formik.setFieldValue("payments", updatedPayments);

    formik.setFieldValue(
      "totalPayment",
      updatedPayments.reduce(
        (acc, payment) => acc + (payment.valueToPay || 0),
        0,
      ),
    );
  };

  return (
    <ObligationsFormUI
      formik={formik}
      onApplyPayOption={handleApplyPayOption}
      onChangePaymentValue={handleChangePaymentValue}
    />
  );
});

export { ObligationsForm };
export type { ObligationsFormProps };
