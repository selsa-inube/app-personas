import { Payments } from "@pages/admin/payments";
import { Pay } from "@pages/admin/payments/Pay";
import { Route, Routes } from "react-router-dom";

function PaymentsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Payments />} />
      <Route path="/pay" element={<Pay />} />
    </Routes>
  );
}

export { PaymentsRoutes };
