import { IFormStructure } from "@ptypes/forms.types";
import { FormikProps } from "formik";
import { accountDebitTypeDM } from "src/model/domains/requests/pqrsTypeDM";
import { IProduct } from "src/model/entity/product";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { IPaymentMethodEntry } from "../types";

const structureDisbursementForm = (
  formik: FormikProps<IPaymentMethodEntry>,
  savingsAccounts: IProduct[],
): IFormStructure => {
  return {
    paymentMethod: {
      DEBAHORINT: [
        {
          name: "accountToDebit",
          type: "select",
          label: "Cuenta a debitar",
          size: "compact",
          options: accountDebitTypeDM.options,
          fullwidth: true,
          gridColumn: "span 1",
          validation: Yup.string().required(validationMessages.required),
          readonly: true,
        },
        {
          name: "accountNumber",
          type: "select",
          label: "Numero de cuenta",
          size: "compact",
          options: savingsAccounts.map((product) => ({
            value: product.id,
            id: product.id,
            label: product.description,
          })),
          fullwidth: true,
          gridColumn: "span 1",
          validation: Yup.string().required(validationMessages.required),
          readonly: savingsAccounts.length === 1,
        },
      ],
    },
  };
};

export { structureDisbursementForm };
