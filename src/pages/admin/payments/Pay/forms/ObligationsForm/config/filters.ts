import { IPaymentFilters } from "@components/modals/payments/PaymentFilterModal";
import {
  EPaymentGroupType,
  EPaymentMethodFilterType,
  EPaymentStatusType,
} from "../../../types";

const paymentInitialFilters: IPaymentFilters = {
  group: EPaymentGroupType.ALL,
  paymentMethod: EPaymentMethodFilterType.ALL,
  status: EPaymentStatusType.ANYWHERE,
};

const paymentFilters = (paymentMethodFilters: string[]) => ({
  group: [
    {
      id: EPaymentGroupType.ALL,
      value: "Todos",
    },
    {
      id: EPaymentGroupType.SAVINGS,
      value: "Ahorros",
    },
    {
      id: EPaymentGroupType.CREDITS,
      value: "Créditos",
    },
    {
      id: EPaymentGroupType.CREDITQUOTAS,
      value: "Cupos de crédito",
    },
    {
      id: EPaymentGroupType.INSURANCES,
      value: "Seguros",
    },
    {
      id: EPaymentGroupType.ACCOUNTSPAYABLE,
      value: "Cuentas por pagar",
    },
  ],
  paymentMethod: paymentMethodFilters.map((paymentMethod) => ({
    id: paymentMethod,
    value: paymentMethod,
  })),
  status: [
    {
      id: EPaymentStatusType.ANYWHERE,
      value: "Cualquiera",
    },
    {
      id: EPaymentStatusType.ARREARS,
      value: "En mora",
    },
  ],
});

export { paymentFilters, paymentInitialFilters };
