import { useAuth } from "@inube/auth";
import { investmentsMock } from "@mocks/products/investments/investments.mocks";
import { investmentsCommitmentsMock } from "@mocks/products/investments/investmentsCommitments.mocks";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { savingsCommitmentsMock } from "@mocks/products/savings/savingsCommitments.mocks";
import {
  cdatCode,
  permanentSavingsCode,
  programmedSavingCode,
  savingAccountCode,
  socialContributionsCode,
} from "./config/products";
import { MySavingsUI } from "./interface";

const productsCommitments = [
  ...savingsCommitmentsMock,
  ...investmentsCommitmentsMock,
];

const getSavingProducts = (types: string[]) => {
  return savingsMock.filter((investment) => types.includes(investment.type));
};

const savingsAccountsMock = getSavingProducts([savingAccountCode]);
const savingsStatutoryContributionsMock = getSavingProducts([
  permanentSavingsCode,
  socialContributionsCode,
]);

const getInvestmentsProducts = (userId: string, type: string) => {
  return investmentsMock.filter(
    (investment) => investment.userOwner === userId && investment.type === type,
  );
};

function MySavings() {
  const { user } = useAuth();

  const cdats = user && getInvestmentsProducts(user.identification, cdatCode);
  const programmedSavings =
    user && getInvestmentsProducts(user.identification, programmedSavingCode);

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
