import { IProduct } from "@ptypes/pages/product.types";

const savingsMock: IProduct[] = [
  {
    title: "Cuenta familiar",
    id: "CA214554",
    attributes: [
      {
        id: "net_value",
        label: "Saldo total",
        value: 785923,
      },
      {
        id: "min_value",
        label: "Valor mínimo",
        value: 0,
      },
      {
        id: "account_state",
        label: "Estado",
        value: "Activa",
      },
      {
        id: "account_gmf",
        label: "GMF",
        value: "Todas las transacciones",
      },
      {
        id: "account_ADA",
        label: "Débito automático autorizado",
        value: "No",
      },
      {
        id: "account_to_salary",
        label: "Cuenta para abonar la nómina",
        value: "No",
      },
      {
        id: "interest_rate",
        label: "Tasa de interés",
        value: "0,04 % NAMV",
      },
      {
        id: "beneficiaries",
        label: "Beneficiarios",
        value: [
          {
            id: "beneficiarie-1",
            label: "Juan Diaz",
            value: "75%",
          },
          {
            id: "beneficiarie-2",
            label: "Luis Escobar",
            value: "25%",
          },
        ],
      },
    ],
    movements: [
      {
        id: "movement-1",
        date: "10/May/2023",
        reference: "TJ1100428",
        description: "Contabilización conciliación movimientos tarjeta",
        totalValue: -15700,
      },
      {
        id: "movement-2",
        date: "30/Abr/2023",
        reference: "IN1001756 ",
        description: "Abono rendimientos por el periodo 04/01/2023",
        totalValue: 19253,
      },
      {
        id: "movement-3",
        date: "30/Abr/2023",
        reference: "TJ1098250",
        description:
          "Debito automático saldos vencidos comisiones del mes de Abril",
        totalValue: -28884,
      },
      {
        id: "movement-4",
        date: "28/Abr/2023",
        reference: "TJ1097695",
        description: "Compra Credibanco MAZKO AAMZZ653",
        totalValue: -690000,
      },
      {
        id: "movement-5",
        date: "23/Abr/2023",
        reference: "TJ1096655",
        description: "Compra Credibanco BIU BELLEZA Y ESTETICA",
        totalValue: -80000,
      },
      {
        id: "movement-6",
        date: "23/Abr/2023",
        reference: "TJ1096675",
        description: "Compra Credibanco FRISBY Q N37",
        totalValue: -17900,
      },
      {
        id: "movement-7",
        date: "20/Abr/2023",
        reference: "CB1019845",
        description: "Transferencia cuenta ahorros asociado 66861642 por valor",
        totalValue: 1500000,
      },
      {
        id: "movement-8",
        date: "20/Abr/2023",
        reference: "TJ1096211",
        description: "Compra Internet coopcentral IGLESIA SEPTIMO",
        totalValue: -2000000,
      },
      {
        id: "movement-9",
        date: "20/Abr/2023",
        reference: "TJ1096221",
        description: "Compra Internet coopcentral IGLESIA SEPTIMO",
        totalValue: -1000000,
      },
      {
        id: "movement-10",
        date: "19/Abr/2023",
        reference: "NP104594",
        description: "Reintegro por Transfiya no exitosa",
        totalValue: 2000000,
      },
    ],
    tags: [],
  },
  {
    title: "Cuenta de ahorros",
    id: "CA652879",
    attributes: [
      {
        id: "net_value",
        label: "Saldo total",
        value: 592381,
      },
      {
        id: "min_value",
        label: "Valor mínimo",
        value: 5000,
      },
      {
        id: "account_state",
        label: "Estado",
        value: "Activa",
      },
      {
        id: "account_gmf",
        label: "GMF",
        value: "Todas las transacciones",
      },
      {
        id: "account_ADA",
        label: "Débito automático autorizado",
        value: "Si",
      },
      {
        id: "account_to_salary",
        label: "Cuenta para abonar la nómina",
        value: "No",
      },
      {
        id: "interest_rate",
        label: "Tasa de interés",
        value: "0,07 % NAMV",
      },
      {
        id: "beneficiaries",
        label: "Beneficiarios",
        value: [
          {
            id: "beneficiary-1",
            label: "Rigoberto Perez",
            value: "40%",
          },
          {
            id: "beneficiary-2",
            label: "Jose Cuesta",
            value: "30%",
          },
          {
            id: "beneficiary-3",
            label: "David Quintero",
            value: "30%",
          },
        ],
      },
    ],
    movements: [
      {
        id: "movement-1",
        date: "15/Jul/2023",
        reference: "TJ1122334",
        description: "Pago de factura de electricidad",
        totalValue: -12500,
      },
      {
        id: "movement-2",
        date: "02/Jul/2023",
        reference: "IN1023456",
        description: "Abono rendimientos por el periodo 06/01/2023",
        totalValue: 18750,
      },
      {
        id: "movement-3",
        date: "02/Jul/2023",
        reference: "TJ1123456",
        description:
          "Debito automático saldos vencidos comisiones del mes de Julio",
        totalValue: -29500,
      },
      {
        id: "movement-4",
        date: "30/Jun/2023",
        reference: "TJ1126789",
        description: "Compra Credibanco ABCXYZ123",
        totalValue: -710000,
      },
      {
        id: "movement-5",
        date: "25/Jun/2023",
        reference: "TJ1125678",
        description: "Compra Credibanco XYZ STORE",
        totalValue: -85000,
      },
      {
        id: "movement-6",
        date: "25/Jun/2023",
        reference: "TJ1125790",
        description: "Compra Credibanco FASTFOOD123",
        totalValue: -18500,
      },
      {
        id: "movement-7",
        date: "22/Jun/2023",
        reference: "CB1023456",
        description: "Transferencia cuenta ahorros asociado 98765432 por valor",
        totalValue: 1600000,
      },
      {
        id: "movement-8",
        date: "22/Jun/2023",
        reference: "TJ1124567",
        description: "Compra Internet coopcentral TIENDA ONLINE",
        totalValue: -2100000,
      },
      {
        id: "movement-9",
        date: "22/Jun/2023",
        reference: "TJ1125678",
        description: "Compra Internet coopcentral TIENDA ONLINE",
        totalValue: -950000,
      },
      {
        id: "movement-10",
        date: "21/Jun/2023",
        reference: "NP105678",
        description: "Reintegro por Transfiya no exitosa",
        totalValue: 2100000,
      },
    ],
    tags: [],
  },
  {
    title: "Aportes sociales",
    id: "200 - 91214069",
    attributes: [
      {
        id: "net_value",
        label: "Saldo total",
        value: 7642790,
      },
      {
        id: "min_value",
        label: "Valor mínimo",
        value: 10000,
      },
      {
        id: "account_state",
        label: "Estado",
        value: "Activa",
      },
      {
        id: "account_gmf",
        label: "GMF",
        value: "Todas las transacciones",
      },
      {
        id: "account_ADA",
        label: "Débito automático autorizado",
        value: "Si",
      },
      {
        id: "account_to_salary",
        label: "Cuenta para abonar la nómina",
        value: "Si",
      },
      {
        id: "interest_rate",
        label: "Tasa de interés",
        value: "0,02 % NAMV",
      },
      {
        id: "beneficiaries",
        label: "Beneficiarios",
        value: [
          {
            id: "beneficiary-1",
            label: "Jose Diaz",
            value: "70%",
          },
          {
            id: "beneficiary-2",
            label: "Luis Perez",
            value: "20%",
          },
          {
            id: "beneficiary-3",
            label: "Carlos Osbaldo",
            value: "5%",
          },
          {
            id: "beneficiary-4",
            label: "Gustavo Albeiro",
            value: "5%",
          },
        ],
      },
    ],
    movements: [
      {
        id: "movement-21",
        date: "10/Ago/2023",
        reference: "TJ1133445",
        description: "Pago de factura de gas",
        totalValue: -13500,
      },
      {
        id: "movement-22",
        date: "28/Jul/2023",
        reference: "IN1024567",
        description: "Abono rendimientos por el periodo 07/01/2023",
        totalValue: 19800,
      },
      {
        id: "movement-23",
        date: "28/Jul/2023",
        reference: "TJ1134567",
        description:
          "Debito automático saldos vencidos comisiones del mes de Julio",
        totalValue: -31000,
      },
      {
        id: "movement-24",
        date: "26/Jul/2023",
        reference: "TJ1137890",
        description: "Compra Credibanco XYZ123STORE",
        totalValue: -730000,
      },
      {
        id: "movement-25",
        date: "22/Jul/2023",
        reference: "TJ1136789",
        description: "Compra Credibanco FASHIONOUTLET",
        totalValue: -90000,
      },
      {
        id: "movement-26",
        date: "22/Jul/2023",
        reference: "TJ1137901",
        description: "Compra Credibanco PIZZAHUT123",
        totalValue: -19500,
      },
      {
        id: "movement-27",
        date: "19/Jul/2023",
        reference: "CB1034567",
        description: "Transferencia cuenta ahorros asociado 76543210 por valor",
        totalValue: 1750000,
      },
      {
        id: "movement-28",
        date: "19/Jul/2023",
        reference: "TJ1135678",
        description: "Compra Internet coopcentral TIENDA VIRTUAL",
        totalValue: -2200000,
      },
      {
        id: "movement-29",
        date: "19/Jul/2023",
        reference: "TJ1136789",
        description: "Compra Internet coopcentral TIENDA VIRTUAL",
        totalValue: -1050000,
      },
      {
        id: "movement-30",
        date: "18/Jul/2023",
        reference: "NP106789",
        description: "Reintegro por Transfiya no exitosa",
        totalValue: 2200000,
      },
    ],
    tags: [],
  },
  {
    title: "Ahorro permanente",
    id: "201 - 91214069",
    attributes: [
      {
        id: "net_value",
        label: "Saldo total",
        value: 1980656,
      },
      {
        id: "min_value",
        label: "Valor mínimo",
        value: 23000,
      },
      {
        id: "account_state",
        label: "Estado",
        value: "Activa",
      },
      {
        id: "account_gmf",
        label: "GMF",
        value: "Todas las transacciones",
      },
      {
        id: "account_ADA",
        label: "Débito automático autorizado",
        value: "No",
      },
      {
        id: "account_to_salary",
        label: "Cuenta para abonar la nómina",
        value: "Si",
      },
      {
        id: "interest_rate",
        label: "Tasa de interés",
        value: "0,1 % NAMV",
      },
      {
        id: "beneficiaries",
        label: "Beneficiarios",
        value: [
          {
            id: "beneficiary-1",
            label: "Carlos Gardel",
            value: "20%",
          },
          {
            id: "beneficiary-2",
            label: "Richard Ríos",
            value: "20%",
          },
          {
            id: "beneficiary-3",
            label: "Endrick Felipe",
            value: "20%",
          },
          {
            id: "beneficiary-4",
            label: "Sebastian Garcia",
            value: "20%",
          },
          {
            id: "beneficiary-5",
            label: "Johan Lara",
            value: "20%",
          },
        ],
      },
    ],
    movements: [
      {
        id: "movement-1",
        date: "18/Jul/2023",
        reference: "NP106789",
        description: "Reintegro por Transfiya no exitosa",
        totalValue: 2200000,
      },
      {
        id: "movement-2",
        date: "22/Jul/2023",
        reference: "TJ1137901",
        description: "Compra Credibanco PIZZAHUT123",
        totalValue: -19500,
      },
      {
        id: "movement-3",
        date: "10/Ago/2023",
        reference: "TJ1133445",
        description: "Pago de factura de gas",
        totalValue: -13500,
      },
      {
        id: "movement-4",
        date: "26/Jul/2023",
        reference: "TJ1137890",
        description: "Compra Credibanco XYZ123STORE",
        totalValue: -730000,
      },
      {
        id: "movement-5",
        date: "19/Jul/2023",
        reference: "CB1034567",
        description: "Transferencia cuenta ahorros asociado 76543210 por valor",
        totalValue: 1750000,
      },
      {
        id: "movement-6",
        date: "19/Jul/2023",
        reference: "TJ1135678",
        description: "Compra Internet coopcentral TIENDA VIRTUAL",
        totalValue: -2200000,
      },
      {
        id: "movement-7",
        date: "22/Jul/2023",
        reference: "TJ1136789",
        description: "Compra Credibanco FASHIONOUTLET",
        totalValue: -90000,
      },
      {
        id: "movement-8",
        date: "19/Jul/2023",
        reference: "TJ1136789",
        description: "Compra Internet coopcentral TIENDA VIRTUAL",
        totalValue: -1050000,
      },
      {
        id: "movement-9",
        date: "28/Jul/2023",
        reference: "IN1024567",
        description: "Abono rendimientos por el periodo 07/01/2023",
        totalValue: 19800,
      },
      {
        id: "movement-10",
        date: "28/Jul/2023",
        reference: "TJ1134567",
        description:
          "Debito automático saldos vencidos comisiones del mes de Julio",
        totalValue: -31000,
      },
    ],
    tags: [],
  },
];

export { savingsMock };
