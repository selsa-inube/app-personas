import { Investment } from "@pages/admin/investments/Investment";
import { InvestmentMovements } from "@pages/admin/investments/InvestmentMovements";
import { MyInvestments } from "@pages/admin/investments/MyInvestments";
import { Route, Routes } from "react-router-dom";

function MyInvestmentsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MyInvestments />} />
      <Route path=":product_id" element={<Investment />} />
      <Route path=":product_id/movements" element={<InvestmentMovements />} />
    </Routes>
  );
}

export { MyInvestmentsRoutes };
