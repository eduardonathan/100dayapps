import { IconAlert, IconCheck, IconX } from "./icons";

export interface ToastItem {
  id: string;
  type: "success" | "error";
  message: string;
}

interface ToastStackProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastStack({ toasts, onDismiss }: ToastStackProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.type}`}>
          <span className="toast__icon" aria-hidden="true">
            {toast.type === "success" ? <IconCheck /> : <IconAlert />}
          </span>
          <p className="toast__message">{toast.message}</p>
          <button
            type="button"
            className="toast__close"
            onClick={() => onDismiss(toast.id)}
            aria-label="Fechar aviso"
          >
            <IconX />
          </button>
        </div>
      ))}
    </div>
  );
}
