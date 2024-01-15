import * as Yup from "yup";
import { familyGroupRequiredFields } from "../../../config/formConfig";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import { IContactDataEntry } from "./types";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { FormikProps, useFormik } from "formik";
import { ContactDataFormUI } from "./interface";

const validationSchema = Yup.object({
  cellPhone: validationRules.phone.required(validationMessages.required),
  email: validationRules.email.required(validationMessages.required),
});

interface ContactDataFormProps {
  initialValues: IContactDataEntry;
  loading?: boolean;
  readOnly?: boolean;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IContactDataEntry) => void;
}

const ContactDataForm = forwardRef(function ContactDataForm(
  props: ContactDataFormProps,
  ref: React.Ref<FormikProps<IContactDataEntry>>
) {
  const { initialValues, loading, readOnly, onFormValid, onSubmit } = props;

  const [dynamicSchema, setDynamicSchema] = useState<Yup.ObjectSchema<IContactDataEntry>>(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: onSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (readOnly) {
      const newValidationSchema = validationSchema.concat(
        Yup.object({
          cellPhone: validationRules.phone,
          email: validationRules.email,
        })
      );

      setDynamicSchema(newValidationSchema);
    }
  }, []);

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);

    if (onSubmit) return;

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  };

  const isRequired = (fieldName: string): boolean => {
    const fieldDescription = dynamicSchema.describe().fields[fieldName] as any;

    if (fieldDescription && typeof fieldDescription === "object") {
      return !fieldDescription.nullable && !fieldDescription.optional;
    }

    return false;
  };

  return (
    <ContactDataFormUI
      loading={loading}
      formik={formik}
      readOnly={readOnly}
      customHandleBlur={customHandleBlur}
      isRequired={isRequired}
    />
  );
});

export { ContactDataForm };
export type { ContactDataFormProps };
