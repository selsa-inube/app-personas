import { useAuth } from "@inube/auth";
import { useEffect, useState } from "react";
import { IProduct } from "src/model/entity/product";
import { getCreditsForUser } from "src/services/iclient/credits";
import { HomeUI } from "./interface";
import {
  getInvestmentsProducts,
  productsCommitments,
  savingsAccountsMock,
  savingsStatutoryContributionsMock,
} from "./utils";

function Home() {
  const [credits, setCredits] = useState<IProduct[]>([]);
  const { user } = useAuth();

  const cdats = user && getInvestmentsProducts(user.identification, "CD");
  const programmedSavings =
    user && getInvestmentsProducts(user.identification, "AP");

  useEffect(() => {
    if (user) {
      getCreditsForUser(user?.identification)
        .then((credits) => {
          setCredits(credits);
        })
        .catch((error) => {
          console.log(error.message);
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
