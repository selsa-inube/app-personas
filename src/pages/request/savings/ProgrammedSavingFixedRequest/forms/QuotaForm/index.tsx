import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { validationRules } from "src/validations/validationRules";
import { QuotaFormUI } from "./interface";
import { IQuotaEntry } from "./types";
import { IFormField } from "@ptypes/forms.types";
import { initalValuesProgrammedSavingFixed } from "../../config/initialValues";
import { generateDynamicForm } from "src/utils/forms";
import { structureQuotaForm } from "./config/form";

const validationSchema = Yup.object({
  PeriodicValue: validationRules.money.required(validationMessages.required),
});

interface QuotaFormProps {
  initialValues: IQuotaEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IQuotaEntry) => void;
  loading?: boolean;
}

const QuotaForm = forwardRef(function QuotaForm(
  props: QuotaFormProps,
  ref: React.Ref<FormikProps<IQuotaEntry>>
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const [dynamicForm, setDynamicForm] = useState<{
    renderFields: IFormField[];
    validationSchema: Yup.ObjectSchema<{}, Yup.AnyObject, {}, "">;
  }>({
    renderFields: [],
    validationSchema: validationSchema,
  });

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicForm.validationSchema,
    validateOnChange: false,
    onSubmit: onSubmit || (() => {}),
    enableReinitialize: true,
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (formik.values.paymentMethod) {
      const { renderFields, validationSchema } = generateDynamicForm(
        formik,
        structureQuotaForm(formik)
      );

      setDynamicForm({
        renderFields,
        validationSchema: validationSchema.concat(validationSchema),
      });
    }
  }, []);

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);

    if (onSubmit) return;

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  };

  const customHandleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    let updatedFormikValues = {
      ...formik.values,
      [name]: value,
    };

    if (name === "paymentMethod") {
      formik.setValues({
        ...initalValuesProgrammedSavingFixed.quota,
        PeriodicValue: formik.values.PeriodicValue,
        paymentMethod: value,
      });
    } else {
      formik.setFieldValue(name, value);
    }

    const { renderFields, validationSchema } = generateDynamicForm(
      {
        ...formik,
        values: updatedFormikValues,
      },
      structureQuotaForm(formik)
    );

    setDynamicForm({
      renderFields,
      validationSchema: validationSchema.concat(validationSchema),
    });
  };

  return (
    <QuotaFormUI
      loading={loading}
      formik={formik}
      customHandleBlur={customHandleBlur}
      onFormValid={onFormValid}
      renderFields={dynamicForm.renderFields}
      customHandleChange={customHandleChange}
    />
  );
});

export { QuotaForm };
export type { QuotaFormProps };
