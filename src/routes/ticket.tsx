import { TicketOptions } from "@pages/request/tickets/TicketOptions";
import { Route, Routes } from "react-router";

function TicketRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TicketOptions />} />
    </Routes>
  );
}

export { TicketRoutes };
