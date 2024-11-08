import { IFormStructure } from "@ptypes/forms.types";
import { FormikProps } from "formik";
import { MdOutlineAttachMoney } from "react-icons/md";
import { accountDebitTypeDM } from "src/model/domains/requests/pqrsTypeDM";
import { EPaymentMethodType } from "src/model/entity/payment";
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
      [EPaymentMethodType.DEBIT]: [
        {
          name: "accountToDebit",
          type: "select",
          label: "Cuenta a debitar",
          size: "compact",
          options: accountDebitTypeDM.options,
          isFullWidth: true,
          gridColumn: "span 1",
          validation: Yup.string().required(validationMessages.required),
          readOnly: true,
        },
        {
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
        },
        {
          name: "availableBalance",
          type: "text",
          label: "Saldo disponible",
          size: "compact",
          gridColumn: "span 1",
          isFullWidth: true,
          validation: Yup.string().required(validationMessages.required),
          readOnly: true,
          iconAfter: <MdOutlineAttachMoney />,
        },
      ],
    },
  };
};

export { structureDisbursementForm };
