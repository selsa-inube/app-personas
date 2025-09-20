import { CreditRequest } from "@pages/request/credits/CreditRequest";
import { CreditDestinationRequest } from "@pages/request/credits/CreditDestinationRequest";
import { Route, Routes } from "react-router";

function CreditRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CreditRequest />} />
      <Route path="destination" element={<CreditDestinationRequest />} />
    </Routes>
  );
}

export { CreditRoutes };
