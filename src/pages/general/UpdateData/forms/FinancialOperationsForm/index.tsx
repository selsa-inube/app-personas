import { useAuth } from "@inube/auth";
import { IOption } from "@inubekit/inubekit";
import { FormikProps, useFormik } from "formik";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { AppContext } from "src/context/app";
import { getCurrencies } from "src/services/iclient/general/getCurrencies";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { FinancialOperationsFormUI } from "./interface";
import {
  EModalActiveStateFinancialOperations,
  IFinancialOperationsEntry,
} from "./types";

const validationSchema = Yup.object({
  descriptionOperations: Yup.string(),
  country: Yup.string(),
  countryName: Yup.string(),
  bankEntityCode: Yup.string(),
  bankEntityName: Yup.string(),
  accountType: Yup.string(),
  currency: validationRules.currency,
  accountNumber: validationRules.accountNumber,
});

const validationSchemaOperation = Yup.object({
  descriptionOperations: Yup.string()
    .required(validationMessages.required)
    .max(200, validationMessages.maxCharacters(200)),
});

const validationSchemaAccount = Yup.object({
  country: Yup.string().required(validationMessages.required),
  countryName: Yup.string(),
  bankEntityCode: Yup.string().required(validationMessages.required),
  bankEntityName: Yup.string(),
  accountType: Yup.string().required(validationMessages.required),
  currency: validationRules.currency.required(validationMessages.required),
  accountNumber: validationRules.accountNumber,
});

interface FinancialOperationsFormProps {
  initialValues: IFinancialOperationsEntry;
  loading?: boolean;
  withSubmit?: boolean;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IFinancialOperationsEntry) => void;
}

const FinancialOperationsForm = forwardRef(function FinancialOperationsForm(
  props: FinancialOperationsFormProps,
  ref: React.Ref<FormikProps<IFinancialOperationsEntry>>,
) {
  const { loading, initialValues, withSubmit, onFormValid, onSubmit } = props;
  const [modalState, setModalState] = useState<{
    show: boolean;
    action: EModalActiveStateFinancialOperations;
    editEntry: IFinancialOperationsEntry | undefined;
  }>({
    show: false,
    action: EModalActiveStateFinancialOperations.IDLE,
    editEntry: undefined,
  });
  const { serviceDomains } = useContext(AppContext);
  const [currencies, setCurrencies] = useState<{
    loading: boolean;
    list: IOption[];
  }>({
    loading: true,
    list: [],
  });
  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  const loadCurrencies = async () => {
    if (!accessToken) return;

    try {
      const currenciesList = await getCurrencies(accessToken);
      setCurrencies({
        loading: false,
        list: currenciesList || [],
      });
    } catch (error) {
      setCurrencies({
        loading: false,
        list: [],
      });
    }
  };

  useEffect(() => {
    loadCurrencies();
  }, [accessToken]);

  useEffect(() => {
    if (onFormValid) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  const handleDeleteOperation = () => {
    formik.setValues({
      ...formik.values,
      descriptionOperations: "",
    });
    setModalState({
      show: false,
      action: EModalActiveStateFinancialOperations.IDLE,
      editEntry: undefined,
    });
  };

  const handleDeleteAccount = () => {
    formik.setValues({
      ...formik.values,
      country: "",
      countryName: "",
      bankEntityCode: "",
      bankEntityName: "",
      accountType: "",
      currency: "",
      accountNumber: "",
    });

    setModalState({
      show: false,
      action: EModalActiveStateFinancialOperations.IDLE,
      editEntry: undefined,
    });
  };

  const handleSelectEditOperation = () => {
    setModalState({
      show: true,
      action: EModalActiveStateFinancialOperations.EDIT_OPERATION,
      editEntry: formik.values,
    });
  };

  const handleSelectEditAccount = () => {
    setModalState({
      show: true,
      action: EModalActiveStateFinancialOperations.EDIT_ACCOUNT,
      editEntry: formik.values,
    });
  };

  const handleSaveOperation = (values: IFinancialOperationsEntry) => {
    formik.setValues({
      ...formik.values,
      descriptionOperations: values.descriptionOperations,
    });

    setModalState({
      show: false,
      action: EModalActiveStateFinancialOperations.IDLE,
      editEntry: undefined,
    });
  };

  const handleSaveAccount = (values: IFinancialOperationsEntry) => {
    const selectedBankEntity = serviceDomains.integratedbanks.find(
      (bank: IOption) => bank.value === values.bankEntityCode,
    );

    const selectedCountry = serviceDomains.countries.find(
      (country: IOption) => country.value === values.country,
    );

    formik.setValues({
      ...formik.values,
      country: values.country,
      countryName: selectedCountry?.label || "",
      bankEntityCode: values.bankEntityCode,
      bankEntityName: selectedBankEntity?.label || "",
      accountType: values.accountType,
      currency: values.currency,
      accountNumber: values.accountNumber,
    });

    setModalState({
      show: false,
      action: EModalActiveStateFinancialOperations.IDLE,
      editEntry: undefined,
    });
  };

  const handleToggleModal = () => {
    setModalState({
      show: !modalState.show,
      editEntry: undefined,
      action: EModalActiveStateFinancialOperations.IDLE,
    });
  };

  const handleOpenCreateOperation = () => {
    setModalState({
      show: true,
      action: EModalActiveStateFinancialOperations.CREATE_OPERATION,
      editEntry: undefined,
    });
  };

  const handleOpenCreateAccount = () => {
    setModalState({
      show: true,
      action: EModalActiveStateFinancialOperations.CREATE_ACCOUNT,
      editEntry: undefined,
    });
  };

  return (
    <FinancialOperationsFormUI
      formik={formik}
      loading={loading}
      withSubmit={withSubmit}
      validationSchemaOperation={validationSchemaOperation}
      validationSchemaAccount={validationSchemaAccount}
      modalState={modalState}
      serviceDomains={serviceDomains}
      currencies={currencies}
      onSaveOperation={handleSaveOperation}
      onSaveAccount={handleSaveAccount}
      onDeleteOperation={handleDeleteOperation}
      onDeleteAccount={handleDeleteAccount}
      onSelectEditOperation={handleSelectEditOperation}
      onSelectEditAccount={handleSelectEditAccount}
      onToggleModal={handleToggleModal}
      onOpenCreateOperation={handleOpenCreateOperation}
      onOpenCreateAccount={handleOpenCreateAccount}
    />
  );
});

export { FinancialOperationsForm };
export type { FinancialOperationsFormProps };
