import {
  interestRatesMock,
  maxDeadlineMock,
  maximumQuotasAvailableMock,
} from "@mocks/products/credits/request.mocks";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { currencyFormat } from "src/utils/currency";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { CreditConditionsFormUI } from "./interface";
import { ICreditConditionsEntry } from "./types";

const validationSchema = Yup.object({
  amount: validationRules.money.required(validationMessages.required),
  deadline: Yup.number()
    .min(1, validationMessages.minNumbers(10))
    .max(1000, validationMessages.maxNumbers(1000)),
  quota: validationRules.money,
  interestRate: Yup.number().required(validationMessages.required),
  cycleInterest: Yup.number().required(validationMessages.required),
  netValue: Yup.number().required(validationMessages.required),
  hasResult: Yup.boolean().required(validationMessages.required),
});

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
    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  }, [formik.values]);

  useEffect(() => {
    const maxDeadline =
      maxDeadlineMock[formik.values.product as keyof typeof maxDeadlineMock];

    const maximumQuotas =
      maximumQuotasAvailableMock[
        formik.values
          .creditDestination as keyof typeof maximumQuotasAvailableMock
      ];

    const newValidationSchema = validationSchema.concat(
      Yup.object({
        deadline: Yup.number()
          .min(1, validationMessages.minNumbers(10))
          .max(
            maxDeadline,
            `El plazo máximo para este producto es de ${maxDeadline} meses`,
          ),
        amount: Yup.number()
          .min(1, validationMessages.minCurrencyNumbers(1))
          .max(maximumQuotas.noWarranty, "Has superado el cupo máximo")
          .required(validationMessages.required),
      }),
    );
    setDynamicValidationSchema(newValidationSchema);
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
