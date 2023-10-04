import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { PersonalResidenceFormUI } from "./interface";
import { IPersonalResidenceEntry } from "./types";

const validationSchema = Yup.object({
  bankingEntity: validationRules.bankingEntity.required(
    validationMessages.required
  ),
  dueDate: validationRules.date.required(validationMessages.required),
  tenant: validationRules.name.required(validationMessages.required),
  tenantCellPhone: validationRules.phone.required(validationMessages.required),
  ownerName: validationRules.name.required(validationMessages.required),
  ownerCellPhone: validationRules.phone.required(validationMessages.required),
});

interface PersonalResidenceFormProps {
  initialValues: IPersonalResidenceEntry;
  handleSubmit?: (values: IPersonalResidenceEntry) => void;
  loading?: boolean;
}

const PersonalResidenceForm = forwardRef(function BankTransfersForm(
  props: PersonalResidenceFormProps,
  ref: React.Ref<FormikProps<IPersonalResidenceEntry>>
) {
  const { initialValues, handleSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  return <PersonalResidenceFormUI loading={loading} formik={formik} />;
});

export { PersonalResidenceForm };
export type { PersonalResidenceFormProps };
