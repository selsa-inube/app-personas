import { IFormField } from "@ptypes/forms.types";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { generateDynamicForm } from "src/utils/forms";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { initalValuesCreditSimulation } from "../../config/initialValues";
import { structureDisbursementForm } from "./config/form";
import { DisbursementFormUI } from "./interface";
import { IDisbursementEntry } from "./types";

const initValidationSchema = Yup.object({
  disbursementType: Yup.string().required(validationMessages.required),
});

interface DisbursementFormProps {
  initialValues: IDisbursementEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IDisbursementEntry) => void;
  loading?: boolean;
}

const DisbursementForm = forwardRef(function DisbursementForm(
  props: DisbursementFormProps,
  ref: React.Ref<FormikProps<IDisbursementEntry>>
) {
  const { initialValues, onSubmit, onFormValid, loading } = props;

  const [dynamicForm, setDynamicForm] = useState<{
    renderFields: IFormField[];
    validationSchema: Yup.ObjectSchema<{}, Yup.AnyObject, {}, "">;
  }>({
    renderFields: [],
    validationSchema: initValidationSchema,
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
    if (formik.values.disbursementType) {
      const { renderFields, validationSchema } = generateDynamicForm(
        formik,
        structureDisbursementForm(formik)
      );

      setDynamicForm({
        renderFields,
        validationSchema: initValidationSchema.concat(validationSchema),
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

    if (name === "disbursementType") {
      formik.setValues({
        ...initalValuesCreditSimulation.disbursement,
        disbursementType: value,
      });

      updatedFormikValues = {
        ...initalValuesCreditSimulation.disbursement,
        disbursementType: value,
      };
    } else {
      formik.setFieldValue(name, value);
    }

    const { renderFields, validationSchema } = generateDynamicForm(
      {
        ...formik,
        values: updatedFormikValues,
      },
      structureDisbursementForm(formik)
    );

    setDynamicForm({
      renderFields,
      validationSchema: initValidationSchema.concat(validationSchema),
    });
  };

  return (
    <DisbursementFormUI
      loading={loading}
      formik={formik}
      customHandleBlur={customHandleBlur}
      customHandleChange={customHandleChange}
      renderFields={dynamicForm.renderFields}
    />
  );
});

export { DisbursementForm };
export type { DisbursementFormProps };
