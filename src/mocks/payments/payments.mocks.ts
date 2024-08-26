import {
  EPaymentGroupType,
  EPaymentOptionType,
  EPaymentStatusType,
  ESupportDocumentType,
} from "@pages/admin/payments/Pay/types";
import { IPayment } from "src/model/entity/payment";

const paymentsMock: IPayment[] = [
  {
    id: "10-241000476",
    title: "CREDI-APORTES GASTOS PERSONALES",
    group: EPaymentGroupType.CREDITS,
    paymentMethodName: "monthly",
    status: EPaymentStatusType.ANYWHERE,
    options: [
      {
        id: EPaymentOptionType.EXPIREDVALUE,
        label: "Valor vencido",
        value: 0,
      },
      {
        id: EPaymentOptionType.NEXTVALUE,
        label: "Próximo vencimiento",
        description: "15/Abr/2024",
        value: 150000,
      },
      {
        id: EPaymentOptionType.TOTALVALUE,
        label: "Pago total",
        value: 828022,
      },
      {
        id: EPaymentOptionType.OTHERVALUE,
        label: "Próximo vencimiento",
        value: 0,
        hidden: true,
      },
    ],
    tags: [
      {
        label: "Fondecom mensual",
        appearance: "primary",
      },
    ],
    supportDocumentType: ESupportDocumentType.FINANCIALPORTFOLIO,
  },
  {
    id: "10-241000477",
    title: "TEMPORADA GASTOS PERSONALES",
    group: EPaymentGroupType.SAVINGSCOMMITMENT,
    paymentMethodName: "automaticDebit",
    status: EPaymentStatusType.ANYWHERE,
    options: [
      {
        id: EPaymentOptionType.EXPIREDVALUE,
        label: "Valor vencido",
        value: 0,
      },
      {
        id: EPaymentOptionType.NEXTVALUE,
        label: "Próximo vencimiento",
        description: "15/Abr/2024",
        value: 395000,
      },
      {
        id: EPaymentOptionType.TOTALVALUE,
        label: "Pago total",
        value: 4500000,
      },
      {
        id: EPaymentOptionType.OTHERVALUE,
        label: "Próximo vencimiento",
        value: 0,
        hidden: true,
      },
    ],
    tags: [
      {
        label: "Debito automático",
        appearance: "primary",
      },
    ],
    supportDocumentType: ESupportDocumentType.ACCOUNTSPAYABLE,
  },
  {
    id: "10-241000478",
    title: "TEMPORADA GASTOS PERSONALES",
    group: EPaymentGroupType.SAVINGSCOMMITMENT,
    paymentMethodName: "window",
    status: EPaymentStatusType.ANYWHERE,
    options: [
      {
        id: EPaymentOptionType.EXPIREDVALUE,
        label: "Valor vencido",
        value: 0,
      },
      {
        id: EPaymentOptionType.NEXTVALUE,
        label: "Próximo vencimiento",
        description: "15/Abr/2024",
        value: 150000,
      },
      {
        id: EPaymentOptionType.TOTALVALUE,
        label: "Pago total",
        value: 1500000,
      },
      {
        id: EPaymentOptionType.OTHERVALUE,
        label: "Próximo vencimiento",
        value: 0,
        hidden: true,
      },
    ],
    tags: [
      {
        label: "Ventanilla",
        appearance: "primary",
      },
    ],
    supportDocumentType: ESupportDocumentType.ACCOUNTSPAYABLE,
  },
  {
    id: "10-241000479",
    title: "CREDI-APORTES GASTOS PERSONALES",
    group: EPaymentGroupType.CREDITS,
    paymentMethodName: "monthly",
    status: EPaymentStatusType.ARREARS,
    options: [
      {
        id: EPaymentOptionType.EXPIREDVALUE,
        label: "Valor vencido",
        value: 0,
      },
      {
        id: EPaymentOptionType.NEXTVALUE,
        label: "Próximo vencimiento",
        description: "Inmediato",
        value: 75000,
      },
      {
        id: EPaymentOptionType.TOTALVALUE,
        label: "Pago total",
        value: 550000,
      },
      {
        id: EPaymentOptionType.OTHERVALUE,
        label: "Próximo vencimiento",
        value: 0,
        hidden: true,
      },
    ],
    tags: [
      {
        label: "En mora",
        appearance: "danger",
      },
      {
        label: "Fondecom mensual",
        appearance: "primary",
      },
    ],
    supportDocumentType: ESupportDocumentType.FINANCIALPORTFOLIO,
  },
];

export { paymentsMock };
