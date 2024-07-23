import { ISelectOption } from "@design/input/Select/types";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import {
  IDynamicFormOptions,
  IFormField,
  IFormStructure,
} from "@ptypes/forms.types";
import { FormikValues } from "formik";
import { monthlyPayDayDM } from "src/model/domains/general/monthlyPayDay";
import { periodicityDM } from "src/model/domains/general/periodicityDM";
import { weeklyPayDayDM } from "src/model/domains/general/weeklyPayDay";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";

const payDay = (periodicityId: string) => {
  if (periodicityId === "weekly")
    return commonFields.paydayTypeToSelect(weeklyPayDayDM.options);
  if (periodicityId === "biweekly")
    return commonFields.paydayTypeToSelect(monthlyPayDayDM.options);
  if (periodicityId === "monthly")
    return commonFields.paydayTypeToSelect(monthlyPayDayDM.options);
  if (periodicityId === "semiannual")
    return commonFields.paydayTypeToSelect(monthlyPayDayDM.options);
  if (periodicityId === "annual")
    return commonFields.paydayTypeToSelect(monthlyPayDayDM.options);
  return commonFields.paydayByDate(true);
};

const forbiddenOptionsMap: IDynamicFormOptions = {
  physicalCollectionChannels: [
    periodicityDM.SINGLE.id,
    periodicityDM.QUARTERLY.id,
  ],
  automaticDebit: [periodicityDM.SINGLE.id, periodicityDM.QUARTERLY.id],
  payrollDiscount: [
    periodicityDM.SINGLE.id,
    periodicityDM.QUARTERLY.id,
    periodicityDM.SEMIANNUAL.id,
    periodicityDM.ANNUAL.id,
  ],
  northCranes: [
    periodicityDM.SINGLE.id,
    periodicityDM.WEEKLY.id,
    periodicityDM.QUARTERLY.id,
  ],
  westernCranes: [
    periodicityDM.SINGLE.id,
    periodicityDM.WEEKLY.id,
    periodicityDM.QUARTERLY.id,
    periodicityDM.ANNUAL.id,
  ],
  easternCranes: [
    periodicityDM.SINGLE.id,
    periodicityDM.WEEKLY.id,
    periodicityDM.QUARTERLY.id,
    periodicityDM.SEMIANNUAL.id,
    periodicityDM.ANNUAL.id,
  ],
  southCranes: [
    periodicityDM.SINGLE.id,
    periodicityDM.WEEKLY.id,
    periodicityDM.BIWEEKLY.id,
    periodicityDM.QUARTERLY.id,
    periodicityDM.SEMIANNUAL.id,
    periodicityDM.ANNUAL.id,
  ],
};

const filterPeriodicityOptions = (paymentMethod: string) => {
  const forbiddenOptions = forbiddenOptionsMap[paymentMethod] || [];
  return periodicityDM.options.filter(
    (option) => !forbiddenOptions.includes(option.id),
  );
};

const commonFields = {
  periodicity: (
    gridColumn: string,
    paymentMethod: string,
    value?: string,
  ): IFormField => {
    const filteredOptions = filterPeriodicityOptions(paymentMethod);
    const isSingleOption = filteredOptions.length === 1;

    return {
      name: "periodicity",
      type: "select",
      label: "Periodicidad",
      size: "compact",
      options: filteredOptions,
      readOnly: isSingleOption,
      value,
      isFullWidth: true,
      gridColumn,
      validation: Yup.string().required(validationMessages.required),
    };
  },
  paydayTypeToSelect: (options: ISelectOption[]): IFormField => ({
    name: "payDayType",
    type: "select",
    label: "Día de pago",
    size: "compact",
    options: options,
    isFullWidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
  }),
  paydayByDate: (readOnly: boolean): IFormField => ({
    name: "paydayByDate",
    type: "text",
    label: "Día de pago",
    size: "compact",
    isFullWidth: true,
    gridColumn: "span 1",
    validMessage: "La fecha es válida",
    validation: validationRules.oldNotPastDate.required(
      validationMessages.required,
    ),
    readOnly,
  }),
  accountToDebit: (
    options: ISelectOption[],
    savingOptions: ISelectOption[],
  ): IFormField => ({
    name: "accountToDebit",
    type: "select",
    label: "Cuenta a debitar",
    size: "compact",
    options: options,
    readOnly: savingOptions.length < 1,
    isFullWidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
  }),
  accountType: (options: ISelectOption[]): IFormField => ({
    name: "accountType",
    type: "select",
    label: "Tipo de cuenta",
    size: "compact",
    options: options,
    isFullWidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
  }),
  bankEntity: (options: ISelectOption[]): IFormField => ({
    name: "bankEntity",
    type: "select",
    label: "Entidad bancaria",
    size: "compact",
    options: options,
    isFullWidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
  }),
  accountNumberSelect: (
    formik: FormikValues,
    savingOptions: ISelectOption[],
  ): IFormField => ({
    name: "accountNumber",
    type: "select",
    label: "Numero de cuenta",
    placeholder:
      savingOptions.length === 1 || !formik.values.accountToDebit
        ? ""
        : "Selecciona el número de cuenta",
    size: "compact",
    options: savingOptions,
    isFullWidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
    readOnly: savingOptions.length === 1 || !formik.values.accountToDebit,
    isRequired: true,
  }),
  accountNumberTextField: (): IFormField => ({
    name: "accountNumber",
    type: "text",
    label: "Numero de cuenta",
    placeholder: "Digita el número de cuenta",
    size: "compact",
    isFullWidth: true,
    gridColumn: "span 1",
    validMessage: "El Numero de cuenta es válido",
    validation: validationRules.oldNotPastDate.required(
      validationMessages.required,
    ),
  }),
};

const structureQuotaForm = (
  formik: FormikValues,
  periodicityId: string,
  savingOptions: ISelectOption[],
): IFormStructure => {
  return {
    paymentMethod: {
      physicalCollectionChannels: [
        commonFields.periodicity("span 1", "physicalCollectionChannels"),
        payDay(periodicityId),
      ],
      automaticDebit: [
        commonFields.periodicity("span 1", "automaticDebit"),
        payDay(periodicityId),
        commonFields.accountToDebit(
          getDomainById("accountDebitType"),
          savingOptions,
        ),
        ...(formik.values.accountToDebit !== "externalOwnAccountDebit"
          ? [commonFields.accountNumberSelect(formik, savingOptions)]
          : []),
      ],
      payrollDiscount: [commonFields.periodicity("span 1", "payrollDiscount")],
      northCranes: [commonFields.periodicity("span 1", "northCranes")],
      westernCranes: [commonFields.periodicity("span 1", "westernCranes")],
      easternCranes: [commonFields.periodicity("span 1", "easternCranes")],
      southCranes: [commonFields.periodicity("span 1", "southCranes")],
    },
    accountToDebit: {
      externalOwnAccountDebit: [
        commonFields.accountType(getDomainById("accountType")),
        commonFields.bankEntity(getDomainById("bank")),
        commonFields.accountNumberTextField(),
      ],
    },
  };
};

export { filterPeriodicityOptions, structureQuotaForm };
