import { Aid } from "@pages/request/aids/Aid";
import { Route, Routes } from "react-router-dom";

function AidRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Aid />} />
    </Routes>
  );
}

export { AidRoutes };
