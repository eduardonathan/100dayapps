import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AlertIcon, CheckIcon, XIcon } from "../components/icons";
import "./Toast.css";

type ToastType = "error" | "success";

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const AUTO_DISMISS_MS = 5000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "error") => {
      const id = nextId.current++;
      setToasts((current) => [...current, { id, type, message }]);
      setTimeout(() => dismissToast(id), AUTO_DISMISS_MS);
    },
    [dismissToast],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-viewport" role="region" aria-label="Notificações">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`} role="status">
            <span className="toast-icon">
              {toast.type === "success" ? (
                <CheckIcon width={16} height={16} />
              ) : (
                <AlertIcon width={16} height={16} />
              )}
            </span>
            <p className="toast-message">{toast.message}</p>
            <button
              type="button"
              className="toast-close"
              onClick={() => dismissToast(toast.id)}
              aria-label="Fechar notificação"
            >
              <XIcon width={13} height={13} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast precisa ser usado dentro de um ToastProvider");
  }

  return context;
}
