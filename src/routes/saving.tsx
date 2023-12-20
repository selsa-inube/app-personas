import { SavingRequest } from "@pages/request/savings/SavingRequest";
import { CdatRequest } from "@pages/request/savings/CdatRequest";

import { Route, Routes } from "react-router-dom";

function SavingRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SavingRequest />} />
      <Route path="cdat" element={<CdatRequest />} />
    </Routes>
  );
}

export { SavingRoutes };