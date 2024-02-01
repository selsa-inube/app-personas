import { investmentsRatesMocks } from "@mocks/products/investments/investmentsRates.mocks";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { ConditionsFormUI } from "./interface";
import { IConditionsEntry } from "./types";
import {
  effectiveAnnualRateRequest,
  totalInterestRequest,
  validationSchema,
} from "./utils";

interface ConditionsFormProps {
  initialValues: IConditionsEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IConditionsEntry) => void;
  loading?: boolean;
}

const ConditionsForm = forwardRef(function ConditionsForm(
  props: ConditionsFormProps,
  ref: React.Ref<FormikProps<IConditionsEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const [loadingSimulation, setLoadingSimulation] = useState(false);
  const [dynamicValidationSchema] = useState(validationSchema);

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
