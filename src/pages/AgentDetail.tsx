import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { AgentHeader, EVENTS } from './AgentQueue';
import EvidenceReplay from '../imports/EvidenceReplay';

// ─── Screen 1.3 — Evidence Detail & Validation ────────────────────────────────
export default function AgentDetail() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const ev = (state as any)?.event ?? EVENTS[0];

  const [plate, setPlate] = useState<string>(ev.plate);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejected, setRejected] = useState(false);

  function handleApprove(e: React.FormEvent) {
    e.preventDefault();
    navigate('/agente/confirmacion', {
      state: {
        event: ev,
        plate,
        comparendoNum: 'C-2026-' + ev.id.slice(-5),
      },
    });
  }

  function handleReject(e: React.FormEvent) {
    e.preventDefault();
    setRejected(true);
    setShowRejectModal(false);
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#EDF1F7' }}>
      <AgentHeader title="Detalle de Evidencia" />

      <main className="flex-1 px-20 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: '#5A7099' }}>
          <button
            onClick={() => navigate('/agente/bandeja')}
            className="hover:underline transition-colors"
            style={{ color: '#1A3A6B' }}
          >
            Bandeja de validación
          </button>
          <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor">
            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z" />
          </svg>
          <span>{ev.id}</span>
        </nav>

        {/* Event meta */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="font-semibold text-xl" style={{ color: '#0F1F3D' }}>
              Revisión de infracción semafórica
            </h2>
            <p className="text-sm mt-0.5" style={{ color: '#5A7099' }}>
              {ev.fecha} · {ev.hora} · {ev.interseccion}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wide"
              style={rejected
                ? { backgroundColor: '#FEE2E2', color: '#B91C1C', border: '1px solid #FECACA' }
                : { backgroundColor: '#FEF3C7', color: '#92400E', border: '1px solid #FCD34D' }}
            >
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: rejected ? '#DC2626' : '#D97706' }} />
              {rejected ? 'Invalidada' : 'Pendiente'}
            </span>
          </div>
        </div>

        {rejected && (
          <div role="status" className="mb-5 rounded border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            Evento invalidado correctamente. Motivo registrado: {rejectReason}
          </div>
        )}

        {/* Two-column layout */}
        <form onSubmit={handleApprove}>
          <div className="grid grid-cols-2 gap-6">

            {/* ── Left: Photo evidence ── */}
            <div className="space-y-4">
              <EvidenceReplay />

              {/* Panoramic photo */}
              <div
                className="bg-white rounded-lg border overflow-hidden shadow-sm"
                style={{ borderColor: '#C2CEDE' }}
              >
                <div
                  className="px-5 py-3 border-b text-xs font-semibold uppercase tracking-wider"
                  style={{ backgroundColor: '#F5F8FC', borderColor: '#C2CEDE', color: '#5A7099' }}
                >
                  Fotografía panorámica de la infracción
                </div>
                <div style={{ backgroundColor: '#111827', position: 'relative' }}>
                  <img
                    src={ev.panoramica}
                    alt="Fotografía panorámica"
                    className="w-full object-cover"
                    style={{ height: 280 }}
                  />
                  {/* Overlay meta */}
                  <div
                    className="absolute bottom-0 left-0 right-0 px-4 py-2 flex items-center justify-between"
                    style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
                  >
                    <span className="text-white font-mono text-xs">{ev.fecha} {ev.hora}</span>
                    <span className="text-blue-300 font-mono text-xs">{ev.interseccion.split('—')[1]?.trim()}</span>
                  </div>
                </div>
              </div>

              {/* Plate zoom */}
              <div
                className="bg-white rounded-lg border overflow-hidden shadow-sm"
                style={{ borderColor: '#C2CEDE' }}
              >
                <div
                  className="px-5 py-3 border-b text-xs font-semibold uppercase tracking-wider"
                  style={{ backgroundColor: '#F5F8FC', borderColor: '#C2CEDE', color: '#5A7099' }}
                >
                  Recorte de placa (zoom OCR)
                </div>
                <div style={{ backgroundColor: '#111827', position: 'relative' }}>
                  <img
                    src={ev.zoom}
                    alt="Zoom de placa"
                    className="w-full object-cover"
                    style={{ height: 140 }}
                  />
                  <div
                    className="absolute top-2 right-2 font-mono font-bold text-white rounded px-2 py-0.5 text-xs"
                    style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
                  >
                    Confianza: {ev.ocr}%
                  </div>
                </div>
                {/* OCR bar */}
                <div className="px-5 py-3 flex items-center gap-4">
                  <div
                    className="flex-1 h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: '#EDF1F7' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${ev.ocr}%`,
                        backgroundColor: ev.ocr >= 95 ? '#15803D' : ev.ocr >= 85 ? '#D97706' : '#DC2626',
                      }}
                    />
                  </div>
                  <span
                    className="font-mono text-sm font-bold"
                    style={{ color: ev.ocr >= 95 ? '#15803D' : ev.ocr >= 85 ? '#D97706' : '#DC2626' }}
                  >
                    {ev.ocr}%
                  </span>
                </div>
              </div>

            </div>

            {/* ── Right: Data + action ── */}
            <div className="space-y-4">

              {/* Traffic light status */}
              <div
                className="bg-white rounded-lg border overflow-hidden shadow-sm"
                style={{ borderColor: '#C2CEDE' }}
              >
                <div
                  className="px-5 py-3 border-b text-xs font-semibold uppercase tracking-wider"
                  style={{ backgroundColor: '#F5F8FC', borderColor: '#C2CEDE', color: '#5A7099' }}
                >
                  Estado del semáforo al momento del cruce
                </div>
                <div className="px-5 py-4 flex items-center gap-4">
                  {/* Mini traffic light */}
                  <div
                    className="rounded-lg p-2.5 flex flex-col items-center gap-1.5"
                    style={{ backgroundColor: '#1a1a1a', width: 36 }}
                  >
                    {(['ROJO', 'AMARILLO', 'VERDE'] as const).map(color => (
                      <div
                        key={color}
                        className="rounded-full"
                        style={{
                          width: 18, height: 18,
                          backgroundColor:
                            ev.semaforo === color
                              ? color === 'ROJO' ? '#EF4444'
                                : color === 'AMARILLO' ? '#F59E0B'
                                  : '#22C55E'
                              : '#374151',
                          boxShadow: ev.semaforo === color
                            ? color === 'ROJO' ? '0 0 10px 3px rgba(239,68,68,0.5)'
                              : color === 'AMARILLO' ? '0 0 10px 3px rgba(245,158,11,0.5)'
                                : '0 0 10px 3px rgba(34,197,94,0.5)'
                            : undefined,
                        }}
                      />
                    ))}
                  </div>
                  <div>
                    <div
                      className="inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm font-bold uppercase tracking-wide"
                      style={{
                        backgroundColor: '#FEE2E2',
                        color: '#B91C1C',
                        border: '1.5px solid #FECACA',
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full inline-block"
                        style={{ backgroundColor: '#EF4444' }}
                      />
                      {ev.semaforo}
                    </div>
                    <p className="text-xs mt-1.5" style={{ color: '#5A7099' }}>
                      Cruce con semáforo en rojo confirmado por sensor
                    </p>
                  </div>
                </div>
              </div>

              {/* RUNT data */}
              <div
                className="bg-white rounded-lg border overflow-hidden shadow-sm"
                style={{ borderColor: '#C2CEDE' }}
              >
                <div
                  className="px-5 py-3 border-b text-xs font-semibold uppercase tracking-wider"
                  style={{ backgroundColor: '#F5F8FC', borderColor: '#C2CEDE', color: '#5A7099' }}
                >
                  Datos consultados al RUNT
                </div>
                <div className="px-5 py-4">
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {[
                      { label: 'Propietario', value: ev.runt.propietario },
                      { label: 'Cédula', value: ev.runt.cedula },
                      { label: 'Tipo de vehículo', value: ev.runt.tipo },
                      { label: 'Marca', value: ev.runt.marca },
                      { label: 'Modelo', value: ev.runt.modelo },
                      { label: 'Color', value: ev.runt.color },
                      { label: 'Servicio', value: ev.runt.servicio },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <dt className="text-xs" style={{ color: '#5A7099' }}>{label}</dt>
                        <dd className="font-semibold text-sm mt-0.5" style={{ color: '#0F1F3D' }}>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              {/* Plate confirmation field */}
              <div
                className="bg-white rounded-lg border overflow-hidden shadow-sm"
                style={{ borderColor: '#C2CEDE' }}
              >
                <div
                  className="px-5 py-3 border-b text-xs font-semibold uppercase tracking-wider"
                  style={{ backgroundColor: '#F5F8FC', borderColor: '#C2CEDE', color: '#5A7099' }}
                >
                  Confirmación de placa
                </div>
                <div className="px-5 py-4">
                  <label
                    htmlFor="plate"
                    className="block text-xs mb-2"
                    style={{ color: '#5A7099' }}
                  >
                    Verifique o corrija la placa detectada por OCR
                  </label>
                  <input
                    id="plate"
                    type="text"
                    value={plate}
                    onChange={e => setPlate(e.target.value.toUpperCase())}
                    maxLength={8}
                    required
                    className="
                      w-full font-mono font-bold text-2xl tracking-[0.4em] text-center
                      rounded border px-4 py-3 outline-none transition-all
                      focus:ring-2 focus:ring-blue-300
                    "
                    style={{
                      borderColor: '#C2CEDE',
                      color: '#0F1F3D',
                      letterSpacing: '0.4em',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#1A3A6B')}
                    onBlur={e => (e.target.style.borderColor = '#C2CEDE')}
                  />
                </div>
              </div>

              {/* Approve button */}
              <button
                type="submit"
                disabled={rejected}
                className="
                  w-full py-4 rounded-lg text-white font-semibold text-base
                  flex items-center justify-center gap-3
                  transition-all hover:-translate-y-px hover:shadow-lg
                  active:translate-y-0 focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:outline-none
                "
                style={{ backgroundColor: '#15803D' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#166534')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#15803D')}
              >
                <svg viewBox="0 0 20 20" className="w-5 h-5" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Aprobar y generar comparendo
              </button>
              <button
                type="button"
                onClick={() => setShowRejectModal(true)}
                disabled={rejected}
                className="w-full rounded-lg border border-red-300 bg-white py-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Invalidar / rechazar evento
              </button>
            </div>
          </div>
        </form>
      </main>

      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="presentation">
          <form onSubmit={handleReject} className="w-full max-w-md overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="reject-title">
            <div className="bg-red-700 px-6 py-4">
              <h2 id="reject-title" className="text-base font-semibold text-white">Confirmar invalidación</h2>
              <p className="mt-1 text-sm text-red-100">El evento {ev.id} se marcará como inválido.</p>
            </div>
            <div className="space-y-2 px-6 py-5">
              <label htmlFor="reject-reason" className="block text-sm font-medium text-slate-700">Motivo de rechazo <span className="text-red-600">*</span></label>
              <textarea
                id="reject-reason"
                value={rejectReason}
                onChange={event => setRejectReason(event.target.value)}
                required
                minLength={5}
                rows={4}
                placeholder="Indique por qué la evidencia no permite validar la infracción."
                className="w-full resize-y rounded border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button type="button" onClick={() => setShowRejectModal(false)} className="rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">Cancelar</button>
              <button type="submit" disabled={rejectReason.trim().length < 5} className="rounded bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50">Confirmar rechazo</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
