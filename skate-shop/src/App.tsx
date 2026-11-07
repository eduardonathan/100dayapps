import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { NewSkateboardPage } from "./pages/NewSkateboardPage";
import { EditSkateboardPage } from "./pages/EditSkateboardPage";
import { SkateboardDetailPage } from "./pages/SkateboardDetailPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/skateboards/new" element={<NewSkateboardPage />} />
            <Route path="/skateboards/:id/edit" element={<EditSkateboardPage />} />
          </Route>
          <Route path="/skateboards/:id" element={<SkateboardDetailPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
