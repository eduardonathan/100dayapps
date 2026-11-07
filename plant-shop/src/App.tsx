import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { NewPlantPage } from "./pages/NewPlantPage";
import { EditPlantPage } from "./pages/EditPlantPage";
import { PlantDetailPage } from "./pages/PlantDetailPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/plants/new" element={<NewPlantPage />} />
            <Route path="/plants/:id/edit" element={<EditPlantPage />} />
          </Route>
          <Route path="/plants/:id" element={<PlantDetailPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
