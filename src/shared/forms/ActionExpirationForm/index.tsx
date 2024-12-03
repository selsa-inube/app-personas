import { useAuth } from "@inube/auth";
import { FormikProps, useFormik } from "formik";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
} from "react";
import { AppContext } from "src/context/app";
import { getSharesMaturity } from "src/services/iclient/savings/getSharesMaturity";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { ActionExpirationFormUI } from "./interface";
import { IActionExpirationEntry } from "./types";
import { actionExpirationDM } from "src/model/domains/savings/actionExpirationDM";

const validationSchema = Yup.object({
  actionExpiration: Yup.string().required(validationMessages.required),
  actionExpirationName: Yup.string().required(validationMessages.required),
});

interface ActionExpirationFormProps {
  initialValues: IActionExpirationEntry;
  loading?: boolean;
  productId: string;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IActionExpirationEntry) => void;
}

const ActionExpirationForm = forwardRef(function ActionExpirationForm(
  props: ActionExpirationFormProps,
  ref: React.Ref<FormikProps<IActionExpirationEntry>>,
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

    const actionsExpiration = await getSharesMaturity(
      user.identification,
      productId,
      accessToken,
    );

    formik.setFieldValue("actionsExpiration", actionsExpiration);

    if (actionsExpiration.length === 1) {
      formik.setFieldValue("actionExpiration", actionsExpiration[0].id);
      formik.setFieldValue("actionExpirationName", actionsExpiration[0].value);
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
    formik.setFieldValue("actionExpiration", value);

    formik.setFieldValue(
      "actionExpirationName",
      actionExpirationDM.valueOf(value)?.value,
    );
  };

  return (
    <ActionExpirationFormUI
      loading={loading}
      formik={formik}
      customHandleChange={customHandleChange}
    />
  );
});

export { ActionExpirationForm };
export type { ActionExpirationFormProps };
