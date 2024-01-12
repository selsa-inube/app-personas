import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import * as Yup from "yup";
import { IReimbursementEntry } from "./types";
import { ReimbursementFormUI } from "./interface";
import { validationMessages } from "src/validations/validationMessages";

const validationSchema = Yup.object({
    reimbursementType: Yup.string().required(validationMessages.required),
    accountReimbursement: Yup.string(),
  });
  
  interface ReimbursementFormProps {
    initialValues: IReimbursementEntry;
    onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit?: (values: IReimbursementEntry) => void;
    loading?: boolean;
  }

  const ReimbursementForm= forwardRef(function ReimbursementForm(
    props: ReimbursementFormProps,
    ref: React.Ref<FormikProps<IReimbursementEntry>>
  ) {
    const { initialValues, onFormValid, onSubmit, loading } = props;

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        validateOnChange: false,
        onSubmit: onSubmit || (() => {}),
        enableReinitialize: true,
      });
    
      useImperativeHandle(ref, () => formik);


      const customHandleChange = (fieldName: string, value: string) => {
        formik.setFieldValue(fieldName, value);
      };

      const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
        formik.handleBlur(event);
    
        if (onSubmit) return;
    
        formik.validateForm().then((errors) => {
          onFormValid(Object.keys(errors).length === 0);
        });
      };

      

    return (
        <ReimbursementFormUI
          loading={loading}
          formik={formik}
          customHandleBlur={customHandleBlur}
          // customHandleChange={customHandleChange}
        />
      );
  })

  export {ReimbursementForm}
  export type {ReimbursementFormProps}