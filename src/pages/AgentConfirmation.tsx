import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { AgentHeader, EVENTS } from './AgentQueue';
import { downloadComparendoPdf, previewComparendoPdf, type ComparendoData } from '../lib/comparendoPdf';
import { enviarEmail, enviarSms, type Canal } from '../lib/notify';
import { useToasts, ToastViewport } from '../components/Toast';

type NotifState = 'idle' | 'sending' | 'sent' | 'error';

// ─── Screen 1.4 — Comparendo Confirmation ────────────────────────────────────
export default function AgentConfirmation() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { toasts, push, dismiss } = useToasts();

  const ev = (state as any)?.event ?? EVENTS[0];
  const plate = (state as any)?.plate ?? ev.plate;
  const comparendoNum = (state as any)?.comparendoNum ?? 'C-2026-00821';

  const today = new Date();
  const fechaExpedicion = today.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const VALOR = '15 SMDLV — $548.500 COP';
  const CODIGO = 'D04 — Cruce de semáforo en luz roja';

  const comparendo: ComparendoData = {
    numero: comparendoNum,
    fechaExpedicion,
    codigoInfraccion: 'D04',
    descripcionInfraccion: 'Cruce de semáforo en luz roja',
    valor: VALOR,
    fechaInfraccion: ev.fecha,
    horaInfraccion: ev.hora,
    interseccion: ev.interseccion,
    placa: plate,
    propietario: ev.runt.propietario,
    cedula: ev.runt.cedula,
    tipoVehiculo: ev.runt.tipo,
    marca: ev.runt.marca,
    modelo: ev.runt.modelo,
    color: ev.runt.color,
    agente: 'Ricardo Suárez · ID 7743',
  };

  const [email, setEmail] = useState<NotifState>('idle');
  const [sms, setSms] = useState<NotifState>('idle');

  async function notificar(canal: Canal) {
    const setState = canal === 'email' ? setEmail : setSms;
    const destino = canal === 'email' ? ev.runt.email : ev.runt.telefono;
    setState('sending');
    const res = canal === 'email' ? await enviarEmail(destino) : await enviarSms(destino);
    if (res.ok) {
      setState('sent');
      push('success', res.detalle);
    } else {
      setState('error');
      push('error', res.detalle);
    }
  }

  function descargarPdf() {
    downloadComparendoPdf(comparendo);
    push('info', `PDF del comparendo ${comparendoNum} descargado.`);
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#EDF1F7' }}>
      <AgentHeader title="Comparendo Generado" />

      <main className="flex-1 flex items-center justify-center px-20 py-12">
        <div className="w-full max-w-xl">

          {/* Success banner */}
          <div
            className="rounded-lg px-6 py-4 flex items-center gap-4 mb-6 shadow-sm"
            style={{ backgroundColor: '#DCFCE7', border: '1.5px solid #86EFAC' }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-none"
              style={{ backgroundColor: '#15803D' }}
            >
              <svg viewBox="0 0 20 20" className="w-5 h-5 text-white" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: '#14532D' }}>
                Comparendo generado exitosamente
              </p>
              <p className="text-sm mt-0.5" style={{ color: '#166534' }}>
                El comparendo fue generado y será notificado al ciudadano en máximo 24 horas.
              </p>
            </div>
          </div>

          {/* Comparendo summary card */}
          <div
            className="bg-white rounded-lg border overflow-hidden shadow-sm"
            style={{ borderColor: '#C2CEDE' }}
          >
            {/* Header */}
            <div
              className="px-6 py-4 flex items-center justify-between border-b"
              style={{ backgroundColor: '#0D2247', borderColor: '#1A3A6B' }}
            >
              <div>
                <div className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-0.5">
                  Número de comparendo
                </div>
                <div className="text-white font-bold text-xl font-mono tracking-wide">
                  {comparendoNum}
                </div>
              </div>
              <div
                className="rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wide"
                style={{ backgroundColor: '#DCFCE7', color: '#15803D', border: '1px solid #86EFAC' }}
              >
                Generado
              </div>
            </div>

            {/* Fields */}
            <div className="px-6 py-5">
              <dl className="space-y-4">
                {[
                  { label: 'Código de infracción', value: CODIGO },
                  { label: 'Placa del vehículo', value: plate, mono: true },
                  { label: 'Propietario', value: ev.runt.propietario },
                  { label: 'Valor de la sanción', value: VALOR },
                  { label: 'Fecha y hora de la infracción', value: `${ev.fecha} · ${ev.hora}` },
                  { label: 'Intersección', value: ev.interseccion },
                  { label: 'Fecha de expedición', value: fechaExpedicion },
                  { label: 'Agente expedidor', value: 'Ricardo Suárez · ID 7743' },
                ].map(({ label, value, mono }) => (
                  <div
                    key={label}
                    className="flex items-start justify-between gap-4 pb-4 border-b"
                    style={{ borderColor: '#EDF1F7' }}
                  >
                    <dt className="text-sm flex-none" style={{ color: '#5A7099', width: 200 }}>{label}</dt>
                    <dd
                      className={`text-sm font-semibold text-right ${mono ? 'font-mono tracking-widest' : ''}`}
                      style={{ color: '#0F1F3D' }}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Notifications */}
              <div
                className="mt-5 rounded-lg border p-4"
                style={{ backgroundColor: '#F5F8FC', borderColor: '#C2CEDE' }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#5A7099' }}>
                  Notificar al ciudadano
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <NotifButton
                    label="Enviar correo"
                    target={ev.runt.email}
                    state={email}
                    onClick={() => notificar('email')}
                    icon="mail"
                  />
                  <NotifButton
                    label="Enviar SMS"
                    target={ev.runt.telefono}
                    state={sms}
                    onClick={() => notificar('sms')}
                    icon="phone"
                  />
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div
              className="px-6 py-4 flex items-center gap-3 border-t"
              style={{ borderColor: '#C2CEDE', backgroundColor: '#F5F8FC' }}
            >
              <button
                onClick={() => navigate('/agente/bandeja')}
                className="
                  flex-1 py-3 rounded text-sm font-semibold text-white
                  flex items-center justify-center gap-2
                  transition-all hover:-translate-y-px hover:shadow-md active:translate-y-0
                "
                style={{ backgroundColor: '#1A3A6B' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0D2247')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1A3A6B')}
              >
                <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                  <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z"/>
                </svg>
                Volver a la bandeja
              </button>
              <button
                onClick={() => previewComparendoPdf(comparendo)}
                className="px-5 py-3 rounded text-sm font-semibold border flex items-center gap-2 transition-all hover:bg-slate-50"
                style={{ color: '#1A3A6B', borderColor: '#C2CEDE' }}
              >
                <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                  <path d="M8 3C4.5 3 1.7 5.1.5 8c1.2 2.9 4 5 7.5 5s6.3-2.1 7.5-5C14.3 5.1 11.5 3 8 3zm0 8a3 3 0 110-6 3 3 0 010 6zm0-1.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Previsualizar
              </button>
              <button
                onClick={descargarPdf}
                className="px-5 py-3 rounded text-sm font-semibold text-white flex items-center gap-2 transition-all hover:-translate-y-px hover:shadow-md active:translate-y-0"
                style={{ backgroundColor: '#15803D' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#166534')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#15803D')}
              >
                <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                  <path d="M.5 9.9a.5.5 0 01.5.5v2.5a1 1 0 001 1h12a1 1 0 001-1v-2.5a.5.5 0 011 0v2.5a2 2 0 01-2 2H2a2 2 0 01-2-2v-2.5a.5.5 0 01.5-.5z"/>
                  <path d="M7.646 11.854a.5.5 0 00.708 0l3-3a.5.5 0 00-.708-.708L8.5 10.293V1.5a.5.5 0 00-1 0v8.793L5.354 8.146a.5.5 0 10-.708.708l3 3z"/>
                </svg>
                Descargar PDF
              </button>
            </div>
          </div>
        </div>
      </main>

      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}

// ─── Notification action button ───────────────────────────────────────────────
function NotifButton({
  label,
  target,
  state,
  onClick,
  icon,
}: {
  label: string;
  target: string;
  state: NotifState;
  onClick: () => void;
  icon: 'mail' | 'phone';
}) {
  const sent = state === 'sent';
  const sending = state === 'sending';
  const error = state === 'error';

  const border = sent ? '#86EFAC' : error ? '#FECACA' : '#C2CEDE';
  const bg = sent ? '#DCFCE7' : error ? '#FEE2E2' : '#FFFFFF';
  const color = sent ? '#15803D' : error ? '#B91C1C' : '#1A3A6B';

  return (
    <button
      onClick={onClick}
      disabled={sending}
      className="flex flex-col items-start gap-1 rounded-lg border px-3 py-2.5 text-left transition-all hover:shadow-sm disabled:cursor-wait"
      style={{ backgroundColor: bg, borderColor: border, color }}
    >
      <span className="flex items-center gap-2 text-sm font-semibold">
        {sending ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-300" style={{ borderTopColor: color }} aria-hidden="true" />
        ) : icon === 'mail' ? (
          <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor"><path d="M2 3h12a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1zm.4 1.4L8 8.3l5.6-3.9H2.4z" /></svg>
        ) : (
          <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor"><path d="M4.5 1h7a1 1 0 011 1v12a1 1 0 01-1 1h-7a1 1 0 01-1-1V2a1 1 0 011-1zm3.5 12.2a.8.8 0 100-1.6.8.8 0 000 1.6z" /></svg>
        )}
        {sending ? 'Enviando…' : sent ? 'Enviado' : error ? 'Reintentar' : label}
      </span>
      <span className="text-xs font-normal truncate max-w-full" style={{ color: '#5A7099' }}>{target}</span>
    </button>
  );
}
