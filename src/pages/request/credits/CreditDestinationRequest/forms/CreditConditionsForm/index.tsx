import { interestRatesMock } from "@mocks/products/credits/request.mocks";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { currencyFormat } from "src/utils/currency";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { CreditConditionsFormUI } from "./interface";
import { ICreditConditionsEntry } from "./types";
import {
  getInitialCreditContidionValidations,
  validationSchema,
} from "./utils";

interface CreditConditionsFormProps {
  initialValues: ICreditConditionsEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: ICreditConditionsEntry) => void;
  loading?: boolean;
}

const CreditConditionsForm = forwardRef(function CreditConditionsForm(
  props: CreditConditionsFormProps,
  ref: React.Ref<FormikProps<ICreditConditionsEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const [loadingSimulation, setLoadingSimulation] = useState(false);
  const [dynamicValidationSchema, setDynamicValidationSchema] =
    useState(validationSchema);

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

  useEffect(() => {
    setDynamicValidationSchema(getInitialCreditContidionValidations(formik));
  }, []);

  const interestRate =
    interestRatesMock[
      formik.values.creditDestination as keyof typeof interestRatesMock
    ];

  const simulateCredit = () => {
    setLoadingSimulation(true);
    setTimeout(() => {
      const amount = Number(formik.values.amount);
      const interestRateDecimal = interestRate / 100;

      if (formik.values.simulationWithQuota) {
        const quota = Number(formik.values.quota);

        if (quota <= amount * interestRateDecimal) {
          return;
        }

        const deadline =
          Math.log(quota / (quota - amount * interestRateDecimal)) /
          Math.log(1 + interestRateDecimal);

        formik.setFieldValue("deadline", Math.ceil(deadline));
      } else {
        const deadline = Number(formik.values.deadline);

        const quota =
          (amount *
            interestRateDecimal *
            Math.pow(1 + interestRateDecimal, deadline)) /
          (Math.pow(1 + interestRateDecimal, deadline) - 1);

        formik.setFieldValue("quota", quota);
      }

      formik.setFieldValue("interestRate", interestRate);
      formik.setFieldValue("cycleInterest", 200000);
      formik.setFieldValue("netValue", amount + 200000);
      formik.setFieldValue("hasResult", true);
      setLoadingSimulation(false);
      onFormValid(true);
    }, 1000);
  };

  const customHandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    formik.handleChange(event);

    if (event.target.name === "simulationWithQuota") {
      formik.setFieldValue("quota", "");
      formik.setFieldValue("deadline", "");
      formik.setFormikState((state) => {
        return {
          ...state,
          touched: {
            ...state.touched,
            quota: false,
            deadline: false,
          },
        };
      });

      const checked = "checked" in event.target && event.target.checked;

      if (!checked) return;

      const amount = Number(formik.values.amount);
      const interestRateDecimal = interestRate / 100;

      const newValidationSchema = validationSchema.concat(
        Yup.object({
          quota: validationRules.money
            .required(validationMessages.required)
            .test(
              "valid-quota",
              `La cuota debe ser mayor a: ${currencyFormat(
                amount * interestRateDecimal,
              )}`,
              (value) => Number(value) > amount * interestRateDecimal,
            ),
        }),
      );
      setDynamicValidationSchema(newValidationSchema);
    }

    formik.setFieldValue("hasResult", false);
    onFormValid(false);
  };

  return (
    <CreditConditionsFormUI
      loading={loading}
      formik={formik}
      interestRate={interestRate}
      loadingSimulation={loadingSimulation}
      simulateCredit={simulateCredit}
      customHandleChange={customHandleChange}
      onFormValid={onFormValid}
    />
  );
});

export { CreditConditionsForm };
export type { CreditConditionsFormProps };
