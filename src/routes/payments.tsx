import { Pay } from "@pages/admin/payments/Pay";
import { PaymentHistory } from "@pages/admin/payments/PaymentHistory";
import { PaymentOptions } from "@pages/admin/payments/PaymentOptions";
import { Navigate, Route, Routes } from "react-router-dom";

function PaymentsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PaymentOptions />} />
      <Route path="/pay" element={<Pay />} />
      <Route path="/history" element={<PaymentHistory />} />

      <Route path="*" element={<Navigate to="/payments/pay" replace />} />
    </Routes>
  );
}

export { PaymentsRoutes };
