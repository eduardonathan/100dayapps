import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { NewVinylPage } from "./pages/NewVinylPage";
import { VinylDetailPage } from "./pages/VinylDetailPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/vinyls/new" element={<NewVinylPage />} />
          </Route>
          <Route path="/vinyls/:id" element={<VinylDetailPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
