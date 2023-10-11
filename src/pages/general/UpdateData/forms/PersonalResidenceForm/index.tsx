import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { PersonalResidenceFormUI } from "./interface";
import { IPersonalResidenceEntry } from "./types";

const validationSchema = Yup.object({
  bankingEntity: validationRules.name.required(validationMessages.required),
  dueDate: validationRules.date.required(validationMessages.required),
  tenant: validationRules.name.required(validationMessages.required),
  tenantCellPhone: validationRules.phone.required(validationMessages.required),
  ownerName: validationRules.name.required(validationMessages.required),
  ownerCellPhone: validationRules.phone.required(validationMessages.required),
});

interface PersonalResidenceFormProps {
  initialValues: IPersonalResidenceEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit?: (values: IPersonalResidenceEntry) => void;
  loading?: boolean;
}

const PersonalResidenceForm = forwardRef(function BankTransfersForm(
  props: PersonalResidenceFormProps,
  ref: React.Ref<FormikProps<IPersonalResidenceEntry>>
) {
  const { initialValues, onFormValid, handleSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);

    if (handleSubmit) return;

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  };

  return (
    <PersonalResidenceFormUI
      loading={loading}
      formik={formik}
      customHandleBlur={customHandleBlur}
    />
  );
});

export { PersonalResidenceForm };
export type { PersonalResidenceFormProps };
