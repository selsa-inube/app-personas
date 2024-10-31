import { IUser } from "@inube/auth/dist/types/user";
import { AccountStatementDocument } from ".";
import { ISavingsState } from "src/context/savings/types";
import { IEntry } from "@design/data/Table/types";
import { currencyFormat } from "src/utils/currency";
import { ICommitment, IProduct } from "src/model/entity/product";
import { formatPrimaryDate } from "src/utils/dates";
import { obfuscateCardNumberDocument } from "src/utils/texts";
import { getDetailForCreditQuota } from "src/services/iclient/cards/getCreditQuotaDetail";

const savingsAccount = (savings: ISavingsState): IEntry[] => {
  return savings.savingsAccounts.map((item) => {
    const netValueAttribute = item.attributes.find(
      (attr) => attr.id === "net_value",
    );
    const netValue = netValueAttribute ? netValueAttribute.value : null;

    const conceptValue = item.description.split("-")[0].trim().toUpperCase();

    return {
      id: item.id,
      reference: item.id,
      concept: conceptValue,
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

    const conceptValue = item.description.split("-")[0].trim().toUpperCase();

    return {
      id: item.id,
      reference: item.id,
      concept: conceptValue,
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

    const conceptValue = item.description.split("-")[0].trim().toUpperCase();

    return {
      id: item.id,
      reference: item.id,
      concept: conceptValue,
      totalBalance: currencyFormat(Number(netValue)),
    };
  });
};

const commitmentsSavings = (commitments: ICommitment[]): IEntry[] => {
  return commitments.map((item) => {
    const attributes = item.attributes;

    const commitmentValue =
      attributes.find((attr) => attr.id === "commitment_value")?.value ??
      attributes.find((attr) => attr.id === "quota_value_fixed")?.value ??
      null;

    const quotaValueFixed =
      attributes.find((attr) => attr.id === "quota_value_fixed")?.value ?? null;

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
          : formatPrimaryDate(new Date(paymentDateString))
        : "Por definir";

    const formattedCommitmentValue =
      commitmentValue === quotaValueFixed
        ? currencyFormat(Number(commitmentValue))
        : commitmentValue;

    return {
      id: item.id,
      concept: item.title.toUpperCase(),
      commitmentValue: formattedCommitmentValue,
      paymentDate,
      nextPayment: nextPaymentDateValue,
    };
  });
};

const obligations = (credits: IProduct[]): IEntry[] => {
  return credits.map((item) => {
    const attributes = item.attributes;

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
      concept: item.description,
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
        try {
          const detail = await getDetailForCreditQuota(cardNumber, accessToken);
          const assignedQuotaValue =
            detail?.attributes.find((attr) => attr.id === "assigned_quota")
              ?.value ?? 0;
          const availableSpaceValue =
            detail?.attributes.find((attr) => attr.id === "available_space")
              ?.value ?? 0;

          assignedQuota = Number(assignedQuotaValue);
          availableQuota = Number(availableSpaceValue);
        } catch (error) {
          console.error("Error fetching credit quota details:", error);
        }
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
): Promise<React.JSX.Element> => {
  const userName =
    `${user.firstLastName} ${user.secondLastName} ${user.firstName} ${user.secondName}`
      .toUpperCase()
      .trim();

  let paymentMethod = "";

  if (commitments.length > 0) {
    const firstCommitment = commitments[0];
    const paymentMethodAttribute = firstCommitment.attributes.find(
      (attr) => attr.id === "payment_method",
    );

    if (paymentMethodAttribute) {
      const value = paymentMethodAttribute.value;

      if (typeof value === "string") {
        paymentMethod = value.toUpperCase();
      } else if (typeof value === "number") {
        paymentMethod = value.toString().toUpperCase();
      }
    }
  } else {
    paymentMethod = "FONDECOM";
  }

  const savingsAccountEntries = savingsAccount(savings);
  const savingsContributionsEntries = contributions(savings);
  const programmedSavingsEntries = programmedSavings(savings);
  const commitmentsSavingsEntries = commitmentsSavings(commitments);
  const obligationsEntries = await obligations(credits);
  const creditCardsEntries = await creditCards(cards, accessToken);

  return (
    <AccountStatementDocument
      userName={userName}
      userIdentification={user.identification}
      paymentMethod={paymentMethod}
      savingsAccountEntries={savingsAccountEntries}
      savingsContributionsEntries={savingsContributionsEntries}
      programmedSavingsEntries={programmedSavingsEntries}
      commitmentsSavingsEntries={commitmentsSavingsEntries}
      obligationsEntries={obligationsEntries}
      creditCardsEntries={creditCardsEntries}
      credits={credits}
    />
  );
};

export { getAccountStatementDocument };
