import { interestRatesMock } from "@mocks/products/credits/request.mocks";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { SimulationFormUI } from "./interface";
import { ISimulatedCreditState, ISimulationEntry } from "./types";

const validationSchema = Yup.object({
  creditSimulation: Yup.string().required(validationMessages.required),
  product: Yup.string().required(validationMessages.required),
});

interface SimulationFormProps {
  initialValues: ISimulationEntry;
  handleSubmit?: (values: ISimulationEntry) => void;
  loading?: boolean;
}

const SimulationForm = forwardRef(function SimulationForm(
  props: SimulationFormProps,
  ref: React.Ref<FormikProps<ISimulationEntry>>
) {
  const { initialValues, handleSubmit, loading } = props;
  const [simulatedCredit, setSimulatedCredit] =
    useState<ISimulatedCreditState>();

  const [loadingSimulation, setLoadingSimulation] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const customHandleChange = (fieldName: string, value: string) => {
    formik.setFieldValue(fieldName, value);
  };

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

      setSimulatedCredit({
        quota,
        cycleInterest: 200000,
        netValue: 28130279,
      });

      setLoadingSimulation(false);
    }, 1000);
  };

  return (
    <SimulationFormUI
      loading={loading}
      formik={formik}
      interestRate={interestRate}
      simulatedCredit={simulatedCredit}
      loadingSimulation={loadingSimulation}
      customHandleChange={customHandleChange}
      simulateCredit={simulateCredit}
    />
  );
});

export { SimulationForm };
export type { SimulationFormProps };
