import { TransferHistory } from "@pages/admin/transfers/TransferHistory";
import { Route, Routes } from "react-router-dom";

function TransfersRoutes() {
  return (
    <Routes>
      <Route path="/" element={<></>} />
      <Route path="/history" element={<TransferHistory />} />
    </Routes>
  );
}

export { TransfersRoutes };
