import { IProduct } from "@ptypes/pages/product.types";

const savingsMock: IProduct[] = [
  {
    title: "Cuenta familiar",
    id: "013001157292",
    type: "CA",
    description: "Cuenta familiar - **7292",
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
        cardNumber: "00082",
        sequence: "00000005380",
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
      {
        id: "movement-11",
        date: "10/May/2023",
        reference: "TJ1100428",
        description: "Contabilización conciliación movimientos tarjeta",
        totalValue: -15700,
      },
      {
        id: "movement-12",
        date: "30/Abr/2023",
        reference: "IN1001756 ",
        description: "Abono rendimientos por el periodo 04/01/2023",
        totalValue: 19253,
      },
      {
        id: "movement-13",
        date: "30/Abr/2023",
        reference: "TJ1098250",
        description:
          "Debito automático saldos vencidos comisiones del mes de Abril",
        totalValue: -28884,
      },
      {
        id: "movement-14",
        date: "28/Abr/2023",
        reference: "TJ1097695",
        description: "Compra Credibanco MAZKO AAMZZ653",
        totalValue: -690000,
        cardNumber: "00082",
        sequence: "00000005380",
      },
      {
        id: "movement-15",
        date: "23/Abr/2023",
        reference: "TJ1096655",
        description: "Compra Credibanco BIU BELLEZA Y ESTETICA",
        totalValue: -80000,
      },
      {
        id: "movement-16",
        date: "23/Abr/2023",
        reference: "TJ1096675",
        description: "Compra Credibanco FRISBY Q N37",
        totalValue: -17900,
      },
      {
        id: "movement-17",
        date: "20/Abr/2023",
        reference: "CB1019845",
        description: "Transferencia cuenta ahorros asociado 66861642 por valor",
        totalValue: 1500000,
      },
      {
        id: "movement-18",
        date: "20/Abr/2023",
        reference: "TJ1096211",
        description: "Compra Internet coopcentral IGLESIA SEPTIMO",
        totalValue: -2000000,
      },
      {
        id: "movement-19",
        date: "20/Abr/2023",
        reference: "TJ1096221",
        description: "Compra Internet coopcentral IGLESIA SEPTIMO",
        totalValue: -1000000,
      },
      {
        id: "movement-20",
        date: "19/Abr/2023",
        reference: "NP104594",
        description: "Reintegro por Transfiya no exitosa",
        totalValue: 2000000,
      },
      {
        id: "movement-21",
        date: "10/May/2023",
        reference: "TJ1100428",
        description: "Contabilización conciliación movimientos tarjeta",
        totalValue: -15700,
      },
      {
        id: "movement-22",
        date: "30/Abr/2023",
        reference: "IN1001756 ",
        description: "Abono rendimientos por el periodo 04/01/2023",
        totalValue: 19253,
      },
      {
        id: "movement-23",
        date: "30/Abr/2023",
        reference: "TJ1098250",
        description:
          "Debito automático saldos vencidos comisiones del mes de Abril",
        totalValue: -28884,
      },
      {
        id: "movement-24",
        date: "28/Abr/2023",
        reference: "TJ1097695",
        description: "Compra Credibanco MAZKO AAMZZ653",
        totalValue: -690000,
        cardNumber: "00082",
        sequence: "00000005380",
      },
      {
        id: "movement-25",
        date: "23/Abr/2023",
        reference: "TJ1096655",
        description: "Compra Credibanco BIU BELLEZA Y ESTETICA",
        totalValue: -80000,
      },
      {
        id: "movement-26",
        date: "23/Abr/2023",
        reference: "TJ1096675",
        description: "Compra Credibanco FRISBY Q N37",
        totalValue: -17900,
      },
      {
        id: "movement-27",
        date: "20/Abr/2023",
        reference: "CB1019845",
        description: "Transferencia cuenta ahorros asociado 66861642 por valor",
        totalValue: 1500000,
      },
      {
        id: "movement-28",
        date: "20/Abr/2023",
        reference: "TJ1096211",
        description: "Compra Internet coopcentral IGLESIA SEPTIMO",
        totalValue: -2000000,
      },
      {
        id: "movement-29",
        date: "20/Abr/2023",
        reference: "TJ1096221",
        description: "Compra Internet coopcentral IGLESIA SEPTIMO",
        totalValue: -1000000,
      },
      {
        id: "movement-30",
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
    id: "013001162025",
    type: "CA",
    description: "Cuenta de ahorros - **2025",
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
      {
        id: "movement-11",
        date: "15/Jul/2023",
        reference: "TJ1122334",
        description: "Pago de factura de electricidad",
        totalValue: -12500,
      },
      {
        id: "movement-12",
        date: "02/Jul/2023",
        reference: "IN1023456",
        description: "Abono rendimientos por el periodo 06/01/2023",
        totalValue: 18750,
      },
      {
        id: "movement-13",
        date: "02/Jul/2023",
        reference: "TJ1123456",
        description:
          "Debito automático saldos vencidos comisiones del mes de Julio",
        totalValue: -29500,
      },
      {
        id: "movement-14",
        date: "30/Jun/2023",
        reference: "TJ1126789",
        description: "Compra Credibanco ABCXYZ123",
        totalValue: -710000,
      },
      {
        id: "movement-15",
        date: "25/Jun/2023",
        reference: "TJ1125678",
        description: "Compra Credibanco XYZ STORE",
        totalValue: -85000,
      },
      {
        id: "movement-16",
        date: "25/Jun/2023",
        reference: "TJ1125790",
        description: "Compra Credibanco FASTFOOD123",
        totalValue: -18500,
      },
      {
        id: "movement-17",
        date: "22/Jun/2023",
        reference: "CB1023456",
        description: "Transferencia cuenta ahorros asociado 98765432 por valor",
        totalValue: 1600000,
      },
      {
        id: "movement-18",
        date: "22/Jun/2023",
        reference: "TJ1124567",
        description: "Compra Internet coopcentral TIENDA ONLINE",
        totalValue: -2100000,
      },
      {
        id: "movement-19",
        date: "22/Jun/2023",
        reference: "TJ1125678",
        description: "Compra Internet coopcentral TIENDA ONLINE",
        totalValue: -950000,
      },
      {
        id: "movement-20",
        date: "21/Jun/2023",
        reference: "NP105678",
        description: "Reintegro por Transfiya no exitosa",
        totalValue: 2100000,
      },
      {
        id: "movement-21",
        date: "15/Jul/2023",
        reference: "TJ1122334",
        description: "Pago de factura de electricidad",
        totalValue: -12500,
      },
      {
        id: "movement-22",
        date: "02/Jul/2023",
        reference: "IN1023456",
        description: "Abono rendimientos por el periodo 06/01/2023",
        totalValue: 18750,
      },
      {
        id: "movement-23",
        date: "02/Jul/2023",
        reference: "TJ1123456",
        description:
          "Debito automático saldos vencidos comisiones del mes de Julio",
        totalValue: -29500,
      },
      {
        id: "movement-24",
        date: "30/Jun/2023",
        reference: "TJ1126789",
        description: "Compra Credibanco ABCXYZ123",
        totalValue: -710000,
      },
      {
        id: "movement-25",
        date: "25/Jun/2023",
        reference: "TJ1125678",
        description: "Compra Credibanco XYZ STORE",
        totalValue: -85000,
      },
      {
        id: "movement-26",
        date: "25/Jun/2023",
        reference: "TJ1125790",
        description: "Compra Credibanco FASTFOOD123",
        totalValue: -18500,
      },
      {
        id: "movement-27",
        date: "22/Jun/2023",
        reference: "CB1023456",
        description: "Transferencia cuenta ahorros asociado 98765432 por valor",
        totalValue: 1600000,
      },
      {
        id: "movement-28",
        date: "22/Jun/2023",
        reference: "TJ1124567",
        description: "Compra Internet coopcentral TIENDA ONLINE",
        totalValue: -2100000,
      },
      {
        id: "movement-29",
        date: "22/Jun/2023",
        reference: "TJ1125678",
        description: "Compra Internet coopcentral TIENDA ONLINE",
        totalValue: -950000,
      },
      {
        id: "movement-30",
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
    id: "200-91214069",
    type: "AP",
    description: "Aportes sociales 200 - 91214069",
    attributes: [
      {
        id: "net_value",
        label: "Saldo total",
        value: 7642790,
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
            value: "30%",
          },
        ],
      },
      {
        id: "pending_payment",
        label: "Pago pendiente",
        value: 0,
      },
      {
        id: "withdrawal_balance",
        label: "Cupo retiro ahorro",
        value: 0,
      },
    ],
    movements: [
      {
        id: "movement-21",
        date: "06/Abr/2023",
        reference: "CA1002574",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-22",
        date: "31/Mar/2023",
        reference: "IN1001756",
        description: "Abono rendimientos por el periodo 04/Feb/2023",
        totalValue: 130359,
      },
      {
        id: "movement-23",
        date: "28/Feb/2023",
        reference: "CA1002164",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-24",
        date: "31/Ene/2023",
        reference: "CA1001915",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-25",
        date: "31/Dic/2022",
        reference: "CA1001746",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-26",
        date: "31/Dic/2022",
        reference: "IN1000598",
        description: "Abono rendimientos por el periodo 11/Nov/2022",
        totalValue: 130225,
      },
      {
        id: "movement-27",
        date: "31/Nov/2022",
        reference: "CA1001622",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-28",
        date: "30/Oct/2022",
        reference: "CA1001557",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-29",
        date: "30/Sep/2022",
        reference: "CA1001498",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-30",
        date: "30/Ago/2022",
        reference: "CA1001322",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-31",
        date: "30/Jul/2022",
        reference: "CA1001211",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-32",
        date: "30/Jul/2022",
        reference: "IN1001624",
        description: "Abono rendimientos por el periodo 10/Jun/2022",
        totalValue: 130458,
      },
      {
        id: "movement-33",
        date: "30/Jun/2022",
        reference: "CA1001194",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-34",
        date: "30/May/2022",
        reference: "CA1001137",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-35",
        date: "30/Abr/2022",
        reference: "CA1001080",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-36",
        date: "30/Mar/2022",
        reference: "CA1001023",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-37",
        date: "28/Feb/2022",
        reference: "CA1000966",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-38",
        date: "30/Ene/2022",
        reference: "CA1000909",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-39",
        date: "31/Dic/2021",
        reference: "CA1000852",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-40",
        date: "31/Dic/2021",
        reference: "IN1001568",
        description: "Abono rendimientos por el periodo 09/Dic/2021",
        totalValue: 130211,
      },
      {
        id: "movement-41",
        date: "30/Nov/2021",
        reference: "CA1000821",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-42",
        date: "30/Oct/2021",
        reference: "CA1000796",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-43",
        date: "30/Sep/2021",
        reference: "CA1000772",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-44",
        date: "30/Ago/2021",
        reference: "CA1000748",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-45",
        date: "30/Jul/2021",
        reference: "CA1000723",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-46",
        date: "30/Jul/2021",
        reference: "IN1001568",
        description: "Abono rendimientos por el periodo 07/Jul/2021",
        totalValue: 130179,
      },
      {
        id: "movement-47",
        date: "30/Jun/2021",
        reference: "CA1000698",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-48",
        date: "30/May/2021",
        reference: "CA1000683",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-49",
        date: "30/Abr/2021",
        reference: "CA1000665",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-50",
        date: "30/Mar/2021",
        reference: "CA1000642",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-51",
        date: "28/Feb/2021",
        reference: "CA1000627",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-52",
        date: "30/Ene/2021",
        reference: "CA1000606",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-53",
        date: "31/Dic/2020",
        reference: "CA1000578",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-54",
        date: "31/Dic/2020",
        reference: "IN1001535",
        description: "Abono rendimientos por el periodo 11/Dic/2021",
        totalValue: 130402,
      },
      {
        id: "movement-55",
        date: "30/Nov/2020",
        reference: "CA1000547",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-56",
        date: "30/Oct/2020",
        reference: "CA1000522",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-57",
        date: "30/Sep/2020",
        reference: "CA1000492",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-58",
        date: "30/Ago/2020",
        reference: "CA1000457",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-59",
        date: "30/Jul/2020",
        reference: "CA1000424",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-60",
        date: "30/Jul/2020",
        reference: "IN1001491",
        description: "Abono rendimientos por el periodo 29/Jun/2021",
        totalValue: 130372,
      },
      {
        id: "movement-61",
        date: "30/Jun/2020",
        reference: "CA1000399",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-62",
        date: "30/May/2020",
        reference: "CA1000372",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-63",
        date: "30/Abr/2020",
        reference: "CA1000350",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-64",
        date: "30/Mar/2020",
        reference: "CA1000321",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-65",
        date: "28/Feb/2020",
        reference: "CA1000289",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
      {
        id: "movement-66",
        date: "30/Ene/2020",
        reference: "CA1000231",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 78948,
      },
    ],
    tags: [],
  },
  {
    title: "Ahorro permanente",
    id: "201-91214069",
    type: "AP",
    description: "Ahorro permanente 201 - 91214069",
    attributes: [
      {
        id: "net_value",
        label: "Saldo total",
        value: 1980656,
      },
      {
        id: "pending_payment",
        label: "Pago pendiente",
        value: 0,
      },
      {
        id: "withdrawal_balance",
        label: "Cupo retiro ahorro",
        value: 0,
      },
      {
        id: "beneficiaries",
        label: "Beneficiarios",
        value: [
          {
            id: "beneficiary-1",
            label: "Carlos Gardel",
            value: "50%",
          },
          {
            id: "beneficiary-2",
            label: "Richard Ríos",
            value: "50%",
          },
        ],
      },
    ],
    movements: [
      {
        id: "movement-1",
        date: "06/Abr/2023",
        reference: "CA1002574",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-2",
        date: "31/Mar/2023",
        reference: "IN1001756",
        description: "Abono rendimientos por el periodo 04/Feb/2023",
        totalValue: 130359,
      },
      {
        id: "movement-3",
        date: "28/Feb/2023",
        reference: "CA1002164",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-4",
        date: "31/Ene/2023",
        reference: "CA1001915",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-5",
        date: "31/Dic/2022",
        reference: "CA1001746",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-6",
        date: "31/Dic/2022",
        reference: "IN1000598",
        description: "Abono rendimientos por el periodo 11/Nov/2022",
        totalValue: 130225,
      },
      {
        id: "movement-7",
        date: "31/Nov/2022",
        reference: "CA1001622",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-8",
        date: "30/Oct/2022",
        reference: "CA1001557",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-9",
        date: "30/Sep/2022",
        reference: "CA1001498",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-10",
        date: "30/Ago/2022",
        reference: "CA1001322",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-11",
        date: "31/Jul/2022",
        reference: "IN1000456",
        description: "Abono rendimientos por el periodo 09/Jul/2022",
        totalValue: 130100,
      },
      {
        id: "movement-12",
        date: "30/Jun/2022",
        reference: "CA1001264",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-13",
        date: "31/May/2022",
        reference: "CA1001189",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-14",
        date: "30/Abr/2022",
        reference: "CA1001023",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-15",
        date: "31/Mar/2022",
        reference: "IN1000321",
        description: "Abono rendimientos por el periodo 07/Mar/2022",
        totalValue: 129980,
      },
      {
        id: "movement-16",
        date: "28/Feb/2022",
        reference: "CA1000957",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-17",
        date: "31/Ene/2022",
        reference: "CA1000876",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-18",
        date: "31/Dic/2021",
        reference: "CA1000723",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-19",
        date: "30/Nov/2021",
        reference: "CA1000647",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-20",
        date: "31/Oct/2021",
        reference: "IN1000156",
        description: "Abono rendimientos por el periodo 12/Oct/2021",
        totalValue: 129875,
      },
      {
        id: "movement-21",
        date: "30/Sep/2021",
        reference: "CA1000569",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-22",
        date: "31/Ago/2021",
        reference: "CA1000482",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-23",
        date: "31/Jul/2021",
        reference: "IN1000057",
        description: "Abono rendimientos por el periodo 04/Jul/2021",
        totalValue: 129760,
      },
      {
        id: "movement-24",
        date: "30/Jun/2021",
        reference: "CA1000403",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-25",
        date: "31/May/2021",
        reference: "CA1000328",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-26",
        date: "30/Abr/2021",
        reference: "CA1000267",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-27",
        date: "31/Mar/2021",
        reference: "IN1000012",
        description: "Abono rendimientos por el periodo 07/Mar/2021",
        totalValue: 129645,
      },
      {
        id: "movement-28",
        date: "28/Feb/2021",
        reference: "CA1000189",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-29",
        date: "31/Ene/2021",
        reference: "CA1000102",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
      {
        id: "movement-30",
        date: "31/Dic/2020",
        reference: "CA1000026",
        description: "Traslado de cuota 200-66861642-66861642",
        totalValue: 8772,
      },
    ],
    tags: [],
  },
];

export { savingsMock };
