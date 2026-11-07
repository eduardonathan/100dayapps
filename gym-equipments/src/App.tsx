import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NewEquipmentPage } from "./pages/NewEquipmentPage";
import { EquipmentDetailPage } from "./pages/EquipmentDetailPage";
import { LoginPage } from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
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
            path="/equipments/new"
            element={
              <ProtectedRoute>
                <NewEquipmentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/equipments/:id"
            element={
              <ProtectedRoute>
                <EquipmentDetailPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
