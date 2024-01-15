import { TagProps } from "@design/data/Tag";
import { IAmortization, IMovement, IProduct } from "src/model/entity/product";
import { formatPrimaryDate } from "src/utils/dates";
import { capitalizeText, replaceWord, translateWord } from "src/utils/texts";

const mapCreditMovementApiToEntity = (
  movement: Record<string, any>
): IMovement => {
  const totalPay =
    Number(movement.capitalCreditPesos || 0) +
    Number(movement.creditInterestPesos || 0) +
    Number(movement.lifeInsuranceCreditPesos || 0) +
    Number(movement.capitalizationCreditPesos || 0);

  const buildMovement: IMovement = {
    id: movement.movementId,
    date: formatPrimaryDate(new Date(movement.movementDate)),
    reference: movement.movementNumber,
    description: movement.movementDescription || "",
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
      movement.anotherConceptCreditPesos
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
  movements: Record<string, any>[]
): IMovement[] => {
  return movements.map((movement) => mapCreditMovementApiToEntity(movement));
};

const mapCreditApiToEntity = (credit: Record<string, any>): IProduct => {
  const nextPaymentDate = new Date(credit.nextPaymentDate);
  nextPaymentDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const inArrears = today > nextPaymentDate;

  const nextPayment = inArrears
    ? "Inmediato"
    : formatPrimaryDate(nextPaymentDate);

  const differenceDays =
    (today.getTime() - nextPaymentDate.getTime()) / (1000 * 60 * 60 * 24);

  const heightQuota = credit.heightQuota.split(" ");
  const maxQuota = heightQuota.length > 2 ? heightQuota[2] : 0;

  const nextPaymentValue = credit.valueExpired?.totalPending
    ? credit.valueExpired?.totalPending
    : credit.nextPaymentValue.totalPending;

  const replaceWordQuota = replaceWord(
    credit.heightQuota,
    "of",
    translateWord("of")
  );

  const normalizedPaymentMethodName = capitalizeText(
    credit.paymentMethodName.toLowerCase()
  );

  let attributes = [
    {
      id: "net_value",
      label: "Saldo total",
      value: Number(credit.balanceObligation.totalPending),
    },
    {
      id: "next_payment_date",
      label: "Fecha próximo pago",
      value: nextPayment,
    },
    {
      id: "next_payment_value",
      label: "Próximo pago",
      value: nextPaymentValue,
    },
    { id: "terms", label: "Plazo", value: `${maxQuota} Meses` },
    {
      id: "loan_date",
      label: "Fecha de préstamo",
      value: formatPrimaryDate(new Date(credit.obligationDate)),
    },
    {
      id: "next_due_date",
      label: "Próximo vencimiento",
      value: formatPrimaryDate(nextPaymentDate),
    },
    { id: "quote", label: "Altura de cuota", value: replaceWordQuota },

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
      value: translateWord(credit.periodicityOfQuota),
    },
  ];

  if (inArrears) {
    attributes.push({
      id: "days_past_due",
      label: "días de mora",
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
    credit.productName.toLowerCase()
  );

  return {
    id: credit.obligationNumber,
    title: normalizedProductName,
    description: `${normalizedProductName} ${credit.obligationNumber}`,
    type: credit.lineCode,
    attributes,
    movements: [],
    amortization: [],
    tags,
  };
};

const mapCreditsApiToEntities = (
  credits: Record<string, any>[]
): IProduct[] => {
  return credits.map((credit) => mapCreditApiToEntity(credit));
};

const mapCreditAmortizationApiToEntity = (
  payment: Record<string, any>
): IAmortization => {
  const others =
    Number(payment.lifeInsuranceValue || 0) +
    Number(payment.otherConceptValue || 0) +
    Number(payment.capitalizationValue || 0);

  const buildPayment: IAmortization = {
    id: payment.paymentPlanId,
    paymentNumber: payment.quotaNumber,
    date: formatPrimaryDate(new Date(payment.quotaDate)),
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
  payments: Record<string, any>[]
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
