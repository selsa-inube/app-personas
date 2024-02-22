import { IFormField } from "@ptypes/forms.types";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { generateDynamicForm } from "src/utils/forms/forms";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { initalValuesProgrammedSavingFixed } from "../../config/initialValues";
import { filterPeriodicityOptions, structureQuotaForm } from "./config/form";
import { QuotaFormUI } from "./interface";
import { IQuotaEntry } from "./types";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { EProductType } from "src/model/entity/product";

const initValidationSchema = Yup.object({
  periodicValue: validationRules.money.required(validationMessages.required),
  paymentMethod: Yup.string().required(validationMessages.required),
  periodicity: Yup.string().required(validationMessages.required),
  paydayTypeToSelect: Yup.string().required(validationMessages.required),
  paydayByDate: validationRules.notPastDate,
  accountToDebit: Yup.string(),
  accountType: Yup.string(),
  bankEntity: Yup.string(),
  accountNumber: Yup.string(),
});

interface QuotaFormProps {
  initialValues: IQuotaEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IQuotaEntry) => void;
  loading?: boolean;
}

const QuotaForm = forwardRef(function QuotaForm(
  props: QuotaFormProps,
  ref: React.Ref<FormikProps<IQuotaEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const [dynamicForm, setDynamicForm] = useState<{
    renderFields: IFormField[];
    validationSchema: Yup.ObjectSchema<object, Yup.AnyObject, object, "">;
  }>({
    renderFields: [],
    validationSchema: initValidationSchema,
  });

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicForm.validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
    enableReinitialize: true,
  });

  useImperativeHandle(ref, () => formik);

  let valuePeriodicity = formik.values.periodicity;

  const customHandleAccount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    formik.handleChange(event);
    const internalAccounts = savingsMock.filter(
      (saving) => saving.id === event.target.value,
    );
    formik.setFieldValue("accountDescription", internalAccounts[0].description);
  };

  const savingOptions = savingsMock
    .filter((saving) => saving.type === EProductType.VIEWSAVINGS)
    .map((saving) => ({ id: saving.id, value: saving.description }));

  useEffect(() => {
    if (
      savingOptions.length === 1 &&
      formik.values.accountToDebit === "internalOwnAccountDebit"
    ) {
      const internalAccounts = savingsMock.filter(
        (saving) => saving.type === EProductType.VIEWSAVINGS,
      );
      formik.setFieldValue("accountNumber", internalAccounts[0].id);
      formik.setFieldValue(
        "accountDescription",
        internalAccounts[0].description,
      );
    }
    if (formik.values.accountToDebit !== initialValues.accountToDebit) {
      formik.setFieldValue("accountNumber", "");
    }
  }, [formik.values.accountToDebit]);

  useEffect(() => {
    const { renderFields, validationSchema } = generateDynamicForm(
      formik,
      structureQuotaForm(formik, valuePeriodicity),
    );

    const newValidationSchema = initValidationSchema.concat(
      Yup.object({
        periodicValue: validationRules.money.required(
          validationMessages.required,
        ),
        paymentMethod: Yup.string().required(validationMessages.required),
        periodicity: Yup.string().required(validationMessages.required),
        paydayTypeToSelect: Yup.string(),
        paydayByDate: validationRules.notPastDate,
        accountNumber:
          formik.values.paymentMethod === "automaticDebit"
            ? Yup.string().required(validationMessages.required)
            : Yup.string(),
      }),
    );

    setDynamicForm({
      renderFields,
      validationSchema: validationSchema.concat(newValidationSchema),
    });

    if (formik.dirty) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  const customHandleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    let updatedFormikValues = {
      ...formik.values,
      [name]: value,
    };

    if (name === "paymentMethod") {
      updatedFormikValues = {
        ...initalValuesProgrammedSavingFixed.quota,
        periodicValue: formik.values.periodicValue,
        paymentMethod: value,
      };

      const filteredOptions = filterPeriodicityOptions(value);

      if (filteredOptions.length === 1) {
        updatedFormikValues.periodicity = filteredOptions[0].id;
      }

      formik.setValues(updatedFormikValues);
    } else {
      formik.setFieldValue(name, value);
    }

    if (name === "periodicity") {
      valuePeriodicity = value;
    }
  };

  return (
    <QuotaFormUI
      loading={loading}
      formik={formik}
      renderFields={dynamicForm.renderFields}
      savingOptions={savingOptions}
      customHandleChange={customHandleChange}
      customHandleAccount={customHandleAccount}
    />
  );
});

export { QuotaForm };
export type { QuotaFormProps };
