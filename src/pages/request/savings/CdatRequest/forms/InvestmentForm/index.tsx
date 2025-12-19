import { useAuth } from "@inube/auth";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { captureNewError } from "src/services/errors/handleErrors";
import { getCdatProducts } from "src/services/iclient/savings/getCdatProducts";
import { currencyFormat } from "src/utils/currency";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { InvestmentFormUI } from "./interface";
import { IInvestmentEntry } from "./types";

const validationSchema = Yup.object({
  investmentValue: Yup.number().required(validationMessages.required),
});

interface InvestmentFormProps {
  initialValues: IInvestmentEntry;
  loading?: boolean;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IInvestmentEntry) => void;
}

const InvestmentForm = forwardRef(function InvestmentForm(
  props: InvestmentFormProps,
  ref: React.Ref<FormikProps<IInvestmentEntry>>,
) {
  const { initialValues, loading, onFormValid, onSubmit } = props;

  const [dynamicValidationSchema, setDynamicValidationSchema] =
    useState(validationSchema);

  const [loadingCdat, setLoadingCdat] = useState(true);

  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicValidationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (formik.dirty) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  const getCdatProduct = async () => {
    if (!accessToken) {
      setLoadingCdat(false);
      return;
    }

    setLoadingCdat(true);

    try {
      const cdats = await getCdatProducts(accessToken);
      if (cdats.length > 0) {
        const product = cdats[0];
        formik.setFieldValue("product", product);

        const newValidationSchema = dynamicValidationSchema.concat(
          Yup.object({
            investmentValue: Yup.number()
              .min(
                product.minInvestment,
                `El valor mínimo de la inversión es de ${currencyFormat(product.minInvestment)}`,
              )
              .max(
                product.maxInvestment,
                `El valor máximo de la inversión es de ${currencyFormat(product.maxInvestment)}`,
              )
              .required(validationMessages.required),
          }),
        );

        setDynamicValidationSchema(newValidationSchema);
      }
    } catch (error) {
      captureNewError(
        error,
        {
          inFunction: "getCdatProduct",
          action: "getCdatProducts",
          screen: "InvestmentForm",
          description: "Error in fetching CDAT products",
          file: "src/pages/request/savings/CdatRequest/forms/InvestmentForm/index.tsx",
        },
        { feature: "request-cdat" },
      );
    } finally {
      setLoadingCdat(false);
    }
  };

  useEffect(() => {
    getCdatProduct();
  }, [accessToken]);

  const isLoading = loading || loadingCdat;

  return (
    <InvestmentFormUI
      loading={isLoading}
      formik={formik}
      onFormValid={onFormValid}
    />
  );
});

export { InvestmentForm };
export type { InvestmentFormProps };
