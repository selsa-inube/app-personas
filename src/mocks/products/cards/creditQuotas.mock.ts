import { EProductType, IProduct } from "src/model/entity/product";

const creditQuotasMock: IProduct[] = [
  {
    id: "590030780132",
    title: "Crediexpress",
    description: "Crediexpress 590030780132",
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
        label: "tipo",
        value: "Crédito por consumo",
      },
      {
        id: "assigned_quota",
        label: "Cupo asignado",
        value: 8550420,
      },
    ],
    quotaDetails: [
      {
        title: "Crediexpress",
        description: "Informe de movimientos",
        attributes: [
          {
            id: "assigned_quota",
            label: "Pago minimo",
            value: 275000,
          },
          {
            id: "full_payment",
            label: "Pago total",
            value: 2775000,
          },
          {
            id: "next_payment_date",
            label: "Fecha próximo pago",
            value: "15/Mar/2024",
          },
          {
            id: "quota_available",
            label: "Cupo disponible",
            value: 5800000,
          },
        ],
        currentConsumption: [
          {
            title: "Compra RESTAURANTE YANUBA",
            description: "Informe de consumos",
            attributes: [
              {
                id: "consumption_date",
                label: "Fecha consumo",
                value: "21/Feb/2024",
              },
              {
                id: "consumption_value",
                label: "Valor consumo",
                value: 250000,
              },
              {
                id: "dues_paid",
                label: "Cuotas pagadas",
                value: 1,
              },
              {
                id: "dues_earring",
                label: "Cuotas pendientes",
                value: 23,
              },
              {
                id: "balance_capital",
                label: "Saldo a Capital",
                value: 52000,
              },
              {
                id: "current_interest",
                label: "Interés corriente",
                value: "% 2.51 MV",
              },
              {
                id: "min_payment_quota_available",
                label: "pago minimo interés corriente",
                value: 50000,
              },
              {
                id: "total_payment_quota_available",
                label: "pago total interés corriente",
                value: 50000,
              },
              {
                id: "capital_payment",
                label: "Abono a capital",
                value: "cuota 1/24",
              },
              {
                id: "min_capital_payment",
                label: "pago minimo Abono a capital",
                value: 25000,
              },
              {
                id: "total_capital_payment",
                label: "pago total Abono a capital",
                value: 80000,
              },
              {
                id: "quota_available",
                label: "interés de mora",
                value: 0,
              },
            ],
            movements: [
              {
                id: "movementConsumption-1",
                date: new Date("15/Mar/2024"),
                reference: "CT1001210",
                description: "Pago periódico",
                totalValue: 22000,
              },
            ],
          },
          {
            title: "Compra CLONES Y PERISFERICOS SAS",
            description: "Informe de consumos",
            attributes: [
              {
                id: "consumption_date",
                label: "Fecha consumo",
                value: "11/Feb/2024",
              },
              {
                id: "consumption_value",
                label: "Valor consumo",
                value: 250000,
              },
              {
                id: "dues_paid",
                label: "Cuotas pagadas",
                value: 1,
              },
              {
                id: "dues_earring",
                label: "Cuotas pendientes",
                value: 23,
              },
              {
                id: "balance_capital",
                label: "Saldo a Capital",
                value: 52000,
              },
              {
                id: "current_interest",
                label: "Interés corriente",
                value: "% 2.51 MV",
              },
              {
                id: "min_payment_quota_available",
                label: "pago minimo interés corriente",
                value: 50000,
              },
              {
                id: "total_payment_quota_available",
                label: "pago total interés corriente",
                value: 50000,
              },
              {
                id: "capital_payment",
                label: "Abono a capital",
                value: "cuota 1/24",
              },
              {
                id: "min_capital_payment",
                label: "pago minimo Abono a capital",
                value: 25000,
              },
              {
                id: "total_capital_payment",
                label: "pago total Abono a capital",
                value: 80000,
              },

              {
                id: "quota_available",
                label: "interés de mora",
                value: 0,
              },
            ],
            movements: [
              {
                id: "movementConsumption-1",
                date: new Date("15/Mar/2024"),
                reference: "CT1001210",
                description: "Pago periódico",
                totalValue: 22000,
              },
            ],
          },
          {
            title: "Compra PEPE GANGA",
            description: "Informe de consumos",
            attributes: [
              {
                id: "consumption_date",
                label: "Fecha consumo",
                value: "24/Dic/2023",
              },
              {
                id: "consumption_value",
                label: "Valor consumo",
                value: 250000,
              },
              {
                id: "dues_paid",
                label: "Cuotas pagadas",
                value: 9,
              },
              {
                id: "dues_earring",
                label: "Cuotas pendientes",
                value: 15,
              },
              {
                id: "balance_capital",
                label: "Saldo a Capital",
                value: 52000,
              },
              {
                id: "current_interest",
                label: "Interés corriente",
                value: "% 2.51 MV",
              },
              {
                id: "min_payment_quota_available",
                label: "pago minimo interés corriente",
                value: 50000,
              },
              {
                id: "total_payment_quota_available",
                label: "pago total interés corriente",
                value: 50000,
              },
              {
                id: "capital_payment",
                label: "Abono a capital",
                value: "cuota 9/24",
              },
              {
                id: "min_capital_payment",
                label: "pago minimo Abono a capital",
                value: 50000,
              },
              {
                id: "total_capital_payment",
                label: "pago total Abono a capital",
                value: 80000,
              },

              {
                id: "quota_available",
                label: "interés de mora",
                value: 0,
              },
            ],
            movements: [
              {
                id: "movementConsumption-1",
                date: new Date("15/Ene/2024"),
                reference: "CT1001210",
                description: "Pago periódico",
                totalValue: 22000,
              },
              {
                id: "movementConsumption-2",
                date: new Date("15/Dic/2023"),
                reference: "CT1001210",
                description: "Pago periódico",
                totalValue: 22000,
              },
              {
                id: "movementConsumption-3",
                date: new Date("15/Nov/2023"),
                reference: "CT1001210",
                description: "Pago periódico",
                totalValue: 22000,
              },
              {
                id: "movementConsumption-4",
                date: new Date("15/Oct/2023"),
                reference: "CT1001210",
                description: "Pago periódico",
                totalValue: 22000,
              },
              {
                id: "movementConsumption-5",
                date: new Date("15/Sep/2023"),
                reference: "CT1001210",
                description: "Pago periódico",
                totalValue: 22000,
              },
            ],
          },
        ],
      },
    ],
    movements: [
      {
        id: "movement-1",
        description: "compra GERÓNIMO MARTINS SAS",
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
  },
  {
    id: "590030780133",
    title: "Crédito de vehiculo",
    description: "Crédito de vehiculo 590030780133",
    type: EProductType.CREDITCARD,
    attributes: [
      {
        id: "available_space",
        label: "Cupo disponible",
        value: 0,
      },
      {
        id: "total_dedt",
        label: "Deuda total",
        value: 60000000,
      },
      {
        id: "next_payment_date",
        label: "Fecha próximo pago",
        value: "inmediato",
      },
      {
        id: "next_payment_value",
        label: "Valor próximo pago",
        value: 1909000,
      },
      {
        id: "type",
        label: "tipo",
        value: "Crédito por consumo",
      },
      {
        id: "assigned_quota",
        label: "Cupo asignado",
        value: 60000000,
      },
    ],
    quotaDetails: [
      {
        title: "Crédito de vehiculo",
        description: "Informe de movimientos",
        attributes: [
          {
            id: "assigned_quota",
            label: "Pago minimo",
            value: 1909000,
          },
          {
            id: "full_payment",
            label: "Pago total",
            value: 60000000,
          },
          {
            id: "next_payment_date",
            label: "Fecha próximo pago",
            value: "Inmediato",
          },
          {
            id: "quota_available",
            label: "Cupo disponible",
            value: 0,
          },
        ],
        currentConsumption: [
          {
            title: "",
            description: "Informe de consumos",
            attributes: [
              {
                id: "consumption_date",
                label: "Fecha consumo",
                value: "20/Dic/2023",
              },
              {
                id: "consumption_value",
                label: "Valor consumo",
                value: 60000000,
              },
              {
                id: "dues_paid",
                label: "Cuotas pagadas",
                value: 1,
              },
              {
                id: "dues_earring",
                label: "Cuotas pendientes",
                value: 47,
              },
              {
                id: "balance_capital",
                label: "Saldo a Capital",
                value: 752122,
              },
              {
                id: "current_interest",
                label: "Interés corriente",
                value: "% 1.96 MV",
              },
              {
                id: "min_payment_quota_available",
                label: "pago minimo interés corriente",
                value: 1157380,
              },
              {
                id: "total_payment_quota_available",
                label: "pago total interés corriente",
                value: 1157380,
              },
              {
                id: "capital_payment",
                label: "Abono a capital",
                value: "cuota 1/24",
              },
              {
                id: "min_capital_payment",
                label: "pago minimo Abono a capital",
                value: 752.122,
              },
              {
                id: "total_capital_payment",
                label: "pago total Abono a capital",
                value: 766.864,
              },
              {
                id: "quota_available",
                label: "interés de mora",
                value: 10103,
              },
            ],
            movements: [
              {
                id: "movementConsumption-1",
                date: new Date("20/Ene/2024"),
                reference: "CT1001210",
                description: "Pago periódico",
                totalValue: 19009000,
              },
            ],
          },
        ],
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
  },
];

export { creditQuotasMock };
