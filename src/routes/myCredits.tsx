import { Credit } from "@pages/admin/credits/Credit";
import { CreditAmortization } from "@pages/admin/credits/CreditAmortization";
import { CreditMovements } from "@pages/admin/credits/CreditMovements";
import { MyCredits } from "@pages/admin/credits/MyCredits";
import { Route, Routes } from "react-router";

function MyCreditsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MyCredits />} />
      <Route path=":credit_id" element={<Credit />} />
      <Route
        path="/:credit_id/credit-movements"
        element={<CreditMovements />}
      />
      <Route
        path="/:credit_id/credit-amortization"
        element={<CreditAmortization />}
      />
    </Routes>
  );
}

export { MyCreditsRoutes };
