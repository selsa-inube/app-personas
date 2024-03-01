import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { PersonalResidenceFormUI } from "./interface";
import { IPersonalResidenceEntry } from "./types";

const validationSchema = Yup.object({
  bankEntity: validationRules.name,
  dueDate: validationRules.date,
  tenant: validationRules.name,
  tenantCellPhone: validationRules.phone,
  ownerName: validationRules.name,
  ownerCellPhone: validationRules.phone,
});

interface PersonalResidenceFormProps {
  initialValues: IPersonalResidenceEntry;
  loading?: boolean;
  withSubmit?: boolean;
  onSubmit?: (values: IPersonalResidenceEntry) => void;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PersonalResidenceForm = forwardRef(function BankTransfersForm(
  props: PersonalResidenceFormProps,
  ref: React.Ref<FormikProps<IPersonalResidenceEntry>>,
) {
  const { initialValues, loading, withSubmit, onFormValid, onSubmit } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (formik.dirty && onFormValid) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  return (
    <PersonalResidenceFormUI
      loading={loading}
      formik={formik}
      withSubmit={withSubmit}
    />
  );
});

export { PersonalResidenceForm };
export type { PersonalResidenceFormProps };
