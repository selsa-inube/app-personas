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
  const { getFlag } = useContext(AppContext);

  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    if (!accessToken || !user.identification) return;
    setLoading(true);

    getSavingsForUser(user.identification, accessToken)
      .then((savings) => {
        setSavings(savings);
      })
      .finally(() => {
        setLoading(false);
      });

    getSavingsCommitmentsForUser(user.identification, accessToken).then(
      (commitments) => {
        setCommitments(commitments);
      },
    );
  }, [user, accessToken]);

  const withRequestSaving = getFlag(
    "admin.savings.savings.request-saving",
  ).value;

  return (
    <MySavingsUI
      commitments={commitments}
      savingsAccounts={savings.savingsAccounts}
      savingsContributions={savings.savingsContributions}
      cdats={savings.cdats}
      programmedSavings={savings.programmedSavings}
      loading={loading}
      isMobile={isMobile}
      withRequestSaving={withRequestSaving}
    />
  );
}

export { MySavings };
