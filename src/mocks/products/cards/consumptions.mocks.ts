import { EProductType, IProduct } from "src/model/entity/product";

const consumptionsMocks: IProduct[] = [
  {
    id: "123412341",
    title: "Compra RESTAURANTE YANUBA",
    description: "Informe de consumos",
    type: EProductType.CREDIT,
    attributes: [
      {
        id: "consumption_date",
        label: "Fecha de consumo",
        value: "2024-02-21T02:03:34.000Z",
      },
      {
        id: "consumption_value",
        label: "Valor del consumo",
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
        label: "Saldo de capital",
        value: 52000,
      },
      {
        id: "current_interest",
        label: "Interés corriente",
        value: "% 2.51 MV",
      },
      {
        id: "min_payment_quota_available",
        label: "Cuota mínima disponible",
        value: 50000,
      },
      {
        id: "total_payment_quota_available",
        label: "Total cuota disponible",
        value: 50000,
      },
      {
        id: "capital_payment",
        label: "Pago de capital",
        value: "cuota 1/24",
      },
      {
        id: "min_capital_payment",
        label: "Pago de capital mínimo",
        value: 25000,
      },
      {
        id: "total_capital_payment",
        label: "Pago de capital total",
        value: 80000,
      },
      {
        id: "arrears_interest",
        label: "Interés de mora",
        value: 0,
      },
    ],
    movements: [
      {
        id: "movementConsumption-1",
        date: new Date("2024-03-15"),
        reference: "CT1001210",
        description: "Pago periódico",
        totalValue: 22000,
      },
    ],
  },
  {
    id: "123412342",
    title: "Compra CLONES Y PERISFERICOS SAS",
    description: "Informe de consumos",
    type: EProductType.CREDIT,
    attributes: [
      {
        id: "consumption_date",
        label: "Fecha de consumo",
        value: "2024-02-11T02:03:34.000Z",
      },
      {
        id: "consumption_value",
        label: "Valor del consumo",
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
        label: "Saldo de capital",
        value: 52000,
      },
      {
        id: "current_interest",
        label: "Interés corriente",
        value: "% 2.51 MV",
      },
      {
        id: "min_payment_quota_available",
        label: "Cuota mínima disponible",
        value: 50000,
      },
      {
        id: "total_payment_quota_available",
        label: "Total cuota disponible",
        value: 50000,
      },
      {
        id: "capital_payment",
        label: "Pago de capital",
        value: "cuota 1/24",
      },
      {
        id: "min_capital_payment",
        label: "Pago de capital mínimo",
        value: 25000,
      },
      {
        id: "total_capital_payment",
        label: "Pago de capital total",
        value: 80000,
      },
      {
        id: "arrears_interest",
        label: "Interés de mora",
        value: 0,
      },
    ],
    movements: [
      {
        id: "movementConsumption-1",
        date: new Date("2024-03-15"),
        reference: "CT1001210",
        description: "Pago periódico",
        totalValue: 22000,
      },
    ],
  },
  {
    id: "123412343",
    title: "Compra PEPE GANGA",
    description: "Informe de consumos",
    type: EProductType.CREDIT,
    attributes: [
      {
        id: "consumption_date",
        label: "Fecha de consumo",
        value: "2023-12-24T02:03:34.000Z",
      },
      {
        id: "consumption_value",
        label: "Valor del consumo",
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
        label: "Saldo de capital",
        value: 52000,
      },
      {
        id: "current_interest",
        label: "Interés corriente",
        value: "% 2.51 MV",
      },
      {
        id: "min_payment_quota_available",
        label: "Cuota mínima disponible",
        value: 50000,
      },
      {
        id: "total_payment_quota_available",
        label: "Total cuota disponible",
        value: 50000,
      },
      {
        id: "capital_payment",
        label: "Pago de capital",
        value: "cuota 9/24",
      },
      {
        id: "min_capital_payment",
        label: "Pago de capital mínimo",
        value: 50000,
      },
      {
        id: "total_capital_payment",
        label: "Pago de capital total",
        value: 80000,
      },
      {
        id: "arrears_interest",
        label: "Interés de mora",
        value: 0,
      },
    ],
    movements: [
      {
        id: "movementConsumption-1",
        date: new Date("2024-01-15"),
        reference: "CT1001210",
        description: "Pago periódico",
        totalValue: 22000,
      },
      {
        id: "movementConsumption-2",
        date: new Date("2023-12-15"),
        reference: "CT1001210",
        description: "Pago periódico",
        totalValue: 22000,
      },
      {
        id: "movementConsumption-3",
        date: new Date("2023-11-15"),
        reference: "CT1001210",
        description: "Pago periódico",
        totalValue: 22000,
      },
      {
        id: "movementConsumption-4",
        date: new Date("2023-10-15"),
        reference: "CT1001210",
        description: "Pago periódico",
        totalValue: 22000,
      },
      {
        id: "movementConsumption-5",
        date: new Date("2023-09-15"),
        reference: "CT1001210",
        description: "Pago periódico",
        totalValue: 22000,
      },
    ],
  },
  {
    id: "123412344",
    title: "Compra DISTRIBUIDORA MAYORISTA DE AUTOMÓVILES MADIAUTOS SAS",
    description: "Informe de consumos",
    type: EProductType.CREDIT,
    attributes: [
      {
        id: "consumption_date",
        label: "Fecha de consumo",
        value: "2023-12-20T02:03:34.000Z",
      },
      {
        id: "consumption_value",
        label: "Valor del consumo",
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
        label: "Saldo de capital",
        value: 752122,
      },
      {
        id: "current_interest",
        label: "Interés corriente",
        value: "% 1.96 MV",
      },
      {
        id: "min_payment_quota_available",
        label: "Cuota mínima disponible",
        value: 1157380,
      },
      {
        id: "total_payment_quota_available",
        label: "Total cuota disponible",
        value: 1157380,
      },
      {
        id: "capital_payment",
        label: "Pago de capital",
        value: "cuota 1/47",
      },
      {
        id: "min_capital_payment",
        label: "Pago de capital mínimo",
        value: 752122,
      },
      {
        id: "total_capital_payment",
        label: "Pago de capital total",
        value: 766864,
      },
      {
        id: "arrears_interest",
        label: "Interés de mora",
        value: 10103,
      },
    ],
    movements: [
      {
        id: "movementConsumption-1",
        date: new Date("2024-01-20"),
        reference: "CT1001210",
        description: "Pago periódico",
        totalValue: 19009000,
      },
    ],
  },
];

export { consumptionsMocks };
