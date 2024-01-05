import { TagProps } from "@design/data/Tag";
import { IAmortization, IMovement, IProduct } from "src/model/entity/product";
import { formatPrimaryDate } from "src/utils/dates";
import { capitalizeText } from "src/utils/texts";

const mapCreditMovementApiToEntity = (
  movement: Record<string, any>
): IMovement => {
  const totalPay = movement.capitalCreditPesos
    ? Number(movement.capitalCreditPesos)
    : 0 + movement.creditInterestPesos
    ? Number(movement.creditInterestPesos)
    : 0 + movement.lifeInsuranceCreditPesos
    ? Number(movement.lifeInsuranceCreditPesos)
    : 0 + movement.capitalizationCreditPesos
    ? Number(movement.capitalizationCreditPesos)
    : 0;

  return {
    id: movement.movementId,
    date: formatPrimaryDate(new Date(movement.movementDate)),
    reference: movement.movementNumber,
    description: movement.movementDescription || "",
    capitalPayment: movement.capitalCreditPesos
      ? Number(movement.capitalCreditPesos)
      : 0,
    interest: movement.creditInterestPesos
      ? Number(movement.creditInterestPesos)
      : 0,
    lifeInsurance: movement.lifeInsuranceCreditPesos
      ? Number(movement.lifeInsuranceCreditPesos)
      : 0,
    patrimonialInsurance: 0,
    capitalization: movement.capitalizationCreditPesos
      ? Number(movement.capitalizationCreditPesos)
      : 0,
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

  const attributes = [
    {
      id: "net_value",
      label: "Saldo total",
      value: Number(credit.balanceObligation.totalPending),
    },
    {
      id: "next_payment_date",
      label: "Fecha próximo pago",
      value: formatPrimaryDate(nextPaymentDate),
    },
    {
      id: "next_payment_value",
      label: "Próximo pago",
      value: nextPaymentValue,
    },
    { id: "terms", label: "Plazo", value: `${maxQuota} Meses` },
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
  return {
    id: payment.paymentPlanId,
    paymentNumber: payment.quotaNumber,
    date: formatPrimaryDate(new Date(payment.quotaDate)),
    capitalPayment: payment.capitalValue,
    interest: payment.fixedInterestValue,
    lifeInsurance: 0,
    patrimonialInsurance: 0,
    capitalization: 0,
    others: payment.variableInterestValue,
    totalMonthlyValue: payment.quotaValue,
    projectedBalance: payment.projectedBalance,
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
