import * as Yup from "yup";
import { familyGroupRequiredFields } from "../../../config/formConfig";
import { validationRules } from "src/validations/validationRules";
import { validationMessages } from "src/validations/validationMessages";
import { IIdentificationDataEntry } from "./types";
import { forwardRef, useImperativeHandle, useState } from "react";
import { FormikProps, useFormik } from "formik";
import { IdentificationDataFormUI } from "./interface";

const validationSchema = Yup.object().shape({
  identificationNumber: familyGroupRequiredFields.identificationNumber
    ? validationRules.identification.required(validationMessages.required)
    : validationRules.identification,
});

interface IdentificationDataFormProps {
  initialValues: IIdentificationDataEntry;
  loading?: boolean;
  isMobile?: boolean;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IIdentificationDataEntry) => void;
}

const IdentificationDataForm = forwardRef(function IdentificationDataForm(
  props: IdentificationDataFormProps,
  ref: React.Ref<FormikProps<IIdentificationDataEntry>>
) {
  const { initialValues, loading, isMobile, onFormValid, onSubmit } = props;
  const [dynamicSchema, setDynamicSchema] = useState(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
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

  const isRequired = (fieldName: string): boolean => {
    const fieldDescription = dynamicSchema.describe().fields[fieldName] as any;
    return !fieldDescription.nullable && !fieldDescription.optional;
  };

  return (
    <IdentificationDataFormUI
      formik={formik}
      loading={loading}
      isMobile={isMobile}
      customHandleBlur={customHandleBlur}
      isRequired={isRequired}
    />
  );
});

export { IdentificationDataForm };
export type { IdentificationDataFormProps };
