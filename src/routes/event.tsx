import { EventOptions } from "@pages/request/events/EventOptions";
import { Route, Routes } from "react-router-dom";

function EventRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EventOptions />} />
    </Routes>
  );
}

export { EventRoutes };
