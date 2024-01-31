import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { CreditsContext } from "src/context/credits";

import { getCreditsForUser } from "src/services/iclient/credits/getCredits";
import { HomeUI } from "./interface";

function Home() {
  const { credits, setCredits } = useContext(CreditsContext);
  const { user, accessToken } = useAuth();
  const [loading, setLoading] = useState(true);

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
      productsCommitments={[]}
      savingsAccountsMock={[]}
      savingsCommitmentsMock={[]}
      savingsStatutoryContributionsMock={[]}
      cdats={[]}
      programmedSavings={[]}
      credits={credits}
      loading={loading}
    />
  );
}

export { Home };
