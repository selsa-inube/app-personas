import { Payments } from "@pages/admin/payments";
import { Route, Routes } from "react-router-dom";

function PaymentsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Payments />} />
    </Routes>
  );
}

export { PaymentsRoutes };
