import { Card } from "@pages/admin/cards/Card";
import { MyCards } from "@pages/admin/cards/MyCards";
import { Route, Routes } from "react-router-dom";

function MyCardsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MyCards />} />
      <Route path="/:card_id" element={<Card />} />
    </Routes>
  );
}

export { MyCardsRoutes };
