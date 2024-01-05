import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { GoalFormUI } from "./interface";
import { IGoalEntry } from "./types";
import { deduceDaysNumber, deduceRefundDate } from "./utils";

const validationSchema = Yup.object({
  daysNumber: Yup.number(),
  refundDate: Yup.string(),
});

interface GoalFormProps {
  initialValues: IGoalEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IGoalEntry) => void;
  loading?: boolean;
}

const GoalForm = forwardRef(function GoalForm(
  props: GoalFormProps,
  ref: React.Ref<FormikProps<IGoalEntry>>
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;
  const [dynamicValidationSchema, setDynamicValidationSchema] =
    useState(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicValidationSchema,
    validateOnChange: false,
    onSubmit: onSubmit || (() => {}),
    enableReinitialize: true,
  });

  useImperativeHandle(ref, () => formik);

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);

    if (
      "name" in event.target &&
      event.target.name === "daysNumber" &&
      formik.values.daysNumber !== ""
    ) {
      formik.setFieldValue(
        "refundDate",
        deduceRefundDate(Number(formik.values.daysNumber))
      );
    }

    if (
      "name" in event.target &&
      event.target.name === "refundDate" &&
      formik.values.refundDate !== ""
    ) {
      formik.setFieldValue(
        "daysNumber",
        deduceDaysNumber(formik.values.refundDate)
      );
    }

    if (onSubmit) return;

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  };

  const customHandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    formik.handleChange(event);

    if (event.target.name === "goalWithDate") {
      formik.setFieldValue("daysNumber", "");
      formik.setFieldValue("refundDate", "");
      formik.setFormikState((state) => {
        return {
          ...state,
          touched: {
            ...state.touched,
            daysNumber: false,
            refundDate: false,
          },
        };
      });

      const checked = "checked" in event.target && event.target.checked;

      if (checked) {
        const newValidationSchema = validationSchema.concat(
          Yup.object({
            refundDate: validationRules.date
              .concat(validationRules.notPastDate)
              .required(validationMessages.required),
          })
        );

        setDynamicValidationSchema(newValidationSchema);
      } else {
        const newValidationSchema = validationSchema.concat(
          Yup.object({
            daysNumber: Yup.number().required(validationMessages.required),
          })
        );

        setDynamicValidationSchema(newValidationSchema);
      }
    }

    onFormValid(false);
  };

  return (
    <GoalFormUI
      loading={loading}
      formik={formik}
      customHandleBlur={customHandleBlur}
      customHandleChange={customHandleChange}
    />
  );
});

export { GoalForm };
export type { GoalFormProps };
