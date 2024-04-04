import { PaymentOptions } from "@pages/admin/payments/PaymentOptions";
import { Route, Routes } from "react-router-dom";

function PaymentsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PaymentOptions />} />
    </Routes>
  );
}

export { PaymentsRoutes };
