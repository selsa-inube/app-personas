import { Card } from "@pages/admin/cards/Card";
import { Consumption } from "@pages/admin/cards/Consumption";
import { MyCards } from "@pages/admin/cards/MyCards";
import { CreditQuota } from "@pages/admin/cards/MyCards/CreditQuota";
import { Route, Routes } from "react-router-dom";

function MyCardsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MyCards />} />
      <Route path="/:card_id" element={<Card />} />
      <Route
        path="/:card_id/credit-quota/:credit_quota_id/consumption/:consumption_id"
        element={<Consumption />}
      />
      <Route
        path="/:card_id/credit-quota/:credit_quota_id"
        element={<CreditQuota />}
      />
    </Routes>
  );
}

export { MyCardsRoutes };
