import { Pay } from "@pages/admin/payments/Pay";
import { PaymentOptions } from "@pages/admin/payments/PaymentOptions";
import { Route, Routes } from "react-router-dom";

function PaymentsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PaymentOptions />} />
      <Route path="/pay" element={<Pay />} />
    </Routes>
  );
}

export { PaymentsRoutes };
