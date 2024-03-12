import { Route, Routes } from "react-router-dom";
import { MyCards } from "@pages/admin/cards/MyCards";
import { Card } from "@pages/admin/cards/Card";

function MyCardsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MyCards />} />
      <Route path="/:card_id" element={<Card />} />
    </Routes>
  );
}

export { MyCardsRoutes };
