import * as Yup from "yup";
import { familyGroupRequiredFields } from "../../../config/formConfig";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import { IInformationDataEntry } from "./types";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { FormikProps, useFormik } from "formik";
import { InformationDataFormUI } from "./interface";

const validationSchema = Yup.object().shape({
  relationship: Yup.string(),
  isDependent: Yup.string(),
  educationLevel: familyGroupRequiredFields.educationLevel
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  profession: familyGroupRequiredFields.profession
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  gender: familyGroupRequiredFields.gender
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  birthDate: familyGroupRequiredFields.birthDate
    ? validationRules.date.required(validationMessages.required)
    : validationRules.date,
  businessActivity: familyGroupRequiredFields.businessActivity
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
});

interface InformationDataFormProps {
  initialValues: IInformationDataEntry;
  loading?: boolean;
  readonly?: boolean;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IInformationDataEntry) => void;
}

const InformationDataForm = forwardRef(function InformationDataForm(
  props: InformationDataFormProps,
  ref: React.Ref<FormikProps<IInformationDataEntry>>
) {
  const { initialValues, loading, readonly, onFormValid, onSubmit } = props;

  const [dynamicSchema, setDynamicSchema] = useState(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: onSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (!readonly) {
      const newValidationSchema = validationSchema.concat(
        Yup.object({
          relationship: familyGroupRequiredFields.relationship
            ? Yup.string().required(validationMessages.required)
            : Yup.string(),
          isDependent: familyGroupRequiredFields.isDependent
            ? Yup.string().required(validationMessages.required)
            : Yup.string(),
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
    <InformationDataFormUI
      loading={loading}
      formik={formik}
      readonly={readonly}
      customHandleBlur={customHandleBlur}
      isRequired={isRequired}
    />
  );
});

export { InformationDataForm };
export type { InformationDataFormProps };
