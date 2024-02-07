import { TagProps } from "@design/data/Tag";
import {
  amortizationTypeValuesMock,
  guaranteeTypeValuesMock,
  peridiocityValuesMock,
} from "@mocks/products/credits/utils.mocks";
import { IAttribute, IProduct, ProductType } from "src/model/entity/product";
import { formatPrimaryDate } from "src/utils/dates";
import { capitalizeText } from "src/utils/texts";

const mapCreditApiToEntity = (
  credit: Record<string, string | number | object>,
): IProduct => {
  const nextPaymentDate = new Date(String(credit.nextPaymentDate));
  nextPaymentDate.setUTCHours(5, 5, 5, 5);

  const today = new Date();

  today.setUTCHours(5, 5, 5, 5);

  const duesPaid = credit.duesPaid;

  const outstandingDues = credit.outstandingDues;

  const inArrears = today > nextPaymentDate;

  const nextPayment = inArrears
    ? "Inmediato"
    : formatPrimaryDate(nextPaymentDate);

  const differenceDays =
    (today.getTime() - nextPaymentDate.getTime()) / (1000 * 60 * 60 * 24);

  const nextPaymentCapital =
    Object(credit.valueExpired)?.capitalValuePending ||
    Object(credit.nextPaymentValue).capitalValuePending;

  const nextPaymentInterest =
    Object(credit.valueExpired)?.interestValuePending ||
    Object(credit.nextPaymentValue).interestValuePending;

  const nextPaymentArrearsInterest =
    Object(credit.accumulatedByObligations).length > 0 &&
    Object(credit.accumulatedByObligations)[0].PenalityInterestBalance;

  const nextPaymentValue =
    Number(
      Object(credit.valueExpired)?.capitalValuePending ||
        Object(credit.nextPaymentValue).capitalValuePending ||
        0,
    ) +
    Number(
      Object(credit.valueExpired)?.interestValuePending ||
        Object(credit.nextPaymentValue).interestValuePending ||
        0,
    ) +
    Number(
      (Object(credit.accumulatedByObligations).length > 0 &&
        Object(credit.accumulatedByObligations)[0].PenalityInterestBalance) ||
        0,
    );

  const normalizedPaymentMethodName = capitalizeText(
    String(credit.paymentMethodName).toLowerCase(),
  );
  const interesRate =
    (Object(credit.accumulatedByObligations)[0].spreadCurrentRate || 0) +
    (Object(credit.accumulatedByObligations)[0].currentFixedPoints || 0);

  const roundInteresRate =
    interesRate == 0 ? interesRate : interesRate.toFixed(2);

  const attributes: IAttribute[] = [
    {
      id: "loan_date",
      label: "Fecha de préstamo",
      value: formatPrimaryDate(new Date(String(credit.obligationDate))),
    },
    {
      id: "loan_value",
      label: "Valor del préstamo",
      value: String(credit.amount),
    },
    {
      id: "next_payment_date",
      label: "Fecha próximo pago",
      value: nextPayment,
    },
    {
      id: "next_payment_value",
      label: "Valor próximo pago",
      value: nextPaymentValue,
    },
    {
      id: "dues_paid",
      label: "Cuotas pagadas",
      value: Number(duesPaid || 0),
    },
    {
      id: "outstanding_dues",
      label: "Cuotas pendientes",
      value: Number(outstandingDues || 0),
    },
    {
      id: "peridiocity",
      label: "Periodicidad",
      value: peridiocityValuesMock[String(credit.periodicityOfQuota)],
    },
    {
      id: "payment_means",
      label: "Medio de pago",
      value: normalizedPaymentMethodName,
    },
    {
      id: "net_value",
      label: "Saldo de capital",
      value: Number(Object(credit.balanceObligation).capitalBalanceInPesos),
    },
    {
      id: "amortization_type",
      label: "Tipo de amortización",
      value: amortizationTypeValuesMock[Object(credit.amortization).code],
    },
    {
      id: "guarantee_type",
      label: "Tipo de garantía",
      value: guaranteeTypeValuesMock[Object(credit.typeOfGuarantee).code],
    },
    {
      id: "terms",
      label: "Plazo",
      value: `${Number(duesPaid || 0) + Number(outstandingDues || 0)} Meses`,
    },
    {
      id: "interest_rate",
      label: "Tasa de interés",
      value: `${roundInteresRate} % NAMV`,
    },
  ];

  if (differenceDays) {
    attributes.push({
      id: "days_past_due",
      label: "Días vencidos",
      value: differenceDays,
    });
  }

  if (nextPaymentCapital) {
    attributes.push({
      id: "next_payment_capital",
      label: "Capital próximo pago",
      value: nextPaymentCapital,
    });
  }
  if (nextPaymentInterest) {
    attributes.push({
      id: "next_payment_interest",
      label: "Interes próximo pago",
      value: nextPaymentInterest,
    });
  }
  if (nextPaymentArrearsInterest) {
    attributes.push(
      {
        id: "next_payment_arrears_interest",
        label: "interés de mora",
        value: nextPaymentArrearsInterest,
      },
      {
        id: "in_arrears_value",
        label: "Valor mora",
        value: nextPaymentArrearsInterest,
      },
    );
  }

  const tags: TagProps[] = inArrears
    ? [
        {
          label: "En mora",
          appearance: "error",
        },
      ]
    : [];

  const normalizedProductName = capitalizeText(
    String(credit.productName).toLowerCase(),
  );

  return {
    id: String(credit.obligationNumber),
    title: normalizedProductName,
    description: `${normalizedProductName} ${credit.obligationNumber}`,
    type: String(credit.lineCode) as ProductType,
    attributes,
    movements: [],
    amortization: [],
    tags,
  };
};

const mapCreditsApiToEntities = (
  credits: Record<string, string | number | object>[],
): IProduct[] => {
  return credits
    .filter((credit) => credit.lineCode !== "CE")
    .map((credit) => mapCreditApiToEntity(credit));
};

export { mapCreditApiToEntity, mapCreditsApiToEntities };
