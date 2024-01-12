import { CdatRequest } from "@pages/request/savings/CdatRequest";
import { ProgrammedSavingFixedRequest } from "@pages/request/savings/ProgrammedSavingFixedRequest";
import { SavingRequest } from "@pages/request/savings/SavingRequest";
import { Route, Routes } from "react-router-dom";


function SavingRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SavingRequest />} />
      <Route path="cdat" element={<CdatRequest />} />
      <Route
        path="programmed-saving"
        element={<ProgrammedSavingFixedRequest />}
      />
    </Routes>
  );
}

export { SavingRoutes };
