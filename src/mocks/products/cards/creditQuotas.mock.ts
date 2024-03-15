import { EProductType, IProduct } from "src/model/entity/product";

const creditQuotasMock: IProduct[] = [
  {
    id: "590030780132",
    title: "Crediexpress",
    description: "Informe de movimientos",
    type: EProductType.CREDITCARD,
    attributes: [
      {
        id: "available_space",
        label: "Cupo disponible",
        value: 5800000,
      },
      {
        id: "total_dedt",
        label: "Deuda total",
        value: 2750420,
      },
      {
        id: "next_payment_date",
        label: "Fecha próximo pago",
        value: "29/Feb/2024",
      },
      {
        id: "next_payment_value",
        label: "Valor próximo pago",
        value: 250000,
      },
      {
        id: "type",
        label: "Tipo",
        value: "Crédito por consumo",
      },
      {
        id: "assigned_quota",
        label: "Cupo asignado",
        value: 8400000,
      },
      {
        id: "min_payment",
        label: "Pago mínimo",
        value: 275000,
      },
      {
        id: "full_payment",
        label: "Pago total",
        value: 2775000,
      },
      {
        id: "payment_method",
        label: "Medio de pago",
        value: "Fondecom mensual",
      },
      {
        id: "used_quota",
        label: "Cupo usado",
        value: [
          {
            id: "current_consumption",
            label: "Consumos vigentes",
            value: 1860000,
          },
          {
            id: "transactions_process",
            label: "Transacciones en proceso",
            value: 740000,
          },
          {
            id: "used_quota_value",
            label: "Pago total",
            value: 2600000,
          },
        ],
      },
      {
        id: "min_capital_payment",
        label: "Abono a capital",
        value: 100000,
      },
      {
        id: "min_current_interest",
        label: "Interés corriente",
        value: 1500000,
      },
      {
        id: "min_arrears_interest",
        label: "Interés de mora",
        value: 0,
      },
      {
        id: "min_handling_fee",
        label: "Cuota de manejo",
        value: 7500,
      },
      {
        id: "min_total_value",
        label: "Pago total",
        value: 257500,
      },
      {
        id: "total_capital_payment",
        label: "Abono a capital",
        value: 100000,
      },
      {
        id: " total_current_interest",
        label: "Interés corriente",
        value: 1500000,
      },
      {
        id: "total_arrears_interest",
        label: "Interés de mora",
        value: 0,
      },
      {
        id: "total_handling_fee",
        label: "Cuota de manejo",
        value: 7500,
      },
      {
        id: "tot_total_value",
        label: "Pago total",
        value: 2277500,
      },
    ],
    movements: [
      {
        id: "movement-1",
        description: "Compra GERÓNIMO MARTINS SAS",
        totalValue: 500000,
        date: new Date("10/May/2024 11:20 am"),
        quotas: "a 12 meses",
      },
      {
        id: "movement-2",
        description: "Pago mensual CREDIEXPRESS",
        totalValue: -856321,
        date: new Date("21/Feb/2024 08:15 am"),
        quotas: "",
      },
      {
        id: "movement-3",
        description: "Compra RESTAURANTE YANUBA",
        totalValue: 240000,
        date: new Date("19/Feb/2024 01:55 am"),
        quotas: "a 12 meses",
      },
      {
        id: "movement-4",
        description: "Reverso compra CLONES Y PERISFERICOS SAS",
        totalValue: -8500000,
        date: new Date("19/Feb/2024 01:55 am"),
        quotas: "a 12 meses",
      },
      {
        id: "movement-5",
        description: "Compra CLONES Y PERISFERICOS SAS",
        totalValue: 8500000,
        date: new Date("19/Feb/2024 01:55 am"),
        quotas: "a 12 meses",
      },
    ],
    consumptions: ["123412341", "123412342", "123412343"],
  },
  {
    id: "590030780133",
    title: "Crédito de vehiculo",
    type: EProductType.CREDITCARD,
    description: "Informe de movimientos",
    attributes: [
      {
        id: "available_space",
        label: "Cupo disponible",
        value: 10000000,
      },
      {
        id: "total_dedt",
        label: "Deuda total",
        value: 60000000,
      },
      {
        id: "next_payment_date",
        label: "Fecha próximo pago",
        value: "Inmediato",
      },
      {
        id: "next_payment_value",
        label: "Valor próximo pago",
        value: 1909000,
      },
      {
        id: "type",
        label: "Tipo",
        value: "Crédito rotativo",
      },
      {
        id: "assigned_quota",
        label: "Cupo asignado",
        value: 70000000,
      },
      {
        id: "min_payment",
        label: "Pago mínimo",
        value: 1909000,
      },
      {
        id: "full_payment",
        label: "Pago total",
        value: 60000000,
      },
      {
        id: "payment_method",
        label: "Medio de pago",
        value: "Fondecom mensual",
      },
      {
        id: "used_quota",
        label: "Cupo usado",
        value: [
          {
            id: "accumulated_debt",
            label: "Deuda acumulada",
            value: 56749119,
          },
          {
            id: "transactions_process",
            label: "Transacciones en proceso",
            value: 3250881,
          },
          {
            id: "used_quota_value",
            label: "Pago total",
            value: 60000000,
          },
        ],
      },

      {
        id: "min_capital_payment",
        label: "Abono a capital",
        value: 752122,
      },
      {
        id: "min_current_interest",
        label: "Interés corriente",
        value: 1157380,
      },
      {
        id: "min_arrears_interest",
        label: "Interés de mora",
        value: 10103,
      },
      {
        id: "min_handling_fee",
        label: "Cuota de manejo",
        value: 7500,
      },
      {
        id: "min_total_value",
        label: "Pago total",
        value: 1909000,
      },
      {
        id: "total_capital_payment",
        label: "Abono a capital",
        value: 766864,
      },
      {
        id: " total_current_interest",
        label: "Interés corriente",
        value: 1157380,
      },
      {
        id: "total_arrears_interest",
        label: "Interés de mora",
        value: 10103,
      },
      {
        id: "total_handling_fee",
        label: "Cuota de manejo",
        value: 7500,
      },
      {
        id: "min_total_value",
        label: "Pago total",
        value: 60000000,
      },
    ],
    movements: [
      {
        id: "movement-1",
        description: "Compra de vehiculo",
        totalValue: 6000000,
        date: new Date("20/Dic/2023"),
        quotas: "a 48 meses",
      },
    ],
    tags: [
      {
        label: "En mora",
        appearance: "error",
      },
    ],
    consumptions: ["123412344"],
  },
];

export { creditQuotasMock };
