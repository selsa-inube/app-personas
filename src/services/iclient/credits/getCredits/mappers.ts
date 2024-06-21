import { TagProps } from "@design/data/Tag";
import {
  amortizationTypeValuesMock,
  peridiocityValuesMock,
} from "@mocks/products/credits/utils.mocks";
import { EProductType, IAttribute, IProduct } from "src/model/entity/product";
import { formatPrimaryDate } from "src/utils/dates";
import { capitalizeText } from "src/utils/texts";

const mapCreditApiToEntity = (
  credit: Record<string, string | number | object>,
): IProduct => {
  const nextDateWithoutZone = String(credit.nextPaymentDate).replace("Z", "");
  const nextPaymentDate = new Date(nextDateWithoutZone);

  const today = new Date();
  today.setUTCHours(5, 0, 0, 0);

  const duesPaid = credit.paidQuotas;

  const outstandingDues = credit.pendingQuotas;

  const inArrears = today > nextPaymentDate;

  const nextPayment = inArrears
    ? "Inmediato"
    : formatPrimaryDate(nextPaymentDate);

  const differenceDays =
    (today.getTime() - nextPaymentDate.getTime()) / (1000 * 60 * 60 * 24);

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

  const expiredCapital = Number(Object(credit.valueExpired)?.capital || 0);

  const expiredInterest = Number(Object(credit.valueExpired)?.interest || 0);

  const expiredPastDueInterest = Number(
    Object(credit.valueExpired)?.pastDueInterest || 0,
  );

  const expiredPenaltyInterest = Number(
    Object(credit.valueExpired)?.penaltyInterest || 0,
  );

  const expiredLifeInsurance = Number(
    Object(credit.valueExpired)?.lifeInsurance || 0,
  );

  const expiredOtherConcepts = Number(
    Object(credit.valueExpired)?.otherConcepts || 0,
  );

  const expiredCapitalization = Number(
    Object(credit.valueExpired)?.capitalization || 0,
  );

  const totalCapital = Number(Object(credit.balanceObligation)?.capital || 0);

  const totalLifeInsurance = Number(
    Object(credit.balanceObligation)?.lifeInsurance || 0,
  );

  const totalOtherConcepts = Number(
    Object(credit.balanceObligation)?.otherConcepts || 0,
  );

  const totalCapitalization = Number(
    Object(credit.balanceObligation)?.capitalization || 0,
  );

  const totalInterest = Number(Object(credit.balanceObligation)?.interest || 0);

  const totalPenaltyInterest = Number(
    Object(credit.balanceObligation)?.penaltyInterest || 0,
  );

  const nextPaymentValue =
    Number(nextCapital >= 0 ? nextCapital : 0) +
    Number(nextInterest >= 0 ? nextInterest : 0) +
    Number(nextPastDueInterest >= 0 ? nextPastDueInterest : 0) +
    Number(nextPenaltyInterest >= 0 ? nextPenaltyInterest : 0);
  Number(nextLifeInsurance >= 0 ? nextLifeInsurance : 0) +
    Number(nextOtherConcepts >= 0 ? nextOtherConcepts : 0) +
    Number(nextCapitalization >= 0 ? nextCapitalization : 0);

  const expiredValue =
    Number(expiredCapital >= 0 ? expiredCapital : 0) +
    Number(expiredInterest >= 0 ? expiredInterest : 0) +
    Number(expiredPastDueInterest >= 0 ? expiredPastDueInterest : 0) +
    Number(expiredPenaltyInterest >= 0 ? expiredPenaltyInterest : 0);
  Number(expiredLifeInsurance >= 0 ? expiredLifeInsurance : 0) +
    Number(expiredOtherConcepts >= 0 ? expiredOtherConcepts : 0) +
    Number(expiredCapitalization >= 0 ? expiredCapitalization : 0);

  const totalValue =
    Number(totalCapital >= 0 ? totalCapital : 0) +
    Number(totalLifeInsurance >= 0 ? totalLifeInsurance : 0) +
    Number(totalOtherConcepts >= 0 ? totalOtherConcepts : 0) +
    Number(totalCapitalization >= 0 ? totalCapitalization : 0) +
    Number(totalInterest >= 0 ? totalInterest : 0) +
    Number(totalPenaltyInterest >= 0 ? totalPenaltyInterest : 0);

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
      value: formatPrimaryDate(new Date(obligationDateWithoutZone)),
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
      id: "peridiocity",
      label: "Periodicidad",
      value: peridiocityValuesMock[String(credit.periodicityOfQuota)],
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
      value: amortizationTypeValuesMock[Object(credit.amortization).code],
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
      label: "Valor total",
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
    {
      id: "next_payment_date",
      label: "Fecha de pago",
      value: nextPaymentDate.toISOString(),
    },
  ];

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
