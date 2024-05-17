import { AidOptions } from "@pages/request/aids/AidOptions";
import { Route, Routes } from "react-router-dom";

function AidRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AidOptions />} />
    </Routes>
  );
}

export { AidRoutes };
