import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { DeadlineFormUI } from "./interface";
import { IDeadlineEntry } from "./types";
import { getInitialCdatDeadlineValidations, validationSchema } from "./utils";

interface DeadlineFormProps {
  initialValues: IDeadlineEntry;
  loading?: boolean;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IDeadlineEntry) => void;
}

const DeadlineForm = forwardRef(function DeadlineForm(
  props: DeadlineFormProps,
  ref: React.Ref<FormikProps<IDeadlineEntry>>,
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
    formik.setFieldValue("simulationWithDays", true);
    setDynamicValidationSchema(getInitialCdatDeadlineValidations());
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

      formik.setFieldValue("effectiveAnnualRate", 10);
      formik.setFieldValue("totalInterest", 10000);
      formik.setFieldValue("withholdingTax", 0);
      formik.setFieldValue("netValue", valueInvestment);
      formik.setFieldValue("hasResult", true);
      setLoadingSimulation(false);
      onFormValid(true);
    }, 1000);
  };

  const customHandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    formik.handleChange(event);

    if (
      event.target.name === "simulationWithDate" ||
      event.target.name === "simulationWithDays"
    ) {
      const fieldsToReset = [
        "deadlineDate",
        "deadlineDays",
        "totalInterest",
        "withholdingTax",
        "netValue",
        "hasResult",
      ];

      fieldsToReset.forEach((field) => formik.setFieldValue(field, ""));
      formik.setFormikState((state) => ({
        ...state,
        touched: {
          ...state.touched,
          deadlineDate: false,
          deadlineDays: false,
        },
      }));

      const checked = "checked" in event.target && event.target.checked;
      if (!checked) return;

      let newValidationSchema = dynamicValidationSchema;

      if (event.target.name === "simulationWithDate") {
        newValidationSchema = dynamicValidationSchema.concat(
          Yup.object({
            deadlineDate: validationRules.notPastDate.required(
              validationMessages.required,
            ),
          }),
        );
      } else if (event.target.name === "simulationWithDays") {
        newValidationSchema = dynamicValidationSchema.concat(
          Yup.object({
            deadlineDays: Yup.number()
              .min(
                90,
                `El plazo minimo en días debe ser mayor o igual a:  ${90} días`,
              )
              .max(
                90,
                `El plazo máximo en días debe ser menor o igual a:  ${90} días`,
              ),
          }),
        );
      }

      setDynamicValidationSchema(newValidationSchema);
    }
    
    formik.setFieldValue("hasResult", false);
    onFormValid(false);
  };

  return (
    <DeadlineFormUI
      loading={loading}
      formik={formik}
      loadingSimulation={loadingSimulation}
      simulateCDAT={simulateCDAT}
      customHandleChange={customHandleChange}
      onFormValid={onFormValid}
    />
  );
});

export { DeadlineForm };
export type { DeadlineFormProps };
