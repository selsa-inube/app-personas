import { SavingRequest } from "@pages/request/savings/SavingRequest";
import { Route, Routes } from "react-router-dom";

function SavingRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SavingRequest />} />
    </Routes>
  );
}

export { SavingRoutes };