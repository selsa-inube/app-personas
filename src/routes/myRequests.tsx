import { MyRequests } from "@pages/admin/requests/MyRequests";
import { Route, Routes } from "react-router-dom";

function MyRequestsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MyRequests />} />
    </Routes>
  );
}

export { MyRequestsRoutes };
