import { useAuth } from "@inube/auth";
import { FormikProps, useFormik } from "formik";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { SavingsContext } from "src/context/savings";
import { getSavingsForUser } from "src/services/iclient/savings/getSavings";
import { parseCurrencyString } from "src/utils/currency";
import * as Yup from "yup";
import { EPaymentMethodType } from "../../types";
import { PaymentMethodFormUI } from "./interface";
import { EMoneySourceType, IMoneySource, IPaymentMethodEntry } from "./types";
import { mapMoneySources } from "./utils";
import { AppContext } from "src/context/app";

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
  const { savings, setSavings } = useContext(SavingsContext);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicSchema,
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
    if (!user || !accessToken) return;
    if (savings.savingsAccounts.length === 0) {
      getSavingsForUser(user.identification, accessToken)
        .then((savings) => {
          setSavings(savings);
        })
        .catch((error) => {
          console.info(error.message);
        });
    }
  }, [user, accessToken]);

  const customHandleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    formik.handleChange(event);
    formik.setFieldValue("pendingValue", formik.values.valueToPay);

    const moneySources: IMoneySource = {};

    const paymentMethod = event.target.value;

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
          (source) => source.value > source.balance,
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
        label: "Pago PSE",
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
      (acc, source) => acc + source.value,
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
      updatedMoneySources[moneySourceKey].value > selectedMoneySource.balance
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
