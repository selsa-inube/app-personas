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
import { accountOriginTypeDM } from "src/model/domains/general/accountOriginTypeDM";
import { disbursementTypeDM } from "src/model/domains/general/disbursementTypeDM";
import { getCustomer } from "src/services/iclient/customers/getCustomer";
import { getSavingsForUser } from "src/services/iclient/savings/getSavings";
import { generateDynamicForm } from "src/utils/forms/forms";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { structureDisbursementForm } from "./config/form";
import { DisbursementFormUI } from "./interface";
import { IDisbursementEntry } from "./types";

const initValidationSchema = Yup.object({
  disbursement: Yup.string().required(validationMessages.required),
});

interface DisbursementFormProps {
  initialValues: IDisbursementEntry;
  transferAccountValues?: {
    transferBankEntity?: string;
    transferAccountType?: string;
    transferAccountNumber?: string;
  };
  loading?: boolean;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IDisbursementEntry) => void;
}

const DisbursementForm = forwardRef(function DisbursementForm(
  props: DisbursementFormProps,
  ref: React.Ref<FormikProps<IDisbursementEntry>>,
) {
  const {
    initialValues,
    transferAccountValues,
    loading,
    onSubmit,
    onFormValid,
  } = props;
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
    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  }, [formik.values]);

  useEffect(() => {
    formik.setFieldValue("disbursements", disbursementTypeDM.options);
    if (formik.values.disbursement) {
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
      getSavingsForUser(user.identification, accessToken)
        .then((savings) => {
          setSavings(savings);
        })
        .catch((error) => {
          console.info(error.message);
        });
    }
  }, [user, accessToken]);

  const changeAccountStatus = async () => {
    if (!formik.values.accountStatus || !accessToken) return;

    if (formik.values.accountStatus === accountOriginTypeDM.REGISTERED.id) {
      let bankEntity = "";
      let accountType = "";
      let accountNumber = "";
      if (transferAccountValues) {
        bankEntity = transferAccountValues.transferBankEntity || "";
        accountType = transferAccountValues.transferAccountType || "";
        accountNumber = transferAccountValues.transferAccountNumber || "";
      } else {
        const userData = await getCustomer(user.identification, accessToken);
        if (!userData) return;
        bankEntity = userData.bankTransfersAccount.bankEntity;
        accountType = userData.bankTransfersAccount.accountType;
        accountNumber = userData.bankTransfersAccount.accountNumber;
      }

      formik.setFieldValue("entity", bankEntity);
      formik.setFieldValue("accountType", accountType);
      formik.setFieldValue("writeAccountNumber", accountNumber);
    } else {
      formik.setFieldValue("entity", "");
      formik.setFieldValue("accountType", "");
      formik.setFieldValue("writeAccountNumber", "");
    }
  };

  useEffect(() => {
    changeAccountStatus();
  }, [formik.values.accountStatus]);

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

    if (name === "disbursement") {
      const disbursement = formik.values.disbursements.find(
        (disbursement) => disbursement.id === value,
      );

      if (!disbursement) return;

      updatedFormikValues = {
        ...initialValues,
        disbursements: formik.values.disbursements,
        disbursement: disbursement.id,
        disbursementName: disbursement.value,
      };

      if (
        disbursement.id === disbursementTypeDM.LOCAL_SAVINGS_DEPOSIT.id &&
        savings.savingsAccounts.length > 0
      ) {
        updatedFormikValues = {
          ...updatedFormikValues,
          accountNumber: savings.savingsAccounts[0].id,
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
    <DisbursementFormUI
      loading={loading}
      formik={formik}
      renderFields={dynamicForm.renderFields}
      customHandleChange={customHandleChange}
    />
  );
});

export { DisbursementForm };
export type { DisbursementFormProps };
