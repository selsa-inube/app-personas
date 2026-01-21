import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/context/app";
import { SavingsContext } from "src/context/savings";
import { getSavingsForUser } from "src/services/iclient/savings/getSavings";
import { MySavingsUI } from "./interface";

function MySavings() {
  const { savings, setSavings } =
    useContext(SavingsContext);
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const { getFlag } = useContext(AppContext);

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
  }, [user, accessToken]);

  const withRequestSaving = getFlag(
    "admin.savings.savings.request-saving",
  ).value;

  return (
    <MySavingsUI
      savingsAccounts={savings.savingsAccounts}
      savingsContributions={savings.savingsContributions}
      cdats={savings.cdats}
      programmedSavings={savings.programmedSavings}
      loading={loading}
      withRequestSaving={withRequestSaving}
    />
  );
}

export { MySavings };
