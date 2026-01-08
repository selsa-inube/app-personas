import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { ResidenceDetailsFormUI } from "./interface";
import { IResidenceDetailsEntry } from "./types";
import { IServiceDomains } from "src/context/app/types";

const getValidationSchema = (residenceType: string) => {
  const baseSchema = {
    stratum: Yup.string().required(validationMessages.required),
  };

  if (residenceType === "rent") {
    return Yup.object({
      ...baseSchema,
      landlordName: validationRules.name.required(validationMessages.required),
      landlordPhone: validationRules.phone.required(validationMessages.required),
    });
  }

  if (residenceType === "familiar") {
    return Yup.object({
      ...baseSchema,
      ownerName: validationRules.name.required(validationMessages.required),
      relationship: Yup.string().required(validationMessages.required),
      ownerPhone: validationRules.phone.required(validationMessages.required),
    });
  }

  if (residenceType === "other") {
    return Yup.object({
      ...baseSchema,
      otherType: Yup.string().required(validationMessages.required),
    });
  }

  if (residenceType === "ownWithMortgage") {
    return Yup.object({
      ...baseSchema,
      bankEntityCode: Yup.string().required(validationMessages.required),
      bankEntityName: Yup.string().required(validationMessages.required),
      dueDate: Yup.string().required(validationMessages.required),
    });
  }

  return Yup.object(baseSchema);
};

interface ResidenceDetailsFormProps {
  initialValues: IResidenceDetailsEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  serviceDomains: IServiceDomains;
  residenceType: string;
  loading?: boolean;
  onSubmit?: (values: IResidenceDetailsEntry) => void;
}

const ResidenceDetailsForm = forwardRef(function ResidenceDetailsForm(
  props: ResidenceDetailsFormProps,
  ref: React.Ref<FormikProps<IResidenceDetailsEntry>>,
) {
  const {
    initialValues,
    onFormValid,
    serviceDomains,
    residenceType,
    loading,
    onSubmit,
  } = props;

  const validationSchema = getValidationSchema(residenceType);

  const localFormik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => localFormik);

  useEffect(() => {
    if (localFormik.dirty) {
      localFormik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [localFormik.values]);

  useEffect(() => {
    localFormik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  }, [residenceType]);

  return (
    <ResidenceDetailsFormUI
      localFormik={localFormik}
      loading={loading}
      validationSchema={validationSchema}
      serviceDomains={serviceDomains}
      residenceType={residenceType}
    />
  );
});

export { ResidenceDetailsForm };
export type { ResidenceDetailsFormProps };
