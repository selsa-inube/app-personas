import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { validationRules } from "src/validations/validationRules";
import { ConditionsFormUI } from "./interface";
import { IRate } from "src/model/entity/product";
import { IConditionsEntry } from "./types";
import { investmentsRatesMocks } from "@mocks/products/investments/investmentsRates.mocks";

const maxDeadlineDays = investmentsRatesMocks.reduce(
  (previousValue: IRate, currentValue: IRate) => {
    return currentValue.deadlineEndDay > previousValue.deadlineEndDay
      ? currentValue
      : previousValue;
  }
);

const minDeadlineDays = investmentsRatesMocks.reduce(
  (previousValue: IRate, currentValue: IRate) => {
    return currentValue.deadlineInitialDay < previousValue.deadlineInitialDay
      ? currentValue
      : previousValue;
  }
);

const removeLastCharacters = (
  wordOfCell: string,
  numberCharactersRemove: number
): number => {
  return Number(wordOfCell.slice(0, -numberCharactersRemove));
};

const validationSchema = Yup.object({
  deadlineDate: validationRules.notPastDate.required(
    validationMessages.required
  ),
  deadlineDays: Yup.number()
    .min(
      minDeadlineDays.deadlineInitialDay,
      `El plazo minimo en días debe ser de:  ${minDeadlineDays.deadlineInitialDay} días`
    )
    .max(
      maxDeadlineDays.deadlineEndDay,
      `El plazo máximo en días debe ser de:  ${maxDeadlineDays.deadlineEndDay} días`
    ),
});

interface ConditionsFormProps {
  initialValues: IConditionsEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IConditionsEntry) => void;
  loading?: boolean;
}

const ConditionsForm = forwardRef(function ConditionsForm(
  props: ConditionsFormProps,
  ref: React.Ref<FormikProps<IConditionsEntry>>
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const [loadingSimulation, setLoadingSimulation] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);

    if (onSubmit) return;

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  };

  const simulateCDAT = () => {
    setLoadingSimulation(true);
    setTimeout(() => {
      const valueInvestment = Number(formik.values.valueInvestment);
      let deadlineDays: number;

      if (formik.values.simulationWithDate) {
        deadlineDays = 360;
        formik.setFieldValue("deadlineDays", deadlineDays);
      } else {
        deadlineDays = Number(formik.values.deadlineDays);
      }

      const filteredEffectiveAnnualRate = investmentsRatesMocks.find(
        (investmentsRate: IRate) =>
          deadlineDays >= investmentsRate.deadlineInitialDay &&
          deadlineDays <= investmentsRate.deadlineEndDay
      );

      const effectiveAnnualRate = filteredEffectiveAnnualRate
        ? removeLastCharacters(
            filteredEffectiveAnnualRate.AnnualEffectiveRate,
            1
          )
        : 0;

      const totalInterest = Math.round(
        valueInvestment * (effectiveAnnualRate / 100) * (deadlineDays / 365)
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
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      customHandleBlur={customHandleBlur}
      customHandleChange={customHandleChange}
      onFormValid={onFormValid}
    />
  );
});

export { ConditionsForm };
export type { ConditionsFormProps };
