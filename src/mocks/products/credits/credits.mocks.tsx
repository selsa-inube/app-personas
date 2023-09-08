import { IProduct } from "src/types/pages/product.types";

const creditsMock: IProduct[] = [
  {
    id: "10 - 231016759",
    title: "Fanáticos viajeros",
    description: "Fanáticos viajeros 10 - 2310167593",
    type: "CE",
    attributes: [
      { id: "net_value", label: "Saldo total", value: 7025550 },
      {
        id: "next_payment_date",
        label: "Fecha próximo pago",
        value: "02/Abr/2023",
      },
      { id: "next_payment_value", label: "Próximo pago", value: 500000 },
      { id: "interest_rate", label: "Tasa de interés", value: "15.70 % NAMV" },
      { id: "terms", label: "Plazo", value: "24 Meses" },
      { id: "loan_date", label: "Fecha de préstamo", value: "15/Nov/2022" },
      { id: "loan_value", label: "Valor del préstamo", value: 10300000 },
      {
        id: "next_due_date",
        label: "Próximo vencimiento",
        value: "15/May/2023",
      },
      { id: "quote", label: "Cuota", value: "8 de 24" },
      { id: "peridiocity", label: "Periodicidad", value: "Mensual" },
      {
        id: "payment_means",
        label: "Medio de pago",
        value: "Grúas de occidente",
      },
    ],
    movements: [
      {
        id: "movement-1",
        date: "15/Ago/2023",
        reference: "DN1001210",
        description: "Pago crédito educativo",
        capitalPayment: 270386,
        interest: 221875,
        lifeInsurance: 6931,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499192,
      },
      {
        id: "movement-2",
        date: "15/Sep/2023",
        reference: "DN1001211",
        description: "Abono extraordinario",
        capitalPayment: 278386,
        interest: 213875,
        lifeInsurance: 6674,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499191,
      },
      {
        id: "movement-3",
        date: "15/Oct/2023",
        reference: "DN1001212",
        description: "Pago crédito educativo",
        capitalPayment: 281386,
        interest: 205875,
        lifeInsurance: 6410,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499193,
      },
      {
        id: "movement-4",
        date: "15/Nov/2023",
        reference: "DN1001213",
        description: "Abono extraordinario",
        capitalPayment: 289386,
        interest: 197875,
        lifeInsurance: 6147,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499194,
      },
      {
        id: "movement-5",
        date: "15/Dic/2023",
        reference: "DN1001214",
        description: "Pago crédito educativo",
        capitalPayment: 294386,
        interest: 189875,
        lifeInsurance: 5885,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499195,
      },
      {
        id: "movement-6",
        date: "15/Ene/2024",
        reference: "DN1001215",
        description: "Abono extraordinario",
        capitalPayment: 302386,
        interest: 181875,
        lifeInsurance: 5624,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499196,
      },
      {
        id: "movement-7",
        date: "15/Feb/2024",
        reference: "DN1001216",
        description: "Pago crédito educativo",
        capitalPayment: 310386,
        interest: 173875,
        lifeInsurance: 5364,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499197,
      },
      {
        id: "movement-8",
        date: "15/Mar/2024",
        reference: "DN1001217",
        description: "Abono extraordinario",
        capitalPayment: 318386,
        interest: 165875,
        lifeInsurance: 5105,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499198,
      },
      {
        id: "movement-9",
        date: "15/Abr/2024",
        reference: "DN1001218",
        description: "Pago crédito educativo",
        capitalPayment: 326386,
        interest: 157875,
        lifeInsurance: 4847,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499199,
      },
      {
        id: "movement-10",
        date: "15/May/2024",
        reference: "DN1001219",
        description: "Abono extraordinario",
        capitalPayment: 334386,
        interest: 149875,
        lifeInsurance: 4590,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499191,
      },
      {
        id: "movement-11",
        date: "15/Jun/2024",
        reference: "DN1001220",
        description: "Pago crédito educativo",
        capitalPayment: 342386,
        interest: 141875,
        lifeInsurance: 4334,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499192,
      },
      {
        id: "movement-12",
        date: "15/Jul/2024",
        reference: "DN1001221",
        description: "Abono extraordinario",
        capitalPayment: 350386,
        interest: 133875,
        lifeInsurance: 4079,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499193,
      },
      {
        id: "movement-13",
        date: "15/Ago/2024",
        reference: "DN1001222",
        description: "Pago crédito educativo",
        capitalPayment: 358386,
        interest: 125875,
        lifeInsurance: 3825,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499194,
      },
      {
        id: "movement-14",
        date: "15/Sep/2024",
        reference: "DN1001223",
        description: "Abono extraordinario",
        capitalPayment: 366386,
        interest: 117875,
        lifeInsurance: 3572,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499195,
      },
      {
        id: "movement-15",
        date: "15/Oct/2024",
        reference: "DN1001224",
        description: "Pago crédito educativo",
        capitalPayment: 374386,
        interest: 109875,
        lifeInsurance: 3320,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499196,
      },
      {
        id: "movement-16",
        date: "15/Nov/2024",
        reference: "DN1001225",
        description: "Abono extraordinario",
        capitalPayment: 382386,
        interest: 101875,
        lifeInsurance: 3069,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499197,
      },
      {
        id: "movement-17",
        date: "15/Dic/2024",
        reference: "DN1001226",
        description: "Pago crédito educativo",
        capitalPayment: 390386,
        interest: 93875,
        lifeInsurance: 2820,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499198,
      },
      {
        id: "movement-18",
        date: "15/Ene/2025",
        reference: "DN1001227",
        description: "Abono extraordinario",
        capitalPayment: 398386,
        interest: 85875,
        lifeInsurance: 2571,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499199,
      },
      {
        id: "movement-19",
        date: "15/Feb/2025",
        reference: "DN1001228",
        description: "Pago crédito educativo",
        capitalPayment: 406386,
        interest: 77875,
        lifeInsurance: 2324,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499191,
      },
      {
        id: "movement-20",
        date: "15/Mar/2025",
        reference: "DN1001229",
        description: "Abono extraordinario",
        capitalPayment: 414386,
        interest: 69875,
        lifeInsurance: 2078,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499192,
      },
      {
        id: "movement-21",
        date: "15/Abr/2025",
        reference: "DN1001230",
        description: "Pago crédito educativo",
        capitalPayment: 422386,
        interest: 61875,
        lifeInsurance: 1833,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499193,
      },
      {
        id: "movement-22",
        date: "15/May/2025",
        reference: "DN1001231",
        description: "Abono extraordinario",
        capitalPayment: 430386,
        interest: 53875,
        lifeInsurance: 1589,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499194,
      },
      {
        id: "movement-23",
        date: "15/Jun/2025",
        reference: "DN1001232",
        description: "Pago crédito educativo",
        capitalPayment: 438386,
        interest: 45875,
        lifeInsurance: 1346,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499195,
      },
      {
        id: "movement-24",
        date: "15/Jul/2025",
        reference: "DN1001233",
        description: "Abono extraordinario",
        capitalPayment: 446386,
        interest: 37875,
        lifeInsurance: 1104,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499196,
      },
      {
        id: "movement-25",
        date: "15/Ago/2025",
        reference: "DN1001234",
        description: "Pago crédito educativo",
        capitalPayment: 454386,
        interest: 29875,
        lifeInsurance: 863,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499197,
      },
      {
        id: "movement-26",
        date: "15/Sep/2025",
        reference: "DN1001235",
        description: "Abono extraordinario",
        capitalPayment: 462386,
        interest: 21875,
        lifeInsurance: 623,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499198,
      },
      {
        id: "movement-27",
        date: "15/Oct/2025",
        reference: "DN1001236",
        description: "Pago crédito educativo",
        capitalPayment: 470386,
        interest: 13875,
        lifeInsurance: 384,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499199,
      },
      {
        id: "movement-28",
        date: "15/Nov/2025",
        reference: "DN1001237",
        description: "Abono extraordinario",
        capitalPayment: 478386,
        interest: 5875,
        lifeInsurance: 146,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499191,
      },
      {
        id: "movement-29",
        date: "15/Dic/2025",
        reference: "DN1001238",
        description: "Pago crédito educativo",
        capitalPayment: 486386,
        interest: 1875,
        lifeInsurance: 0,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499111,
      },
      {
        id: "movement-30",
        date: "15/Ene/2026",
        reference: "DN1001239",
        description: "Abono extraordinario",
        capitalPayment: 494386,
        interest: 875,
        lifeInsurance: 0,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 499112,
      },
    ],
    amortization: [
      {
        id: "8",
        paymentNumber: 8,
        date: "15/Nov/2023",
        capitalPayment: 324386,
        interest: 141875,
        lifeInsurance: 4315,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 4315,
        totalMonthlyValue: 499122,
        projectedBalance: 7025561,
      },
      {
        id: "9",
        paymentNumber: 9,
        date: "15/Dec/2023",
        capitalPayment: 332386,
        interest: 133875,
        lifeInsurance: 4052,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 4052,
        totalMonthlyValue: 499123,
        projectedBalance: 7025562,
      },
      {
        id: "10",
        paymentNumber: 10,
        date: "15/Jan/2024",
        capitalPayment: 340386,
        interest: 125875,
        lifeInsurance: 3788,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 3788,
        totalMonthlyValue: 499124,
        projectedBalance: 7025563,
      },
      {
        id: "11",
        paymentNumber: 11,
        date: "15/Feb/2024",
        capitalPayment: 349386,
        interest: 117875,
        lifeInsurance: 3525,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 3525,
        totalMonthlyValue: 499125,
        projectedBalance: 7025564,
      },
      {
        id: "12",
        paymentNumber: 12,
        date: "15/Mar/2024",
        capitalPayment: 358386,
        interest: 109875,
        lifeInsurance: 3261,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 3261,
        totalMonthlyValue: 499126,
        projectedBalance: 7025565,
      },
      {
        id: "13",
        paymentNumber: 13,
        date: "15/Apr/2024",
        capitalPayment: 368386,
        interest: 101875,
        lifeInsurance: 2998,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 2998,
        totalMonthlyValue: 499127,
        projectedBalance: 7025566,
      },
      {
        id: "14",
        paymentNumber: 14,
        date: "15/May/2024",
        capitalPayment: 378386,
        interest: 93875,
        lifeInsurance: 2734,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 2734,
        totalMonthlyValue: 499128,
        projectedBalance: 7025567,
      },
      {
        id: "15",
        paymentNumber: 15,
        date: "15/Jun/2024",
        capitalPayment: 389386,
        interest: 85875,
        lifeInsurance: 2471,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 2471,
        totalMonthlyValue: 499129,
        projectedBalance: 7025568,
      },
      {
        id: "16",
        paymentNumber: 16,
        date: "15/Jul/2024",
        capitalPayment: 401386,
        interest: 77875,
        lifeInsurance: 2207,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 2207,
        totalMonthlyValue: 499130,
        projectedBalance: 7025569,
      },
      {
        id: "17",
        paymentNumber: 17,
        date: "15/Aug/2024",
        capitalPayment: 414386,
        interest: 69875,
        lifeInsurance: 1944,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 1944,
        totalMonthlyValue: 499131,
        projectedBalance: 7025570,
      },
      {
        id: "18",
        paymentNumber: 18,
        date: "15/Sep/2024",
        capitalPayment: 428386,
        interest: 61875,
        lifeInsurance: 1680,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 1680,
        totalMonthlyValue: 499132,
        projectedBalance: 7025571,
      },
      {
        id: "19",
        paymentNumber: 19,
        date: "15/Oct/2024",
        capitalPayment: 443386,
        interest: 53875,
        lifeInsurance: 1417,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 1417,
        totalMonthlyValue: 499133,
        projectedBalance: 7025572,
      },
      {
        id: "20",
        paymentNumber: 20,
        date: "15/Nov/2024",
        capitalPayment: 459386,
        interest: 45875,
        lifeInsurance: 1153,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 1153,
        totalMonthlyValue: 499134,
        projectedBalance: 7025573,
      },
      {
        id: "21",
        paymentNumber: 21,
        date: "15/Dec/2024",
        capitalPayment: 476386,
        interest: 37875,
        lifeInsurance: 889,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 889,
        totalMonthlyValue: 499135,
        projectedBalance: 7025574,
      },
      {
        id: "22",
        paymentNumber: 22,
        date: "15/Jan/2025",
        capitalPayment: 491200,
        interest: 29500,
        lifeInsurance: 765,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 765,
        totalMonthlyValue: 499230,
        projectedBalance: 7025575,
      },
      {
        id: "23",
        paymentNumber: 23,
        date: "15/Feb/2025",
        capitalPayment: 506300,
        interest: 21750,
        lifeInsurance: 632,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 632,
        totalMonthlyValue: 499182,
        projectedBalance: 7025576,
      },
      {
        id: "24",
        paymentNumber: 24,
        date: "15/Mar/2025",
        capitalPayment: 521700,
        interest: 13925,
        lifeInsurance: 497,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 497,
        totalMonthlyValue: 499619,
        projectedBalance: 7025577,
      },
    ],
    tags: [],
  },
  {
    id: "10 - 220102710",
    title: "Crediaportes",
    description: "Crediaportes 10 - 220102710",
    type: "CL",
    attributes: [
      { id: "net_value", label: "Saldo total", value: 1500000 },
      {
        id: "next_payment_date",
        label: "Fecha próximo pago",
        value: "02/Mar/2023",
      },
      { id: "next_payment_value", label: "Próximo pago", value: 500000 },
      { id: "interest_rate", label: "Tasa de interés", value: "3,04 % NAMV" },
      { id: "terms", label: "Plazo", value: "24 Meses" },
      { id: "loan_date", label: "Fecha de préstamo", value: "15/Ene/2023" },
      { id: "loan_value", label: "Valor del préstamo", value: 8300000 },
      {
        id: "next_due_date",
        label: "Próximo vencimiento",
        value: "15/Abr/2023",
      },
      { id: "quote", label: "Cuota", value: "10 de 30" },
      { id: "peridiocity", label: "Periodicidad", value: "Mensual" },
      {
        id: "payment_means",
        label: "Medio de pago",
        value: "Grúas de occidente",
      },
    ],
    movements: [
      {
        id: "movement-1",
        date: "15/Sep/2023",
        reference: "DN1001211",
        description: "Pago mensual",
        capitalPayment: 255000,
        interest: 180000,
        lifeInsurance: 5000,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799191,
      },
      {
        id: "movement-2",
        date: "15/Oct/2023",
        reference: "DN1001212",
        description: "Abono extraordinario",
        capitalPayment: 280000,
        interest: 210000,
        lifeInsurance: 6000,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799193,
      },
      {
        id: "movement-3",
        date: "15/Nov/2023",
        reference: "DN1001213",
        description: "Pago mensual",
        capitalPayment: 265000,
        interest: 200000,
        lifeInsurance: 5500,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799194,
      },
      {
        id: "movement-4",
        date: "15/Dic/2023",
        reference: "DN1001214",
        description: "Abono extraordinario",
        capitalPayment: 290000,
        interest: 220000,
        lifeInsurance: 7000,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799195,
      },
      {
        id: "movement-5",
        date: "15/Ene/2024",
        reference: "DN1001215",
        description: "Pago mensual",
        capitalPayment: 280000,
        interest: 180000,
        lifeInsurance: 4500,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799196,
      },
      {
        id: "movement-6",
        date: "15/Feb/2024",
        reference: "DN1001216",
        description: "Abono adicional",
        capitalPayment: 310000,
        interest: 210000,
        lifeInsurance: 6200,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799197,
      },
      {
        id: "movement-7",
        date: "15/Mar/2024",
        reference: "DN1001217",
        description: "Pago mensual",
        capitalPayment: 270000,
        interest: 190000,
        lifeInsurance: 5300,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799198,
      },
      {
        id: "movement-8",
        date: "15/Abr/2024",
        reference: "DN1001218",
        description: "Abono extraordinario",
        capitalPayment: 320000,
        interest: 220000,
        lifeInsurance: 6800,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799199,
      },
      {
        id: "movement-9",
        date: "15/May/2024",
        reference: "DN1001219",
        description: "Pago adelantado",
        capitalPayment: 340000,
        interest: 230000,
        lifeInsurance: 7500,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799191,
      },
      {
        id: "movement-10",
        date: "15/Jun/2024",
        reference: "DN1001220",
        description: "Pago mensual",
        capitalPayment: 300000,
        interest: 190000,
        lifeInsurance: 6000,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799192,
      },
      {
        id: "movement-11",
        date: "15/Jul/2024",
        reference: "DN1001221",
        description: "Abono adicional",
        capitalPayment: 330000,
        interest: 220000,
        lifeInsurance: 6700,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799193,
      },
      {
        id: "movement-12",
        date: "15/Ago/2024",
        reference: "DN1001222",
        description: "Pago adelantado",
        capitalPayment: 320000,
        interest: 210000,
        lifeInsurance: 6500,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799194,
      },
      {
        id: "movement-13",
        date: "15/Sep/2024",
        reference: "DN1001223",
        description: "Pago mensual",
        capitalPayment: 310000,
        interest: 200000,
        lifeInsurance: 6300,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799195,
      },
      {
        id: "movement-14",
        date: "15/Oct/2024",
        reference: "DN1001224",
        description: "Abono adicional",
        capitalPayment: 340000,
        interest: 230000,
        lifeInsurance: 7000,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799196,
      },
      {
        id: "movement-15",
        date: "15/Nov/2024",
        reference: "DN1001225",
        description: "Pago adelantado",
        capitalPayment: 330000,
        interest: 220000,
        lifeInsurance: 6800,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799197,
      },
      {
        id: "movement-16",
        date: "15/Dic/2024",
        reference: "DN1001226",
        description: "Pago mensual",
        capitalPayment: 320000,
        interest: 210000,
        lifeInsurance: 6500,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799198,
      },
      {
        id: "movement-17",
        date: "15/Ene/2025",
        reference: "DN1001227",
        description: "Abono adicional",
        capitalPayment: 350000,
        interest: 240000,
        lifeInsurance: 7200,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799199,
      },
      {
        id: "movement-18",
        date: "15/Feb/2025",
        reference: "DN1001228",
        description: "Pago adelantado",
        capitalPayment: 340000,
        interest: 230000,
        lifeInsurance: 7000,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799191,
      },
      {
        id: "movement-19",
        date: "15/Mar/2025",
        reference: "DN1001229",
        description: "Pago mensual",
        capitalPayment: 300000,
        interest: 190000,
        lifeInsurance: 6000,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799192,
      },
      {
        id: "movement-20",
        date: "15/Abr/2025",
        reference: "DN1001230",
        description: "Abono adicional",
        capitalPayment: 330000,
        interest: 220000,
        lifeInsurance: 6700,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799193,
      },
      {
        id: "movement-21",
        date: "15/May/2025",
        reference: "DN1001231",
        description: "Pago adelantado",
        capitalPayment: 320000,
        interest: 210000,
        lifeInsurance: 6500,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799194,
      },
      {
        id: "movement-22",
        date: "15/Jun/2025",
        reference: "DN1001232",
        description: "Pago mensual",
        capitalPayment: 310000,
        interest: 200000,
        lifeInsurance: 6300,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799195,
      },
      {
        id: "movement-23",
        date: "15/Jul/2025",
        reference: "DN1001233",
        description: "Abono adicional",
        capitalPayment: 340000,
        interest: 230000,
        lifeInsurance: 7000,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799196,
      },
      {
        id: "movement-24",
        date: "15/Ago/2025",
        reference: "DN1001234",
        description: "Pago adelantado",
        capitalPayment: 330000,
        interest: 220000,
        lifeInsurance: 6800,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799197,
      },
      {
        id: "movement-25",
        date: "15/Sep/2025",
        reference: "DN1001235",
        description: "Pago mensual",
        capitalPayment: 320000,
        interest: 210000,
        lifeInsurance: 6500,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799198,
      },
      {
        id: "movement-26",
        date: "15/Oct/2025",
        reference: "DN1001236",
        description: "Abono adicional",
        capitalPayment: 350000,
        interest: 240000,
        lifeInsurance: 7200,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799199,
      },
      {
        id: "movement-27",
        date: "15/Nov/2025",
        reference: "DN1001237",
        description: "Pago adelantado",
        capitalPayment: 340000,
        interest: 230000,
        lifeInsurance: 7000,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799191,
      },
      {
        id: "movement-28",
        date: "15/Dic/2025",
        reference: "DN1001238",
        description: "Pago adelantado",
        capitalPayment: 320000,
        interest: 210000,
        lifeInsurance: 6500,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799111,
      },
      {
        id: "movement-29",
        date: "15/Ene/2026",
        reference: "DN1001239",
        description: "Pago adelantado",
        capitalPayment: 340000,
        interest: 230000,
        lifeInsurance: 7000,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799112,
      },
      {
        id: "movement-30",
        date: "15/Feb/2026",
        reference: "DN1001240",
        description: "Abono adicional",
        capitalPayment: 350000,
        interest: 240000,
        lifeInsurance: 7200,
        patrimonialInsurance: 0,
        capitalization: 0,
        commission: 0,
        totalValue: 799113,
      },
    ],
    amortization: [
      {
        id: "10",
        paymentNumber: 10,
        date: "10/Nov/2023",
        capitalPayment: 295000,
        interest: 110000,
        lifeInsurance: 3200,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 200,
        totalMonthlyValue: 371100,
        projectedBalance: 6800009,
      },
      {
        id: "11",
        paymentNumber: 11,
        date: "10/Dec/2023",
        capitalPayment: 300000,
        interest: 100000,
        lifeInsurance: 3000,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 0,
        totalMonthlyValue: 372500,
        projectedBalance: 6800010,
      },
      {
        id: "12",
        paymentNumber: 12,
        date: "10/Jan/2024",
        capitalPayment: 305000,
        interest: 90000,
        lifeInsurance: 2800,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 0,
        totalMonthlyValue: 373900,
        projectedBalance: 6800011,
      },
      {
        id: "13",
        paymentNumber: 13,
        date: "10/Feb/2024",
        capitalPayment: 310000,
        interest: 80000,
        lifeInsurance: 2600,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 0,
        totalMonthlyValue: 375300,
        projectedBalance: 6800012,
      },
      {
        id: "14",
        paymentNumber: 14,
        date: "10/Mar/2024",
        capitalPayment: 315000,
        interest: 70000,
        lifeInsurance: 2400,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 0,
        totalMonthlyValue: 376700,
        projectedBalance: 6800013,
      },
      {
        id: "15",
        paymentNumber: 15,
        date: "10/Apr/2024",
        capitalPayment: 320000,
        interest: 60000,
        lifeInsurance: 2200,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 0,
        totalMonthlyValue: 378100,
        projectedBalance: 6800014,
      },
      {
        id: "16",
        paymentNumber: 16,
        date: "10/May/2024",
        capitalPayment: 325000,
        interest: 50000,
        lifeInsurance: 2000,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 0,
        totalMonthlyValue: 379500,
        projectedBalance: 6800015,
      },
      {
        id: "17",
        paymentNumber: 17,
        date: "10/Jun/2024",
        capitalPayment: 330000,
        interest: 40000,
        lifeInsurance: 1800,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 0,
        totalMonthlyValue: 380900,
        projectedBalance: 6800016,
      },
      {
        id: "18",
        paymentNumber: 18,
        date: "10/Jul/2024",
        capitalPayment: 335000,
        interest: 30000,
        lifeInsurance: 1600,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 0,
        totalMonthlyValue: 382300,
        projectedBalance: 6800017,
      },
      {
        id: "19",
        paymentNumber: 19,
        date: "10/Aug/2024",
        capitalPayment: 340000,
        interest: 20000,
        lifeInsurance: 1400,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 0,
        totalMonthlyValue: 383700,
        projectedBalance: 6800018,
      },
      {
        id: "20",
        paymentNumber: 20,
        date: "10/Sep/2024",
        capitalPayment: 345000,
        interest: 10000,
        lifeInsurance: 1200,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 0,
        totalMonthlyValue: 385100,
        projectedBalance: 6800019,
      },
      {
        id: "21",
        paymentNumber: 21,
        date: "10/Oct/2024",
        capitalPayment: 350000,
        interest: 0,
        lifeInsurance: 1000,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 0,
        totalMonthlyValue: 386500,
        projectedBalance: 6800020,
      },
      {
        id: "22",
        paymentNumber: 22,
        date: "10/Nov/2024",
        capitalPayment: 355000,
        interest: 0,
        lifeInsurance: 800,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 0,
        totalMonthlyValue: 387900,
        projectedBalance: 6800021,
      },
      {
        id: "23",
        paymentNumber: 23,
        date: "10/Dec/2024",
        capitalPayment: 360000,
        interest: 0,
        lifeInsurance: 600,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 0,
        totalMonthlyValue: 389300,
        projectedBalance: 6800022,
      },
      {
        id: "24",
        paymentNumber: 24,
        date: "10/Jan/2025",
        capitalPayment: 365000,
        interest: 0,
        lifeInsurance: 400,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 0,
        totalMonthlyValue: 390700,
        projectedBalance: 6800023,
      },
      {
        id: "25",
        paymentNumber: 25,
        date: "10/Feb/2025",
        capitalPayment: 370000,
        interest: 0,
        lifeInsurance: 200,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 0,
        totalMonthlyValue: 392100,
        projectedBalance: 6800024,
      },
      {
        id: "26",
        paymentNumber: 26,
        date: "10/Mar/2025",
        capitalPayment: 375000,
        interest: 0,
        lifeInsurance: 0,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 0,
        totalMonthlyValue: 393500,
        projectedBalance: 6800025,
      },
      {
        id: "27",
        paymentNumber: 27,
        date: "10/Apr/2025",
        capitalPayment: 380000,
        interest: 0,
        lifeInsurance: 0,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 0,
        totalMonthlyValue: 394900,
        projectedBalance: 6800026,
      },
      {
        id: "28",
        paymentNumber: 28,
        date: "10/May/2025",
        capitalPayment: 385000,
        interest: 0,
        lifeInsurance: 0,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 0,
        totalMonthlyValue: 396300,
        projectedBalance: 6800027,
      },
      {
        id: "29",
        paymentNumber: 29,
        date: "10/Jun/2025",
        capitalPayment: 390000,
        interest: 0,
        lifeInsurance: 0,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 0,
        totalMonthlyValue: 397700,
        projectedBalance: 6800028,
      },
      {
        id: "30",
        paymentNumber: 30,
        date: "10/Jul/2025",
        capitalPayment: 395000,
        interest: 0,
        lifeInsurance: 0,
        patrimonialInsurance: 0,
        capitalization: 0,
        others: 0,
        totalMonthlyValue: 399100,
        projectedBalance: 6800029,
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

export { creditsMock };
