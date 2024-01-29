import { ISelectOption } from "@design/input/Select/types";
import { IDynamicFormOptions, IFormStructure } from "@ptypes/forms.types";
import { FormikValues } from "formik";
import { biweeklyPayDayDM } from "src/model/domains/general/biweeklyPayDay";
import { monthlyPayDayDM } from "src/model/domains/general/monthlyPayDay";
import { peridiocityDM } from "src/model/domains/general/peridiocity";
import { weeklyPayDayDM } from "src/model/domains/general/weeklyPayDay";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";

const payDay = (periodicityId: string) => {
  if (periodicityId === "weekly")
    return commonFields.paydayTypeToSelect(weeklyPayDayDM.options);
  if (periodicityId === "biweekly")
    return commonFields.paydayTypeToSelect(biweeklyPayDayDM.options);
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
    peridiocityDM.SINGLE.id,
    peridiocityDM.QUARTERLY.id,
  ],
  payrollDiscount: [
    peridiocityDM.SINGLE.id,
    peridiocityDM.QUARTERLY.id,
    peridiocityDM.SEMIANNUAL.id,
    peridiocityDM.ANNUAL.id,
  ],
  northCranes: [
    peridiocityDM.SINGLE.id,
    peridiocityDM.WEEKLY.id,
    peridiocityDM.QUARTERLY.id,
  ],
  westernCranes: [
    peridiocityDM.SINGLE.id,
    peridiocityDM.WEEKLY.id,
    peridiocityDM.QUARTERLY.id,
    peridiocityDM.ANNUAL.id,
  ],
  easternCranes: [
    peridiocityDM.SINGLE.id,
    peridiocityDM.WEEKLY.id,
    peridiocityDM.QUARTERLY.id,
    peridiocityDM.SEMIANNUAL.id,
    peridiocityDM.ANNUAL.id,
  ],
  southCranes: [
    peridiocityDM.SINGLE.id,
    peridiocityDM.WEEKLY.id,
    peridiocityDM.BIWEEKLY.id,
    peridiocityDM.QUARTERLY.id,
    peridiocityDM.SEMIANNUAL.id,
    peridiocityDM.ANNUAL.id,
  ],
};

const filterPeriodicityOptions = (paymentMethod: string) => {
  const forbiddenOptions = forbiddenOptionsMap[paymentMethod] || [];
  return peridiocityDM.options.filter(
    (option) => !forbiddenOptions.includes(option.id),
  );
};

const commonFields = {
  periodicity: (gridColumn: string, paymentMethod: string, value?: string) => {
    const filteredOptions = filterPeriodicityOptions(paymentMethod);
    const isSingleOption = filteredOptions.length === 1;

    return {
      name: "periodicity",
      type: "select",
      label: "Periodicidad",
      placeholder: "",
      size: "compact",
      options: filteredOptions,
      readOnly: isSingleOption,
      value,
      isFullWidth: true,
      gridColumn,
      validation: Yup.string().required(validationMessages.required),
    };
  },
  paydayTypeToSelect: (options: ISelectOption[]) => ({
    name: "payDayType",
    type: "select",
    label: "Día de pago",
    placeholder: "",
    size: "compact",
    options: options,
    isFullWidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
  }),
  paydayByDate: (readOnly: boolean) => ({
    name: "paydayByDate",
    type: "text",
    label: "Día de pago",
    placeholder: "",
    size: "compact",
    isFullWidth: true,
    gridColumn: "span 1",
    validMessage: "La fecha es válida",
    validation: validationRules.notPastDate.required(
      validationMessages.required,
    ),
    readOnly,
  }),
};

const structureQuotaForm = (
  formik: FormikValues,
  periodicityId: string,
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
      ],
      payrollDiscount: [commonFields.periodicity("span 1", "payrollDiscount")],
      northCranes: [commonFields.periodicity("span 1", "northCranes")],
      westernCranes: [commonFields.periodicity("span 1", "westernCranes")],
      easternCranes: [commonFields.periodicity("span 1", "easternCranes")],
      southCranes: [commonFields.periodicity("span 1", "southCranes")],
    },
  };
};

export { structureQuotaForm, filterPeriodicityOptions };
