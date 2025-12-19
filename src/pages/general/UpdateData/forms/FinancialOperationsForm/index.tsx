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

const validationSchemaDescription = Yup.object({
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
  const [modalState, setModalState] =
    useState<EModalActiveStateFinancialOperations>(
      EModalActiveStateFinancialOperations.IDLE,
    );
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

  const handleSaveDescription = (values: IFinancialOperationsEntry) => {
    formik.setValues({
      ...formik.values,
      descriptionOperations: values.descriptionOperations,
    });
    setModalState(EModalActiveStateFinancialOperations.IDLE);
  };

  const handleSaveAccount = (values: IFinancialOperationsEntry) => {
    formik.setValues({
      ...formik.values,
      country: values.country,
      countryName: values.countryName,
      bankEntityCode: values.bankEntityCode,
      bankEntityName: values.bankEntityName,
      accountType: values.accountType,
      currency: values.currency,
      accountNumber: values.accountNumber,
    });
    setModalState(EModalActiveStateFinancialOperations.IDLE);
  };

  const handleDeleteDescription = () => {
    formik.setValues({
      ...formik.values,
      descriptionOperations: "",
    });
    setModalState(EModalActiveStateFinancialOperations.IDLE);
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
    setModalState(EModalActiveStateFinancialOperations.IDLE);
  };

  const itemsUpdatesCard = [
    {
      title: formik.values.bankEntityName.toUpperCase() || "ENTIDAD BANCARIA",
      entries: [
        { name: "País", value: formik.values.countryName || "" },
        {
          name: "Entidad bancaria",
          value: formik.values.bankEntityName || "",
        },
        {
          name: "Tipo de cuenta",
          value: formik.values.accountType.split("-")[1] || "",
        },
        {
          name: "Número de cuenta",
          value: String(formik.values.accountNumber) || "",
        },
      ],
    },
  ];

  return (
    <FinancialOperationsFormUI
      formik={formik}
      loading={loading}
      withSubmit={withSubmit}
      validationSchemaDescription={validationSchemaDescription}
      validationSchemaAccount={validationSchemaAccount}
      modalState={modalState}
      serviceDomains={serviceDomains}
      currencies={currencies}
      itemsUpdatesCard={itemsUpdatesCard}
      setModalState={setModalState}
      onSaveDescription={handleSaveDescription}
      onSaveAccount={handleSaveAccount}
      onDeleteDescription={handleDeleteDescription}
      onDeleteAccount={handleDeleteAccount}
    />
  );
});

export { FinancialOperationsForm };
export type { FinancialOperationsFormProps };
