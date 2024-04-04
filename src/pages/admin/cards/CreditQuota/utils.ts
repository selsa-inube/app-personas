import { IProduct } from "src/model/entity/product";
import { getDetailForCreditQuota } from "src/services/iclient/cards/getCreditQuotaDetail";
import { getCreditQuotasForCard } from "src/services/iclient/cards/getCreditQuotas";

const validateCreditQuotaDetail = async (
  cardId: string,
  creditQuotaId: string,
  accessToken: string,
  creditQuotaDetail?: IProduct,
) => {
  let currentCreditQuotaDetail;
  currentCreditQuotaDetail = { ...creditQuotaDetail };

  if (currentCreditQuotaDetail) {
    currentCreditQuotaDetail = await getDetailForCreditQuota(
      cardId,
      accessToken,
    );
  }

  const selectCreditQuotaDetail =
    currentCreditQuotaDetail?.id === creditQuotaId &&
    currentCreditQuotaDetail;

  return {
    selectCreditQuotaDetail,
  };
};

const validateCreditQuotas = async (
  creditQuotas: IProduct[],
  cardId: string,
  accessToken: string,
) => {
  let currentCreditQuotas = [...creditQuotas];

  if (currentCreditQuotas.length === 0) {
    currentCreditQuotas = await getCreditQuotasForCard(cardId, accessToken);
  }

  return {
    newCreditQuotas: currentCreditQuotas,
  };
};

const getUsedQuotaData =(creditQuotaDetail: IProduct) => {
  let currentConsumption;
  let accumulatedDebt;
  let transactionsProcess;
  let usedQuotaValue;

  creditQuotaDetail.attributes.forEach((attr) => {
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

export { getUsedQuotaData, validateCreditQuotas, validateCreditQuotaDetail };
