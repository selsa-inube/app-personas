import { IPaymentFilters } from "@components/modals/payments/PaymentFilterModal";

const paymentInitialFilters: IPaymentFilters = {
  group: "all",
  paymentMethod: "all",
  status: "anywhere",
};

const paymentFilters = {
  group: [
    {
      id: "all",
      value: "Todos",
    },
    {
      id: "savings",
      value: "Ahorros",
    },
    {
      id: "credits",
      value: "Créditos",
    },
    {
      id: "creditQuotas",
      value: "Cupos de crédito",
    },
    {
      id: "insurances",
      value: "Seguros",
    },
    {
      id: "accountsPayable",
      value: "Cuentas por pagar",
    },
  ],
  paymentMethod: [
    {
      id: "all",
      value: "Todos",
    },
    {
      id: "monthly",
      value: "Fondecom mensual",
    },
    {
      id: "automaticDebit",
      value: "Débito automático",
    },
    {
      id: "window",
      value: "Ventanilla",
    },
  ],
  status: [
    {
      id: "anywhere",
      value: "Cualquiera",
    },
    {
      id: "arrears",
      value: "En mora",
    },
  ],
};

export { paymentFilters, paymentInitialFilters };
