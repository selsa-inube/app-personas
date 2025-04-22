import { IEconomicActivity } from "@mocks/users/economicActivities.mocks";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { regex } from "src/validations/regularExpressions";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { EconomicActivityRequiredFields } from "./config/formConfig";
import { EconomicActivityFormUI } from "./interface";
import { IEconomicActivityEntry } from "./types";

const validationSchema = Yup.object().shape({
  economicActivity: EconomicActivityRequiredFields.economicActivity
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  profession: EconomicActivityRequiredFields.profession
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  job: EconomicActivityRequiredFields.job
    ? Yup.string()
        .matches(regex.onlyLetters, validationMessages.onlyLetters)
        .min(3, validationMessages.minCharacters(3))
        .max(15, validationMessages.maxCharacters(15))
        .required(validationMessages.required)
    : Yup.string()
        .matches(regex.onlyLetters, validationMessages.onlyLetters)
        .min(3, validationMessages.minCharacters(3))
        .max(15, validationMessages.maxCharacters(15)),

  mainCiiuActivity: EconomicActivityRequiredFields.mainCiiuActivity
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  secondaryCiiuActivity: EconomicActivityRequiredFields.secondaryCiiuActivity
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  economicSector: EconomicActivityRequiredFields.economicSector
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  company: EconomicActivityRequiredFields.company
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  contractType: EconomicActivityRequiredFields.contractType
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  admissionDate: EconomicActivityRequiredFields.admissionDate
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  contractExpiration: EconomicActivityRequiredFields.contractExpiration
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  severanceRegime: EconomicActivityRequiredFields.severanceRegime
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  workday: EconomicActivityRequiredFields.workday
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  position: EconomicActivityRequiredFields.position
    ? Yup.string()
        .min(3, validationMessages.minCharacters(3))
        .required(validationMessages.required)
    : Yup.string().min(3, validationMessages.minCharacters(3)),
  dependence: EconomicActivityRequiredFields.dependence
    ? Yup.string()
        .min(3, validationMessages.minCharacters(3))
        .required(validationMessages.required)
    : Yup.string().min(3, validationMessages.minCharacters(3)),
  employeeCode: EconomicActivityRequiredFields.employeeCode
    ? Yup.string()
        .matches(regex.onlyNumbers, validationMessages.onlyNumbers)
        .min(5, validationMessages.minNumbers(5))
        .max(10, validationMessages.maxNumbers(10))
        .required(validationMessages.required)
    : Yup.string()
        .matches(regex.onlyNumbers, validationMessages.onlyNumbers)
        .min(5, validationMessages.minNumbers(5))
        .max(10, validationMessages.maxNumbers(10)),

  companyFormality: EconomicActivityRequiredFields.companyFormality
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  companyCountry: EconomicActivityRequiredFields.companyCountry
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  companyCity: EconomicActivityRequiredFields.companyCity
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  companyPhone: EconomicActivityRequiredFields.companyPhone
    ? validationRules.landlinePhone.required(validationMessages.required)
    : validationRules.landlinePhone,
  companyAddress: EconomicActivityRequiredFields.companyAddress
    ? validationRules.address.required(validationMessages.required)
    : validationRules.address,
  companyEmail: EconomicActivityRequiredFields.companyEmail
    ? validationRules.email.required(validationMessages.required)
    : validationRules.email,
});

interface EconomicActivityFormProps {
  initialValues: IEconomicActivityEntry;
  loading?: boolean;
  withSubmit?: boolean;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IEconomicActivityEntry) => void;
}

const EconomicActivityForm = forwardRef(function EconomicActivityForm(
  props: EconomicActivityFormProps,
  ref: React.Ref<FormikProps<IEconomicActivityEntry>>,
) {
  const { initialValues, loading, withSubmit, onFormValid, onSubmit } = props;

  const [showMainActivityModal, setShowMainActivityModal] = useState(false);
  const [showSecondaryActivityModal, setShowSecondaryActivityModal] =
    useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (formik.dirty && onFormValid) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  const handleModalSelect = (
    field: string,
    selectedItem: IEconomicActivity,
  ) => {
    formik.setFieldValue(field, selectedItem.id);
    handleToggleModal(field);
  };

  const handleToggleModal = (field: string) => {
    field === "mainCiiuActivity"
      ? setShowMainActivityModal(!showMainActivityModal)
      : setShowSecondaryActivityModal(!showSecondaryActivityModal);
  };

  return (
    <EconomicActivityFormUI
      loading={loading}
      formik={formik}
      showMainActivityModal={showMainActivityModal}
      showSecondaryActivityModal={showSecondaryActivityModal}
      withSubmit={withSubmit}
      validationSchema={validationSchema}
      handleToggleModal={handleToggleModal}
      handleModalSelect={handleModalSelect}
    />
  );
});

export { EconomicActivityForm };
export type { EconomicActivityFormProps };
