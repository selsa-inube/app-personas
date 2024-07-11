import { cardStatusDM } from "src/model/domains/cards/cardStatusDM";
import { EProductType, IAttribute, IProduct } from "src/model/entity/product";
import {
  capitalizeEachWord,
  capitalizeText,
  obfuscateText,
} from "src/utils/texts";

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
      value: capitalizeEachWord(String(card.ownerName)),
    },
    {
      id: "status",
      label: "Estado",
      value: cardStatusDM.valueOf(Object(card.cardStatus).code)?.value || "",
    },
    {
      id: "savings_accounts",
      label: "Cuentas de ahorro",
      value: savingsAccounts || [],
    },
  ];

  const normalizedProductName = `Tarjeta - Banco ${capitalizeText(String(card.issuingEntityName).toLowerCase())}`;

  const obfuscatedCardNumber = obfuscateText(String(card.cardNumber), 0, 4);

  return {
    id: String(card.cardId),
    title: normalizedProductName,
    description: `${normalizedProductName} ${obfuscatedCardNumber}`,
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
