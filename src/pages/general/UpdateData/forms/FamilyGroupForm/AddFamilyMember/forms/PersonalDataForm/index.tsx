import * as Yup from "yup";
import { FamilyGroupRequiredFields } from "../../../config/formConfig";
import { validationRules } from "src/validations/validationRules";
import { validationMessages } from "src/validations/validationMessages";
import { IPersonalDataEntry } from "./types";
import { forwardRef, useImperativeHandle, useState } from "react";
import { FormikProps, useFormik } from "formik";
import { PersonalDataFormUI } from "./interface";

const validationSchema = Yup.object().shape({
  identificationNumber: FamilyGroupRequiredFields.identificationNumber
    ? validationRules.identification.required(validationMessages.required)
    : validationRules.identification,
  type: FamilyGroupRequiredFields.type
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  firstName: FamilyGroupRequiredFields.firstName
    ? validationRules.name.required(validationMessages.required)
    : validationRules.name,
  secondName: FamilyGroupRequiredFields.secondName
    ? validationRules.name.required(validationMessages.required)
    : validationRules.name,
  firstLastName: FamilyGroupRequiredFields.firstLastName
    ? validationRules.name.required(validationMessages.required)
    : validationRules.name,
  secondLastName: FamilyGroupRequiredFields.secondLastName
    ? validationRules.name.required(validationMessages.required)
    : validationRules.name,
  relationship: FamilyGroupRequiredFields.relationship
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  isDependent: FamilyGroupRequiredFields.isDependent
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
});

interface PersonalDataFormProps {
  initialValues: IPersonalDataEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IPersonalDataEntry) => void;
  loading?: boolean;
}

const PersonalDataForm = forwardRef(function IdentificationForm(
    props: PersonalDataFormProps,
    ref: React.Ref<FormikProps<IPersonalDataEntry>>
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
      <PersonalDataFormUI
        loading={loading}
        formik={formik}
        customHandleBlur={customHandleBlur}
        isRequired={isRequired}
      />
    );
  });
  
  export { PersonalDataForm };
  export type { PersonalDataFormProps };
