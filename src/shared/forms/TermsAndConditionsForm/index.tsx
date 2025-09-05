import { useAuth } from "@inube/auth";
import { captureNewError, mapRequestErrorToTag } from "@utils/handleErrors";
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
  requestType: RequestType;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: ITermsAndConditionsEntry) => void;
}

const TermsAndConditionsForm = forwardRef(function TermsAndConditionsForm(
  props: TermsAndConditionsFormProps,
  ref: React.Ref<FormikProps<ITermsAndConditionsEntry>>,
) {
  const { initialValues, productId, requestType, onFormValid, onSubmit } =
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

  const handleGetTermsAndConditions = async () => {
    if (!accessToken) return;

    setLoading(true);
    getTermsConditions(accessToken, productId, requestType)
      .then((termsConditions) => {
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
      })
      .catch((error) => {
        captureNewError(
          error,
          {
            inFunction: "handleGetTermsAndConditions",
            action: "getTermsConditions",
            screen: "TermsAndConditionsForm",
            description:
              "Error in fetching terms and conditions for " +
              mapRequestErrorToTag(requestType),
            file: "src/shared/forms/TermsAndConditionsForm/index.tsx",
          },
          { feature: mapRequestErrorToTag(requestType) },
        );
      });
  };

  const handleGetLinkPolicy = async () => {
    if (!accessToken) return;

    getLink(accessToken, "PersonalDataPolicy")
      .then((dataPolicyUrl) => {
        formik.setFieldValue("dataPolicyUrl", dataPolicyUrl);
      })
      .catch((error) => {
        captureNewError(
          error,
          {
            inFunction: "handleGetLinkPolicy",
            action: "getLink",
            screen: "TermsAndConditionsForm",
            description:
              "Error in fetching data policy link for " +
              mapRequestErrorToTag(requestType),
            file: "src/shared/forms/TermsAndConditionsForm/index.tsx",
          },
          { feature: mapRequestErrorToTag(requestType) },
        );
      });
  };

  useEffect(() => {
    handleGetTermsAndConditions();

    handleGetLinkPolicy();
  }, []);

  return <TermsAndConditionsFormUI loading={loading} formik={formik} />;
});

export { TermsAndConditionsForm };
export type { TermsAndConditionsFormProps };
