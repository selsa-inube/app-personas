import { IProduct } from "src/model/entity/product";
import { getCardsForUser } from "src/services/iclient/cards/getCards";
import { getCreditQuotasForCard } from "src/services/iclient/cards/getCreditQuotas";

const validateCard = async (
  cards: IProduct[],
  cardId: string,
  userIdentification: string,
  accessToken: string,
  savingAccounts: IProduct[],
) => {
  let currentCards = [...cards];

  if (currentCards.length === 0) {
    currentCards = await getCardsForUser(
      userIdentification,
      accessToken,
      savingAccounts,
    );
  }

  const selectedCard = currentCards.find((card) => {
    return card.id === cardId;
  });

  return {
    selectedCard,
    newCards: currentCards,
  };
};

const validateCreditQuotasInCards = async (
  cardId: string,
  accessToken: string,
) => {
  const currentCreditQuotas = await getCreditQuotasForCard(cardId, accessToken);

  return {
    newCreditQuotas: currentCreditQuotas,
  };
};

const getUsedQuotaData = (creditQuotas: IProduct[]) => {
  let currentConsumption;
  let accumulatedDebt;
  let transactionsProcess;
  let usedQuotaValue;

  creditQuotas.map((creditQuota) => {
    creditQuota.attributes.forEach((attr) => {
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
  });

  return {
    currentConsumption: currentConsumption && Number(currentConsumption),
    accumulatedDebt: accumulatedDebt && Number(accumulatedDebt),
    transactionsProcess: transactionsProcess && Number(transactionsProcess),
    usedQuotaValue: Number(usedQuotaValue),
  };
};

export { getUsedQuotaData, validateCard, validateCreditQuotasInCards };
