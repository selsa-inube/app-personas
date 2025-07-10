import { FormikProps, useFormik } from "formik";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { FinancialOperationsFormUI } from "./interface";
import { IFinancialOperationsEntry } from "./types";
import { AppContext } from "src/context/app";
import { IOption } from "@inubekit/inubekit";
import { useAuth } from "@inube/auth";
import { getCurrencies } from "src/services/iclient/general/getCurrencies";

const validationSchema = Yup.object({
  hasForeignCurrencyTransactions: Yup.string().required(
    validationMessages.required,
  ),
  hasForeignCurrencyAccounts: Yup.string().required(
    validationMessages.required,
  ),
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
  const { serviceDomains } = useContext(AppContext);
  const [dynamicValidationSchema, setDynamicValidationSchema] =
    useState(validationSchema);
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
    validationSchema: dynamicValidationSchema,
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

  const handleChangeForeignTransactions = async (
    name: string,
    value: string,
  ) => {
    formik.setFieldValue(name, value);

    if (value === "Y") {
      const newValidationSchema = dynamicValidationSchema.concat(
        Yup.object({
          descriptionOperations: Yup.string()
            .required(validationMessages.required)
            .min(1)
            .max(200),
        }),
      );

      setDynamicValidationSchema(newValidationSchema);

      return;
    } else {
      const newValidationSchema = dynamicValidationSchema.concat(
        Yup.object({
          descriptionOperations: Yup.string(),
        }),
      );

      setDynamicValidationSchema(newValidationSchema);

      formik.setFieldValue("descriptionOperations", "");
    }
  };

  const handleChangeForeignAccounts = async (name: string, value: string) => {
    formik.setFieldValue(name, value);

    if (value === "Y") {
      const newValidationSchema = dynamicValidationSchema.concat(
        Yup.object({
          accountNumber: validationRules.accountNumber.required(
            validationMessages.required,
          ),
          country: Yup.string().required(validationMessages.required),
          bankEntity: Yup.string().required(validationMessages.required),
          currency: validationRules.currency.required(
            validationMessages.required,
          ),
        }),
      );

      setDynamicValidationSchema(newValidationSchema);
    } else {
      const newValidationSchema = dynamicValidationSchema.concat(
        Yup.object({
          accountNumber: validationRules.accountNumber,
          country: Yup.string(),
          bankEntity: Yup.string(),
          currency: validationRules.currency,
        }),
      );

      setDynamicValidationSchema(newValidationSchema);

      formik.setFieldValue("accountNumber", "");
      formik.setFieldValue("country", "");
      formik.setFieldValue("bankEntity", "");
      formik.setFieldValue("currency", "");
    }
  };

  return (
    <FinancialOperationsFormUI
      loading={loading}
      formik={formik}
      withSubmit={withSubmit}
      validationSchema={validationSchema}
      serviceDomains={serviceDomains}
      currencies={currencies}
      onChangeForeignTransactions={handleChangeForeignTransactions}
      onChangeForeignAccounts={handleChangeForeignAccounts}
    />
  );
});

export { FinancialOperationsForm };
export type { FinancialOperationsFormProps };
