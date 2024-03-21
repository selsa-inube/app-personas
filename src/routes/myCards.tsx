import { Card } from "@pages/admin/cards/Card";
import { CardMovements } from "@pages/admin/cards/CardMovements";
import { Consumption } from "@pages/admin/cards/Consumption";
import { CreditQuota } from "@pages/admin/cards/CreditQuota";
import { MyCards } from "@pages/admin/cards/MyCards";
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
      <Route
        path="/:card_id/movements/:credit_quota_id"
        element={<CardMovements />}
      />
    </Routes>
  );
}

export { MyCardsRoutes };
