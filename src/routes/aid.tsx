import { Aid } from "@pages/request/aids/Aid";
import { AidRequest } from "@pages/request/aids/AidRequest";
import { Route, Routes } from "react-router-dom";

function AidRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Aid />} />
      <Route path=":aid_type" element={<AidRequest />} />
    </Routes>
  );
}

export { AidRoutes };
