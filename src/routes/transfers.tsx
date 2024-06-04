import { TransferHistory } from "@pages/admin/transfers/TransferHistory";
import { TransferOptions } from "@pages/admin/transfers/TransferOptions";
import { Route, Routes } from "react-router-dom";

function TransfersRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TransferOptions />} />
      <Route path="/history" element={<TransferHistory />} />
    </Routes>
  );
}

export { TransfersRoutes };
