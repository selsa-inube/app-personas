import { accountTypeData } from "@mocks/domains/accountType";
import { bankData } from "@mocks/domains/bank";
import { suppliersTypeData } from "@mocks/domains/suppliersType";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { usersMock } from "@mocks/users/users.mocks";
import { IFormStructure } from "@ptypes/forms.types";
import { FormikValues } from "formik";
import { statusDM } from "src/model/domains/general/statusdm";
import { genderDM } from "src/model/domains/general/updateData/personalInformation/genderdm";
import { identificationTypeDM } from "src/model/domains/general/updateData/personalInformation/identificationtypedm";
import { EProductType } from "src/model/entity/product";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";

const commonFields = {
  observations: {
    name: "observations",
    type: "textarea",
    label: "Observaciones",
    placeholder:
      "Describe las múltiples formas de desembolso que deseas utilizar.",
    size: "compact",
    validMessage: "Las observaciones ingresadas son válidas",
    isFullWidth: true,
    gridColumn: "span 2",
    maxLength: 150,
    validation: Yup.string()
      .required(validationMessages.required)
      .min(10, validationMessages.minCharacters(10)),
  },
  supplier: (gridColumn: string) => ({
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
    options: identificationTypeDM.options.filter(
      (option) =>
        option.id !== identificationTypeDM.RC.id &&
        option.id !== identificationTypeDM.TI.id,
    ),
    isFullWidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
  },
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
  },
  accountType: (gridColumn: string, value?: string, readOnly?: boolean) => ({
    name: "accountType",
    type: "select",
    label: "Tipo de cuenta",
    placeholder: "Escribe el numero de cuenta",
    size: "compact",
    options: accountTypeData.map((accountType) => ({
      value: accountType.value,
      id: accountType.id,
    })),
    value,
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
    options: savingsMock
      .filter((product) => product.type === EProductType.VIEWSAVINGS)
      .map((product) => ({
        value: product.description,
        id: product.id,
      })),
    isFullWidth: true,
    gridColumn: "span 2",
    validation: Yup.string()
      .min(5, validationMessages.minNumbers(5))
      .required(validationMessages.required),
  },
  writeAccountNumber: (
    gridColumn: string,
    value?: string,
    readOnly?: boolean,
  ) => ({
    name: "writeAccountNumber",
    label: "Numero de cuenta",
    placeholder: "Escribe el numero de cuenta",
    size: "compact",
    type: "number",
    value,
    validMessage: "El número de cuenta ingresado es válido",
    isFullWidth: true,
    gridColumn,
    readOnly,
    validation: Yup.string()
      .min(5, validationMessages.minNumbers(5))
      .required(validationMessages.required),
  }),
  entity: (gridColumn: string, value?: string, readOnly?: boolean) => ({
    name: "entity",
    type: "select",
    label: "Entidad",
    size: "compact",
    options: bankData.map((bank) => ({
      value: bank.value,
      id: bank.id,
    })),
    value,
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
  },
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
  },
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
  },
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
  },
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
  },
  gender: {
    name: "gender",
    type: "select",
    label: "Género",
    size: "compact",
    options: genderDM.options,
    isFullWidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
  },
};

const structureDisbursementForm = (formik: FormikValues): IFormStructure => {
  return {
    disbursementType: {
      localSavingsDeposit: [commonFields.accountNumber],
      multiplePaymentRecipients: [commonFields.observations],
      supplierManagerCheck: [commonFields.supplier("span 2")],
      thirdPartManagerCheck: [commonFields.identificationType],
      supplierPayeeCheck: [commonFields.supplier("span 1")],
      thirdPartPayeeCheck: [commonFields.identificationType],
      others: [commonFields.observations],
      ownAccountTransfer: [
        {
          name: "accountStatus",
          type: "select",
          label: "Cuenta",
          options: statusDM.options,
          size: "compact",
          isFullWidth: true,
          gridColumn: "span 1",
          validation: Yup.string().required(validationMessages.required),
        },
      ],
      supplierExternalTransfer: [
        commonFields.supplier("span 2"),
        commonFields.entity("span 2"),
        commonFields.accountType("span 2"),
        commonFields.writeAccountNumber("span 2"),
      ],
      thirdPartExternalTransfer: [commonFields.identificationType],
    },
    identificationType: {
      [identificationTypeDM.NIT.id]:
        formik.values.disbursementType === "thirdPartExternalTransfer"
          ? [
              commonFields.identification,
              commonFields.socialReason,
              commonFields.entity("span 1"),
              commonFields.accountType("span 1"),
              commonFields.writeAccountNumber("span 1"),
            ]
          : [commonFields.identification, commonFields.socialReason],
      [identificationTypeDM.CC.id]:
        formik.values.disbursementType === "thirdPartExternalTransfer"
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
        formik.values.disbursementType === "thirdPartExternalTransfer"
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
        formik.values.disbursementType === "thirdPartExternalTransfer"
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
      [statusDM.NEW.id]: [
        commonFields.entity("span 1"),
        commonFields.accountType("span 1"),
        commonFields.writeAccountNumber("span 1"),
      ],
      [statusDM.REGISTERED.id]: [
        commonFields.entity(
          "span 1",
          usersMock[0].bankTransfersAccount.bankEntity,
          true,
        ),
        commonFields.accountType(
          "span 1",
          usersMock[0].bankTransfersAccount.accountType,
          true,
        ),
        commonFields.writeAccountNumber(
          "span 1",
          String(usersMock[0].bankTransfersAccount.accountNumber),
          true,
        ),
      ],
    },
  };
};

export { structureDisbursementForm };
