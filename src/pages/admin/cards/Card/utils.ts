import { IProduct } from "src/model/entity/product";
import { getCardsForUser } from "src/services/iclient/cards/getCards";

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

export { validateCard };
