import { ISelectOption } from "@design/input/Select/types";
import { IFormStructure } from "@ptypes/forms.types";
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
  if (periodicityId === "semiannual") return commonFields.paydayByDate(false);
  if (periodicityId === "annual") return commonFields.paydayByDate(false);
  return commonFields.paydayByDate(true);
};

const commonFields = {
  periodicity: (gridColumn: string, value?: string) => ({
    name: "periodicity",
    type: "select",
    label: "Periodicidad",
    placeholder: "",
    size: "compact",
    options: peridiocityDM.options.filter(
      (option) => option.id !== "single" && option.id !== "quarterly",
    ),
    value,
    isFullWidth: true,
    gridColumn,
    validation: Yup.string().required(validationMessages.required),
  }),
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
        commonFields.periodicity("span 1"),
        payDay(periodicityId),
      ],
      automaticDebit: [],
      northCranes: [],
      westernCranes: [],
      easternCranes: [],
      southCranes: [],
    },
  };
};

export { structureQuotaForm };
