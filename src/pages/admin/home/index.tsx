import { useAuth } from "@inube/auth";
import { investmentsMock } from "@mocks/products/investments/investments.mocks";
import { investmentsCommitmentsMock } from "@mocks/products/investments/investmentsCommitments.mocks";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { savingsCommitmentsMock } from "@mocks/products/savings/savingsCommitments.mocks";
import { useEffect, useState } from "react";
import { USER_ID } from "src/App";
import { IProduct } from "src/model/entity/product";
import { getCreditsForUser } from "src/services/iclient/credits";
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

const getInvestmentsProducts = (type: string) => {
  return investmentsMock.filter(
    (investment) => investment.userOwner === USER_ID && investment.type === type
  );
};

function Home() {
  const [credits, setCredits] = useState<IProduct[]>([]);

  const cdats = getInvestmentsProducts("CD");
  const programmedSavings = getInvestmentsProducts("AP");

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      getCreditsForUser(user?.identification).then((credits) => {
        setCredits(credits);
      });
    }
  }, []);

  return (
    <HomeUI
      productsCommitments={productsCommitments}
      savingsAccountsMock={savingsAccountsMock}
      savingsStatutoryContributionsMock={savingsStatutoryContributionsMock}
      cdats={cdats}
      programmedSavings={programmedSavings}
      credits={credits}
    />
  );
}

export { Home };
