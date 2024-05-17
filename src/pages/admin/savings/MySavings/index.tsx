import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/context/app";
import { SavingsContext } from "src/context/savings";
import { getSavingsCommitmentsForUser } from "src/services/iclient/savings/getCommitments";
import { getSavingsForUser } from "src/services/iclient/savings/getSavings";
import { MySavingsUI } from "./interface";

function MySavings() {
  const { commitments, savings, setCommitments, setSavings } =
    useContext(SavingsContext);
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);

  const isTablet = useMediaQuery("(max-width: 1100px)");

  useEffect(() => {
    const combinedSavings = [
      ...savings.savingsAccounts,
      ...savings.savingsContributions,
      ...savings.cdats,
      ...savings.programmedSavings,
    ];
    if (accessToken) {
      if (combinedSavings.length === 0) {
        setLoading(true);
        getSavingsForUser(user.identification, accessToken)
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
        getSavingsCommitmentsForUser(user.identification, accessToken)
          .then((commitments) => {
            setCommitments(commitments);
          })
          .catch((error) => {
            console.info(error.message);
          });
      }
    }
  }, [user, accessToken]);

  return (
    <MySavingsUI
      commitments={commitments}
      savingsAccounts={savings.savingsAccounts}
      savingsContributions={savings.savingsContributions}
      cdats={savings.cdats}
      programmedSavings={savings.programmedSavings}
      loading={loading}
      isTablet={isTablet}
    />
  );
}

export { MySavings };
