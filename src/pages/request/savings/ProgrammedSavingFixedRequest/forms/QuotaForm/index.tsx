import { IFormField } from "@ptypes/forms.types";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { generateDynamicForm } from "src/utils/forms/forms";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { initalValuesProgrammedSavingFixed } from "../../config/initialValues";
import { structureQuotaForm } from "./config/form";
import { QuotaFormUI } from "./interface";
import { IQuotaEntry } from "./types";

const initValidationSchema = Yup.object({
  periodicValue: validationRules.money.required(validationMessages.required),
  paymentMethod: Yup.string().required(validationMessages.required),
  periodicity: Yup.string().required(validationMessages.required),
  paydayTypeToSelect: Yup.string(),
  paydayByDate: validationRules.notPastDate,
});

interface QuotaFormProps {
  initialValues: IQuotaEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IQuotaEntry) => void;
  loading?: boolean;
}

const QuotaForm = forwardRef(function QuotaForm(
  props: QuotaFormProps,
  ref: React.Ref<FormikProps<IQuotaEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const [dynamicForm, setDynamicForm] = useState<{
    renderFields: IFormField[];
    validationSchema: Yup.ObjectSchema<object, Yup.AnyObject, object, "">;
  }>({
    renderFields: [],
    validationSchema: initValidationSchema,
  });

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicForm.validationSchema,
    validateOnChange: false,
    onSubmit: onSubmit || (() => true),
    enableReinitialize: true,
  });

  useImperativeHandle(ref, () => formik);

  let valuePeriodicity = formik.values.periodicity;

  useEffect(() => {
    if (formik.values.paymentMethod) {
      const { renderFields, validationSchema } = generateDynamicForm(
        formik,
        structureQuotaForm(formik, valuePeriodicity),
      );

      const newValidationSchema = initValidationSchema.concat(
        Yup.object({
          periodicValue: validationRules.money.required(
            validationMessages.required,
          ),
          paymentMethod: Yup.string().required(validationMessages.required),
          periodicity: Yup.string().required(validationMessages.required),
          paydayTypeToSelect: Yup.string(),
          paydayByDate: validationRules.notPastDate,
        }),
      );

      setDynamicForm({
        renderFields,
        validationSchema: validationSchema.concat(newValidationSchema),
      });
    }
  }, []);

  const customHandleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    let updatedFormikValues = {
      ...formik.values,
      [name]: value,
    };

    if (name === "paymentMethod") {
      formik.setValues({
        ...initalValuesProgrammedSavingFixed.quota,
        periodicValue: formik.values.periodicValue,
        paymentMethod: value,
      });
      updatedFormikValues = {
        ...initalValuesProgrammedSavingFixed.quota,
        periodicValue: formik.values.periodicValue,
        paymentMethod: value,
      };
    } else {
      formik.setFieldValue(name, value);
    }

    if (name === "periodicity") {
      valuePeriodicity = value;
    }

    const { renderFields, validationSchema } = generateDynamicForm(
      {
        ...formik,
        values: updatedFormikValues,
      },
      structureQuotaForm(formik, valuePeriodicity),
    );
    const newValidationSchema = initValidationSchema.concat(
      Yup.object({
        periodicValue: validationRules.money.required(
          validationMessages.required,
        ),
        paymentMethod: Yup.string().required(validationMessages.required),
        periodicity: Yup.string().required(validationMessages.required),
        paydayTypeToSelect: Yup.string(),
        paydayByDate: validationRules.notPastDate,
      }),
    );

    setDynamicForm({
      renderFields,
      validationSchema: validationSchema.concat(newValidationSchema),
    });
  };

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);

    if (onSubmit) return;

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  };

  return (
    <QuotaFormUI
      loading={loading}
      formik={formik}
      customHandleBlur={customHandleBlur}
      renderFields={dynamicForm.renderFields}
      customHandleChange={customHandleChange}
    />
  );
});

export { QuotaForm };
export type { QuotaFormProps };
