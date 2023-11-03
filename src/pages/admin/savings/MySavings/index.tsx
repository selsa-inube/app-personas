import { savingsCommitmentsMock } from "@mocks/products/savings/savingsCommitments.mocks";
import { investmentsCommitmentsMock } from "@mocks/products/investments/investmentsCommitments.mocks";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { investmentsMock } from "@mocks/products/investments/investments.mocks";
import { USER_ID } from "src/App";
import { MySavingsUI } from "./interface";

const productsCommitments = [
  ...savingsCommitmentsMock,
  ...investmentsCommitmentsMock,
];

const getSavingProducts = (types: string[]) => {
  return savingsMock.filter((investment) => types.includes(investment.type));
};

const savingsAccountsMock = getSavingProducts(["CA"]);
const savingsStatutoryContributionsMock = getSavingProducts(["APE", "AS"]);

const getInvestmentsProducts = (type: string) => {
  return investmentsMock.filter(
    (investment) => investment.userOwner === USER_ID && investment.type === type
  );
};

function MySavings() {
  const cdats = getInvestmentsProducts("CD");
  const programmedSavings = getInvestmentsProducts("AP");
  return (
    <MySavingsUI
      productsCommitments={productsCommitments}
      savingsAccountsMock={savingsAccountsMock}
      savingsStatutoryContributionsMock={savingsStatutoryContributionsMock}
      cdats={cdats}
      programmedSavings={programmedSavings}
    />
  );
}

export { MySavings };
