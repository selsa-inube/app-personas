import { Credit } from "@pages/admin/credits/Credit";
import { CreditAmortization } from "@pages/admin/credits/CreditAmortization";
import { CreditMovements } from "@pages/admin/credits/CreditMovements";
import { MyCredits } from "@pages/admin/credits/MyCredits";
import { Investment } from "@pages/admin/investments/Investment";
import { InvestmentMovements } from "@pages/admin/investments/InvestmentMovements";
import { MyInvestments } from "@pages/admin/investments/MyInvestments";
import { MySavings } from "@pages/admin/savings/MySavings";
import { SavingsAccount } from "@pages/admin/savings/SavingsAccount";
import { SavingsAccountMovements } from "@pages/admin/savings/SavingsAccountMovements";
import { SavingsCommitments } from "@pages/admin/savings/SavingsCommitments";
import { Navigate, Route } from "react-router-dom";

function AdminRoutes() {
  return (
    <>
      <Route path="my-credits" element={<MyCredits />} />
      <Route path="my-credits/:credit_id" element={<Credit />} />
      <Route
        path="my-credits/:credit_id/credit-movements"
        element={<CreditMovements />}
      />
      <Route
        path="my-credits/:credit_id/credit-amortization"
        element={<CreditAmortization />}
      />
      <Route path="my-investments" element={<MyInvestments />} />
      <Route path="my-investments/:product_id" element={<Investment />} />
      <Route
        path="my-investments/:product_id/movements"
        element={<InvestmentMovements />}
      />
      <Route path="my-savings" element={<MySavings />} />
      <Route
        path="my-savings/account/:product_id"
        element={<SavingsAccount />}
      />
      <Route
        path="my-savings/account"
        element={<Navigate to="/my-savings" replace />}
      />
      <Route
        path="my-savings/account/:product_id/movements"
        element={<SavingsAccountMovements />}
      />
      <Route
        path="my-savings/commitment/:commitment_id"
        element={<SavingsCommitments />}
      />
    </>
  );
}

export { AdminRoutes };
