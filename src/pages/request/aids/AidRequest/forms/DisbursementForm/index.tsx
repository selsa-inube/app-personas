import { useAuth } from "@inube/auth";
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
import { getSavingsForUser } from "src/services/iclient/savings/getSavings";
import * as Yup from "yup";
import { DisbursementFormUI } from "./interface";
import { IDisbursementEntry } from "./types";
import { structureDisbursementForm } from "./config/form";
import { generateDynamicForm } from "src/utils/forms/forms";
import { IFormField } from "@ptypes/forms.types";
import { EProductType } from "src/model/entity/product";
import { mapDisbursement } from "../../config/mappers";
import { getCustomer } from "src/services/iclient/customers/getCustomer";
import { validationMessages } from "src/validations/validationMessages";
import { accountOriginTypeDM } from "src/model/domains/general/accountOriginTypeDM";

const initValidationSchema = Yup.object().shape({
  disbursementMethod: Yup.string().required("Campo requerido"),
  account: Yup.string(),
  disbursedAccount: Yup.string(),
  accountType: Yup.string(),
  bankEntity: Yup.string(),
  accountNumberTextField: Yup.string(),
});

interface DisbursementFormProps {
  initialValues: IDisbursementEntry;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DisbursementForm = forwardRef(function DisbursementForm(
  props: DisbursementFormProps,
  ref: React.Ref<FormikProps<IDisbursementEntry>>,
) {
  const { initialValues, onFormValid } = props;

  const { savings, setSavings } = useContext(SavingsContext);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);

  const [dynamicForm, setDynamicForm] = useState<{
    renderFields: IFormField[];
    validationSchema: Yup.ObjectSchema<object>;
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

  const fetchUserData = async () => {
    if (!accessToken) return null;

    try {
      const userData = await getCustomer(user.identification, accessToken);
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const savingOptions = savings.savingsAccounts
    .filter((saving) => saving.type === EProductType.VIEWSAVINGS)
    .map((saving) => ({ id: saving.id, value: saving.description }));

  const customHandleAccount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    formik.handleChange(event);
    formik.setFieldValue("disbursedAccount", formik.values.disbursedAccount);
  };

  useEffect(() => {
    if (onFormValid) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  useEffect(() => {
    formik.setFieldValue(
      "disbursementMethod",
      formik.values.disbursementMethod,
    );
    if (formik.values.disbursementMethod) {
      const { renderFields, validationSchema } = generateDynamicForm(
        formik,
        structureDisbursementForm(formik, savingOptions),
      );

      const newValidationSchema = initValidationSchema.concat(
        Yup.object({
          accountType:
            formik.values.disbursedAccount === "new"
              ? Yup.string().required(validationMessages.required)
              : Yup.string(),
          bankEntity:
            formik.values.disbursedAccount === "new"
              ? Yup.string().required(validationMessages.required)
              : Yup.string(),
          accountNumber:
            formik.values.accountNumberTextField === "new"
              ? Yup.string().required(validationMessages.required)
              : Yup.string(),
        }),
      );
      setDynamicForm({
        renderFields,
        validationSchema: validationSchema.concat(newValidationSchema),
      });
    }

    if (
      formik.values.disbursementMethod === "creditToInternalAccount" &&
      savingOptions.length === 1
    ) {
      formik.setFieldValue("account", savingOptions[0].id);
    }
  }, [formik.values]);

  useEffect(() => {
    if (!accessToken) return;
    if (savings.savingsAccounts.length === 0) {
      getSavingsForUser(user.identification, accessToken)
        .then((savings) => {
          setSavings(savings);
        })
        .catch((error) => {
          console.info(error.message);
        });
    }
  }, [user, accessToken, formik.values]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData();
        if (userData) {
          const { bankTransfersAccount } = userData;

          if (
            formik.values.disbursedAccount === accountOriginTypeDM.REGISTERED.id
          ) {
            formik.setFieldValue("bankEntity", bankTransfersAccount.bankEntity);
            formik.setFieldValue(
              "accountType",
              bankTransfersAccount.accountType,
            );
            formik.setFieldValue(
              "accountNumberTextField",
              bankTransfersAccount.accountNumber,
            );
          } else if (formik.values.disbursedAccount === "new") {
            formik.setFieldValue(
              "bankEntity",
              formik.values.accountNumberTextField ===
                bankTransfersAccount.accountNumber
                ? undefined
                : formik.values.bankEntity || "",
            );
            formik.setFieldValue(
              "accountType",
              formik.values.accountNumberTextField ===
                bankTransfersAccount.accountNumber
                ? undefined
                : formik.values.accountType || "",
            );
            formik.setFieldValue(
              "accountNumberTextField",
              formik.values.accountNumberTextField ===
                bankTransfersAccount.accountNumber
                ? undefined
                : formik.values.accountNumberTextField || "",
            );
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [formik.values.disbursedAccount]);

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

    if (name === "disbursedAccount") {
      customHandleAccount(event as React.ChangeEvent<HTMLSelectElement>);
    }

    if (name === "disbursementMethod") {
      updatedFormikValues = {
        ...mapDisbursement,
        disbursementMethod: value,
      };
      formik.setValues(updatedFormikValues);
    } else {
      formik.setFieldValue(name, value);
    }

    const { renderFields, validationSchema: newSchema } = generateDynamicForm(
      {
        ...formik,
        values: updatedFormikValues,
      },
      structureDisbursementForm(formik, savingOptions),
    );

    setDynamicForm({
      renderFields,
      validationSchema: Yup.object().shape({
        ...initValidationSchema.fields,
        ...newSchema.fields,
      }),
    });
  };

  return (
    <DisbursementFormUI
      formik={formik}
      savingAccounts={savings.savingsAccounts}
      renderFields={dynamicForm.renderFields}
      customHandleChange={customHandleChange}
    />
  );
});

export { DisbursementForm };
export type { DisbursementFormProps };
