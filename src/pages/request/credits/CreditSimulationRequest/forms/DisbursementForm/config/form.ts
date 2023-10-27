import { accountTypeData } from "@mocks/domains/accountType";
import { suppliersTypeData } from "@mocks/domains/suppliersType";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { FormikValues } from "formik";
import { identificationTypeDM } from "src/model/domains/personalInformation/identificationtypedm";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";

const getCommonFields = (
  formik: FormikValues,
  handleChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void,
  handleBlur?: (event: React.FocusEvent<HTMLElement, Element>) => void
) => ({
  accountNumber: {
    name: "accountNumber",
    type: "select",
    label: "Numero de cuenta",
    placeholder: "Escribe el numero de cuenta",
    size: "compact",
    options: savingsMock
      .filter((product) => product.type === "CA")
      .map((product) => ({
        value: product.description,
        id: product.id,
      })),
    value: formik.values.accountNumber,
    handleChange: handleChange || formik.handleChange,
    handleBlur: handleBlur || formik.handleBlur,
    state: "valid",
    errorMessage: formik.errors.accountNumber,
    isFullWidth: true,
    validation: Yup.string().required(validationMessages.required),
  },
  observations: {
    name: "observations",
    type: "textarea",
    label: "Observaciones",
    placeholder:
      "Describe las múltiples formas de desembolso que deseas utilizar.",
    size: "compact",
    value: formik.values.observations,
    handleChange: handleChange || formik.handleChange,
    handleBlur: handleBlur || formik.handleBlur,
    state: "valid",
    errorMessage: formik.errors.observations,
    isFullWidth: true,
    validation: Yup.string()
      .min(10, validationMessages.minCharacters(10))
      .required(validationMessages.required),
  },
  supplier: {
    name: "supplier",
    type: "select",
    label: "Proveedor",
    placeholder: "Escribe el numero de cuenta",
    size: "compact",
    options: suppliersTypeData.map((supplier) => ({
      value: supplier.value,
      id: supplier.id,
    })),
    value: formik.values.supplier,
    handleChange: handleChange || formik.handleChange,
    handleBlur: handleBlur || formik.handleBlur,
    state: "valid",
    errorMessage: formik.errors.supplier,
    isFullWidth: true,
    validation: Yup.string().required(validationMessages.required),
  },
  identificationType: {
    name: "identificationType",
    type: "select",
    label: "Tipo de identificación",
    placeholder: "Escribe el numero de cuenta",
    size: "compact",
    options: identificationTypeDM.options.filter(
      (option) =>
        option.id !== identificationTypeDM.RC.id &&
        option.id !== identificationTypeDM.TI.id
    ),
    value: formik.values.identificationType,
    handleChange: handleChange || formik.handleChange,
    handleBlur: handleBlur || formik.handleBlur,
    state: "valid",
    errorMessage: formik.errors.identificationType,
    isFullWidth: true,
    validation: Yup.string().required(validationMessages.required),
  },
  identification: {
    name: "identification",
    type: "text",
    label: "Identificación",
    placeholder: "Escribe el numero de identificación",
    size: "compact",
    value: formik.values.identification,
    handleChange: handleChange || formik.handleChange,
    handleBlur: handleBlur || formik.handleBlur,
    state: "valid",
    errorMessage: formik.errors.identification,
    isFullWidth: true,
    validation: Yup.string().required(validationMessages.required),
  },
  accountType: {
    name: "accountType",
    type: "select",
    label: "Tipo de cuenta",
    placeholder: "Escribe el numero de cuenta",
    size: "compact",
    options: accountTypeData.map((accountType) => ({
      value: accountType.value,
      id: accountType.id,
    })),
    value: formik.values.accountType,
    handleChange: handleChange || formik.handleChange,
    handleBlur: handleBlur || formik.handleBlur,
    state: "valid",
    errorMessage: formik.errors.accountType,
    isFullWidth: true,
    validation: Yup.string().required(validationMessages.required),
  },
  accountNubmer: {
    name: "accountNumber",
    type: "text",
    label: "Numero de cuenta",
    placeholder: "Escribe el numero de cuenta",
    size: "compact",
    value: formik.values.accountNumber,
    handleChange: handleChange || formik.handleChange,
    handleBlur: handleBlur || formik.handleBlur,
    state: "valid",
    errorMessage: formik.errors.accountNumber,
    isFullWidth: true,
    validation: Yup.string()
      .required(validationMessages.required)
      .min(5, validationMessages.minNumbers(5)),
  },
});

const getFieldState = (formik: FormikValues, attribute: string) => {
  if (!formik.touched[attribute]) return "pending";
  if (formik.touched[attribute] && formik.errors[attribute]) return "invalid";
  return "valid";
};

const structureDisbursementForm = (
  formik: FormikValues,
  handleChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void,
  handleBlur?: (event: React.FocusEvent<HTMLElement, Element>) => void
) /* : IFormStructure */ => {
  const commonFields = getCommonFields(formik, handleChange, handleBlur);

  /*  return {
    disbursementType: {
      localSavingsDeposit: [commonFields.accountNumber],
      multiplePaymentRecipients: [commonFields.observations],
      supplierManagerCheck: [commonFields.supplier],
      thirdPartManagerCheck: [commonFields.identificationType],
      supplierPayeeCheck: [commonFields.supplier],
      thirdPartPayeeCheck: [
        commonFields.identificationType,
        commonFields.identification,
      ],
      others: [commonFields.observations],
      ownAccountTransfer: [
        {
          name: "entity",
          type: "select",
          label: "Entidad",
          placeholder: "Escribe el numero de cuenta",
          size: "compact",
          options: bankData.map((bank) => ({
            value: bank.value,
            id: bank.id,
          })),
          value: formik.values.entity,
          handleChange: handleChange || formik.handleChange,
          handleBlur: handleBlur || formik.handleBlur,
          state: "valid",
          errorMessage: formik.errors.entity,
          isFullWidth: true,
          validation: Yup.string().required(validationMessages.required),
        },
        commonFields.accountType,
        commonFields.accountNubmer,
      ],
      supplierExternalTransfer: [
        commonFields.supplier,
        {
          name: "entity",
          type: "select",
          label: "Entidad",
          placeholder: "Escribe el numero de cuenta",
          size: "compact",
          options: bankData.map((bank) => ({
            value: bank.value,
            id: bank.id,
          })),
          value: formik.values.entity,
          handleChange: handleChange || formik.handleChange,
          handleBlur: handleBlur || formik.handleBlur,
          state: "valid",
          errorMessage: formik.errors.entity,
          isFullWidth: true,
          validation: Yup.string().required(validationMessages.required),
        },
        commonFields.accountType,
      ],
      thirdPartExternalTransfer: [
        commonFields.identificationType,
        commonFields.identification,
        {
          name: "entity",
          type: "select",
          label: "Entidad",
          placeholder: "Escribe el numero de cuenta",
          size: "compact",
          options: bankData.map((bank) => ({
            value: bank.value,
            id: bank.id,
          })),
          value: formik.values.entity,
          handleChange: handleChange || formik.handleChange,
          handleBlur: handleBlur || formik.handleBlur,
          state: "valid",
          errorMessage: formik.errors.entity,
          isFullWidth: true,
          validation: Yup.string().required(validationMessages.required),
        },
        commonFields.accountType,
        commonFields.accountNubmer,
        commonFields.observations,
      ],
    },
    identificationType: {
      [identificationTypeDM.NIT.id]: [
        commonFields.identification,
        {
          name: "socialReason",
          type: "text",
          label: "Razón social",
          placeholder: "Escribe el nombre",
          size: "compact",
          value: formik.values.socialReason,
          handleChange: handleChange || formik.handleChange,
          handleBlur: handleBlur || formik.handleBlur,
          state: "valid",
          errorMessage: formik.errors.socialReason,
          isFullWidth: true,
          validation: Yup.string().required(validationMessages.required),
        },
      ],
      [identificationTypeDM.CC.id]: [
        commonFields.identification,
        {
          name: "firstName",
          type: "text",
          label: "Primer nombre",
          placeholder: "Escribe el primer nombre",
          size: "compact",
          value: formik.values.firstName,
          handleChange: handleChange || formik.handleChange,
          handleBlur: handleBlur || formik.handleBlur,
          state: "valid",
          errorMessage: formik.errors.firstName,
          isFullWidth: true,
          validation: Yup.string().required(validationMessages.required),
        },
        {
          name: "secondName",
          type: "text",
          label: "Segundo nombre",
          placeholder: "Escribe el segundo nombre",
          size: "compact",
          value: formik.values.secondName,
          handleChange: handleChange || formik.handleChange,
          handleBlur: handleBlur || formik.handleBlur,
          state: "valid",
          errorMessage: formik.errors.secondName,
          isFullWidth: true,
          validation: Yup.string().required(validationMessages.required),
        },
        {
          name: "firstLastName",
          type: "text",
          label: "Primer apellido",
          placeholder: "Escribe el primer apellido",
          size: "compact",
          value: formik.values.firstLastName,
          handleChange: handleChange || formik.handleChange,
          handleBlur: handleBlur || formik.handleBlur,
          state: "valid",
          errorMessage: formik.errors.firstLastName,
          isFullWidth: true,
          validation: Yup.string().required(validationMessages.required),
        },
      ],
    },
  }; */
};

export { structureDisbursementForm };
