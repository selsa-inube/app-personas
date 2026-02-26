import { IMoneySource } from "@pages/admin/payments/Pay/forms/PaymentMethodForm/types";
import { collectMethodDM } from "src/model/domains/payments/collectMethodDM";

const moneySourcesMock: IMoneySource = {
  "013001157292": {
    id: "013001157292",
    label: "Cuenta familiar",
    value: 0,
    balance: 50000,
    type: collectMethodDM.SAVINGACCOUNT.id,
  },
  "013001162025": {
    id: "013001162025",
    label: "Cuenta de ahorros",
    value: 0,
    balance: 900000,
    type: collectMethodDM.SAVINGACCOUNT.id,
  },
};
export { moneySourcesMock };
