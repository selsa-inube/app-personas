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

const getPaymentFilters = (
  paymentMethodFilters: string[],
  insurancesFlag: boolean,
  accountsPayableFlag: boolean,
  creditQuotasFlag: boolean,
) => ({
  group: [
    {
      id: EPaymentGroupType.ALL,
      value: "Todos",
    },
    {
      id: EPaymentGroupType.SAVINGSCOMMITMENT,
      value: "Compromisos de ahorro",
    },
    {
      id: EPaymentGroupType.CREDITS,
      value: "Créditos",
    },
    ...(creditQuotasFlag
      ? [
          {
            id: EPaymentGroupType.CREDITQUOTAS,
            value: "Cupos de crédito",
          },
        ]
      : []),
    ...(insurancesFlag
      ? [
          {
            id: EPaymentGroupType.INSURANCES,
            value: "Seguros",
          },
        ]
      : []),
    ...(accountsPayableFlag
      ? [
          {
            id: EPaymentGroupType.ACCOUNTSPAYABLE,
            value: "Cuentas por pagar",
          },
        ]
      : []),
  ],
  paymentMethod: [
    {
      id: EPaymentMethodFilterType.ALL,
      value: "Todos",
    },
    ...paymentMethodFilters.map((paymentMethod) => ({
      id: paymentMethod,
      value: paymentMethod,
    })),
  ],
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

export { getPaymentFilters, paymentInitialFilters };
