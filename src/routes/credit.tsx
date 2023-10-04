import { MyCredits } from "@pages/admin/credits/MyCredits";
import { CreditRequest } from "@pages/request/credits/CreditRequest";
import { Route, Routes } from "react-router-dom";

function CreditRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CreditRequest />} />
    </Routes>
  );
}

export { CreditRoutes };
