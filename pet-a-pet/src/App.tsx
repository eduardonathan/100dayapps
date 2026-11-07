import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { NewAdoptionPage } from "./pages/NewAdoptionPage";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdoptionDetailPage } from "./pages/AdoptionDetailPage";
import { AdoptionEditPage } from "./pages/AdoptionEditPage";

function App() {
  return (
    <>
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
              path="/adoption/:id"
              element={
                <ProtectedRoute>
                  <AdoptionDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adoption/:id/edit"
              element={
                <ProtectedRoute>
                  <AdoptionEditPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adoption/new"
              element={
                <ProtectedRoute>
                  <NewAdoptionPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
