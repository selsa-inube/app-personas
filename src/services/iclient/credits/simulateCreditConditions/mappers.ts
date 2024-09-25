import { ISimulateCreditRequest, ISimulateCreditResponse } from "./types";

const mapSimulationEntityToApi = (
  simulationValues: ISimulateCreditRequest,
): Record<string, string | number> => {
  return {
    productId: simulationValues.productId,
    paymentMethodId: simulationValues.paymentMethodId,
    customerCode: simulationValues.userIdentification,
    amount: simulationValues.amount,
    periodicityInMonths: simulationValues.periodicityInMonths,
    quotaDeadlineInMonths: simulationValues.deadline,
    quotaValue: simulationValues.quota,
    rate: simulationValues.rate,
    simulationParameter: simulationValues.simulationParameter,
  };
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
    periodicityInMonths: Number(simulationOption.periodicityInMonthsCapital),
    rate: Number(simulationOption.interestRate),
    quota: Number(simulationOption.calculatedQuotaValue),
    deadline: Number(simulationOption.calculatedQuotaDeadline),
    anticipatedInterest: Number(simulationOption.anticipatedInterest),
    chargeName: String(simulationOption.chargeName),
    discountName: String(simulationOption.discountName),
    chargeValue: Number(simulationOption.chargeValue),
    discountValue: Number(simulationOption.discountValue),
    netValue: Number(simulationOption.amountToBeDrawn),
  };
};
export { mapSimulationApiToEntity, mapSimulationEntityToApi };
