import { suppliersTypeData } from "@mocks/domains/suppliersType";
import { IFormField, IFormStructure } from "@ptypes/forms.types";
import { FormikProps } from "formik";
import { IServiceDomains } from "src/context/app/types";
import { accountOriginTypeDM } from "src/model/domains/general/accountOriginTypeDM";
import { accountTypeDM } from "src/model/domains/general/accountTypeDM";
import { disbursementTypeDM } from "src/model/domains/general/disbursementTypeDM";
import { genderDM } from "src/model/domains/general/updateData/personalInformation/genderdm";
import { identificationTypeDM } from "src/model/domains/general/updateData/personalInformation/identificationTypeDM";
import { IProduct } from "src/model/entity/product";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { IDisbursementEntry } from "../types";

const getCommonFields = (
  savingsAccounts: IProduct[],
  serviceDomains: IServiceDomains,
) => ({
  observations: {
    name: "observations",
    type: "textarea",
    label: "Observaciones",
    placeholder:
      "Describe las múltiples formas de desembolso que deseas utilizar.",
    size: "compact",
    validMessage: "Las observaciones ingresadas son válidas",
    isFullWidth: true,
    gridColumn: "span 1",
    maxLength: 150,
    validation: Yup.string()
      .required(validationMessages.required)
      .min(10, validationMessages.minCharacters(10)),
  } as IFormField,
  supplier: (gridColumn: string): IFormField => ({
    name: "supplier",
    type: "select",
    label: "Proveedor",
    size: "compact",
    options: suppliersTypeData.map((supplier) => ({
      value: supplier.value,
      id: supplier.id,
    })),
    isFullWidth: true,
    gridColumn,
    validation: Yup.string().required(validationMessages.required),
  }),
  identificationType: {
    name: "identificationType",
    type: "select",
    label: "Tipo de identificación",
    size: "compact",
    options: serviceDomains.identificationtype,
    isFullWidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
  } as IFormField,
  identification: {
    name: "identification",
    type: "number",
    label: "Identificación",
    placeholder: "Escribe el numero de identificación",
    size: "compact",
    validMessage: "El número de identificación ingresado es válido",
    isFullWidth: true,
    gridColumn: "span 1",
    validation: validationRules.identification.required(
      validationMessages.required,
    ),
  } as IFormField,
  accountType: (gridColumn: string, readOnly?: boolean): IFormField => ({
    name: "accountType",
    type: "select",
    label: "Tipo de cuenta",
    placeholder: "Escribe el numero de cuenta",
    size: "compact",
    options: accountTypeDM.options,
    isFullWidth: true,
    gridColumn,
    readOnly,
    validation: Yup.string().required(validationMessages.required),
  }),
  accountNumber: {
    name: "accountNumber",
    type: "select",
    label: "Numero de cuenta",
    size: "compact",
    options: savingsAccounts.map((product) => ({
      value: product.description,
      id: product.id,
    })),
    isFullWidth: true,
    gridColumn: "span 1",
    validation: Yup.string()
      .min(5, validationMessages.minNumbers(5))
      .required(validationMessages.required),
    readOnly: savingsAccounts.length === 1,
  } as IFormField,
  writeAccountNumber: (gridColumn: string, readOnly?: boolean): IFormField => ({
    name: "writeAccountNumber",
    label: "Numero de cuenta",
    placeholder: "Escribe el numero de cuenta",
    size: "compact",
    type: "number",
    validMessage: "El número de cuenta ingresado es válido",
    isFullWidth: true,
    gridColumn,
    readOnly,
    validation: Yup.string()
      .min(5, validationMessages.minNumbers(5))
      .required(validationMessages.required),
  }),
  entity: (gridColumn: string, readOnly?: boolean): IFormField => ({
    name: "bankEntity",
    type: "select",
    label: "Entidad",
    size: "compact",
    options: serviceDomains.integratedbanks,
    isFullWidth: true,
    gridColumn,
    readOnly,
    validation: Yup.string().required(validationMessages.required),
  }),
  socialReason: {
    name: "socialReason",
    type: "text",
    label: "Razón social",
    placeholder: "Escribe el nombre",
    size: "compact",
    validMessage: "La razón social ingresada es válida",
    isFullWidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
  } as IFormField,
  firstName: {
    name: "firstName",
    type: "text",
    label: "Primer nombre",
    placeholder: "Escribe el nombre",
    size: "compact",
    validMessage: "El nombre ingresado es válido",
    isFullWidth: true,
    gridColumn: "span 1",
    validation: validationRules.name.required(validationMessages.required),
  } as IFormField,
  secondName: {
    name: "secondName",
    type: "text",
    label: "Segundo nombre",
    placeholder: "Escribe el nombre",
    size: "compact",
    validMessage: "El nombre ingresado es válido",
    isFullWidth: true,
    gridColumn: "span 1",
    validation: validationRules.name.required(validationMessages.required),
  } as IFormField,
  firstLastName: {
    name: "firstLastName",
    type: "text",
    label: "Primer apellido",
    placeholder: "Escribe el apellido",
    size: "compact",
    validMessage: "El apellido ingresado es válido",
    isFullWidth: true,
    gridColumn: "span 1",
    validation: validationRules.name.required(validationMessages.required),
  } as IFormField,
  secondLastName: {
    name: "secondLastName",
    type: "text",
    label: "Segundo apellido",
    placeholder: "Escribe el apellido",
    size: "compact",
    validMessage: "El apellido ingresado es válido",
    isFullWidth: true,
    gridColumn: "span 1",
    validation: validationRules.name.required(validationMessages.required),
  } as IFormField,
  gender: {
    name: "gender",
    type: "select",
    label: "Género",
    size: "compact",
    options: genderDM.options,
    isFullWidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
  } as IFormField,
});

const structureDisbursementForm = (
  formik: FormikProps<IDisbursementEntry>,
  savingsAccounts: IProduct[],
  serviceDomains: IServiceDomains,
): IFormStructure => {
  const commonFields = getCommonFields(savingsAccounts, serviceDomains);
  return {
    disbursement: {
      [disbursementTypeDM.LOCAL_SAVINGS_DEPOSIT.id]: [
        commonFields.accountNumber,
      ],
      multiplePaymentRecipients: [commonFields.observations],
      supplierManagerCheck: [commonFields.supplier("span 1")],
      thirdPartManagerCheck: [commonFields.identificationType],
      supplierPayeeCheck: [commonFields.supplier("span 1")],
      thirdPartPayeeCheck: [commonFields.identificationType],
      others: [commonFields.observations],
      [disbursementTypeDM.OWN_ACCOUNT_TRANSFER.id]: [
        {
          name: "accountStatus",
          type: "select",
          label: "Cuenta",
          options: accountOriginTypeDM.options,
          size: "compact",
          isFullWidth: true,
          gridColumn: "span 1",
          validation: Yup.string().required(validationMessages.required),
        },
      ],
      supplierExternalTransfer: [
        commonFields.supplier("span 1"),
        commonFields.entity("span 1"),
        commonFields.accountType("span 1"),
        commonFields.writeAccountNumber("span 1"),
      ],
      [disbursementTypeDM.THIRD_PARTEXTERNAL_TRANSFER.id]: [
        commonFields.identificationType,
      ],
    },
    identificationType: {
      [identificationTypeDM.NIT.id]:
        formik.values.disbursement ===
        disbursementTypeDM.THIRD_PARTEXTERNAL_TRANSFER.id
          ? [
              commonFields.identification,
              commonFields.socialReason,
              commonFields.entity("span 1"),
              commonFields.accountType("span 1"),
              commonFields.writeAccountNumber("span 1"),
            ]
          : [commonFields.identification, commonFields.socialReason],
      [identificationTypeDM.CC.id]:
        formik.values.disbursement ===
        disbursementTypeDM.THIRD_PARTEXTERNAL_TRANSFER.id
          ? [
              commonFields.identification,
              commonFields.firstName,
              commonFields.secondName,
              commonFields.firstLastName,
              commonFields.secondLastName,
              commonFields.gender,
              commonFields.entity("span 1"),
              commonFields.accountType("span 1"),
              commonFields.writeAccountNumber("span 1"),
            ]
          : [
              commonFields.identification,
              commonFields.firstName,
              commonFields.secondName,
              commonFields.firstLastName,
              commonFields.secondLastName,
              commonFields.gender,
            ],
      [identificationTypeDM.CE.id]:
        formik.values.disbursement ===
        disbursementTypeDM.THIRD_PARTEXTERNAL_TRANSFER.id
          ? [
              commonFields.identification,
              commonFields.firstName,
              commonFields.secondName,
              commonFields.firstLastName,
              commonFields.secondLastName,
              commonFields.gender,
              commonFields.entity("span 1"),
              commonFields.accountType("span 1"),
              commonFields.writeAccountNumber("span 1"),
            ]
          : [
              commonFields.identification,
              commonFields.firstName,
              commonFields.secondName,
              commonFields.firstLastName,
              commonFields.secondLastName,
              commonFields.gender,
            ],
      [identificationTypeDM.PA.id]:
        formik.values.disbursement ===
        disbursementTypeDM.THIRD_PARTEXTERNAL_TRANSFER.id
          ? [
              commonFields.identification,
              commonFields.firstName,
              commonFields.secondName,
              commonFields.firstLastName,
              commonFields.secondLastName,
              commonFields.gender,
              commonFields.entity("span 1"),
              commonFields.accountType("span 1"),
              commonFields.writeAccountNumber("span 1"),
            ]
          : [
              commonFields.identification,
              commonFields.firstName,
              commonFields.secondName,
              commonFields.firstLastName,
              commonFields.secondLastName,
              commonFields.gender,
            ],
    },
    accountStatus: {
      [accountOriginTypeDM.NEW.id]: [
        commonFields.entity("span 1"),
        commonFields.accountType("span 1"),
        commonFields.writeAccountNumber("span 1"),
      ],
      [accountOriginTypeDM.REGISTERED.id]: [
        commonFields.entity("span 1", true),
        commonFields.accountType("span 1", true),
        commonFields.writeAccountNumber("span 1", true),
      ],
    },
  };
};

export { structureDisbursementForm };
