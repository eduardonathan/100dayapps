import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NewRecordPage } from "./pages/NewRecordPage";
import { RecordDetailPage } from "./pages/RecordDetailPage";
import { RecordEditPage } from "./pages/RecordEditPage";
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
            path="/record/new"
            element={
              <ProtectedRoute>
                <NewRecordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/record/:id"
            element={
              <ProtectedRoute>
                <RecordDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/record/:id/edit"
            element={
              <ProtectedRoute>
                <RecordEditPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
