import { IProduct } from "src/model/entity/product";
import { getCreditQuotasDetailsForUser } from "src/services/iclient/cards/getCreditQuotaDetail";
import { getCreditQuotasForUser } from "src/services/iclient/cards/getCreditQuotas";

const validateCreditQuotaDetails = async (
  creditQuotaDetails: IProduct | undefined,
  cardId: string,
  creditQuotaId: string,
  accessToken: string,
) => {
  let currentyCreditQuotaDetails;
  currentyCreditQuotaDetails = { ...creditQuotaDetails };

  if (currentyCreditQuotaDetails) {
    currentyCreditQuotaDetails = await getCreditQuotasDetailsForUser(
      cardId,
      accessToken,
    );
  }

  const selectCreditQuotaDetails =
    currentyCreditQuotaDetails?.id === creditQuotaId &&
    currentyCreditQuotaDetails;

  return {
    selectCreditQuotaDetails,
  };
};

const validateCreditQuotas = async (
  creditQuotas: IProduct[],
  cardId: string,
  accessToken: string,
) => {
  let currentyCreditQuotas = [...creditQuotas];

  if (currentyCreditQuotas.length === 0) {
    currentyCreditQuotas = await getCreditQuotasForUser(cardId, accessToken);
  }

  return {
    newCreditQuotas: currentyCreditQuotas,
  };
};

const getUsedQuotaData =(creditQuotaDetails: IProduct) => {
  let currentConsumption;
  let accumulatedDebt;
  let transactionsProcess;
  let usedQuotaValue;

  creditQuotaDetails.attributes.forEach((attr) => {
    if (attr.id === "current_consumption") {
      currentConsumption = attr.value;
    }
    if (attr.id === "accumulated_debt") {
      accumulatedDebt = attr.value;
    }
    if (attr.id === "transactions_process") {
      transactionsProcess = attr.value;
    }
    if (attr.id === "used_quota_value") {
      usedQuotaValue = attr.value;
    }
  });

  return {
    currentConsumption: currentConsumption && Number(currentConsumption),
    accumulatedDebt: accumulatedDebt && Number(accumulatedDebt),
    transactionsProcess: transactionsProcess && Number(transactionsProcess),
    usedQuotaValue: Number(usedQuotaValue),
  };
};

export { getUsedQuotaData, validateCreditQuotas, validateCreditQuotaDetails };
