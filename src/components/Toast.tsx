import { useCallback, useState } from 'react';

export type ToastKind = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  kind: ToastKind;
  message: string;
}

let nextId = 1;

/** Lightweight toast queue. Returns the current toasts and a `push` helper. */
export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts(list => list.filter(t => t.id !== id));
  }, []);

  const push = useCallback(
    (kind: ToastKind, message: string) => {
      const id = nextId++;
      setToasts(list => [...list, { id, kind, message }]);
      setTimeout(() => dismiss(id), 4500);
      return id;
    },
    [dismiss],
  );

  return { toasts, push, dismiss };
}

const STYLES: Record<ToastKind, { bg: string; border: string; text: string; icon: string }> = {
  success: { bg: '#DCFCE7', border: '#86EFAC', text: '#14532D', icon: '#15803D' },
  error: { bg: '#FEE2E2', border: '#FECACA', text: '#7F1D1D', icon: '#DC2626' },
  info: { bg: '#EFF6FF', border: '#BFDBFE', text: '#1E3A8A', icon: '#2558A8' },
};

export function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}) {
  return (
    <div
      className="fixed bottom-6 right-6 z-[60] flex w-full max-w-sm flex-col gap-3"
      aria-live="polite"
      role="status"
    >
      {toasts.map(t => {
        const s = STYLES[t.kind];
        return (
          <div
            key={t.id}
            className="flex items-start gap-3 rounded-lg border px-4 py-3 shadow-lg"
            style={{ backgroundColor: s.bg, borderColor: s.border, color: s.text }}
          >
            <span
              className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full"
              style={{ backgroundColor: s.icon }}
            >
              <svg viewBox="0 0 20 20" className="h-3 w-3 text-white" fill="currentColor">
                {t.kind === 'error' ? (
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.7 7.3a1 1 0 00-1.4 1.4L8.6 10l-1.3 1.3a1 1 0 101.4 1.4L10 11.4l1.3 1.3a1 1 0 001.4-1.4L11.4 10l1.3-1.3a1 1 0 00-1.4-1.4L10 8.6 8.7 7.3z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            </span>
            <p className="flex-1 text-sm font-medium leading-snug">{t.message}</p>
            <button
              onClick={() => onDismiss(t.id)}
              aria-label="Cerrar notificación"
              className="flex-none text-current opacity-50 transition-opacity hover:opacity-100"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
                <path d="M4.3 3.3a1 1 0 011.4 0L8 5.6l2.3-2.3a1 1 0 111.4 1.4L9.4 7l2.3 2.3a1 1 0 01-1.4 1.4L8 8.4l-2.3 2.3a1 1 0 01-1.4-1.4L6.6 7 4.3 4.7a1 1 0 010-1.4z" />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}
