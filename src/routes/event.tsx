import { EventOptions } from "@pages/request/events/EventOptions";
import { RegisterInEvent } from "@pages/request/events/RegisterInEvent";
import { Route, Routes } from "react-router-dom";

function EventRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EventOptions />} />
      <Route path="/registration" element={<RegisterInEvent />} />
    </Routes>
  );
}

export { EventRoutes };
