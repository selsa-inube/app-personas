import { useAuth } from "@inube/auth";
import { FormikProps, useFormik } from "formik";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
} from "react";
import { AppContext } from "src/context/app";
import { shareMaturityDM } from "src/model/domains/savings/shareMaturityDM";
import { getSharesMaturity } from "src/services/iclient/savings/getSharesMaturity";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { ShareMaturityFormUI } from "./interface";
import { IShareMaturityEntry } from "./types";

const validationSchema = Yup.object({
  shareMaturity: Yup.string().required(validationMessages.required),
  shareMaturityName: Yup.string().required(validationMessages.required),
});

interface ShareMaturityFormProps {
  initialValues: IShareMaturityEntry;
  loading?: boolean;
  productId: string;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IShareMaturityEntry) => void;
}

const ShareMaturityForm = forwardRef(function ShareMaturityForm(
  props: ShareMaturityFormProps,
  ref: React.Ref<FormikProps<IShareMaturityEntry>>,
) {
  const { initialValues, loading, productId, onFormValid, onSubmit } = props;

  const { user } = useContext(AppContext);

  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  }, [formik.values]);

  const setSharesMaturity = async () => {
    if (!accessToken) return;

    const sharesMaturity = await getSharesMaturity(
      user.identification,
      productId,
      accessToken,
    );

    formik.setFieldValue("sharesMaturity", sharesMaturity);

    if (sharesMaturity.length === 1) {
      formik.setFieldValue("shareMaturity", sharesMaturity[0].id);
      formik.setFieldValue("shareMaturityName", sharesMaturity[0].value);
    }
  };

  useEffect(() => {
    setSharesMaturity();
  }, [user, accessToken]);

  const customHandleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { value } = event.target;
    formik.setFieldValue("shareMaturity", value);

    formik.setFieldValue(
      "shareMaturityName",
      shareMaturityDM.valueOf(value)?.value,
    );
  };

  return (
    <ShareMaturityFormUI
      loading={loading}
      formik={formik}
      customHandleChange={customHandleChange}
    />
  );
});

export { ShareMaturityForm };
export type { ShareMaturityFormProps };
