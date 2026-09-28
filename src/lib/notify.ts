// ─── Mock notification service (email + SMS) ──────────────────────────────────
// No real backend is wired. These simulate an async gateway call with latency
// so the UI can show pending → success/failure states. Swap the body of
// `dispatch` for a real fetch() to an email/SMS provider when available.

export type Canal = 'email' | 'sms';

export interface NotifyResult {
  canal: Canal;
  destino: string;
  ok: boolean;
  detalle: string;
}

function dispatch(canal: Canal, destino: string): Promise<NotifyResult> {
  return new Promise(resolve => {
    const latency = 900 + Math.random() * 900;
    setTimeout(() => {
      // Simulated gateway: succeeds when a destination is present.
      const ok = destino.trim().length > 0;
      resolve({
        canal,
        destino,
        ok,
        detalle: ok
          ? canal === 'email'
            ? `Correo enviado a ${destino}`
            : `SMS enviado a ${destino}`
          : `Sin ${canal === 'email' ? 'correo' : 'teléfono'} registrado para el infractor`,
      });
    }, latency);
  });
}

export const enviarEmail = (destino: string) => dispatch('email', destino);
export const enviarSms = (destino: string) => dispatch('sms', destino);
