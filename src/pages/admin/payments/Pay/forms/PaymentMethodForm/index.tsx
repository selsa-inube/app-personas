import { moneySourcesMock } from "@mocks/payments/moneySources.mocks";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { parseCurrencyString } from "src/utils/currency";
import * as Yup from "yup";
import { PaymentMethodFormUI } from "./interface";
import { IMoneySource, IPaymentMethodEntry } from "./types";

const validationSchema = Yup.object().shape({});

interface PaymentMethodFormProps {
  initialValues: IPaymentMethodEntry;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentMethodForm = forwardRef(function PaymentMethodForm(
  props: PaymentMethodFormProps,
  ref: React.Ref<FormikProps<IPaymentMethodEntry>>,
) {
  const { initialValues, onFormValid } = props;

  const [dynamicSchema] = useState(validationSchema);
  const [showFundsAlert, setShowFundsAlert] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicSchema,
    validateOnBlur: false,
    onSubmit: async () => true,
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (onFormValid) {
      onFormValid(
        formik.values.pendingValue === 0 &&
          formik.values.paidValue > 0 &&
          !showFundsAlert,
      );
    }
  }, [
    formik.values.valueToPay,
    formik.values.pendingValue,
    formik.values.paidValue,
    showFundsAlert,
  ]);

  useEffect(() => {
    setShowFundsAlert(
      Object.values(formik.values.moneySources || {}).some(
        (source) => source.value > source.balance,
      ),
    );
  }, [formik.values.moneySources]);

  const customHandleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    formik.handleChange(event);
    formik.setFieldValue("paidValue", 0);
    formik.setFieldValue("pendingValue", formik.values.valueToPay);

    const moneySources: IMoneySource = {};

    const paymentMethod = event.target.value;

    if (paymentMethod === "pse" || paymentMethod === "multiple") {
      moneySources.pse = {
        id: "pse",
        label: "Pago PSE",
        value: paymentMethod === "pse" ? formik.values.valueToPay : 0,
        balance: Infinity,
        type: "pse",
      };

      if (paymentMethod === "pse") {
        formik.setFieldValue("paidValue", formik.values.valueToPay);
        formik.setFieldValue("pendingValue", 0);
      }
    }

    if (paymentMethod === "debit" || paymentMethod === "multiple") {
      Object.values(moneySourcesMock).forEach((source) => {
        moneySources[source.id] = { ...source };
      });

      const moneySourcesList = Object.keys(moneySources);

      if (paymentMethod === "debit" && moneySourcesList.length === 1) {
        moneySources[moneySourcesList[0]].value = formik.values.valueToPay;

        const notFunds = Object.values(moneySources).some(
          (source) => source.value > source.balance,
        );

        if (!notFunds) {
          formik.setFieldValue("paidValue", formik.values.valueToPay);

          formik.setFieldValue("pendingValue", 0);
        }
      }
    }

    formik.setFieldValue("moneySources", moneySources);
  };

  const handleChangeMoneySource = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const moneySourceKey = event.target.name;
    const parsedValue = parseCurrencyString(event.target.value);

    const updatedMoneySources = {
      ...formik.values.moneySources,
      [moneySourceKey]: {
        ...formik.values.moneySources?.[moneySourceKey],
        value: !isNaN(parsedValue) ? parsedValue : 0,
      },
    };

    formik.setFieldValue("moneySources", updatedMoneySources);

    const paidValue = Object.values(updatedMoneySources).reduce(
      (acc, source) => acc + source.value,
      0,
    );

    formik.setFieldValue("paidValue", paidValue);

    formik.setFieldValue("pendingValue", formik.values.valueToPay - paidValue);
  };

  const handleSelectMoneySource = (id: string) => {
    const moneySourceKey = id;

    const updatedMoneySources = {
      ...formik.values.moneySources,
      [moneySourceKey]: {
        ...formik.values.moneySources?.[moneySourceKey],
        value: formik.values.valueToPay,
      },
    };

    Object.keys(updatedMoneySources).forEach((key) => {
      if (key !== moneySourceKey) {
        updatedMoneySources[key].value = 0;
      }
    });

    const notFunds = Object.values(updatedMoneySources).some(
      (source) => source.balance && source.value > source.balance,
    );

    formik.setFieldValue("moneySources", updatedMoneySources);

    if (notFunds) {
      formik.setFieldValue("paidValue", formik.values.valueToPay);

      formik.setFieldValue("pendingValue", 0);
    }
  };

  return (
    <PaymentMethodFormUI
      formik={formik}
      showFundsAlert={showFundsAlert}
      customHandleChange={customHandleChange}
      onChangeMoneySource={handleChangeMoneySource}
      onSelectMoneySource={handleSelectMoneySource}
    />
  );
});

export { PaymentMethodForm };
export type { PaymentMethodFormProps };
