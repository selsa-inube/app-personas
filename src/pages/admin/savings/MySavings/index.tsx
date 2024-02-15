import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { SavingsContext } from "src/context/savings";
import { getSavingsCommitmentsForUser } from "src/services/iclient/savings/getCommitments";
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
    if (user && accessToken) {
      if (combinedSavings.length === 0) {
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
      if (savings.commitments.length === 0) {
        getSavingsCommitmentsForUser(user?.identification, accessToken)
          .then((commitments) => {
            setSavings((prevState) => ({
              ...prevState,
              commitments: commitments,
            }));
          })
          .catch((error) => {
            console.info(error.message);
          });
      }
    }
  }, [user, accessToken, savings]);

  return (
    <MySavingsUI
      productsCommitments={savings.commitments}
      savingsAccounts={savings.savingsAccounts}
      savingsContributions={savings.savingsContributions}
      cdats={savings.cdats}
      programmedSavings={[]}
      loading={loading}
    />
  );
}

export { MySavings };
