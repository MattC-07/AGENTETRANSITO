import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { SifcaHeader } from './Home';

// ─── Screen 2.3 — Citizen Query Result ───────────────────────────────────────
export default function CitizenResult() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const plate = (state as any)?.plate ?? 'OPQ-317';

  const [showHiRes, setShowHiRes] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const comparendo = {
    numero: 'C-2026-00821',
    codigoInfraccion: 'D04',
    descripcion: 'Cruce de intersección en semáforo en luz roja',
    fecha: '17 de septiembre de 2026',
    hora: '08:14:33',
    interseccion: 'Cra. 100 con Calle 98 — Apartadó, Antioquia',
    placa: plate,
    propietario: 'Carlos Andrés Molina Pérez',
    valorSmdlv: '15 SMDLV',
    valorCop: '$548.500 COP',
    vencimiento: '17 de noviembre de 2026',
    estado: 'APROBADO',
    thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=320&h=180&fit=crop&auto=format',
    hiRes: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop&auto=format',
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#EDF1F7' }}>
      <SifcaHeader />

      <main className="flex-1 px-20 py-10 max-w-4xl mx-auto w-full">

        {/* Page title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-bold text-2xl tracking-tight" style={{ color: '#0F1F3D' }}>
              Resultado de la consulta
            </h1>
            <span
              className="inline-flex items-center gap-1.5 rounded px-3 py-1 text-xs font-bold uppercase tracking-wide"
              style={{ backgroundColor: '#DCFCE7', color: '#15803D', border: '1.5px solid #86EFAC' }}
            >
              <svg viewBox="0 0 12 12" className="w-3 h-3" fill="currentColor">
                <path fillRule="evenodd" d="M10.03 2.97a.75.75 0 010 1.06L5 9.06 1.97 6.03a.75.75 0 011.06-1.06L5 6.94l4.97-4.97a.75.75 0 011.06 0z" clipRule="evenodd"/>
              </svg>
              {comparendo.estado}
            </span>
          </div>
          <p className="text-sm" style={{ color: '#5A7099' }}>
            Placa consultada: <span className="font-mono font-semibold" style={{ color: '#0F1F3D' }}>{plate}</span>
          </p>
        </div>

        {/* Main comparendo card */}
        <div
          className="bg-white rounded-lg border overflow-hidden shadow-sm"
          style={{ borderColor: '#C2CEDE' }}
        >
          {/* Card header */}
          <div
            className="px-6 py-4 flex items-center justify-between border-b"
            style={{ backgroundColor: '#0D2247', borderColor: '#1A3A6B' }}
          >
            <div>
              <div className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-0.5">
                Número de comparendo
              </div>
              <div className="text-white font-bold text-xl font-mono tracking-wide">
                {comparendo.numero}
              </div>
            </div>
            <div className="text-right">
              <div className="text-blue-300 text-xs mb-0.5">Expedido por</div>
              <div className="text-white text-sm font-medium">
                Secretaría de Movilidad · Apartadó
              </div>
            </div>
          </div>

          {/* Body: two columns */}
          <div className="grid grid-cols-2 divide-x" style={{ borderColor: '#EDF1F7' }}>

            {/* Left: details */}
            <div className="px-6 py-5">
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#5A7099' }}>
                Datos de la infracción
              </h3>
              <dl className="space-y-3.5">
                {[
                  { label: 'Código de infracción', value: `${comparendo.codigoInfraccion} — ${comparendo.descripcion}` },
                  { label: 'Fecha y hora', value: `${comparendo.fecha} · ${comparendo.hora}` },
                  { label: 'Intersección', value: comparendo.interseccion },
                  { label: 'Placa del vehículo', value: comparendo.placa, mono: true },
                  { label: 'Propietario registrado', value: comparendo.propietario },
                ].map(({ label, value, mono }) => (
                  <div key={label}>
                    <dt className="text-xs" style={{ color: '#5A7099' }}>{label}</dt>
                    <dd
                      className={`text-sm font-semibold mt-0.5 ${mono ? 'font-mono tracking-widest' : ''}`}
                      style={{ color: '#0F1F3D' }}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Sanction value */}
              <div
                className="mt-5 rounded-lg px-5 py-4"
                style={{ backgroundColor: '#FEF3C7', border: '1px solid #FCD34D' }}
              >
                <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#92400E' }}>
                  Valor de la sanción
                </div>
                <div className="font-bold text-2xl font-mono" style={{ color: '#78350F' }}>
                  {comparendo.valorCop}
                </div>
                <div className="text-xs mt-1" style={{ color: '#92400E' }}>
                  {comparendo.valorSmdlv} · Vencimiento del descuento: {comparendo.vencimiento}
                </div>
              </div>
            </div>

            {/* Right: photo + action */}
            <div className="px-6 py-5 flex flex-col">
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#5A7099' }}>
                Fotografía de la evidencia
              </h3>

              {/* Thumbnail */}
              <div
                className="relative rounded-lg overflow-hidden mb-2"
                style={{ backgroundColor: '#111827' }}
              >
                <img
                  src={comparendo.thumb}
                  alt="Evidencia fotográfica"
                  className="w-full object-cover"
                  style={{ height: 180 }}
                />
                <button
                  onClick={() => setShowHiRes(true)}
                  className="
                    absolute bottom-2 right-2 rounded px-2.5 py-1 text-xs font-semibold
                    flex items-center gap-1.5 transition-all hover:opacity-90
                  "
                  style={{ backgroundColor: 'rgba(0,0,0,0.75)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor">
                    <path d="M1.5 1h5a.5.5 0 010 1H2v4.5a.5.5 0 01-1 0v-5A.5.5 0 011.5 1zm10 0h3a.5.5 0 01.5.5v5a.5.5 0 01-1 0V2h-2.5a.5.5 0 010-1zM.5 15h5a.5.5 0 010-1H1v-4.5a.5.5 0 00-1 0v5a.5.5 0 00.5.5zm15 0h-5a.5.5 0 010-1H15v-4.5a.5.5 0 011 0v5a.5.5 0 01-.5.5z"/>
                  </svg>
                  Ver en alta resolución
                </button>
              </div>
              <p className="text-xs mb-6" style={{ color: '#5A7099' }}>
                Fotografía capturada por Cámara 04 · Sistema SIFCA · Certificada digitalmente.
              </p>

              {/* Download */}
              <div className="mt-auto">
                <button
                  onClick={() => setDownloaded(true)}
                  className="
                    w-full py-3.5 rounded text-sm font-semibold
                    flex items-center justify-center gap-2.5
                    transition-all hover:-translate-y-px hover:shadow-md active:translate-y-0
                    focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none
                  "
                  style={{
                    backgroundColor: downloaded ? '#15803D' : '#1A3A6B',
                    color: '#fff',
                  }}
                  onMouseEnter={e => !downloaded && (e.currentTarget.style.backgroundColor = '#0D2247')}
                  onMouseLeave={e => !downloaded && (e.currentTarget.style.backgroundColor = '#1A3A6B')}
                >
                  {downloaded ? (
                    <>
                      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Documento descargado
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                        <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z"/>
                        <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z"/>
                      </svg>
                      Descargar PDF del comparendo
                    </>
                  )}
                </button>
                {downloaded && (
                  <p className="text-xs text-center mt-2" style={{ color: '#15803D' }}>
                    El PDF incluye el código de barras para pago en bancos autorizados.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="px-6 py-3 border-t flex items-center justify-between"
            style={{ borderColor: '#C2CEDE', backgroundColor: '#F5F8FC' }}
          >
            <p className="text-xs" style={{ color: '#5A7099' }}>
              ¿Desea impugnar este comparendo? Tiene 30 días hábiles desde la fecha de expedición.{' '}
              <button className="underline" style={{ color: '#1A3A6B' }}>Ver proceso de impugnación.</button>
            </p>
            <button
              onClick={() => navigate('/ciudadano')}
              className="text-xs font-medium transition-colors"
              style={{ color: '#5A7099' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#1A3A6B')}
              onMouseLeave={e => (e.currentTarget.style.color = '#5A7099')}
            >
              ← Nueva consulta
            </button>
          </div>
        </div>
      </main>

      {/* Hi-res lightbox */}
      {showHiRes && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-8"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
          onClick={() => setShowHiRes(false)}
        >
          <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setShowHiRes(false)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm flex items-center gap-1.5"
            >
              Cerrar
              <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z"/>
              </svg>
            </button>
            <img
              src={comparendo.hiRes}
              alt="Evidencia en alta resolución"
              className="w-full rounded-lg"
              style={{ maxHeight: '75vh', objectFit: 'cover' }}
            />
            <p
              className="text-xs text-center mt-2"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Fotografía certificada · SIFCA · {comparendo.numero}
            </p>
          </div>
        </div>
      )}

      <footer
        className="py-4 text-center text-xs border-t"
        style={{ color: '#5A7099', borderColor: '#C2CEDE', backgroundColor: '#EDF1F7' }}
      >
        © 2026 SIFCA — Secretaría de Movilidad · Municipio de Apartadó, Antioquia
      </footer>
    </div>
  );
}
