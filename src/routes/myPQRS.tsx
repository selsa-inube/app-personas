import { MyPQRS } from "@pages/admin/pqrs/MyPQRS";
import { CreatePQRS } from "@pages/admin/pqrs/PQRSCreate";
import { MyPQRSDetails } from "@pages/admin/pqrs/PQRSDetail";
import { Route, Routes } from "react-router";

function MyPQRSRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MyPQRS />} />
      <Route path="/details/:pqrs_id" element={<MyPQRSDetails />} />
      <Route path="/create" element={<CreatePQRS />} />
    </Routes>
  );
}

export { MyPQRSRoutes };