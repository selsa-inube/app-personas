import { AidOptions } from "@pages/request/aids/AidOptions";
import { AidRequest } from "@pages/request/aids/AidRequest";
import { Route, Routes } from "react-router";

function AidRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AidOptions />} />
      <Route path=":aid_id" element={<AidRequest />} />
    </Routes>
  );
}

export { AidRoutes };
