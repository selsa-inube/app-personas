import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { SavingsContext } from "src/context/savings";
import { CommitmentsContext } from "src/context/commitments";
import { getSavingsCommitmentsForUser } from "src/services/iclient/savings/getCommitments";
import { getSavingsForUser } from "src/services/iclient/savings/getSavings";
import { MySavingsUI } from "./interface";

function MySavings() {
  const { savings, setSavings } = useContext(SavingsContext);
  const { commitments, setCommitments } = useContext(CommitmentsContext);
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
      if (commitments.length === 0) {
        setLoading(true);
        getSavingsCommitmentsForUser(user?.identification, accessToken)
          .then((commitments) => {
            setCommitments(commitments);
          })
          .catch((error) => {
            console.info(error.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [user, accessToken, savings, commitments]);

  return (
    <MySavingsUI
      productsCommitments={commitments}
      savingsAccounts={savings.savingsAccounts}
      savingsContributions={savings.savingsContributions}
      cdats={savings.cdats}
      programmedSavings={[]}
      loading={loading}
    />
  );
}

export { MySavings };
