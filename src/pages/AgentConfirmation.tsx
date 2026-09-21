import { useNavigate, useLocation } from 'react-router';
import { AgentHeader, EVENTS } from './AgentQueue';

// ─── Screen 1.4 — Comparendo Confirmation ────────────────────────────────────
export default function AgentConfirmation() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const ev = (state as any)?.event ?? EVENTS[0];
  const plate = (state as any)?.plate ?? ev.plate;
  const comparendoNum = (state as any)?.comparendoNum ?? 'C-2026-00821';

  const today = new Date();
  const fechaExpedicion = today.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });

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
                  { label: 'Código de infracción', value: 'D04 — Cruce de semáforo en luz roja' },
                  { label: 'Placa del vehículo', value: plate, mono: true },
                  { label: 'Propietario', value: ev.runt.propietario },
                  { label: 'Valor de la sanción', value: '15 SMDLV — $548.500 COP' },
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

              {/* Notification note */}
              <div
                className="mt-5 rounded px-4 py-3 text-sm"
                style={{ backgroundColor: '#EFF6FF', color: '#1E40AF', border: '1px solid #BFDBFE' }}
              >
                <strong>Notificación automática:</strong> El ciudadano recibirá una notificación por correo electrónico y SMS en un plazo máximo de 24 horas hábiles desde la expedición del comparendo.
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
                className="
                  px-5 py-3 rounded text-sm font-semibold border
                  flex items-center gap-2 transition-all hover:bg-slate-50
                "
                style={{ color: '#1A3A6B', borderColor: '#C2CEDE' }}
              >
                <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                  <path d="M.5 9.9a.5.5 0 01.5.5v2.5a1 1 0 001 1h12a1 1 0 001-1v-2.5a.5.5 0 011 0v2.5a2 2 0 01-2 2H2a2 2 0 01-2-2v-2.5a.5.5 0 01.5-.5z"/>
                  <path d="M7.646 11.854a.5.5 0 00.708 0l3-3a.5.5 0 00-.708-.708L8.5 10.293V1.5a.5.5 0 00-1 0v8.793L5.354 8.146a.5.5 0 10-.708.708l3 3z"/>
                </svg>
                Imprimir comparendo
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
