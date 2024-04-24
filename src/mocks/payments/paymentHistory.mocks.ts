import { IPaymentHistory } from "src/model/entity/payment";

const paymentHistoryMock: IPaymentHistory[] = [
  {
    id: "558907643-1",
    title: "Pago PRE-LIQUIDACIÓN WEB",
    value: 645000,
    paymentDate: new Date("30/Mar/2024 11:20 am"),
    paymentType: "Pagar con débito a una cuenta de ahorros",
    cus: "558907643",
    tag: {
      label: "En progreso",
      appearance: "warning",
      textAppearance: "warning",
      modifier: "clear",
    },
    products: [
      {
        "0": {
          id: "1",
          label: "Nombre del producto:",
          value: "TEMPORADA GASTOS PERSONALES",
        },
        "1": {
          id: "2",
          label: "Numero del producto:",
          value: "10-241000476",
        },
        "2": {
          id: "3",
          label: "Valor del pago:",
          value: 100000,
        },
        "3": {
          id: "4",
          label: "Aplicar pago a:",
          value: "Reducir plazo",
        },
      },
      {
        "0": {
          id: "1",
          label: "Nombre del producto:",
          value: "CREDI-APORTES GASTOS PERSONALES",
        },
        "1": {
          id: "2",
          label: "Numero del producto:",
          value: "10-241000476",
        },
        "2": {
          id: "3",
          label: "Valor del pago:",
          value: 395000,
        },
      },
      {
        "0": {
          id: "1",
          label: "Nombre del producto:",
          value: "TEMPORADA GASTOS PERSONALES",
        },
        "1": {
          id: "2",
          label: "Numero del producto:",
          value: "10-241000476",
        },
        "2": {
          id: "3",
          label: "Valor del pago:",
          value: 150000,
        },
      },
    ],
  },
  {
    id: "558907643-2",
    title: "Pago PRE-LIQUIDACIÓN WEB",
    value: 150000,
    paymentDate: new Date("15/Mar/2024 01:52 pm"),
    paymentType: "Pagar por PSE",
    cus: "558907643",
    tag: {
      label: "Rechazado",
      appearance: "error",
      textAppearance: "error",
      modifier: "clear",
    },
    products: [
      {
        "0": {
          id: "1",
          label: "Nombre del producto:",
          value: "TEMPORADA GASTOS PERSONALES",
        },
        "1": {
          id: "2",
          label: "Numero del producto:",
          value: "10-241000476",
        },
        "2": {
          id: "3",
          label: "Valor del pago:",
          value: 100000,
        },
      },
    ],
  },
  {
    id: "558907643-3",
    title: "Pago PRE-LIQUIDACIÓN WEB",
    value: 150000,
    paymentDate: new Date("28/Feb/2024 05:27 am"),
    paymentType: "Pagar con débito a una cuenta de ahorros",
    cus: "558907643",
    tag: {
      label: "Completado",
      appearance: "success",
      textAppearance: "success",
      modifier: "clear",
    },
    products: [
      {
        "0": {
          id: "1",
          label: "Nombre del producto:",
          value: "TEMPORADA GASTOS PERSONALES",
        },
        "1": {
          id: "2",
          label: "Numero del producto:",
          value: "10-241000476",
        },
        "2": {
          id: "3",
          label: "Valor del pago:",
          value: 150000,
        },
      },
    ],
  },
  {
    id: "558907643-4",
    title: "Pago PRE-LIQUIDACIÓN WEB",
    value: 150000,
    paymentDate: new Date("15/Feb/2024 01:51 pm"),
    paymentType: "Pagar con débito a una cuenta de ahorros",
    cus: "558907643",
    tag: {
      label: "Completado",
      appearance: "success",
      textAppearance: "success",
      modifier: "clear",
    },
    products: [
      {
        "0": {
          id: "1",
          label: "Nombre del producto:",
          value: "TEMPORADA GASTOS PERSONALES",
        },
        "1": {
          id: "2",
          label: "Numero del producto:",
          value: "10-241000476",
        },
        "2": {
          id: "3",
          label: "Valor del pago:",
          value: 100000,
        },
        "3": {
          id: "4",
          label: "Aplicar pago a:",
          value: "Reducir plazo",
        },
      },
      {
        "0": {
          id: "1",
          label: "Nombre del producto:",
          value: "CREDI-APORTES GASTOS PERSONALES",
        },
        "1": {
          id: "2",
          label: "Numero del producto:",
          value: "10-241000476",
        },
        "2": {
          id: "3",
          label: "Valor del pago:",
          value: 50000,
        },
      },
    ],
  },
  {
    id: "558907643-5",
    title: "Pago PRE-LIQUIDACIÓN WEB",
    value: 150000,
    paymentDate: new Date("30/Jan/2024 09:45 am"),
    paymentType: "Pagar con débito a una cuenta de ahorros",
    cus: "558907643",
    tag: {
      label: "Completado",
      appearance: "success",
      textAppearance: "success",
      modifier: "clear",
    },
    products: [
      {
        "0": {
          id: "1",
          label: "Nombre del producto:",
          value: "TEMPORADA GASTOS PERSONALES",
        },
        "1": {
          id: "2",
          label: "Numero del producto:",
          value: "10-241000476",
        },
        "2": {
          id: "3",
          label: "Valor del pago:",
          value: 50000,
        },
        "3": {
          id: "4",
          label: "Aplicar pago a:",
          value: "Reducir plazo",
        },
      },
      {
        "0": {
          id: "1",
          label: "Nombre del producto:",
          value: "CREDI-APORTES GASTOS PERSONALES",
        },
        "1": {
          id: "2",
          label: "Numero del producto:",
          value: "10-241000476",
        },
        "2": {
          id: "3",
          label: "Valor del pago:",
          value: 50000,
        },
      },
      {
        "0": {
          id: "1",
          label: "Nombre del producto:",
          value: "TEMPORADA GASTOS PERSONALES",
        },
        "1": {
          id: "2",
          label: "Numero del producto:",
          value: "10-241000476",
        },
        "2": {
          id: "3",
          label: "Valor del pago:",
          value: 50000,
        },
      },
    ],
  },
  {
    id: "558907643-6",
    title: "Pago PRE-LIQUIDACIÓN WEB",
    value: 150000,
    paymentDate: new Date("15/Jan/2024 12:44 pm"),
    paymentType: "Pagar con débito a una cuenta de ahorros",
    cus: "558907643",
    tag: {
      label: "Completado",
      appearance: "success",
      textAppearance: "success",
      modifier: "clear",
    },
    products: [
      {
        "0": {
          id: "1",
          label: "Nombre del producto:",
          value: "TEMPORADA GASTOS PERSONALES",
        },
        "1": {
          id: "2",
          label: "Numero del producto:",
          value: "10-241000476",
        },
        "2": {
          id: "3",
          label: "Valor del pago:",
          value: 150000,
        },
        "3": {
          id: "4",
          label: "Aplicar pago a:",
          value: "Reducir plazo",
        },
      },
    ],
  },
  {
    id: "558907643-7",
    title: "Pago PRE-LIQUIDACIÓN WEB",
    value: 200000,
    paymentDate: new Date("15/Jan/2024 10:52 am"),
    paymentType: "Pagar por PSE",
    cus: "558907643",
    tag: {
      label: "Rechazado",
      appearance: "error",
      textAppearance: "error",
      modifier: "clear",
    },
    products: [
      {
        "0": {
          id: "1",
          label: "Nombre del producto:",
          value: "TEMPORADA GASTOS PERSONALES",
        },
        "1": {
          id: "2",
          label: "Numero del producto:",
          value: "10-241000476",
        },
        "2": {
          id: "3",
          label: "Valor del pago:",
          value: 200000,
        },
        "3": {
          id: "4",
          label: "Aplicar pago a:",
          value: "Reducir plazo",
        },
      },
    ],
  },
  {
    id: "558907643-8",
    title: "Pago PRE-LIQUIDACIÓN WEB",
    value: 450000,
    paymentDate: new Date("02/Jan/2024 03:44 pm"),
    paymentType: "Pagar con débito a una cuenta de ahorros",
    cus: "558907643",
    tag: {
      label: "Completado",
      appearance: "success",
      textAppearance: "success",
      modifier: "clear",
    },
    products: [
      {
        "0": {
          id: "1",
          label: "Nombre del producto:",
          value: "TEMPORADA GASTOS PERSONALES",
        },
        "1": {
          id: "2",
          label: "Numero del producto:",
          value: "10-241000476",
        },
        "2": {
          id: "3",
          label: "Valor del pago:",
          value: 100000,
        },
        "3": {
          id: "4",
          label: "Aplicar pago a:",
          value: "Reducir plazo",
        },
      },
      {
        "0": {
          id: "1",
          label: "Nombre del producto:",
          value: "CREDI-APORTES GASTOS PERSONALES",
        },
        "1": {
          id: "2",
          label: "Numero del producto:",
          value: "10-241000476",
        },
        "2": {
          id: "3",
          label: "Valor del pago:",
          value: 250000,
        },
      },
      {
        "0": {
          id: "1",
          label: "Nombre del producto:",
          value: "TEMPORADA GASTOS PERSONALES",
        },
        "1": {
          id: "2",
          label: "Numero del producto:",
          value: "10-241000476",
        },
        "2": {
          id: "3",
          label: "Valor del pago:",
          value: 100000,
        },
      },
    ],
  },
  {
    id: "558907643-9",
    title: "Pago PRE-LIQUIDACIÓN WEB",
    value: 300000,
    paymentDate: new Date("01/Jan/2024 07:58 am"),
    paymentType: "Pagar por PSE",
    cus: "558907643",
    tag: {
      label: "Rechazado",
      appearance: "error",
      textAppearance: "error",
      modifier: "clear",
    },
    products: [
      {
        "0": {
          id: "1",
          label: "Nombre del producto:",
          value: "TEMPORADA GASTOS PERSONALES",
        },
        "1": {
          id: "2",
          label: "Numero del producto:",
          value: "10-241000476",
        },
        "2": {
          id: "3",
          label: "Valor del pago:",
          value: 300000,
        },
        "3": {
          id: "4",
          label: "Aplicar pago a:",
          value: "Reducir plazo",
        },
      },
    ],
  },
];

export { paymentHistoryMock };
