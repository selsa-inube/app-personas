import { useAuth } from "@inube/auth";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { AppContext } from "src/context/app";
import { SavingsContext } from "src/context/savings";
import { EPaymentMethodType } from "src/model/entity/payment";
import { getSavingsForUser } from "src/services/iclient/savings/getSavings";
import { parseCurrencyString } from "src/utils/currency";
import { PaymentMethodFormUI } from "./interface";
import { EMoneySourceType, IMoneySource, IPaymentMethodEntry } from "./types";
import { mapMoneySources } from "./utils";

interface PaymentMethodFormProps {
  initialValues: IPaymentMethodEntry;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentMethodForm = forwardRef(function PaymentMethodForm(
  props: PaymentMethodFormProps,
  ref: React.Ref<FormikProps<IPaymentMethodEntry>>,
) {
  const { initialValues, onFormValid } = props;

  const { savings, setSavings } = useContext(SavingsContext);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    onSubmit: async () => true,
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (onFormValid) {
      onFormValid(formik.values.pendingValue === 0);
    }
  }, [formik.values.pendingValue]);

  useEffect(() => {
    if (!accessToken || !user.identification) return;
    if (savings.savingsAccounts.length === 0) {
      getSavingsForUser(user.identification, accessToken).then((savings) => {
        setSavings(savings);
      });
    }
  }, [user, accessToken]);

  const customHandleChange = (name: string, value: string) => {
    formik.setFieldValue(name, value);
    formik.setFieldValue("pendingValue", formik.values.valueToPay);

    const moneySources: IMoneySource = {};

    const paymentMethod = value;

    if (
      paymentMethod === EPaymentMethodType.DEBIT ||
      paymentMethod === EPaymentMethodType.MULTIPLE
    ) {
      Object.values(mapMoneySources(savings.savingsAccounts)).forEach(
        (source) => {
          moneySources[source.id] = { ...source };
        },
      );

      const moneySourcesList = Object.keys(moneySources);

      if (
        paymentMethod === EPaymentMethodType.DEBIT &&
        moneySourcesList.length === 1
      ) {
        moneySources[moneySourcesList[0]].value = formik.values.valueToPay;

        const notFunds = Object.values(moneySources).some(
          (source) => source.value && source.value > source.balance,
        );

        if (!notFunds) {
          formik.setFieldValue("pendingValue", 0);
        }
      }
    }

    if (
      paymentMethod === EPaymentMethodType.PSE ||
      paymentMethod === EPaymentMethodType.MULTIPLE
    ) {
      moneySources[EMoneySourceType.PSE] = {
        id: EPaymentMethodType.PSE,
        label: "Pago por PSE",
        value:
          paymentMethod === EPaymentMethodType.PSE
            ? formik.values.valueToPay
            : 0,
        balance: Infinity,
        type: EMoneySourceType.PSE,
      };

      if (paymentMethod === EPaymentMethodType.PSE) {
        formik.setFieldValue("pendingValue", 0);
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
  };

  const handleSaveMoneySource = () => {
    const paidValue = Object.values(formik.values.moneySources || {}).reduce(
      (acc, source) => acc + (source.value || 0),
      0,
    );

    formik.setFieldValue("pendingValue", formik.values.valueToPay - paidValue);
  };

  const handleRemoveValueMoneySource = (id: string) => {
    const moneySources = { ...formik.values.moneySources };

    moneySources[id].value = 0;

    formik.setFieldValue("moneySources", moneySources);

    handleSaveMoneySource();
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

    formik.setFieldValue("moneySources", updatedMoneySources);
    const selectedMoneySource = updatedMoneySources[moneySourceKey];

    if (
      selectedMoneySource.balance &&
      (updatedMoneySources[moneySourceKey]?.value ?? 0) >
        selectedMoneySource.balance
    ) {
      return;
    }

    formik.setFieldValue("pendingValue", 0);
  };

  return (
    <PaymentMethodFormUI
      formik={formik}
      customHandleChange={customHandleChange}
      onChangeMoneySource={handleChangeMoneySource}
      onSelectMoneySource={handleSelectMoneySource}
      onSaveMoneySource={handleSaveMoneySource}
      onRemoveValueMoneySource={handleRemoveValueMoneySource}
    />
  );
});

export { PaymentMethodForm };
export type { PaymentMethodFormProps };
