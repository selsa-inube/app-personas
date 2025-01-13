import { useAuth } from "@inube/auth";
import { FormikProps, useFormik } from "formik";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "src/context/app";
import { aidTypeDM } from "src/model/domains/services/aids/aidTypeDM";
import * as Yup from "yup";
import { DetailsSituationFormUI } from "./interface";
import { IDetailsSituationEntry } from "./types";
import { valuesAndValidationsAid } from "./utils";

const validationSchema = Yup.object().shape({
  message: Yup.string(),
});

interface DetailsSituationFormProps {
  initialValues: IDetailsSituationEntry;
  beneficiaryId: string;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetailsSituationForm = forwardRef(function DetailsSituationForm(
  props: DetailsSituationFormProps,
  ref: React.Ref<FormikProps<IDetailsSituationEntry>>,
) {
  const { initialValues, beneficiaryId, onFormValid } = props;
  const location = useLocation();
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);

  const [dynamicSchema, setDynamicSchema] =
    useState<Yup.ObjectSchema<Yup.AnyObject>>(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicSchema,
    validateOnBlur: false,
    onSubmit: async () => true,
  });

  useImperativeHandle(ref, () => formik);

  const withAmount = location.state?.type.id === aidTypeDM.REQUIRED_AMOUNT.id;

  const withDays = location.state?.type.id === aidTypeDM.REQUIRED_DAYS.id;

  useEffect(() => {
    formik.setFieldValue("aidId", location.state?.id);
    formik.setFieldValue("aidName", location.state?.title);
    formik.setFieldValue("aidType", location.state?.type);
  }, []);

  useEffect(() => {
    if (!accessToken || !user.identification) return;

    valuesAndValidationsAid(
      accessToken,
      beneficiaryId,
      user.identification,
      location.state?.id || "",
      dynamicSchema,
      withAmount,
      withDays,
      formik,
    ).then((newValidationSchema) => {
      setDynamicSchema(newValidationSchema);
    });
  }, [accessToken, beneficiaryId, location.state?.id, user?.identification]);

  useEffect(() => {
    formik.validateForm().then((errors) => {
      onFormValid && onFormValid(Object.keys(errors).length === 0);
    });
  }, [formik.values, dynamicSchema]);

  return (
    <DetailsSituationFormUI
      formik={formik}
      withAmount={withAmount}
      withDays={withDays}
    />
  );
});

export { DetailsSituationForm };
export type { DetailsSituationFormProps };
