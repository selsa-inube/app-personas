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
      value: EPaymentGroupType.ALL,
      label: "Todos",
    },
    {
      id: EPaymentGroupType.SAVINGSCOMMITMENT,
      value: EPaymentGroupType.SAVINGSCOMMITMENT,
      label: "Compromisos de ahorro",
    },
    {
      id: EPaymentGroupType.CREDITS,
      value: EPaymentGroupType.CREDITS,
      label: "Créditos",
    },
    ...(creditQuotasFlag
      ? [
          {
            id: EPaymentGroupType.CREDITQUOTAS,
            value: EPaymentGroupType.CREDITQUOTAS,
            label: "Cupos de crédito",
          },
        ]
      : []),
    ...(insurancesFlag
      ? [
          {
            id: EPaymentGroupType.INSURANCES,
            value: EPaymentGroupType.INSURANCES,
            label: "Seguros",
          },
        ]
      : []),
    ...(accountsPayableFlag
      ? [
          {
            id: EPaymentGroupType.ACCOUNTSRECEIVABLE,
            value: EPaymentGroupType.ACCOUNTSRECEIVABLE,
            label: "Cuentas por pagar",
          },
        ]
      : []),
  ],
  paymentMethod: [
    {
      id: EPaymentMethodFilterType.ALL,
      value: EPaymentMethodFilterType.ALL,
      label: "Todos",
    },
    ...paymentMethodFilters.map((paymentMethod) => ({
      id: paymentMethod,
      value: paymentMethod,
      label: paymentMethod,
    })),
  ],
  status: [
    {
      id: EPaymentStatusType.ANYWHERE,
      value: EPaymentStatusType.ANYWHERE,
      label: "Cualquiera",
    },
    {
      id: EPaymentStatusType.ARREARS,
      value: EPaymentStatusType.ARREARS,
      label: "En mora",
    },
  ],
});

export { getPaymentFilters, paymentInitialFilters };
