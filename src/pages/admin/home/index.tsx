import { useAuth } from "@inube/auth";
import { investmentsMock } from "@mocks/products/investments/investments.mocks";
import { investmentsCommitmentsMock } from "@mocks/products/investments/investmentsCommitments.mocks";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { savingsCommitmentsMock } from "@mocks/products/savings/savingsCommitments.mocks";
import { HomeUI } from "./interface";

const productsCommitments = [
  ...savingsCommitmentsMock,
  ...investmentsCommitmentsMock,
];

const getSavingProducts = (types: string[]) => {
  return savingsMock.filter((investment) => types.includes(investment.type));
};

const savingsAccountsMock = getSavingProducts(["CA"]);
const savingsStatutoryContributionsMock = getSavingProducts(["APE", "AS"]);

const getInvestmentsProducts = (userId: string, type: string) => {
  return investmentsMock.filter(
    (investment) => investment.userOwner === userId && investment.type === type
  );
};

function Home() {
  const { user } = useAuth();

  const cdats = user && getInvestmentsProducts(user.identification, "CD");
  const programmedSavings =
    user && getInvestmentsProducts(user.identification, "AP");

  return (
    <HomeUI
      productsCommitments={productsCommitments}
      savingsAccountsMock={savingsAccountsMock}
      savingsStatutoryContributionsMock={savingsStatutoryContributionsMock}
      cdats={cdats}
      programmedSavings={programmedSavings}
    />
  );
}

export { Home };
