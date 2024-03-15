import {
  EProductType,
  IProduct,
  EQuotasMovementType,
} from "src/model/entity/product";

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
        id: "payment_method",
        label: "Medio de pago",
        value: "Fondecom mensual",
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
    ],
    movements: [
      {
        id: "movement-1",
        description: "GERÓNIMO MARTINS SAS",
        totalValue: 500000,
        date: new Date("21/Feb/2024 11:20 am"),
        quotas: "a 12 meses",
        quotasMovementsType: EQuotasMovementType.BUY,
      },
      {
        id: "movement-2",
        description: "cuota mensual CREDIEXPRESS",
        totalValue: -856321,
        date: new Date("21/Feb/2024 08:15 am"),
        quotasMovementsType: EQuotasMovementType.PAY,
      },
      {
        id: "movement-3",
        description: "RESTAURANTE YANUBA",
        totalValue: 240000,
        date: new Date("19/Feb/2024 01:55 pm"),
        quotas: "a 12 meses",
        quotasMovementsType: EQuotasMovementType.BUY,
      },
      {
        id: "movement-4",
        description: "compra CLONES Y PERIFÉRICOS SAS",
        totalValue: -8500000,
        date: new Date("19/Feb/2024 01:55 pm"),
        quotasMovementsType: EQuotasMovementType.REVERSE,
      },
      {
        id: "movement-5",
        description: "CLONES Y PERIFÉRICOS SAS",
        totalValue: 8500000,
        date: new Date("19/Feb/2024 01:55 am"),
        quotasMovementsType: EQuotasMovementType.BUY,
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
        value: "Crédito por consumo",
      },
      {
        id: "payment_method",
        label: "Medio de pago",
        value: "Fondecom mensual",
      },
      {
        id: "assigned_quota",
        label: "Cupo asignado",
        value: 60000000,
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
    ],
    movements: [
      {
        id: "movement-1",
        description: "vehiculo",
        totalValue: 6000000,
        date: new Date("10/Dec/2023 4:20 pm"),
        quotas: "a 48 meses",
        quotasMovementsType: EQuotasMovementType.BUY,
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
