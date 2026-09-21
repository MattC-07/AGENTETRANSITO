import { useNavigate } from 'react-router';

// ─── Shared agent header ──────────────────────────────────────────────────────
export function AgentHeader({ title = 'Bandeja de Validación' }: { title?: string }) {
  const navigate = useNavigate();
  return (
    <header
      style={{ height: 64, backgroundColor: '#0D2247' }}
      className="flex-none flex items-center justify-between px-20 border-b border-white/10"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div
            style={{ width: 32, height: 32, backgroundColor: '#2558A8' }}
            className="rounded flex items-center justify-center flex-none"
          >
            <svg viewBox="0 0 20 20" className="w-4 h-4 text-white" fill="currentColor">
              <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4zm0 2a4 4 0 100 8 4 4 0 000-8zm0 2a2 2 0 110 4 2 2 0 010-4z"/>
            </svg>
          </div>
          <div>
            <span className="text-white font-bold text-base tracking-wide leading-none">SIFCA</span>
            <div className="text-blue-300 text-xs leading-none mt-0.5">Panel de Agente</div>
          </div>
        </div>

        <div className="h-5 w-px" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />

        <span className="text-white/70 text-sm">{title}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="text-right">
          <div className="text-white text-sm font-semibold leading-none">Ricardo Suárez</div>
          <div className="text-blue-300 text-xs mt-0.5">Agente validador · ID 7743</div>
        </div>
        <button
          onClick={() => navigate('/agente')}
          className="
            flex items-center gap-2 text-xs font-medium text-white/70 hover:text-white
            border border-white/20 hover:border-white/40 rounded px-3 py-1.5
            transition-all
          "
        >
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
            <path fillRule="evenodd" d="M10 12.5a.5.5 0 01-.5.5h-8a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v2a.5.5 0 001 0v-2A1.5 1.5 0 009.5 2h-8A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h8a1.5 1.5 0 001.5-1.5v-2a.5.5 0 00-1 0v2z"/>
            <path d="M15.854 8.354a.5.5 0 000-.708l-3-3a.5.5 0 00-.708.708L14.293 7.5H5.5a.5.5 0 000 1h8.793l-2.147 2.146a.5.5 0 00.708.708l3-3z"/>
          </svg>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

// ─── Event data ───────────────────────────────────────────────────────────────
export const EVENTS = [
  {
    id: 'EVT-2026-00821',
    plate: 'OPQ-317',
    fecha: '17/09/2026',
    hora: '08:14:33',
    interseccion: 'Cra. 100 con Calle 98 — Semáforo 04',
    ocr: 98.4,
    thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=80&fit=crop&auto=format',
    panoramica: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=380&fit=crop&auto=format',
    zoom: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=460&h=180&fit=crop&auto=format',
    runt: {
      tipo: 'Automóvil',
      marca: 'Chevrolet',
      modelo: 'Sail 2021',
      color: 'Blanco',
      propietario: 'Carlos Andrés Molina Pérez',
      cedula: '79.542.381',
      servicio: 'Particular',
    },
    semaforo: 'ROJO' as const,
  },
  {
    id: 'EVT-2026-00822',
    plate: 'FKJ-882',
    fecha: '17/09/2026',
    hora: '08:31:07',
    interseccion: 'Autopista Apto–Turbo Km 8 — Semáforo 11',
    ocr: 95.1,
    thumb: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=120&h=80&fit=crop&auto=format',
    panoramica: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=900&h=380&fit=crop&auto=format',
    zoom: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=460&h=180&fit=crop&auto=format',
    runt: {
      tipo: 'Camioneta',
      marca: 'Renault',
      modelo: 'Duster 2019',
      color: 'Gris Platino',
      propietario: 'María Fernanda Ospina Ríos',
      cedula: '52.889.014',
      servicio: 'Particular',
    },
    semaforo: 'ROJO' as const,
  },
  {
    id: 'EVT-2026-00823',
    plate: 'TML-445',
    fecha: '17/09/2026',
    hora: '08:47:52',
    interseccion: 'Av. Las Américas con Cra. 75 — Semáforo 07',
    ocr: 99.2,
    thumb: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=120&h=80&fit=crop&auto=format',
    panoramica: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=900&h=380&fit=crop&auto=format',
    zoom: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=460&h=180&fit=crop&auto=format',
    runt: {
      tipo: 'Automóvil',
      marca: 'Toyota',
      modelo: 'Corolla 2022',
      color: 'Negro',
      propietario: 'Jorge Luis Becerra Sandoval',
      cedula: '80.221.763',
      servicio: 'Particular',
    },
    semaforo: 'ROJO' as const,
  },
  {
    id: 'EVT-2026-00824',
    plate: 'RDQ-204',
    fecha: '17/09/2026',
    hora: '09:03:18',
    interseccion: 'Calle 100 con Cra. 90 — Semáforo 02',
    ocr: 87.3,
    thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=80&fit=crop&auto=format',
    panoramica: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=380&fit=crop&auto=format',
    zoom: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=460&h=180&fit=crop&auto=format',
    runt: {
      tipo: 'Camioneta',
      marca: 'Hyundai',
      modelo: 'Tucson 2021',
      color: 'Plata',
      propietario: 'Diego Armando Patiño Castro',
      cedula: '71.338.495',
      servicio: 'Particular',
    },
    semaforo: 'ROJO' as const,
  },
  {
    id: 'EVT-2026-00825',
    plate: 'BXK-218',
    fecha: '17/09/2026',
    hora: '09:21:44',
    interseccion: 'Cra. 80 con Calle 95 — Semáforo 15',
    ocr: 92.8,
    thumb: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=120&h=80&fit=crop&auto=format',
    panoramica: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=900&h=380&fit=crop&auto=format',
    zoom: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=460&h=180&fit=crop&auto=format',
    runt: {
      tipo: 'Automóvil',
      marca: 'Mazda',
      modelo: 'Mazda 3 2023',
      color: 'Azul Marino',
      propietario: 'Luisa Carolina Herrera Montoya',
      cedula: '43.712.256',
      servicio: 'Particular',
    },
    semaforo: 'ROJO' as const,
  },
];

// ─── Screen 1.2 — Validation Queue ───────────────────────────────────────────
export default function AgentQueue() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: '#EDF1F7' }}>
      <AgentHeader />

      <main className="flex-1 overflow-y-auto px-20 py-8">

        {/* Sub-header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-semibold text-xl" style={{ color: '#0F1F3D' }}>Eventos pendientes de validación</h2>
            <p className="text-sm mt-0.5" style={{ color: '#5A7099' }}>
              17 de septiembre de 2026 · Turno 08:00–16:00 · <span className="font-semibold" style={{ color: '#1A3A6B' }}>{EVENTS.length} eventos</span>
            </p>
          </div>
          <div
            className="flex items-center gap-2 rounded px-3 py-1.5 text-xs font-semibold"
            style={{ backgroundColor: '#FEF3C7', color: '#92400E', border: '1px solid #FCD34D' }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse inline-block" style={{ backgroundColor: '#D97706' }} />
            {EVENTS.length} pendientes
          </div>
        </div>

        {/* Table */}
        <div
          className="bg-white rounded-lg border overflow-hidden shadow-sm"
          style={{ borderColor: '#C2CEDE' }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#F5F8FC', borderBottom: '1px solid #C2CEDE' }}>
                {['Foto', 'Placa (OCR)', 'Fecha', 'Hora', 'Intersección', 'Confianza OCR', ''].map(h => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#5A7099' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EVENTS.map((ev, i) => (
                <tr
                  key={ev.id}
                  className="cursor-pointer transition-colors"
                  style={{ borderBottom: i < EVENTS.length - 1 ? '1px solid #EDF1F7' : undefined }}
                  onClick={() => navigate(`/agente/evento/${ev.id}`, { state: { event: ev } })}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F8FC')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '')}
                >
                  {/* Thumb */}
                  <td className="px-5 py-3">
                    <div
                      className="rounded overflow-hidden bg-slate-200 flex-none"
                      style={{ width: 80, height: 52 }}
                    >
                      <img
                        src={ev.thumb}
                        alt="Miniatura"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>

                  {/* Plate */}
                  <td className="px-5 py-3">
                    <span
                      className="font-mono font-bold text-base tracking-widest"
                      style={{ color: '#0F1F3D' }}
                    >
                      {ev.plate}
                    </span>
                    <div className="text-xs mt-0.5" style={{ color: '#5A7099' }}>{ev.id}</div>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-3 text-sm" style={{ color: '#0F1F3D' }}>{ev.fecha}</td>

                  {/* Time */}
                  <td className="px-5 py-3 font-mono text-sm" style={{ color: '#0F1F3D' }}>{ev.hora}</td>

                  {/* Location */}
                  <td className="px-5 py-3" style={{ color: '#0F1F3D', maxWidth: 220 }}>
                    <span className="text-sm leading-snug line-clamp-2">{ev.interseccion}</span>
                  </td>

                  {/* OCR confidence */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-1.5 rounded-full overflow-hidden"
                        style={{ width: 64, backgroundColor: '#EDF1F7' }}
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
                        className="font-mono text-sm font-semibold"
                        style={{ color: ev.ocr >= 95 ? '#15803D' : ev.ocr >= 85 ? '#D97706' : '#DC2626' }}
                      >
                        {ev.ocr}%
                      </span>
                    </div>
                  </td>

                  {/* CTA */}
                  <td className="px-5 py-3">
                    <span
                      className="text-sm font-semibold flex items-center gap-1"
                      style={{ color: '#1A3A6B' }}
                    >
                      Revisar
                      <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z"/>
                      </svg>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
