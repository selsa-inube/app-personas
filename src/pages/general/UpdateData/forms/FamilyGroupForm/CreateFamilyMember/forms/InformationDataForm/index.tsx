import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { familyGroupRequiredFields } from "../../../config/formConfig";
import { InformationDataFormUI } from "./interface";
import { IInformationDataEntry } from "./types";

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
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
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
  ref: React.Ref<FormikProps<IInformationDataEntry>>,
) {
  const { initialValues, loading, readonly, onFormValid, onSubmit } = props;

  const [dynamicSchema, setDynamicSchema] = useState(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
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
        }),
      );

      setDynamicSchema(newValidationSchema);
    }
  }, []);

  useEffect(() => {
    if ((!readonly && formik.dirty) || readonly) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  return (
    <InformationDataFormUI
      loading={loading}
      formik={formik}
      readonly={readonly}
      validationSchema={dynamicSchema}
    />
  );
});

export { InformationDataForm };
export type { InformationDataFormProps };
