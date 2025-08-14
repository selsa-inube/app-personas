import { useAuth } from "@inube/auth";
import { IFormField } from "@ptypes/forms.types";
import { currencyFormat } from "@utils/currency";
import { FormikProps, useFormik } from "formik";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { AppContext } from "src/context/app";
import { SavingsContext } from "src/context/savings";
import { accountDebitTypeDM } from "src/model/domains/requests/pqrsTypeDM";
import { getCdatPaymentMethods } from "src/services/iclient/savings/getCdatPaymentMethods";
import { getSavingsForUser } from "src/services/iclient/savings/getSavings";
import { generateDynamicForm } from "src/utils/forms/forms";
import { extractAttribute } from "src/utils/products";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { structureDisbursementForm } from "./config/form";
import { PaymentMethodFormUI } from "./interface";
import { IPaymentMethodEntry } from "./types";

interface PaymentMethodFormProps {
  initialValues: IPaymentMethodEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const initValidationSchema = Yup.object({
  paymentMethod: Yup.string().required(validationMessages.required),
});

const PaymentMethodForm = forwardRef(function PaymentMethodForm(
  props: PaymentMethodFormProps,
  ref: React.Ref<FormikProps<IPaymentMethodEntry>>,
) {
  const { initialValues, onFormValid } = props;

  const { savings, setSavings } = useContext(SavingsContext);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);

  const [dynamicForm, setDynamicForm] = useState<{
    renderFields: IFormField[];
    validationSchema: Yup.ObjectSchema<object, Yup.AnyObject, object, "">;
  }>({
    renderFields: [],
    validationSchema: initValidationSchema,
  });

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicForm.validationSchema,
    validateOnBlur: false,
    onSubmit: async () => true,
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (formik.errors) {
      formik.setTouched(
        Object.keys(formik.errors).reduce(
          (acc: { [key: string]: boolean }, key) => {
            acc[key] = true;
            return acc;
          },
          {},
        ),
      );
    }
    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  }, [formik.values, formik.errors]);

  const getPaymentMethods = async () => {
    if (!accessToken) return;

    const paymentMethods = await getCdatPaymentMethods(accessToken);

    formik.setFieldValue("paymentMethods", paymentMethods);

    if (paymentMethods.length === 1) {
      const paymentMethod = paymentMethods[0];
      formik.setFieldValue("paymentMethod", paymentMethod.id);
      formik.setFieldValue("paymentMethodName", paymentMethod.label);

      const updatedValues = {
        ...formik.values,
        paymentMethod: paymentMethod.id,
        paymentMethodName: paymentMethod.label,
        paymentMethods: paymentMethods,
      };

      if (
        paymentMethod.id === "DEBAHORINT" &&
        savings.savingsAccounts.length > 0
      ) {
        updatedValues.accountToDebit =
          accountDebitTypeDM.INTERNAL_OWN_ACCOUNT_DEBIT.id;
        updatedValues.accountNumber = savings.savingsAccounts[0].id;

        const accountBalance = Number(
          extractAttribute(savings.savingsAccounts[0].attributes, "net_value")
            ?.value || 0,
        );

        updatedValues.availableBalance = currencyFormat(accountBalance, false);

        updatedValues.availableBalanceValue = accountBalance;

        if (accountBalance < formik.values.investmentValue) {
          await formik.setFieldTouched("accountNumber", true);

          formik.setFieldError(
            "accountNumber",
            "La cuenta no posee saldo suficiente",
          );
          onFormValid(false);
        }
      }

      const updatedFormik = { ...formik, values: updatedValues };

      const { renderFields, validationSchema } = generateDynamicForm(
        updatedFormik,
        structureDisbursementForm(updatedFormik, savings.savingsAccounts),
      );
      setDynamicForm({
        renderFields,
        validationSchema: initValidationSchema.concat(validationSchema),
      });

      formik.setValues(updatedValues);
    }
  };

  useEffect(() => {
    getPaymentMethods();

    if (formik.values.paymentMethod) {
      const { renderFields, validationSchema } = generateDynamicForm(
        formik,
        structureDisbursementForm(formik, savings.savingsAccounts),
      );

      setDynamicForm({
        renderFields,
        validationSchema: initValidationSchema.concat(validationSchema),
      });
    }
  }, []);

  useEffect(() => {
    if (!accessToken || !user.identification) return;
    if (savings.savingsAccounts.length === 0) {
      getSavingsForUser(user.identification, accessToken).then((savings) => {
        setSavings(savings);
      });
    }
  }, [user, accessToken]);

  const customHandleChange = async (name: string, value: string) => {
    if (name === "paymentMethod") {
      const paymentMethod = formik.values.paymentMethods.find(
        (method) => method.id === value,
      );

      if (paymentMethod) {
        const updatedValues = {
          ...formik.values,
          paymentMethod: paymentMethod.id,
          paymentMethodName: paymentMethod.label,
        };

        await formik.setValues(updatedValues);

        if (paymentMethod.id !== "DEBAHORINT") {
          formik.setFieldError("accountNumber", undefined);
        }

        if (
          paymentMethod.id === "DEBAHORINT" &&
          savings.savingsAccounts.length > 0
        ) {
          updatedValues.accountToDebit =
            accountDebitTypeDM.INTERNAL_OWN_ACCOUNT_DEBIT.id;
          updatedValues.accountNumber = savings.savingsAccounts[0].id;

          const accountBalance = Number(
            extractAttribute(savings.savingsAccounts[0].attributes, "net_value")
              ?.value || 0,
          );

          updatedValues.availableBalance = currencyFormat(
            accountBalance,
            false,
          );

          updatedValues.availableBalanceValue = accountBalance;

          if (accountBalance < formik.values.investmentValue) {
            await formik.setFieldTouched("accountNumber", true);

            formik.setFieldError(
              "accountNumber",
              "La cuenta no posee saldo suficiente",
            );
            onFormValid(false);
          }
        }

        const updatedFormik = { ...formik, values: updatedValues };

        const { renderFields, validationSchema } = generateDynamicForm(
          updatedFormik,
          structureDisbursementForm(updatedFormik, savings.savingsAccounts),
        );

        setDynamicForm({
          renderFields,
          validationSchema: initValidationSchema.concat(validationSchema),
        });
      }
    } else if (name === "accountNumber") {
      await formik.setFieldValue(name, value);
      const selectedAccount = savings.savingsAccounts.find(
        (account) => account.id === value,
      );

      if (selectedAccount) {
        const accountBalance = Number(
          extractAttribute(selectedAccount.attributes, "net_value")?.value || 0,
        );

        await formik.setFieldValue(
          "availableBalance",
          currencyFormat(accountBalance, false),
        );

        await formik.setFieldValue("availableBalanceValue", accountBalance);
      }
    } else {
      formik.setFieldValue(name, value);
    }
  };

  return (
    <PaymentMethodFormUI
      formik={formik}
      renderFields={dynamicForm.renderFields}
      customHandleChange={customHandleChange}
    />
  );
});

export { PaymentMethodForm };
export type { PaymentMethodFormProps };
