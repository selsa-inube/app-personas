import { useAuth } from "@inube/auth";
import { IFormField } from "@ptypes/forms.types";
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
import { currencyFormat } from "src/utils/currency";
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
    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  }, [formik.values]);

  const getPaymentMethods = async () => {
    if (!accessToken) return;

    getCdatPaymentMethods(accessToken).then((paymentMethods) => {
      formik.setFieldValue("paymentMethods", paymentMethods);
    });
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
    if (!accessToken) return;
    if (savings.savingsAccounts.length === 0) {
      getSavingsForUser(user.identification, accessToken).then((savings) => {
        setSavings(savings);
      });
    }
  }, [user, accessToken]);

  const customHandleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    let updatedFormikValues = {
      ...formik.values,
      [name]: value,
    };

    if (name === "paymentMethod") {
      const paymentMethod = formik.values.paymentMethods.find(
        (paymentMethod) => paymentMethod.id === value,
      );
      if (!paymentMethod) return;

      updatedFormikValues = {
        ...initialValues,
        paymentMethods: formik.values.paymentMethods,
        paymentMethod: paymentMethod.id,
        paymentMethodName: paymentMethod.value,
      };

      if (
        paymentMethod.id === "DEBAHORINT" &&
        savings.savingsAccounts.length > 0
      ) {
        updatedFormikValues = {
          ...updatedFormikValues,
          accountToDebit: accountDebitTypeDM.INTERNAL_OWN_ACCOUNT_DEBIT.id,
          accountNumber: savings.savingsAccounts[0].id,
          availableBalance: currencyFormat(
            Number(
              extractAttribute(
                savings.savingsAccounts[0].attributes,
                "net_value",
              )?.value || 0,
            ),
            false,
          ),
        };
      }

      formik.setValues(updatedFormikValues);
    } else {
      formik.setFieldValue(name, value);
    }

    const updatedFormik = {
      ...formik,
      values: updatedFormikValues,
    };

    const { renderFields, validationSchema } = generateDynamicForm(
      updatedFormik,
      structureDisbursementForm(updatedFormik, savings.savingsAccounts),
    );

    setDynamicForm({
      renderFields,
      validationSchema: initValidationSchema.concat(validationSchema),
    });
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
