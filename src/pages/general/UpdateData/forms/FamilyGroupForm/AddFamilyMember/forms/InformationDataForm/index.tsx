import * as Yup from "yup";
import { FamilyGroupRequiredFields } from "../../../config/formConfig";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import { IInformationDataEntry } from "./types";
import { forwardRef, useImperativeHandle, useState } from "react";
import { FormikProps, useFormik } from "formik";
import { InformationDataFormUI } from "./interface";

const validationSchema = Yup.object().shape({
  relationship: FamilyGroupRequiredFields.relationship
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  isDependent: FamilyGroupRequiredFields.isDependent
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  educationLevel: FamilyGroupRequiredFields.educationLevel
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  profession: FamilyGroupRequiredFields.profession
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  gender: FamilyGroupRequiredFields.gender
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  birthDate: FamilyGroupRequiredFields.birthDate
    ? validationRules.date.required(validationMessages.required)
    : validationRules.date,
  businessActivity: FamilyGroupRequiredFields.businessActivity
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
});

interface InformationDataFormProps {
  initialValues: IInformationDataEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IInformationDataEntry) => void;
  loading?: boolean;
}

const InformationDataForm = forwardRef(function InformationDataForm(
  props: InformationDataFormProps,
  ref: React.Ref<FormikProps<IInformationDataEntry>>
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

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
    <InformationDataFormUI
      loading={loading}
      formik={formik}
      customHandleBlur={customHandleBlur}
      isRequired={isRequired}
    />
  );
});

export { InformationDataForm };
export type { InformationDataFormProps };
