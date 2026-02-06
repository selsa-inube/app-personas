import { ISimulateCreditRequest, ISimulateCreditResponse } from "./types";

const mapSimulationEntityToApi = (
  simulationValues: ISimulateCreditRequest,
): Record<string, string | number | object> => {
  const data: Record<string, string | number | object> = {
    amount: simulationValues.amount,
    customerCode: simulationValues.userIdentification,
    paymentMethodId: simulationValues.paymentMethodId,
    periodicityInMonths: simulationValues.periodicityInMonths,
    productId: simulationValues.productId,
    numQuotas: simulationValues.deadline,
    quotaValue: simulationValues.quota,
    simulationParameter: simulationValues.simulationParameter,
  };

  if (simulationValues.extraordinaryQuotas) {
    data.extraPayments = [
      {
        installmentCount: simulationValues.extraordinaryQuotas.quotas,
        amount: simulationValues.extraordinaryQuotas.valuePerQuota,
      },
    ];
  }
  return data;
};

const mapSimulationApiToEntity = (
  simulationOption: Record<string, string | object>,
): ISimulateCreditResponse => {
  return {
    productId: String(simulationOption.productId),
    paymentMethodId: String(simulationOption.paymentMethodCapitalId),
    userIdentification: String(simulationOption.customerCode),
    amount: Number(simulationOption.amount),
    cutOffDate: String(simulationOption.cutOffDate),
    periodicity: String(
      Object(simulationOption).periodicityInMonthsCapital.value,
    ),
    periodicityInMonths: Number(simulationOption.periodicityInMonthsCapital),
    rate: Number(simulationOption.interestRate),
    quota: Number(simulationOption.calculatedQuotaValue),
    deadline: Number(simulationOption.calculatedNumQuotas),
    anticipatedInterest: Number(simulationOption.anticipatedInterest),
    chargeName: String(simulationOption.chargeName),
    discountName: String(simulationOption.discountName),
    charges: Array.isArray(simulationOption.charges)
      ? simulationOption.charges.map(
          (charge: Record<string, string | number>) => ({
            name: String(charge.chargeName),
            value: Number(charge.chargeValue),
          }),
        )
      : [],
    discounts: Array.isArray(simulationOption.discounts)
      ? simulationOption.discounts.map(
          (discount: Record<string, string | number>) => ({
            name: String(discount.discountName),
            value: Number(discount.discountValue),
          }),
        )
      : [],
    netValue: Number(simulationOption.aproxDisbursement),
  };
};
export { mapSimulationApiToEntity, mapSimulationEntityToApi };
