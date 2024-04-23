import { Pay } from "@pages/admin/payments/Pay";
import { PaymentOptions } from "@pages/admin/payments/PaymentOptions";
import { Navigate, Route, Routes } from "react-router-dom";

function PaymentsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PaymentOptions />} />
      <Route path="/pay" element={<Pay />} />
      <Route path="/history" element={<></>} />

      <Route path="*" element={<Navigate to="/payments/pay" replace />} />
    </Routes>
  );
}

export { PaymentsRoutes };
