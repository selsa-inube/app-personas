import { cardStatusValuesMock } from "@mocks/products/cards/utils.mocks";

import { EProductType, IAttribute, IProduct } from "src/model/entity/product";
import { capitalizeFirstLetters, capitalizeText } from "src/utils/texts";

const mapCardApiToEntity = (
  card: Record<string, string | number | object>,
  savingAccounts: IProduct[],
): IProduct => {
  const savingsAccounts: IAttribute[] = [];

  if (Array.isArray(card.cardSavingPocket)) {
    for (const account of card.cardSavingPocket) {
      const foundSavingAccount = savingAccounts.find(
        (savingAccount) => savingAccount.id === String(account.numberPocket),
      );
      if (foundSavingAccount) {
        savingsAccounts.push({
          id: String(account.numberPocket),
          label: foundSavingAccount.title,
          value: [
            {
              id: "account_number",
              label: "Número de cuenta",
              value: account.numberPocket,
            },
          ],
        });
      }
    }
  }

  const quotaDetails =
    Array.isArray(card.creditCardPocket) &&
    card.creditCardPocket.map((creditQuota): string => {
      return creditQuota.numberPocket;
    });

  const attributes: IAttribute[] = [
    {
      id: "card_number",
      label: "Numero de tarjeta",
      value: String(card.cardNumber),
    },
    {
      id: "cardholder",
      label: "Titular",
      value: capitalizeFirstLetters(String(card.ownerName)),
    },
    {
      id: "status",
      label: "Estado",
      value: cardStatusValuesMock[Object(card.cardStatus).code],
    },
    {
      id: "savings_accounts",
      label: "Cuentas de ahorro",
      value: savingsAccounts || [],
    },
  ];

  const normalizedProductName = `Tarjeta - Banco ${capitalizeText(String(card.issuingEntityName).toLowerCase())}`;

  return {
    id: String(card.cardNumber),
    title: normalizedProductName,
    description: `${normalizedProductName} ${card.cardNumber}`,
    type: EProductType.CREDITCARD,
    attributes,
    tags: [],
    quotaDetails: quotaDetails || [],
  };
};

const mapCardsApiToEntities = (
  cards: Record<string, string | number | object>[],
  savingAccounts: IProduct[],
): IProduct[] => {
  return cards.map((card) => mapCardApiToEntity(card, savingAccounts));
};

export { mapCardApiToEntity, mapCardsApiToEntities };
