import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { CreditsContext } from "src/context/credits";
import { SavingsContext } from "src/context/savings";
import { getCreditsForUser } from "src/services/iclient/credits/getCredits";
import { getSavingsForUser } from "src/services/iclient/savings/getSavings";
import { HomeUI } from "./interface";

function Home() {
  const { credits, setCredits } = useContext(CreditsContext);
  const { savings, setSavings } = useContext(SavingsContext);
  const { user, accessToken } = useAuth();
  const [loadingCredits, setLoadingCredits] = useState(true);
  const [loadingSavings, setLoadingSavings] = useState(true);

  useEffect(() => {
    if (user && accessToken) {
      getSavingsForUser(user?.identification, accessToken)
        .then((savings) => {
          setSavings(savings);
        })
        .catch((error) => {
          console.info(error.message);
        })
        .finally(() => {
          setLoadingSavings(false);
        });
      getCreditsForUser(user?.identification, accessToken)
        .then((credits) => {
          setCredits(credits);
        })
        .catch((error) => {
          console.info(error.message);
        })
        .finally(() => {
          setLoadingCredits(false);
        });
    }
  }, [user, accessToken]);

  return (
    <HomeUI
      productsCommitments={[]}
      savingsAccountsMock={[]}
      savingsCommitmentsMock={[]}
      savingsStatutoryContributionsMock={savings.filter((saving) =>
        saving.id.startsWith("200"),
      )}
      cdats={[]}
      programmedSavings={[]}
      credits={credits}
      loadingCredits={loadingCredits}
      loadingSavings={loadingSavings}
    />
  );
}

export { Home };
