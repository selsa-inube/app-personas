import { SavingRequest } from "@pages/request/savings/SavingRequest";
import { CdatRequest } from "@pages/request/savings/CdatRequest";

import { Route, Routes } from "react-router-dom";
import { ProgrammedSavingFixedRequest } from "@pages/request/savings/ProgrammedSavingFixedRequest";

function SavingRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SavingRequest />} />
      <Route path="cdat" element={<CdatRequest />} />
      <Route path="programmedSavingsFixed" element={<ProgrammedSavingFixedRequest />} />
    </Routes>
  );
}

export { SavingRoutes };