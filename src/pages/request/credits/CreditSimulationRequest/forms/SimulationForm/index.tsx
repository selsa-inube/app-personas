import { interestRatesMock } from "@mocks/products/credits/request.mocks";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { SimulationFormUI } from "./interface";
import { ISimulationEntry } from "./types";

const validationSchema = Yup.object({
  amount: validationRules.money,
  deadline: Yup.number()
    .min(1, validationMessages.minNumbers(10))
    .max(1000, validationMessages.maxNumbers(1000)),
});

interface SimulationFormProps {
  initialValues: ISimulationEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit?: (values: ISimulationEntry) => void;
  loading?: boolean;
}

const SimulationForm = forwardRef(function SimulationForm(
  props: SimulationFormProps,
  ref: React.Ref<FormikProps<ISimulationEntry>>
) {
  const { initialValues, onFormValid, handleSubmit, loading } = props;

  const [loadingSimulation, setLoadingSimulation] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const interestRate =
    interestRatesMock[
      formik.values.creditDestination as keyof typeof interestRatesMock
    ];

  const simulateCredit = () => {
    setLoadingSimulation(true);

    setTimeout(() => {
      const amount = Number(formik.values.amount);
      const deadline = Number(formik.values.deadline);

      const interestRateDecimal = interestRate / 100;

      const quota =
        (amount *
          interestRateDecimal *
          Math.pow(1 + interestRateDecimal, deadline)) /
        (Math.pow(1 + interestRateDecimal, deadline) - 1);

      formik.setFieldValue("quota", quota);
      formik.setFieldValue("cycleInterest", 200000);
      formik.setFieldValue("netValue", amount + 200000);

      setLoadingSimulation(false);
      onFormValid(true);
      
    }, 1000);
  };

  return (
    <SimulationFormUI
      loading={loading}
      formik={formik}
      interestRate={interestRate}
      loadingSimulation={loadingSimulation}
      simulateCredit={simulateCredit}
    />
  );
});

export { SimulationForm };
export type { SimulationFormProps };
