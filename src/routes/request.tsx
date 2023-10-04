import { MyCredits } from "@pages/admin/credits/MyCredits";
import { Route, Routes } from "react-router-dom";

function RequestRoutes() {
  return (
    <Routes>
      <Route path="credit" element={<MyCredits />} />
    </Routes>
  );
}

export { RequestRoutes };
