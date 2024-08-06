import { ISimulateCreditRequest, ISimulateCreditRequestResponse } from "./types";

const mapSimulationEntityToEntity = (
  simulationOption: Record<string, string | object>,
): ISimulateCreditRequestResponse => {
  return {
    productId: String(simulationOption.productId),
    paymentMethodCapitalId: String(simulationOption.paymentMethodId),
    customerCode: String(simulationOption.customerCode),
    amount: Number(simulationOption.amount),
    cutOffDate: String(simulationOption.cutOffDate),
    periodicityInMonthsCapital: Number(
      simulationOption.periodicityInMonthsCapital,
    ),
    quotaDeadlineInMonths: Number(simulationOption.quotaDeadlineInMonths),
    rate: Number(simulationOption.rate),
    calculatedQuotaValue: Number(simulationOption.calculatedQuotaValue),
    calculatedQuotaDeadline: Number(simulationOption.calculatedQuotaDeadline),
    anticipatedInterest: Number(simulationOption.anticipatedInterest),
    chargeName: String(simulationOption.chargeName),
    discountName: String(simulationOption.discountName),
    chargeValue: Number(simulationOption.chargeValue),
    discountValue: Number(simulationOption.discountValue),
    amountToBeDrawn: Number(simulationOption.amountToBeDrawn),
  };
};

const mapSimulationEntityToApi = (
  simulationValues: ISimulateCreditRequest,
): Record<string, string | number> => {
  return {
    productId: simulationValues.productId,
    paymentMethodCapitalId: simulationValues.paymentMethodCapitalId,
    customerCode: simulationValues.customerCode,
    amount: simulationValues.amount,
    periodicityInMonthsCapital: simulationValues.periodicityInMonthsCapital,
    quotaDeadlineInMonths: simulationValues.quotaDeadlineInMonths,
    quotaValue: simulationValues.quotaValue,
    rate: simulationValues.rate,
  };
};

export { mapSimulationEntityToEntity, mapSimulationEntityToApi };
