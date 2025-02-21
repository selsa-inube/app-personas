import { IFormStructure } from "@ptypes/forms.types";
import { FormikProps } from "formik";
import { MdOutlineAttachMoney } from "react-icons/md";
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
          validation: Yup.string()
            .min(5, validationMessages.minNumbers(5))
            .required(validationMessages.required)
            .test(
              "validate-account-balance",
              "La cuenta no posee saldo suficiente",
              (_, ctx) =>
                ctx.parent.availableBalanceValue >= ctx.parent.investmentValue,
            ),
          readonly: savingsAccounts.length === 1,
        },
        {
          name: "availableBalance",
          type: "text",
          label: "Saldo disponible",
          size: "compact",
          gridColumn: "span 1",
          fullwidth: true,
          validation: Yup.string().required(validationMessages.required),
          readonly: true,
          iconAfter: <MdOutlineAttachMoney />,
        },
      ],
    },
  };
};

export { structureDisbursementForm };
