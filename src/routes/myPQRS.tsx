import { MyPQRS } from "@pages/admin/pqrs/MyPQRS";
import { MyPQRSDetails } from "@pages/admin/pqrs/PQRSDetail";
import { Route, Routes } from "react-router-dom";

function MyPQRSRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MyPQRS />} />
      <Route path="/details/:pqrs_id" element={<MyPQRSDetails />} />
      <Route path="/create" element={<></>} />
    </Routes>
  );
}

export { MyPQRSRoutes };