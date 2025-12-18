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
import { IFinancialOperationsEntry, EModalActiveStateFinancialOperations } from "./types";

const validationSchema = Yup.object({
  descriptionOperations: Yup.string(),
  country: Yup.string(),
  countryName: Yup.string(),
  bankEntityCode: Yup.string(),
  bankEntityName: Yup.string(),
  accountType: Yup.string(),
  currency: validationRules.currency,
  accountNumber: validationRules.accountNumber
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
  accountNumber: validationRules.accountNumber.required(validationMessages.required)
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
  const [modalOpen, setModalOpen] = useState<EModalActiveStateFinancialOperations>(EModalActiveStateFinancialOperations.IDLE);
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

  useEffect(() => {
    if (!accessToken) return;

    const loadCurrencies = async () => {
      try {
        const currenciesList = await getCurrencies(accessToken);
        setCurrencies({
          loading: false,
          list: currenciesList || [],
        });
      } catch (error) {
        console.error(error);
        setCurrencies({
          loading: false,
          list: [],
        });
      }
    };

    loadCurrencies();
  }, [accessToken]);

  useEffect(() => {
    if (onFormValid) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  return (
    <FinancialOperationsFormUI
      formik={formik}
      loading={loading}
      withSubmit={withSubmit}
      validationSchemaDescription={validationSchemaDescription}
      validationSchemaAccount={validationSchemaAccount}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      serviceDomains={serviceDomains}
      currencies={currencies}
    />
  );
});

export { FinancialOperationsForm };
export type { FinancialOperationsFormProps };
