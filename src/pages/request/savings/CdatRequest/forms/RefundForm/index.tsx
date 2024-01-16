import { FormikProps, useFormik } from "formik";
import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import * as Yup from "yup";
import { RefundFormUI } from "./interface";
import { IRefundEntry } from "./types";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { usersMock } from "@mocks/users/users.mocks";

const validationSchema = Yup.object({
  refundMethod: Yup.string(),
  account: Yup.string(),
});

interface RefundFormProps {
  initialValues: IRefundEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IRefundEntry) => void;
  loading?: boolean;
}

const RefundForm = forwardRef(function RefundForm(
  props: RefundFormProps,
  ref: React.Ref<FormikProps<IRefundEntry>>
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const customHandleBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
    formik.handleBlur(event);

    if (onSubmit) return;

    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  };

  const customHandleRefundMethod = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    formik.handleChange(event);
    if (event.target.value === "creditToInternalAccount") {
      const internalAccounts = savingsMock.filter(
        (saving) => saving.type === "CA"
      );
      formik.setFieldValue("account", internalAccounts[0].id);
      formik.setFieldValue(
        "accountDescription",
        internalAccounts[0].description
      );
    } else if (event.target.value === "transferToExternalAccount") {
      formik.setFieldValue(
        "account",
        String(usersMock[0].bankTransfersAccount.accountNumber)
      );
      formik.setFieldValue(
        "accountDescription",
        usersMock[0].bankTransfersAccount.description
      );
    }
  };

  const customHandleAccount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    formik.handleChange(event);
    const internalAccounts = savingsMock.filter(
      (saving) => saving.id === event.target.value
    );
    formik.setFieldValue("accountDescription", internalAccounts[0].description);
  };

  const savingOptions = savingsMock
    .filter((saving) => saving.type === "CA")
    .map((saving) => ({ id: saving.id, value: saving.description }));

  const accountOptions =
    formik.values.refundMethod === "creditToInternalAccount"
      ? savingOptions
      : usersMock
          .filter((user) => user.bankTransfersAccount)
          .map((user) => ({
            id: String(user.bankTransfersAccount.accountNumber),
            value: user.bankTransfersAccount.description,
          }));

  useEffect(() => {
    if (
      savingOptions.length < 1 &&
      formik.values.refundMethod !== "transferToExternalAccount"
    ) {
      formik.setFieldValue("refundMethod", "transferToExternalAccount");
      formik.setFieldValue(
        "account",
        String(usersMock[0].bankTransfersAccount.accountNumber)
      );
    }
  }, [savingOptions, formik.values.refundMethod]);

  return (
    <RefundFormUI
      loading={loading}
      formik={formik}
      accountOptions={accountOptions}
      savingOptions={savingOptions}
      customHandleBlur={customHandleBlur}
      onFormValid={onFormValid}
      customHandleRefundMethod={customHandleRefundMethod}
      customHandleAccount={customHandleAccount}
    />
  );
});

export { RefundForm };
export type { RefundFormProps };
