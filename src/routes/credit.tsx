import { CreditRequest } from "@pages/request/credits/CreditRequest";
import { CreditSimulationRequest } from "@pages/request/credits/CreditSimulationRequest";
import { Route, Routes } from "react-router-dom";

function CreditRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CreditRequest />} />
      <Route path="simulation" element={<CreditSimulationRequest />} />
    </Routes>
  );
}

export { CreditRoutes };
