import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { ReimbursementFormUI } from "./interface";
import { IReimbursementEntry } from "./types";
import { valuesOptionsReimbursement } from "./utils";

const validationSchema = Yup.object({
  reimbursementType: Yup.string().required(validationMessages.required),
  accountReimbursement: Yup.string().required(validationMessages.required),
});

interface ReimbursementFormProps {
  initialValues: IReimbursementEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IReimbursementEntry) => void;
  loading?: boolean;
}

const ReimbursementForm = forwardRef(function ReimbursementForm(
  props: ReimbursementFormProps,
  ref: React.Ref<FormikProps<IReimbursementEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: onSubmit || (() => true),
    enableReinitialize: true,
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    const valueReimbursementType = formik.values.reimbursementType;

    const valuesReimbursement = valuesOptionsReimbursement(
      valueReimbursementType,
    );

    if (valuesReimbursement && valuesReimbursement.length == 1) {
      formik.setFieldValue("accountReimbursement", valuesReimbursement[0].id);
    }
  }, []);

  const customHandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    formik.handleChange(event);
    const { value } = event.target;

    const valuesReimbursement = valuesOptionsReimbursement(value);

    if (valuesReimbursement && valuesReimbursement.length == 1) {
      formik.setFieldValue("accountReimbursement", valuesReimbursement[0].id);
    }
  };

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);

    if (onSubmit) return;

    formik.validateForm().then((errors) => {
      return onFormValid(Object.keys(errors).length === 0);
    });
  };

  return (
    <ReimbursementFormUI
      loading={loading}
      formik={formik}
      customHandleBlur={customHandleBlur}
      customHandleChange={customHandleChange}
    />
  );
});

export { ReimbursementForm };
export type { ReimbursementFormProps };
