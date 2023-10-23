import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { DisbursementFormUI } from "./interface";
import { IDisbursementEntry } from "./types";
import { disbursementCustomValidationSchemas } from "./config/validationSchema";

const validationSchema = Yup.object({
  creditDisbursement: Yup.string().required(validationMessages.required),
});

interface DisbursementFormProps {
  initialValues: IDisbursementEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit?: (values: IDisbursementEntry) => void;
  loading?: boolean;
}

const DisbursementForm = forwardRef(function DisbursementForm(
  props: DisbursementFormProps,
  ref: React.Ref<FormikProps<IDisbursementEntry>>
) {
  const { initialValues, handleSubmit, onFormValid, loading } = props;

  const [dynamicValidationSchema, setDynamicValidationSchema] =
    useState(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicValidationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);

    if (handleSubmit) return;

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  };
  
  const customHandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (!name || !value) {
      return;
    }

    formik.setFieldValue(name, value);

    if (validationSchema && disbursementCustomValidationSchemas) {
      const customValidationSchema =
        disbursementCustomValidationSchemas[name]?.[value];

      if (
        customValidationSchema &&
        Yup.object().isType(customValidationSchema)
      ) {
        const newValidationSchema = validationSchema.concat(
          customValidationSchema
        ) as Yup.ObjectSchema<{ creditDisbursement: string }>;
        setDynamicValidationSchema(newValidationSchema);
      }
    }
  };

  return (
    <DisbursementFormUI
      loading={loading}
      formik={formik}
      customHandleBlur={customHandleBlur}
      customHandleChange={customHandleChange}
    />
  );
});

export { DisbursementForm };
export type { DisbursementFormProps };
