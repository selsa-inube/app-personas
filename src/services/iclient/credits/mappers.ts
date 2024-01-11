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

  return {
    id: movement.movementId,
    date: formatPrimaryDate(new Date(movement.movementDate)),
    reference: movement.movementNumber,
    description: movement.movementDescription || "",
    capitalPayment: Number(movement.capitalCreditPesos || 0),
    interest: Number(movement.creditInterestPesos || 0),
    lifeInsurance: Number(movement.lifeInsuranceCreditPesos || 0),
    patrimonialInsurance: Number(movement.anotherConceptCreditPesos || 0),
    capitalization: Number(movement.capitalizationCreditPesos || 0),
    commission: 0,
    totalValue: totalPay,
  };
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

  const nextPayment = today > nextPaymentDate ? "Inmediato" : formatPrimaryDate(nextPaymentDate) ;

  const attributes = [
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
    { id: "quote", label: "Cuota", value: replaceWordQuota },

    {
      id: "payment_means",
      label: "Medio de pago",
      value: normalizedPaymentMethodName,
    },
    { id: "loan_value", label: "Valor del préstamo", value: credit.amount },
    {
      id: "peridiocity",
      label: "Periodicidad",
      value: translateWord(credit.periodicityOfQuota),
    },
  ];

  const tags: TagProps[] =
    today > nextPaymentDate
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
    movements: credit.lastMovementTheObligations
      ? mapCreditMovementsApiToEntities(credit.lastMovementTheObligations)
      : [],
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

  return {
    id: payment.paymentPlanId,
    paymentNumber: payment.quotaNumber,
    date: formatPrimaryDate(new Date(payment.quotaDate)),
    capitalPayment: Number(payment.capitalValue || 0),
    interest: Number(payment.fixedInterestValue || 0),
    lifeInsurance: Number(payment.lifeInsuranceValue || 0),
    patrimonialInsurance: Number(payment.otherConceptValue || 0),
    capitalization: Number(payment.capitalizationValue || 0),
    others,
    totalMonthlyValue: Number(payment.quotaValue || 0),
    projectedBalance: Number(payment.projectedBalance || 0),
  };
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
