import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { currencyFormat } from "src/utils/currency";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { CreditConditionsFormUI } from "./interface";
import { ICreditConditionsEntry, IDisbursementModalState } from "./types";
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
  const [disbursementModal, setDisbursementModal] =
    useState<IDisbursementModalState>({
      show: false,
      data: {
        spec: {
          amount: initialValues.amount,
          cycleInterest: initialValues.cycleInterest,
          discounts: initialValues.discounts,
        },
        approximateValue: initialValues.netValue,
      },
    });

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
        onFormValid(
          errors.amount
            ? Object.keys(errors).length === 1
            : Object.keys(errors).length === 0,
        );
      });
    }
  }, [formik.values]);

  useEffect(() => {
    setDynamicValidationSchema(getInitialCreditContidionValidations(formik));
  }, []);

  const customHandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    formik.setFieldValue("hasResult", false);

    formik.handleChange(event);

    if (event.target.name === "simulationWithQuota") {
      formik.setFieldValue("quota", "");
      formik.setFieldValue("deadline", "");
      formik.setFieldValue("interestRate", "");
      formik.setFieldValue("netValue", "");
      formik.setFieldValue("hasResult", false);

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
      const interestRate = formik.values.product.maxRate;
      const interestRateDecimal = interestRate || 0 / 100;

      const newValidationSchema = dynamicValidationSchema.concat(
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
  };

  const simulateCredit = () => {
    setLoadingSimulation(true);
    setTimeout(() => {
      const interestRate = formik.values.product.maxRate;
      const amount = Number(formik.values.amount);
      const interestRateDecimal = interestRate || 0 / 100;

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

        formik.setFieldValue("quota", Math.ceil(quota));
      }

      formik.setFieldValue("interestRate", interestRate);
      formik.setFieldValue("minWarrantyRequired", "Con codeudores");
      formik.setFieldValue("netValue", amount - 200000 - 0);
      formik.setFieldValue("hasResult", true);
      formik.setFieldValue("cycleInterest", 200000);
      formik.setFieldValue("discounts", 0);

      setDisbursementModal({
        ...disbursementModal,
        data: {
          spec: {
            amount,
            cycleInterest: 200000,
            discounts: 0,
          },
          approximateValue: amount - 200000,
        },
      });

      setLoadingSimulation(false);
      onFormValid(true);
    }, 1000);
  };

  const handleToggleDisbursementModal = () => {
    setDisbursementModal({
      ...disbursementModal,
      show: !disbursementModal.show,
    });
  };

  return (
    <CreditConditionsFormUI
      loading={loading}
      formik={formik}
      loadingSimulation={loadingSimulation}
      disbursementModal={disbursementModal}
      simulateCredit={simulateCredit}
      customHandleChange={customHandleChange}
      onFormValid={onFormValid}
      onToggleDisbursementModal={handleToggleDisbursementModal}
    />
  );
});

export { CreditConditionsForm };
export type { CreditConditionsFormProps };
