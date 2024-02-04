import { amortizationTableValuesMock } from "@mocks/products/credits/utils.mocks";
import { IAmortization } from "src/model/entity/product";

const mapCreditAmortizationApiToEntity = (
  payment: Record<string, string | number | object>,
): IAmortization => {
  const others =
    Number(payment.lifeInsuranceValue || 0) +
    Number(payment.otherConceptValue || 0) +
    Number(payment.capitalizationValue || 0);

  const totalInterest =
    Number(payment.fixedInterestValue || 0) +
    Number(payment.variableInterestValue || 0);

  const buildPayment: IAmortization = {
    id: String(payment.paymentPlanId),
    paymentNumber: Number(payment.quotaNumber),
    date: new Date(String(payment.quotaDate)),
    type: amortizationTableValuesMock[Object(payment.quotaType).code],
    others,
    interest: totalInterest,
    totalMonthlyValue: Number(payment.quotaValue),
    projectedBalance: Number(payment.projectedBalance || 0),
  };

  if (payment.capitalValue) {
    buildPayment.capitalPayment = Number(payment.capitalValue);
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
  return payments
    .map((payment) => mapCreditAmortizationApiToEntity(payment))
    .sort((a, b) => a.paymentNumber - b.paymentNumber);
};

export { mapCreditAmortizationApiToEntities, mapCreditAmortizationApiToEntity };
