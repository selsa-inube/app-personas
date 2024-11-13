import { CdatRequest } from "@pages/request/savings/CdatRequest";
import { ProgrammedSavingRequest } from "@pages/request/savings/ProgrammedSavingRequest";
import { SavingRequest } from "@pages/request/savings/SavingRequest";
import { Route, Routes } from "react-router-dom";

function SavingRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SavingRequest />} />
      <Route path="cdat" element={<CdatRequest />} />
      <Route path="programmed-saving" element={<ProgrammedSavingRequest />} />
    </Routes>
  );
}

export { SavingRoutes };
