import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { NewMedicinePage } from "./pages/NewMedicinePage";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AppShell } from "./components/AppShell";

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
                <AppShell>
                  <HomePage />
                </AppShell>
              </ProtectedRoute>
            }
          />
          <Route
            path="/medicines/new"
            element={
              <ProtectedRoute>
                <AppShell>
                  <NewMedicinePage />
                </AppShell>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
