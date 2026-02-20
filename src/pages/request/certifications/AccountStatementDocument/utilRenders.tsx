import { IEntry } from "@design/data/Table/types";
import { IUser } from "@inube/auth";
import { ISavingsState } from "src/context/savings/types";
import { ICommitment, IProduct } from "src/model/entity/product";
import { getDetailForCreditQuota } from "src/services/iclient/cards/getCreditQuotaDetail";
import { currencyFormat } from "src/utils/currency";
import { formatPrimaryTimestamp } from "src/utils/dates";
import { obfuscateCardNumberDocument } from "src/utils/texts";
import { DefaultTheme } from "styled-components";
import { AccountStatementDocument } from ".";

const savingsAccount = (savings: ISavingsState): IEntry[] => {
  return savings.savingsAccounts.map((item) => {
    const netValueAttribute = item.attributes.find(
      (attr) => attr.id === "net_value",
    );
    const netValue = netValueAttribute ? netValueAttribute.value : null;

    return {
      id: item.id,
      reference: item.id,
      concept: item.title,
      totalBalance: currencyFormat(Number(netValue)),
    };
  });
};

const contributions = (savings: ISavingsState): IEntry[] => {
  return savings.savingsContributions.map((item) => {
    const netValueAttribute = item.attributes.find(
      (attr) => attr.id === "net_value",
    );
    const netValue = netValueAttribute ? netValueAttribute.value : null;

    return {
      id: item.id,
      reference: item.id,
      concept: item.title,
      totalBalance: currencyFormat(Number(netValue)),
    };
  });
};

const programmedSavings = (savings: ISavingsState): IEntry[] => {
  return savings.programmedSavings.map((item) => {
    const netValueAttribute = item.attributes.find(
      (attr) => attr.id === "net_value",
    );
    const netValue = netValueAttribute ? netValueAttribute.value : null;

    return {
      id: item.id,
      reference: item.id,
      concept: item.title,
      totalBalance: currencyFormat(Number(netValue)),
    };
  });
};

const cdatSavings = (savings: ISavingsState): IEntry[] => {
  return savings.cdats.map((item) => {
    const netValueAttribute = item.attributes.find(
      (attr) => attr.id === "net_value",
    );
    const netValue = netValueAttribute ? netValueAttribute.value : null;

    return {
      id: item.id,
      reference: item.id,
      concept: item.title,
      totalBalance: currencyFormat(Number(netValue)),
    };
  });
};

const commitmentsSavings = (commitments: ICommitment[]): IEntry[] => {
  return commitments.map((item) => {
    const attributes = item.attributes;

    const commitmentValue =
      attributes.find((attr) => attr.id === "commitment_value")?.value ?? null;

    const nextPaymentDateValue =
      attributes.find((attr) => attr.id === "next_payment")?.value ??
      "Por definir";

    const paymentDateString = attributes.find(
      (attr) => attr.id === "next_payment_date",
    )?.value;

    const paymentDate =
      typeof paymentDateString === "string" ||
        typeof paymentDateString === "number"
        ? new Date(paymentDateString) < new Date()
          ? "Inmediato"
          : formatPrimaryTimestamp(new Date(paymentDateString))
        : "Por definir";

    return {
      id: item.id,
      concept: item.title.toUpperCase(),
      commitmentValue: commitmentValue,
      paymentDate,
      nextPayment: nextPaymentDateValue,
    };
  });
};

const obligations = (credits: IProduct[]): IEntry[] => {
  return credits.map((item) => {
    const attributes = item.attributes;

    const descriptionValue = `${item.id} - ${item.title}`.toUpperCase();

    const nextDueDateString = attributes.find(
      (attr) => attr.id === "next_payment",
    )?.value;

    const nextDueDate = nextDueDateString ?? "Por definir";

    const nextPaymentValue = attributes.find(
      (attr) => attr.id === "next_payment_value",
    )?.value;

    const nextDueValue =
      typeof nextPaymentValue === "number"
        ? currencyFormat(nextPaymentValue)
        : null;

    return {
      id: item.id,
      concept: descriptionValue,
      nextDueDate,
      nextDueValue,
    };
  });
};

const creditCards = async (
  cards: IProduct[],
  accessToken: string,
): Promise<IEntry[]> => {
  const cardEntries = await Promise.all(
    cards.map(async ({ id, attributes, title }) => {
      const cardNumber = attributes.find((attr) => attr.id === "card_number")
        ?.value as string | null;

      let assignedQuota = 0;
      let availableQuota = 0;

      if (cardNumber) {
        const detail = await getDetailForCreditQuota(cardNumber, accessToken);
        const assignedQuotaValue =
          detail?.attributes.find((attr) => attr.id === "assigned_quota")
            ?.value ?? 0;
        const availableSpaceValue =
          detail?.attributes.find((attr) => attr.id === "available_space")
            ?.value ?? 0;

        assignedQuota = Number(assignedQuotaValue);
        availableQuota = Number(availableSpaceValue);
      }

      return {
        id,
        cardNumber: obfuscateCardNumberDocument(cardNumber),
        productName: title.toUpperCase(),
        assignedQuota: currencyFormat(assignedQuota),
        availableQuota: currencyFormat(availableQuota),
      };
    }),
  );

  return cardEntries;
};

const getAccountStatementDocument = async (
  user: IUser,
  savings: ISavingsState,
  cards: IProduct[],
  commitments: ICommitment[],
  credits: IProduct[],
  accessToken: string,
  theme: DefaultTheme,
  pqrsFlag: boolean,
): Promise<React.JSX.Element> => {
  const userName = `${user.firstName} ${user.lastName}`.toUpperCase().trim();

  const savingsAccountEntries = savingsAccount(savings);
  const savingsContributionsEntries = contributions(savings);
  const programmedSavingsEntries = programmedSavings(savings);
  const commitmentsSavingsEntries = commitmentsSavings(commitments);
  const obligationsEntries = obligations(credits);
  const creditCardsEntries = await creditCards(cards, accessToken);
  const cdatSavingsEntries = cdatSavings(savings);

  return (
    <AccountStatementDocument
      userName={userName}
      userIdentification={user.identification}
      savingsAccountEntries={savingsAccountEntries}
      savingsContributionsEntries={savingsContributionsEntries}
      programmedSavingsEntries={programmedSavingsEntries}
      cdatSavingsEntries={cdatSavingsEntries}
      commitmentsSavingsEntries={commitmentsSavingsEntries}
      obligationsEntries={obligationsEntries}
      creditCardsEntries={creditCardsEntries}
      credits={credits}
      theme={theme}
      pqrsFlag={pqrsFlag}
    />
  );
};

export { getAccountStatementDocument };
