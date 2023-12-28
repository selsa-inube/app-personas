import { IFormStructure } from "@ptypes/forms.types";
import { FormikValues } from "formik";
import * as Yup from "yup";
import { peridiocityDM } from "src/model/domains/general/peridiocity";
import { validationMessages } from "src/validations/validationMessages";

const commonFields = {
  Periodicity: (gridColumn: string, value?: string, readOnly?: boolean) => ({
    name: "Periodicity",
    type: "select",
    label: "Periodicidad",
    placeholder: "",
    size: "compact",
    options: peridiocityDM.options.map((Periodicity) => ({
      value: Periodicity.value,
      id: Periodicity.id,
    })),
    value,
    isFullWidth: true,
    gridColumn,
    validation: Yup.string().required(validationMessages.required),
  }),
};

const structureQuotaForm = (formik: FormikValues): IFormStructure => {
  return {
    paymentMethod: { 
      physicalCollectionChannels: [commonFields.Periodicity("span 1")],
      automaticDebit: [],
      northCranes: [],
      westernCranes: [],
      easternCranes: [],
      southCranes: [],
    },
  };
};

export { structureQuotaForm };
