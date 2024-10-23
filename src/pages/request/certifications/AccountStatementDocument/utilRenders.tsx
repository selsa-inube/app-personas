import { IUser } from "@inube/auth/dist/types/user";
import { AccountStatementDocument } from ".";
import { ISavingsState } from "src/context/savings/types";
import { IEntry } from "@design/data/Table/types";
import { currencyFormat } from "src/utils/currency";

const getAccountStatementDocument = (user: IUser, savings: ISavingsState) => {
  const userName =
    `${user.firstLastName} ${user.secondLastName} ${user.firstName} ${user.secondName}`
      .toUpperCase()
      .trim();

  const savingsAccount = (savings: ISavingsState): IEntry[] => {
    return savings.savingsAccounts.map((item) => {
      const netValueAttribute = item.attributes.find(
        (attr) => attr.id === "net_value",
      );
      const netValue = netValueAttribute ? netValueAttribute.value : null;

      const descriptionValue = item.description
        .split("-")[0]
        .trim()
        .toUpperCase();

      return {
        id: item.id,
        reference: item.id,
        descriptionTable: descriptionValue,
        totalBalance: currencyFormat(Number(netValue)),
      };
    });
  };

  const savingsAccountEntries = savingsAccount(savings);

  const contributions = (savings: ISavingsState): IEntry[] => {
    return savings.savingsContributions.map((item) => {
      const netValueAttribute = item.attributes.find(
        (attr) => attr.id === "net_value",
      );
      const netValue = netValueAttribute ? netValueAttribute.value : null;

      const descriptionValue = item.description
        .split("-")[0]
        .trim()
        .toUpperCase();

      return {
        id: item.id,
        reference: item.id,
        descriptionTable: descriptionValue,
        totalBalance: currencyFormat(Number(netValue)),
      };
    });
  };

  const savingsContributionsEntries = contributions(savings);

  const programmedSavings = (savings: ISavingsState): IEntry[] => {
    return savings.programmedSavings.map((item) => {
      const netValueAttribute = item.attributes.find(
        (attr) => attr.id === "net_value",
      );
      const netValue = netValueAttribute ? netValueAttribute.value : null;

      const descriptionValue = item.description
        .split("-")[0]
        .trim()
        .toUpperCase();

      return {
        id: item.id,
        reference: item.id,
        descriptionTable: descriptionValue,
        totalBalance: currencyFormat(Number(netValue)),
      };
    });
  };

  const programmedSavingsEntries = programmedSavings(savings);

  return (
    <AccountStatementDocument
      userName={userName}
      userIdentification={user.identification}
      savingsAccountEntries={savingsAccountEntries}
      savingsContributionsEntries={savingsContributionsEntries}
      programmedSavingsEntries={programmedSavingsEntries}
    />
  );
};

export { getAccountStatementDocument };
