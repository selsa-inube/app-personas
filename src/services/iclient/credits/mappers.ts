import { TagProps } from "@design/data/Tag";
import { movementDescriptionMock } from "@mocks/products/credits/utils.mocks";
import {
  IAmortization,
  IMovement,
  IProduct,
  ProductType,
} from "src/model/entity/product";
import { formatPrimaryDate } from "src/utils/dates";
import { capitalizeText } from "src/utils/texts";

const mapCreditMovementApiToEntity = (
  movement: Record<string, string | number | object>,
): IMovement => {
  const totalPay =
    Number(movement.capitalCreditPesos || 0) +
    Number(movement.creditInterestPesos || 0) +
    Number(movement.lifeInsuranceCreditPesos || 0) +
    Number(movement.capitalizationCreditPesos || 0);

  const buildMovement: IMovement = {
    id: String(movement.movementId),
    date: formatPrimaryDate(new Date(String(movement.movementDate))),
    reference: String(movement.movementNumber),
    description: String(
      movement.movementDescription ||
        movementDescriptionMock(String(movement.movementNumber)),
    ),
    totalValue: totalPay,
  };

  if (movement.capitalCreditPesos) {
    buildMovement.capitalPayment = Number(movement.capitalCreditPesos);
  }

  if (movement.creditInterestPesos) {
    buildMovement.interest = Number(movement.creditInterestPesos);
  }

  if (movement.lifeInsuranceCreditPesos) {
    buildMovement.lifeInsurance = Number(movement.lifeInsuranceCreditPesos);
  }

  if (movement.anotherConceptCreditPesos) {
    buildMovement.patrimonialInsurance = Number(
      movement.anotherConceptCreditPesos,
    );
  }

  if (movement.capitalizationCreditPesos) {
    buildMovement.capitalization = Number(movement.capitalizationCreditPesos);
  }

  if (movement.commissionCreditPesos) {
    buildMovement.commission = Number(movement.commissionCreditPesos);
  }

  return buildMovement;
};

const mapCreditMovementsApiToEntities = (
  movements: Record<string, string | number | object>[],
): IMovement[] => {
  return movements.map((movement) => mapCreditMovementApiToEntity(movement));
};

const mapCreditApiToEntity = (
  credit: Record<string, string | number | object>,
): IProduct => {
  const nextPaymentDate = new Date(String(credit.nextPaymentDate));
  nextPaymentDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const heightQuota = String(credit.heightQuota).split(" ");
  const currentQuota = heightQuota.length > 0 ? heightQuota[0] : 0;
  const maxQuota = heightQuota.length > 2 ? heightQuota[2] : 0;

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

  const nextPaymentValue =
    Object(credit.valueExpired)?.totalPending ||
    Object(credit.nextPaymentValue).totalPending;

  const normalizedPaymentMethodName = capitalizeText(
    String(credit.paymentMethodName).toLowerCase(),
  );

  const interesRate =
    Object(credit.accumulatedByObligations)[0].spreadCurrentRate +
    Object(credit.accumulatedByObligations)[0].currentFixedPoints;

  const roundInteresRate = interesRate.toFixed(2);

  const peridiocityValues: Record<string, string> = {
    Annual: "Anual",
    Biweekly: "Quincenal",
    Monthly: "Mensual",
    Semiannual: "Semestral",
  };

  const attributes = [
    {
      id: "net_value",
      label: "Saldo de capital",
      value: Number(Object(credit.balanceObligation).capitalBalanceInPesos),
    },
    {
      id: "next_payment_date",
      label: "Fecha próximo pago",
      value: nextPayment,
    },
    {
      id: "next_payment_capital",
      label: "Capital próximo pago",
      value: nextPaymentCapital,
    },
    {
      id: "next_payment_interest",
      label: "Interes próximo pago",
      value: nextPaymentInterest,
    },
    {
      id: "next_payment_value",
      label: "Valor próximo pago",
      value: nextPaymentValue,
    },
    { id: "terms", label: "Plazo", value: `${maxQuota} Meses` },
    {
      id: "loan_date",
      label: "Fecha de préstamo",
      value: formatPrimaryDate(new Date(String(credit.obligationDate))),
    },
    {
      id: "quote",
      label: "Altura de cuota",
      value: `${currentQuota} de ${maxQuota}`,
    },
    {
      id: "payment_means",
      label: "Medio de pago",
      value: normalizedPaymentMethodName,
    },
    {
      id: "loan_value",
      label: "Valor del préstamo",
      value: credit.amount,
    },
    {
      id: "peridiocity",
      label: "Periodicidad",
      value: peridiocityValues[String(credit.periodicityOfQuota)],
    },

    {
      id: "interest_rate",
      label: "Tasa de interés",
      value: `${roundInteresRate} % NAMV`,
    },
  ];

  if (inArrears) {
    attributes.push({
      id: "days_past_due",
      label: "Días de mora",
      value: differenceDays,
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
  return credits.map((credit) => mapCreditApiToEntity(credit));
};

const mapCreditAmortizationApiToEntity = (
  payment: Record<string, string | number | object>,
): IAmortization => {
  const others =
    Number(payment.lifeInsuranceValue || 0) +
    Number(payment.otherConceptValue || 0) +
    Number(payment.capitalizationValue || 0);

  const buildPayment: IAmortization = {
    id: String(payment.paymentPlanId),
    paymentNumber: Number(payment.quotaNumber),
    date: formatPrimaryDate(new Date(String(payment.quotaDate))),
    others,
    totalMonthlyValue: Number(payment.quotaValue),
    projectedBalance: Number(payment.projectedBalance),
  };

  if (payment.capitalValue) {
    buildPayment.capitalPayment = Number(payment.capitalValue);
  }

  if (payment.fixedInterestValue) {
    buildPayment.interest = Number(payment.fixedInterestValue);
  }

  if (payment.lifeInsuranceValue) {
    buildPayment.lifeInsurance = Number(payment.lifeInsuranceValue);
  }

  if (payment.otherConceptValue) {
    buildPayment.patrimonialInsurance = Number(payment.otherConceptValue);
  }

  if (payment.capitalizationValue) {
    buildPayment.capitalization = Number(payment.capitalizationValue);
  }

  return buildPayment;
};

const mapCreditAmortizationApiToEntities = (
  payments: Record<string, string | number | object>[],
): IAmortization[] => {
  return payments.map((payment) => mapCreditAmortizationApiToEntity(payment));
};

export {
  mapCreditAmortizationApiToEntities,
  mapCreditAmortizationApiToEntity,
  mapCreditApiToEntity,
  mapCreditMovementApiToEntity,
  mapCreditMovementsApiToEntities,
  mapCreditsApiToEntities,
};
