import { MyRequests } from "@pages/admin/requests/MyRequests";
import { RequestDetail } from "@pages/admin/requests/RequestDetail";
import { Route, Routes } from "react-router";

function MyRequestsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MyRequests />} />
      <Route path="/:request_id" element={<RequestDetail />} />
    </Routes>
  );
}

export { MyRequestsRoutes };
