import { useAuth } from "@inube/auth";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { getTermsConditions } from "src/services/iclient/credits/getTermsConditions";
import * as Yup from "yup";
import { TermsAndConditionsFormUI } from "./interface";
import { ITermsAndConditionsEntry } from "./types";

const validationSchema = Yup.object({
  accept: Yup.boolean().test((value) => value === true),
  acceptDataPolicy: Yup.boolean().test((value) => value === true),
});

interface TermsAndConditionsFormProps {
  initialValues: ITermsAndConditionsEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: ITermsAndConditionsEntry) => void;
  loading?: boolean;
}

const TermsAndConditionsForm = forwardRef(function TermsAndConditionsForm(
  props: TermsAndConditionsFormProps,
  ref: React.Ref<FormikProps<ITermsAndConditionsEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (formik.dirty) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  useEffect(() => {
    if (!accessToken) return;

    getTermsConditions(accessToken, formik.values.productId).then(
      (termsConditions) => {
        formik.setFieldValue(
          "termsConditions",
          termsConditions?.termsConditions,
        );
        formik.setFieldValue("ids", termsConditions?.codes);
      },
    );
  }, []);

  return <TermsAndConditionsFormUI loading={loading} formik={formik} />;
});

export { TermsAndConditionsForm };
export type { TermsAndConditionsFormProps };
