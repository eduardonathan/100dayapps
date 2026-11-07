import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NewMaintenanceRecordPage } from "./pages/NewMaintenanceRecordPage";
import { DetailMaintenancePage } from "./pages/DetailMaintenancePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/records/:id" element={<DetailMaintenancePage />} />
        <Route path="/records/new" element={<NewMaintenanceRecordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
