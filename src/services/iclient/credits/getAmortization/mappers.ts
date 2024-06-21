import { amortizationTableValuesMock } from "@mocks/products/credits/utils.mocks";
import { IAmortization } from "src/model/entity/product";

const mapCreditAmortizationApiToEntity = (
  payment: Record<string, string | number | object>,
): IAmortization => {
  const others =
    Number(payment.lifeInsurance || 0) +
    Number(payment.otherConcept || 0) +
    Number(payment.capitalization || 0);

  const totalInterest =
    Number(payment.fixedInterest || 0) + Number(payment.variableInterest || 0);

  const dateWithoutZone = String(payment.quotaDate).replace("Z", "");

  const buildPayment: IAmortization = {
    id: String(payment.paymentPlanId),
    date: new Date(dateWithoutZone),
    type: amortizationTableValuesMock[Object(payment.quotaType).code],
    others,
    interest: totalInterest,
    totalMonthlyValue: Number(payment.quotaValue),
    projectedBalance: Number(payment.projectedBalance || 0),
  };

  if (payment.capital) {
    buildPayment.capitalPayment = Number(payment.capital);
  }

  if (payment.lifeInsurance) {
    buildPayment.lifeInsurance = Number(payment.lifeInsurance);
  }

  if (payment.otherConcept) {
    buildPayment.patrimonialInsurance = Number(payment.otherConcept);
  }

  if (payment.capitalization) {
    buildPayment.capitalization = Number(payment.capitalization);
  }

  return buildPayment;
};

const mapCreditAmortizationApiToEntities = (
  payments: Record<string, string | number | object>[],
): IAmortization[] => {
  return payments
    .map((payment) => mapCreditAmortizationApiToEntity(payment))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
};

export { mapCreditAmortizationApiToEntities, mapCreditAmortizationApiToEntity };
