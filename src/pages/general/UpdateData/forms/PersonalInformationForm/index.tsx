import { useAuth } from "@inube/auth";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { AppContext } from "src/context/app";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { PersonalInformationFormUI } from "./interface";
import { IPersonalInformationEntry } from "./types";

const validationSchema = Yup.object({
  expeditionDate: Yup.string().required(validationMessages.required),
  birthDate: Yup.string().required(validationMessages.required),
});

interface PersonalInformationFormProps {
  initialValues: IPersonalInformationEntry;
  loading?: boolean;
  withSubmit?: boolean;
  onSubmit?: (values: IPersonalInformationEntry) => void;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PersonalInformationForm = forwardRef(function PersonalInformationForm(
  props: PersonalInformationFormProps,
  ref: React.Ref<FormikProps<IPersonalInformationEntry>>,
) {
  const { initialValues, loading, withSubmit, onFormValid, onSubmit } = props;
  const { serviceDomains, loadServiceDomains } = useContext(AppContext);
  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (formik.dirty) {
      formik.validateForm().then((errors) => {
        onFormValid && onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  const validateEnums = async () => {
    if (!accessToken) return;

    if (
      serviceDomains.integratedbanks.length > 0 &&
      serviceDomains.identificationtype.length > 0
    )
      return;

    loadServiceDomains(["identificationtype"], accessToken);
  };

  useEffect(() => {
    validateEnums();
  }, [accessToken]);

  return (
    <PersonalInformationFormUI
      loading={loading}
      formik={formik}
      withSubmit={withSubmit}
      serviceDomains={serviceDomains}
    />
  );
});

export { PersonalInformationForm };
export type { PersonalInformationFormProps };
