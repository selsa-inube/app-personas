import { IFormStructure } from "@ptypes/forms.types";
import { FormikValues } from "formik";
import * as Yup from "yup";
import { peridiocityDM } from "src/model/domains/general/peridiocity";
import { validationMessages } from "src/validations/validationMessages";
import { weeklyPayDayDM } from "src/model/domains/general/weeklyPayDay";
import { monthlyPayDayDM } from "src/model/domains/general/monthlyPayDay";
import { validationRules } from "src/validations/validationRules";
import { biweeklyPayDayDM } from "src/model/domains/general/biweeklyPayDay";

const commonFields = {
  periodicity: (gridColumn: string, value?: string, readOnly?: boolean) => ({
    name: "periodicity",
    type: "select",
    label: "Periodicidad",
    placeholder: "",
    size: "compact",
    options: peridiocityDM.options,
    value,
    isFullWidth: true,
    gridColumn,
    validation: Yup.string().required(validationMessages.required),
  }),
  weeklyPayDay:{
    name: "weeklyPayDay",
    type: "select",
    label: "Día de pago",
    placeholder: "",
    size: "compact",
    options: weeklyPayDayDM.options,
    isFullWidth: true,
    gridColumn: "span 1",     
    validation: Yup.string().required(validationMessages.required),
  },
  biweeklyPayDay:{
    name: "biweeklyPayDay",
    type: "select",
    label: "Día de pago",
    placeholder: "",
    size: "compact",
    options: biweeklyPayDayDM.options,
    isFullWidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
  },
  monthlyPayDay:{
    name: "monthlyPayDay",
    type: "select",
    label: "Día de pago",
    placeholder: "",
    size: "compact",
    options: monthlyPayDayDM.options,
    isFullWidth: true,
    gridColumn: "span 1",
    validation: Yup.string().required(validationMessages.required),
  },
  semiannualPayDay:{
    name: "semiannualPayDay",
    type: "text",
    label: "Día de pago",
    placeholder: "",
    size: "compact",
    isFullWidth: true,
    gridColumn: "span 1",
    validMessage :"La fecha es válida",
    validation: validationRules.date.required(
      validationMessages.required),
  },
  annualPayDay:{
    name: "annualPayDay",
    type: "text",
    label: "Día de pago",
    placeholder: "",
    size: "compact",
    isFullWidth: true,
    gridColumn: "span 1",
    validMessage :"La fecha es válida",
    validation: validationRules.date.required(
      validationMessages.required),
  },
};

const structureQuotaForm = (formik: FormikValues): IFormStructure => {
  return {
    paymentMethod: {
      physicalCollectionChannels: [commonFields.periodicity("span 1")],
      automaticDebit: [],
      northCranes: [],
      westernCranes: [],
      easternCranes: [],
      southCranes: [],
    },
    periodicity:{
      [peridiocityDM.WEEKLY.id] : [commonFields.weeklyPayDay],
      [peridiocityDM.BIWEEKLY.id] : [commonFields.biweeklyPayDay],
      [peridiocityDM.MONTHLY.id] : [commonFields.monthlyPayDay],
      [peridiocityDM.SEMIANNUAL.id] : [commonFields.semiannualPayDay],
      [peridiocityDM.ANNUAK.id] : [commonFields.annualPayDay],
    }
  };
};

export { structureQuotaForm };
