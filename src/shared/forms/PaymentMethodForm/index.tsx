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
import { EProductType } from "src/model/entity/product";
import { getSavingsForUser } from "src/services/iclient/savings/getSavings";
import { generateDynamicForm } from "src/utils/forms/forms";
import * as Yup from "yup";
import { structurePaymentMethodForm } from "./config/form";
import { PaymentMethodFormUI } from "./interface";
import { mapPaymentMethod } from "./mappers";
import { IPaymentMethodEntry } from "./types";

const initValidationSchema = Yup.object({
  paymentMethod: Yup.string(),
});

interface PaymentMethodFormProps {
  initialValues: IPaymentMethodEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IPaymentMethodEntry) => void;
}

const PaymentMethodForm = forwardRef(function PaymentMethodForm(
  props: PaymentMethodFormProps,
  ref: React.Ref<FormikProps<IPaymentMethodEntry>>,
) {
  const { initialValues, onSubmit, onFormValid } = props;
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const { savings, setSavings } = useContext(SavingsContext);

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
    onSubmit: onSubmit || (() => true),
    enableReinitialize: true,
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (formik.dirty) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }

    const paymentMethodTypes = ["7", "8", "25", "30", "61", "62", "CO"];
    if (paymentMethodTypes.includes(formik.values.paymentMethodType)) {
      onFormValid(true);
    }
  }, [formik.values]);

  const savingOptions = savings.savingsAccounts
    .filter((saving) => saving.type === EProductType.VIEWSAVINGS)
    .map((saving) => ({
      id: saving.id,
      value: saving.id,
      label: saving.description,
    }));

  useEffect(() => {
    formik.setFieldValue("paymentMethods", formik.values.paymentMethods);
    if (formik.values.paymentMethodType) {
      const { renderFields, validationSchema } = generateDynamicForm(
        formik,
        structurePaymentMethodForm(formik, savingOptions),
      );

      setDynamicForm({
        renderFields,
        validationSchema: initValidationSchema.concat(validationSchema),
      });
    }
  }, [formik.values]);

  useEffect(() => {
    if (!accessToken || !user.identification) return;
    if (savings.savingsAccounts.length === 0) {
      getSavingsForUser(user.identification, accessToken).then((savings) => {
        setSavings(savings);
      });
    }
  }, [user, accessToken]);

  const customHandleChange = (name: string, value: string) => {
    let updatedFormikValues = {
      ...formik.values,
      [name]: value,
    };

    if (name === "accountDebitType") {
      formik.setValues({
        ...mapPaymentMethod(),
        accountToDebit: value,
      });

      updatedFormikValues = {
        ...mapPaymentMethod(),
        accountToDebit: value,
      };
    } else {
      formik.setFieldValue(name, value);
    }

    const { renderFields, validationSchema } = generateDynamicForm(
      {
        ...formik,
        values: updatedFormikValues,
      },
      structurePaymentMethodForm(formik, savingOptions),
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
