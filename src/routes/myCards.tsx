import { Route, Routes } from "react-router-dom";
import { MyCards } from "@pages/admin/cards/MyCards";

function MyCardsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MyCards />} />
    </Routes>
  );
}

export { MyCardsRoutes };
