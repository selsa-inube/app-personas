import { ITag } from "@inubekit/inubekit";
import { creditAmortizationTypeDM } from "src/model/domains/credits/creditAmortizationTypeDM";
import { creditPeriodicityDM } from "src/model/domains/credits/creditPeriodicityDM";

import { EProductType, IAttribute, IProduct } from "src/model/entity/product";
import { formatPrimaryTimestamp } from "src/utils/dates";
import { capitalizeText } from "src/utils/texts";

const mapCreditApiToEntity = (
  credit: Record<string, string | number | object>,
): IProduct => {
  const nextDateWithoutZone = credit.nextPaymentDate
    ? String(credit.nextPaymentDate).replace("Z", "")
    : "";

  const nextPaymentDate = nextDateWithoutZone
    ? new Date(nextDateWithoutZone)
    : null;

  const today = new Date();
  today.setUTCHours(5, 0, 0, 0);

  const duesPaid = credit.paidQuotas;

  const outstandingDues = credit.pendingQuotas;

  const inArrears = nextPaymentDate ? today > nextPaymentDate : true;

  const nextPayment = inArrears
    ? "Inmediato"
    : nextPaymentDate
      ? formatPrimaryTimestamp(nextPaymentDate)
      : "Inmediato";

  const differenceDays = nextPaymentDate
    ? (today.getTime() - nextPaymentDate.getTime()) / (1000 * 60 * 60 * 24)
    : 0;

  const nextCapital = Number(Object(credit.nextPaymentValue).capital || 0);

  const nextInterest = Number(Object(credit.nextPaymentValue).interest || 0);

  const nextPastDueInterest = Number(
    Object(credit.nextPaymentValue)?.pastDueInterest || 0,
  );

  const nextPenaltyInterest = Number(
    Object(credit.nextPaymentValue)?.penaltyInterest || 0,
  );

  const nextLifeInsurance = Number(
    Object(credit.nextPaymentValue)?.lifeInsurance || 0,
  );

  const nextOtherConcepts = Number(
    Object(credit.nextPaymentValue)?.otherConcepts || 0,
  );

  const nextCapitalization = Number(
    Object(credit.nextPaymentValue)?.capitalization || 0,
  );

  const expiredCapital = Number(Object(credit.expiredValue)?.capital || 0);

  const expiredInterest = Number(Object(credit.expiredValue)?.interest || 0);

  const expiredPastDueInterest = Number(
    Object(credit.expiredValue)?.pastDueInterest || 0,
  );

  const expiredPenaltyInterest = Number(
    Object(credit.expiredValue)?.penaltyInterest || 0,
  );

  const expiredLifeInsurance = Number(
    Object(credit.expiredValue)?.lifeInsurance || 0,
  );

  const expiredOtherConcepts = Number(
    Object(credit.expiredValue)?.otherConcepts || 0,
  );

  const expiredCapitalization = Number(
    Object(credit.expiredValue)?.capitalization || 0,
  );

  const nextPaymentValue = Number(Object(credit.nextPaymentValue)?.total || 0);

  const expiredValue = Number(Object(credit.expiredValue)?.total || 0);
  const totalValue = Number(Object(credit.balanceObligation)?.total || 0);
  const normalizedPaymentMethodName = capitalizeText(
    String(credit.paymentMethodName).toLowerCase(),
  );
  const interesRate =
    (Object(credit.accumulatedByObligations)[0].spreadCurrentRate || 0) +
    (Object(credit.accumulatedByObligations)[0].currentFixedPoints || 0);

  const roundInteresRate =
    interesRate == 0 ? interesRate : interesRate.toFixed(2);

  const obligationDateWithoutZone = String(credit.obligationDate).replace(
    "Z",
    "",
  );

  const attributes: IAttribute[] = [
    {
      id: "loan_date",
      label: "Fecha de préstamo",
      value: formatPrimaryTimestamp(new Date(obligationDateWithoutZone)),
    },
    {
      id: "loan_value",
      label: "Valor del préstamo",
      value: String(credit.amount),
    },
    {
      id: "next_payment",
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
      id: "periodicity",
      label: "Periodicidad",
      value:
        creditPeriodicityDM.valueOf(String(credit.periodicityOfQuota))?.value ||
        "",
    },
    {
      id: "payment_method",
      label: "Medio de pago",
      value: normalizedPaymentMethodName,
    },
    {
      id: "net_value",
      label: "Saldo de capital",
      value: Number(Object(credit.balanceObligation).capital || 0),
    },
    {
      id: "amortization_type",
      label: "Tipo de amortización",
      value:
        creditAmortizationTypeDM.valueOf(Object(credit.amortization).code)
          ?.value || "",
    },
    {
      id: "guarantee_type",
      label: "Tipo de garantía",
      value: capitalizeText(String(credit.warrantyClass).toLowerCase()),
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
    {
      id: "expired_value",
      label: "Valor vencido",
      value: `${expiredValue}`,
    },
    {
      id: "total_value",
      label: "Saldo total",
      value: `${totalValue}`,
    },
    {
      id: "in_arrears",
      label: "En mora",
      value: String(inArrears),
    },
    {
      id: "line_code",
      label: "Línea de crédito",
      value: String(credit.lineCode),
    },
    {
      id: "half_payment",
      label: "Método de pago",
      value: String(credit.paymentMethod),
    },
  ];

  if (nextPaymentDate) {
    attributes.push({
      id: "next_payment_date",
      label: "Fecha de pago",
      value: nextPaymentDate.toISOString(),
    });
  }

  if (differenceDays > 0) {
    attributes.push({
      id: "days_past_due",
      label: "Días de mora",
      value: differenceDays,
    });
  }

  if (nextCapital) {
    attributes.push({
      id: "next_capital",
      label: "Capital próximo pago",
      value: nextCapital,
    });
  }

  if (nextInterest) {
    attributes.push({
      id: "next_interest",
      label: "Interes próximo pago",
      value: nextInterest,
    });
  }

  if (nextPastDueInterest) {
    attributes.push({
      id: "next_past_due_interest",
      label: "Interés de mora",
      value: nextPastDueInterest,
    });
  }

  if (nextPenaltyInterest) {
    attributes.push({
      id: "next_penalty_interest",
      label: "Interés de penalidad",
      value: nextPenaltyInterest,
    });
  }

  if (nextLifeInsurance) {
    attributes.push({
      id: "next_life_insurance",
      label: "Seguro de vida",
      value: nextLifeInsurance,
    });
  }

  if (nextOtherConcepts) {
    attributes.push({
      id: "next_other_concepts",
      label: "Otros conceptos",
      value: nextOtherConcepts,
    });
  }

  if (nextCapitalization) {
    attributes.push({
      id: "next_capitalization",
      label: "Capitalización",
      value: nextCapitalization,
    });
  }

  if (expiredCapital) {
    attributes.push({
      id: "expired_capital",
      label: "Capital expirado",
      value: expiredCapital,
    });
  }

  if (expiredInterest) {
    attributes.push({
      id: "expired_interest",
      label: "Interes expirado",
      value: expiredInterest,
    });
  }

  if (expiredPastDueInterest) {
    attributes.push({
      id: "expired_past_due_interest",
      label: "Interés de mora",
      value: expiredPastDueInterest,
    });
  }

  if (expiredPenaltyInterest) {
    attributes.push({
      id: "expired_penalty_interest",
      label: "Interés de penalidad",
      value: expiredPenaltyInterest,
    });
  }

  if (expiredLifeInsurance) {
    attributes.push({
      id: "expired_life_insurance",
      label: "Seguro de vida",
      value: expiredLifeInsurance,
    });
  }

  if (expiredOtherConcepts) {
    attributes.push({
      id: "expired_other_concepts",
      label: "Otros conceptos",
      value: expiredOtherConcepts,
    });
  }

  if (expiredCapitalization) {
    attributes.push({
      id: "expired_capitalization",
      label: "Capitalización",
      value: expiredCapitalization,
    });
  }

  const tags: ITag[] = inArrears
    ? [
        {
          label: "En mora",
          appearance: "danger",
        },
      ]
    : [];

  const normalizedProductName = `${capitalizeText(
    String(credit.productName).toLowerCase(),
  )} - ${capitalizeText(String(credit.moneyDestinationName).toLowerCase())}`;

  const creditType: EProductType = Object(
    credit.originationModel,
  ).code.toUpperCase();

  return {
    id: String(credit.obligationNumber),
    title: normalizedProductName,
    description: `${normalizedProductName} ${credit.obligationNumber}`,
    type: creditType,
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
    .map((credit) => mapCreditApiToEntity(credit))
    .filter((credit) => credit.type !== EProductType.CREDITCARD);
};

export { mapCreditApiToEntity, mapCreditsApiToEntities };
