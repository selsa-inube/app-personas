import { collectMethodDM } from "src/model/domains/payments/collectMethodDM";
import { IChooseEntriesEntry } from "../forms/ChooseEntriesForm/types";
import { ILiquidationEntry } from "../forms/LiquidationForm/types";
import { IPaymentMethodEntry } from "../forms/PaymentMethodForm/types";

const chooseEntries: IChooseEntriesEntry = {
  entriesCategories: [],
  totalEntries: 0,
  totalValue: 0,
};

const liquidation: ILiquidationEntry = {
  entriesCategories: [],
  totalValue: 0,
};

const paymentMethod: IPaymentMethodEntry = {
  paymentMethod: collectMethodDM.SAVINGACCOUNT.id,
  paymentMethodName: "Débito automático",
  availableBalanceValue: 0,
  paymentMethods: [
    {
      id: collectMethodDM.SAVINGACCOUNT.id,
      value: collectMethodDM.SAVINGACCOUNT.id,
      label: "Débito automático",
    },
  ],
};

const initalValuesRegisterInEvent = {
  chooseEntries,
  liquidation,
  paymentMethod,
};

export { initalValuesRegisterInEvent };
