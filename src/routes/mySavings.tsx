import { MySavings } from "@pages/admin/savings/MySavings";
import { SavingCommitmentPayments } from "@pages/admin/savings/SavingCommitmentPayments";
import { SavingsAccount } from "@pages/admin/savings/SavingsAccount";
import { SavingsAccountMovements } from "@pages/admin/savings/SavingsAccountMovements";
import { SavingsCommitments } from "@pages/admin/savings/SavingsCommitments";
import { Navigate, Route, Routes } from "react-router-dom";

function MySavingsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MySavings />} />
      <Route path="account/:product_id" element={<SavingsAccount />} />
      <Route path="account" element={<Navigate to="/my-savings" replace />} />
      <Route
        path="account/:product_id/movements"
        element={<SavingsAccountMovements />}
      />
      <Route
        path="commitment/:commitment_id"
        element={<SavingsCommitments />}
      />
      <Route
        path="commitment/:commitment_id/payments"
        element={<SavingCommitmentPayments />}
      />
      <Route
        path="commitment"
        element={<Navigate to="/my-savings" replace />}
      />
    </Routes>
  );
}

export { MySavingsRoutes };
