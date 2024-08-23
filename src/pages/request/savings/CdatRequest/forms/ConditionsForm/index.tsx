import { investmentsRatesMocks } from "@mocks/products/investments/investmentsRates.mocks";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { ConditionsFormUI } from "./interface";
import { IConditionsEntry } from "./types";
import * as Yup from "yup";
import {
  effectiveAnnualRateRequest,
  getInitialCdatContidionValidations,
  totalInterestRequest,
  validationSchema,
} from "./utils";
import { validationRules } from "src/validations/validationRules";
import { validationMessages } from "src/validations/validationMessages";

interface ConditionsFormProps {
  initialValues: IConditionsEntry;
  loading?: boolean;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IConditionsEntry) => void;
}

const ConditionsForm = forwardRef(function ConditionsForm(
  props: ConditionsFormProps,
  ref: React.Ref<FormikProps<IConditionsEntry>>,
) {
  const { initialValues, loading, onFormValid, onSubmit } = props;

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
    setDynamicValidationSchema(getInitialCdatContidionValidations());
  }, []);

  const simulateCDAT = () => {
    setLoadingSimulation(true);
    setTimeout(() => {
      const valueInvestment = Number(formik.values.valueInvestment);
      let deadlineDays = Number(formik.values.deadlineDays);

      if (formik.values.simulationWithDate) {
        deadlineDays = 360;
        formik.setFieldValue("deadlineDays", deadlineDays);
      }

      const effectiveAnnualRate = effectiveAnnualRateRequest(
        investmentsRatesMocks,
        deadlineDays,
      );

      const totalInterest = totalInterestRequest(
        valueInvestment,
        investmentsRatesMocks,
        deadlineDays,
      );

      formik.setFieldValue("effectiveAnnualRate", effectiveAnnualRate);
      formik.setFieldValue("totalInterest", totalInterest);
      formik.setFieldValue("withholdingTax", 0);
      formik.setFieldValue("netValue", totalInterest);
      formik.setFieldValue("hasResult", true);
      setLoadingSimulation(false);
      onFormValid(true);
    }, 1000);
  };

  const customHandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    formik.handleChange(event);

    if (event.target.name === "simulationWithDate") {
      formik.setFieldValue("deadlineDate", "");
      formik.setFieldValue("deadlineDays", "");
      formik.setFieldValue("totalInterest", "");
      formik.setFieldValue("withholdingTax", "");
      formik.setFieldValue("netValue", "");
      formik.setFieldValue("hasResult", "");
      formik.setFormikState((state) => {
        return {
          ...state,
          touched: {
            ...state.touched,
            deadlineDate: false,
            deadlineDays: false,
          },
        };
      });

      const checked = "checked" in event.target && event.target.checked;

      if (!checked) return;

      const newValidationSchema = dynamicValidationSchema.concat(
        Yup.object({
          deadlineDate: validationRules.notPastDate.required(
            validationMessages.required,
          ),
        }),
      );
      setDynamicValidationSchema(newValidationSchema);
    }

    formik.setFieldValue("hasResult", false);
    onFormValid(false);
  };

  return (
    <ConditionsFormUI
      loading={loading}
      formik={formik}
      loadingSimulation={loadingSimulation}
      simulateCDAT={simulateCDAT}
      customHandleChange={customHandleChange}
      onFormValid={onFormValid}
    />
  );
});

export { ConditionsForm };
export type { ConditionsFormProps };
