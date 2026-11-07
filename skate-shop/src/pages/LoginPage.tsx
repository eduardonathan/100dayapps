import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface LocationState {
  from?: string;
}

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const redirectTo = state?.from ?? "/";

  function handleLogin() {
    login();
    navigate(redirectTo, { replace: true });
  }

  return (
    <div>
      <h1>Login</h1>
      <button type="button" onClick={handleLogin}>
        Entrar
      </button>
    </div>
  );
}
