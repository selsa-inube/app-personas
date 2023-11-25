import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { useState } from "react";
import { EconomicActivityFormUI } from "./interface";
import { IEconomicActivityEntry } from "./types";
import { EconomicActivityRequiredFields } from "./config/formConfig";
import { IEconomicActivity } from "@mocks/users/economicActivities.mocks";
import { regex } from "src/validations/regularExpressions";

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
    ? validationRules.date.required(validationMessages.required)
    : validationRules.date,
  contractExpiration: EconomicActivityRequiredFields.contractExpiration
    ? validationRules.date.required(validationMessages.required)
    : validationRules.date,
  severanceRegime: EconomicActivityRequiredFields.severanceRegime
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  workday: EconomicActivityRequiredFields.workday
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  position: EconomicActivityRequiredFields.position
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  dependence: EconomicActivityRequiredFields.dependence
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
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
    ? validationRules.country.required(validationMessages.required)
    : validationRules.country,
  companyCity: EconomicActivityRequiredFields.companyCity
    ? validationRules.city.required(validationMessages.required)
    : validationRules.city,
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
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IEconomicActivityEntry) => void;
  loading?: boolean;
}

const EconomicActivityForm = forwardRef(function EconomicActivityForm(
  props: EconomicActivityFormProps,
  ref: React.Ref<FormikProps<IEconomicActivityEntry>>
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const [dynamicSchema, setDynamicSchema] = useState(validationSchema);
  const [showMainActivityModal, setShowMainActivityModal] = useState(false);
  const [showSecondaryActivityModal, setShowSecondaryActivityModal] =
    useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicSchema,
    validateOnChange: false,
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

  const handleModalSelect = (
    field: string,
    selectedItem: IEconomicActivity
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
      customHandleBlur={customHandleBlur}
      validationSchema={dynamicSchema}
      showMainActivityModal={showMainActivityModal}
      showSecondaryActivityModal={showSecondaryActivityModal}
      handleToggleModal={handleToggleModal}
      handleModalSelect={handleModalSelect}
    />
  );
});

export { EconomicActivityForm };
export type { EconomicActivityFormProps };
