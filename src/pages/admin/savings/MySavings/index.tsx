import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { SavingsContext } from "src/context/savings";
import { getSavingsForUser } from "src/services/iclient/savings/getSavings";
import { MySavingsUI } from "./interface";

function MySavings() {
  const { savings, setSavings } = useContext(SavingsContext);
  const [loading, setLoading] = useState(false);
  const { user, accessToken } = useAuth();

  useEffect(() => {
    const combinedSavings = [
      ...savings.savingsAccounts,
      ...savings.savingsContributions,
      ...savings.cdats,
      ...savings.programmedSavings,
    ];
    if (user && accessToken && combinedSavings.length === 0) {
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

  const savingsAccounts = savings.filter(
    (savings) => savings.type === "VIEWSAVINGS",
  );

  const savingsStatutoryContributions = savings.filter(
    (savings) =>
      savings.type === "PERMANENTSAVINGS" || savings.type === "CONTRIBUTIONS",
  );

  return (
    <MySavingsUI
      productsCommitments={[]}
      savingsAccounts={[]}
      savingsContributions={savings.savingsContributions}
      cdats={savings.cdats}
      programmedSavings={[]}
      loading={loading}
    />
  );
}

export { MySavings };
