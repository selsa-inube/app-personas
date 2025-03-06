import { useAuth } from "@inube/auth";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { RequestType } from "src/model/entity/request";
import { getLink } from "src/services/iclient/links/getLink";
import { getTermsConditions } from "src/services/iclient/termsConditions/getTermsConditions";
import * as Yup from "yup";
import { TermsAndConditionsFormUI } from "./interface";
import { ITermsAndConditionsEntry } from "./types";

const validationSchema = Yup.object({
  accept: Yup.boolean(),
  acceptDataPolicy: Yup.boolean().test((value) => value === true),
});

interface TermsAndConditionsFormProps {
  initialValues: ITermsAndConditionsEntry;
  productId: string;
  productType: RequestType;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: ITermsAndConditionsEntry) => void;
}

const TermsAndConditionsForm = forwardRef(function TermsAndConditionsForm(
  props: TermsAndConditionsFormProps,
  ref: React.Ref<FormikProps<ITermsAndConditionsEntry>>,
) {
  const { initialValues, productId, productType, onFormValid, onSubmit } =
    props;

  const { accessToken } = useAuth();
  const [dynamicValidationSchema, setDynamicValidationSchema] =
    useState(validationSchema);

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicValidationSchema,
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

    setLoading(true);
    getTermsConditions(accessToken, productId, productType).then(
      (termsConditions) => {
        formik.setFieldValue(
          "termsConditions",
          termsConditions?.termsConditions || [],
        );
        formik.setFieldValue("ids", termsConditions?.codes);

        if (formik.values.termsConditions.length > 0) {
          const newValidationSchema = validationSchema.concat(
            Yup.object({
              accept: Yup.boolean().test((value) => value === true),
            }),
          );

          setDynamicValidationSchema(newValidationSchema);
        }

        setLoading(false);
      },
    );

    getLink(accessToken, "PersonalDataPolicy").then((dataPolicyUrl) => {
      formik.setFieldValue("dataPolicyUrl", dataPolicyUrl);
    });
  }, []);

  return <TermsAndConditionsFormUI loading={loading} formik={formik} />;
});

export { TermsAndConditionsForm };
export type { TermsAndConditionsFormProps };
