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
import { RequestType } from "src/model/entity/request";
import { getCustomer } from "src/services/iclient/customers/getCustomer";
import { getDisbursementsForProduct } from "src/services/iclient/productRequest/getDisbursements";
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
    transferBankEntityCode?: string;
    transferBankEntityName?: string;
    transferAccountType?: string;
    transferAccountNumber?: string;
  };
  requestType: RequestType;
  productId: string;
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
    requestType,
    productId,
    onSubmit,
    onFormValid,
  } = props;
  const { accessToken } = useAuth();
  const { user, serviceDomains } = useContext(AppContext);
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

  const getDisbursements = async () => {
    if (!accessToken) return;
    const disbursements = await getDisbursementsForProduct(
      requestType,
      productId,
      accessToken,
    );

    formik.setFieldValue("disbursements", disbursements);

    if (disbursements.length === 1) {
      const disbursement = disbursements[0];
      formik.setValues({
        ...initialValues,
        disbursement: disbursement.id,
        disbursementName: disbursement.value,
        disbursements,
      });

      if (
        disbursement.id === disbursementTypeDM.LOCAL_SAVINGS_DEPOSIT.id &&
        savings.savingsAccounts.length > 0
      ) {
        formik.setFieldValue("accountNumber", savings.savingsAccounts[0].id);
      }

      const { renderFields, validationSchema } = generateDynamicForm(
        {
          ...formik,
          values: {
            ...initialValues,
            disbursement: disbursement.id,
            disbursementName: disbursement.value,
          },
        },
        structureDisbursementForm(
          formik,
          savings.savingsAccounts,
          serviceDomains,
        ),
      );

      setDynamicForm({
        renderFields,
        validationSchema: initValidationSchema.concat(validationSchema),
      });
    }
  };

  useEffect(() => {
    getDisbursements();

    if (formik.values.disbursement) {
      const { renderFields, validationSchema } = generateDynamicForm(
        formik,
        structureDisbursementForm(
          formik,
          savings.savingsAccounts,
          serviceDomains,
        ),
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

  const changeAccountStatus = async () => {
    if (!formik.values.accountStatus || !accessToken) return;

    if (formik.values.accountStatus === accountOriginTypeDM.REGISTERED.id) {
      let bankEntityCode = "";
      let bankEntityName = "";
      let accountType = "";
      let accountNumber = "";
      if (transferAccountValues) {
        bankEntityCode = transferAccountValues.transferBankEntityCode || "";
        bankEntityName = transferAccountValues.transferBankEntityName || "";
        accountType = transferAccountValues.transferAccountType || "";
        accountNumber = transferAccountValues.transferAccountNumber || "";
      } else {
        const userData = await getCustomer(user.identification, accessToken);
        if (!userData) return;

        bankEntityCode = userData.bankTransfersAccount.bankEntityCode;
        bankEntityName = userData.bankTransfersAccount.bankEntityName;
        accountType = userData.bankTransfersAccount.accountType;
        accountNumber = userData.bankTransfersAccount.accountNumber;
      }

      formik.setFieldValue("bankEntity", bankEntityCode);
      formik.setFieldValue("bankEntityName", bankEntityName);
      formik.setFieldValue("accountType", accountType);
      formik.setFieldValue("writeAccountNumber", accountNumber);
    } else {
      formik.setFieldValue("bankEntity", "");
      formik.setFieldValue("bankEntityName", "");
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
      structureDisbursementForm(
        updatedFormik,
        savings.savingsAccounts,
        serviceDomains,
      ),
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
