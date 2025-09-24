import { EntryDetail } from "@pages/admin/entries/EntryDetail";
import { MyEntries } from "@pages/admin/entries/MyEntries";
import { Route, Routes } from "react-router";

function MyEntriesRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MyEntries />} />
      <Route path="/:entry_id" element={<EntryDetail />} />
    </Routes>
  );
}

export { MyEntriesRoutes };
