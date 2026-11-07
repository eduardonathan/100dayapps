import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { NewOrderPage } from "./pages/NewOrderPage";
import { HomePage } from "./pages/HomePage";
import { AuthProvider } from "./contexts/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={"/login"} element={<LoginPage />} />
          <Route
            path={"/"}
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/orders/new"}
            element={
              <ProtectedRoute>
                <NewOrderPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
