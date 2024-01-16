import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { CreditsContext } from "src/context/credits";
import { getCreditsForUser } from "src/services/iclient/credits";
import { HomeUI } from "./interface";
import {
  getInvestmentsProducts,
  productsCommitments,
  savingsAccountsMock,
  savingsStatutoryContributionsMock,
} from "./utils";

function Home() {
  const { credits, setCredits } = useContext(CreditsContext);
  const { user, accessToken } = useAuth();
  const [loading, setLoading] = useState(true);

  const cdats = user && getInvestmentsProducts(user.identification, "CD");
  const programmedSavings =
    user && getInvestmentsProducts(user.identification, "AP");

  useEffect(() => {
    if (user && accessToken) {
      getCreditsForUser(user?.identification, accessToken)
        .then((credits) => {
          setCredits(credits);
        })
        .catch((error) => {
          console.info(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, accessToken]);

  return (
    <HomeUI
      productsCommitments={productsCommitments}
      savingsAccountsMock={savingsAccountsMock}
      savingsStatutoryContributionsMock={savingsStatutoryContributionsMock}
      cdats={cdats}
      programmedSavings={programmedSavings}
      credits={credits}
      loading={loading}
    />
  );
}

export { Home };
