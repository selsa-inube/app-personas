import { MySavingsUI } from "./interface";
import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { SavingsContext } from "src/context/savings";
import { getSavingsForUser } from "src/services/iclient/savings/getSavings";

function MySavings() {
  const { savings, setSavings } = useContext(SavingsContext);
  const [loading, setLoading] = useState(false);
  const { user, accessToken } = useAuth();

  useEffect(() => {
    if (user && accessToken && savings.length === 0) {
      setLoading(true);
      getSavingsForUser(user?.identification, accessToken)
        .then((savings) => {
          setSavings(savings);
        })
        .catch((error) => {
          console.info(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, accessToken, savings]);
  return (
    <MySavingsUI
      productsCommitments={[]}
      savingsAccountsMock={[]}
      savingsCommitmentsMock={[]}
      savingsStatutoryContributionsMock={savings.filter(
        (saving) => saving.type === "APE" || saving.type === "AS",
      )}
      cdats={[]}
      programmedSavings={[]}
      loading={loading}
    />
  );
}

export { MySavings };
