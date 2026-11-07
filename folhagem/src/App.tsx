import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NewPlantPage } from "./pages/NewPlantPage";
import { PlantDetailPage } from "./pages/PlantDetailPage";
import { PlantEditPage } from "./pages/PlantEditPage";
import { AuthProvider } from "./contexts/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plant/new"
            element={
              <ProtectedRoute>
                <NewPlantPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plant/:id"
            element={
              <ProtectedRoute>
                <PlantDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plant/:id/edit"
            element={
              <ProtectedRoute>
                <PlantEditPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
