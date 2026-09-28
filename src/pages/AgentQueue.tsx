import { useMemo, useState } from 'react';
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
export type EstadoEvento = 'pendiente' | 'generado' | 'notificado' | 'rechazado';

export const TIPOS_INFRACCION = [
  'Semáforo en rojo',
  'Exceso de velocidad',
  'Pico y placa',
  'Cruce sobre cebra',
] as const;
export type TipoInfraccion = (typeof TIPOS_INFRACCION)[number];

export interface TrafficEvent {
  id: string;
  plate: string;
  fecha: string; // dd/mm/yyyy
  hora: string;
  interseccion: string;
  ocr: number;
  tipo: TipoInfraccion;
  estado: EstadoEvento;
  thumb: string;
  panoramica: string;
  zoom: string;
  runt: {
    tipo: string;
    marca: string;
    modelo: string;
    color: string;
    propietario: string;
    cedula: string;
    servicio: string;
    telefono: string;
    email: string;
  };
  semaforo: 'ROJO' | 'AMARILLO' | 'VERDE';
}

const IMG = {
  a: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64',
  b: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c',
  c: 'https://images.unsplash.com/photo-1534430480872-3498386e7856',
  zoom: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=460&h=180&fit=crop&auto=format',
};

function makeEvent(
  base: string,
  e: Omit<TrafficEvent, 'thumb' | 'panoramica' | 'zoom'>,
): TrafficEvent {
  return {
    ...e,
    thumb: `${base}?w=120&h=80&fit=crop&auto=format`,
    panoramica: `${base}?w=900&h=380&fit=crop&auto=format`,
    zoom: IMG.zoom,
  };
}

export const EVENTS: TrafficEvent[] = [
  makeEvent(IMG.a, {
    id: 'EVT-2026-00821', plate: 'OPQ-317', fecha: '17/09/2026', hora: '08:14:33',
    interseccion: 'Cra. 100 con Calle 98 — Semáforo 04', ocr: 98.4,
    tipo: 'Semáforo en rojo', estado: 'pendiente',
    runt: { tipo: 'Automóvil', marca: 'Chevrolet', modelo: 'Sail 2021', color: 'Blanco', propietario: 'Carlos Andrés Molina Pérez', cedula: '79.542.381', servicio: 'Particular', telefono: '+57 310 245 8891', email: 'carlos.molina@correo.com' },
    semaforo: 'ROJO',
  }),
  makeEvent(IMG.b, {
    id: 'EVT-2026-00822', plate: 'FKJ-882', fecha: '17/09/2026', hora: '08:31:07',
    interseccion: 'Autopista Apto–Turbo Km 8 — Semáforo 11', ocr: 95.1,
    tipo: 'Exceso de velocidad', estado: 'pendiente',
    runt: { tipo: 'Camioneta', marca: 'Renault', modelo: 'Duster 2019', color: 'Gris Platino', propietario: 'María Fernanda Ospina Ríos', cedula: '52.889.014', servicio: 'Particular', telefono: '+57 315 778 1204', email: 'mf.ospina@correo.com' },
    semaforo: 'ROJO',
  }),
  makeEvent(IMG.c, {
    id: 'EVT-2026-00823', plate: 'TML-445', fecha: '17/09/2026', hora: '08:47:52',
    interseccion: 'Av. Las Américas con Cra. 75 — Semáforo 07', ocr: 99.2,
    tipo: 'Semáforo en rojo', estado: 'pendiente',
    runt: { tipo: 'Automóvil', marca: 'Toyota', modelo: 'Corolla 2022', color: 'Negro', propietario: 'Jorge Luis Becerra Sandoval', cedula: '80.221.763', servicio: 'Particular', telefono: '+57 300 991 4432', email: 'jl.becerra@correo.com' },
    semaforo: 'ROJO',
  }),
  makeEvent(IMG.a, {
    id: 'EVT-2026-00824', plate: 'RDQ-204', fecha: '17/09/2026', hora: '09:03:18',
    interseccion: 'Calle 100 con Cra. 90 — Semáforo 02', ocr: 87.3,
    tipo: 'Cruce sobre cebra', estado: 'pendiente',
    runt: { tipo: 'Camioneta', marca: 'Hyundai', modelo: 'Tucson 2021', color: 'Plata', propietario: 'Diego Armando Patiño Castro', cedula: '71.338.495', servicio: 'Particular', telefono: '+57 312 004 7765', email: 'd.patino@correo.com' },
    semaforo: 'ROJO',
  }),
  makeEvent(IMG.b, {
    id: 'EVT-2026-00825', plate: 'BXK-218', fecha: '17/09/2026', hora: '09:21:44',
    interseccion: 'Cra. 80 con Calle 95 — Semáforo 15', ocr: 92.8,
    tipo: 'Semáforo en rojo', estado: 'pendiente',
    runt: { tipo: 'Automóvil', marca: 'Mazda', modelo: 'Mazda 3 2023', color: 'Azul Marino', propietario: 'Luisa Carolina Herrera Montoya', cedula: '43.712.256', servicio: 'Particular', telefono: '+57 318 552 0093', email: 'lc.herrera@correo.com' },
    semaforo: 'ROJO',
  }),
  makeEvent(IMG.c, {
    id: 'EVT-2026-00826', plate: 'GHT-701', fecha: '16/09/2026', hora: '14:02:11',
    interseccion: 'Cra. 43A con Calle 10 — Semáforo 22', ocr: 96.7,
    tipo: 'Exceso de velocidad', estado: 'generado',
    runt: { tipo: 'Automóvil', marca: 'Kia', modelo: 'Rio 2020', color: 'Rojo', propietario: 'Andrés Felipe Gómez Ruiz', cedula: '1.020.334.567', servicio: 'Particular', telefono: '+57 301 445 2210', email: 'af.gomez@correo.com' },
    semaforo: 'VERDE',
  }),
  makeEvent(IMG.a, {
    id: 'EVT-2026-00827', plate: 'JKL-556', fecha: '16/09/2026', hora: '17:48:39',
    interseccion: 'Av. El Poblado con Calle 30 — Semáforo 09', ocr: 90.4,
    tipo: 'Semáforo en rojo', estado: 'notificado',
    runt: { tipo: 'Motocicleta', marca: 'Yamaha', modelo: 'FZ 2022', color: 'Azul', propietario: 'Sara Milena Vargas León', cedula: '1.035.998.712', servicio: 'Particular', telefono: '+57 314 220 8890', email: 's.vargas@correo.com' },
    semaforo: 'ROJO',
  }),
  makeEvent(IMG.b, {
    id: 'EVT-2026-00828', plate: 'MNP-093', fecha: '15/09/2026', hora: '07:12:55',
    interseccion: 'Cra. 65 con Calle 44 — Semáforo 31', ocr: 78.9,
    tipo: 'Pico y placa', estado: 'rechazado',
    runt: { tipo: 'Automóvil', marca: 'Nissan', modelo: 'Versa 2018', color: 'Gris', propietario: 'Óscar Iván Restrepo Cano', cedula: '98.554.201', servicio: 'Particular', telefono: '+57 300 118 4432', email: 'oi.restrepo@correo.com' },
    semaforo: 'VERDE',
  }),
  makeEvent(IMG.c, {
    id: 'EVT-2026-00829', plate: 'QRS-410', fecha: '15/09/2026', hora: '11:37:20',
    interseccion: 'Calle 50 con Cra. 70 — Semáforo 18', ocr: 94.3,
    tipo: 'Cruce sobre cebra', estado: 'pendiente',
    runt: { tipo: 'Camioneta', marca: 'Ford', modelo: 'Escape 2021', color: 'Blanco', propietario: 'Paula Andrea Jiménez Toro', cedula: '43.667.109', servicio: 'Particular', telefono: '+57 319 776 5521', email: 'pa.jimenez@correo.com' },
    semaforo: 'ROJO',
  }),
  makeEvent(IMG.a, {
    id: 'EVT-2026-00830', plate: 'TUV-877', fecha: '14/09/2026', hora: '19:04:47',
    interseccion: 'Av. Regional con Calle 33 — Semáforo 05', ocr: 88.1,
    tipo: 'Exceso de velocidad', estado: 'generado',
    runt: { tipo: 'Automóvil', marca: 'Volkswagen', modelo: 'Gol 2019', color: 'Plata', propietario: 'Julián David Marín Ochoa', cedula: '1.017.220.884', servicio: 'Particular', telefono: '+57 312 990 3312', email: 'jd.marin@correo.com' },
    semaforo: 'VERDE',
  }),
  makeEvent(IMG.b, {
    id: 'EVT-2026-00831', plate: 'WXY-235', fecha: '14/09/2026', hora: '06:58:02',
    interseccion: 'Cra. 48 con Calle 12 Sur — Semáforo 27', ocr: 97.6,
    tipo: 'Semáforo en rojo', estado: 'pendiente',
    runt: { tipo: 'Automóvil', marca: 'Chevrolet', modelo: 'Onix 2023', color: 'Negro', propietario: 'Natalia Andrea Cardona Ruiz', cedula: '1.128.445.900', servicio: 'Particular', telefono: '+57 300 552 7781', email: 'na.cardona@correo.com' },
    semaforo: 'ROJO',
  }),
  makeEvent(IMG.c, {
    id: 'EVT-2026-00832', plate: 'ZAB-668', fecha: '13/09/2026', hora: '13:19:36',
    interseccion: 'Av. Guayabal con Calle 8 — Semáforo 14', ocr: 91.0,
    tipo: 'Pico y placa', estado: 'notificado',
    runt: { tipo: 'Camioneta', marca: 'Mitsubishi', modelo: 'Outlander 2020', color: 'Café', propietario: 'Ricardo León Álvarez Mesa', cedula: '70.884.339', servicio: 'Particular', telefono: '+57 318 004 2219', email: 'rl.alvarez@correo.com' },
    semaforo: 'VERDE',
  }),
];

// ─── Estado badge styling ─────────────────────────────────────────────────────
const ESTADO_STYLE: Record<EstadoEvento, { label: string; bg: string; border: string; text: string; dot: string }> = {
  pendiente: { label: 'Pendiente', bg: '#FEF3C7', border: '#FCD34D', text: '#92400E', dot: '#D97706' },
  generado: { label: 'Generado', bg: '#DCFCE7', border: '#86EFAC', text: '#15803D', dot: '#16A34A' },
  notificado: { label: 'Notificado', bg: '#DBEAFE', border: '#93C5FD', text: '#1E40AF', dot: '#2563EB' },
  rechazado: { label: 'Rechazado', bg: '#FEE2E2', border: '#FECACA', text: '#B91C1C', dot: '#DC2626' },
};

const ESTADOS: EstadoEvento[] = ['pendiente', 'generado', 'notificado', 'rechazado'];

// dd/mm/yyyy → yyyy-mm-dd (comparable with <input type="date">)
function toISO(fecha: string): string {
  const [d, m, y] = fecha.split('/');
  return `${y}-${m}-${d}`;
}

const PAGE_SIZES = [5, 10, 25];

// ─── Screen 1.2 — Validation Queue ───────────────────────────────────────────
export default function AgentQueue() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [estado, setEstado] = useState<'todos' | EstadoEvento>('todos');
  const [tipo, setTipo] = useState<'todos' | TipoInfraccion>('todos');
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return EVENTS.filter(ev => {
      if (q) {
        const hay = `${ev.plate} ${ev.id} ${ev.runt.propietario} ${ev.runt.cedula}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (estado !== 'todos' && ev.estado !== estado) return false;
      if (tipo !== 'todos' && ev.tipo !== tipo) return false;
      const iso = toISO(ev.fecha);
      if (desde && iso < desde) return false;
      if (hasta && iso > hasta) return false;
      return true;
    });
  }, [search, estado, tipo, desde, hasta]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  const pendientes = EVENTS.filter(e => e.estado === 'pendiente').length;
  const hasFilters = Boolean(search || estado !== 'todos' || tipo !== 'todos' || desde || hasta);

  // Any filter change returns to page 1 so results stay in view.
  const onFilter = <T,>(setter: (v: T) => void) => (v: T) => { setter(v); setPage(1); };

  function clearFilters() {
    setSearch('');
    setEstado('todos');
    setTipo('todos');
    setDesde('');
    setHasta('');
    setPage(1);
  }

  const selectStyle = { borderColor: '#C2CEDE', color: '#0F1F3D' };

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: '#EDF1F7' }}>
      <AgentHeader />

      <main className="flex-1 overflow-y-auto px-6 md:px-20 py-8">

        {/* Sub-header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="font-semibold text-xl" style={{ color: '#0F1F3D' }}>Eventos de validación</h2>
            <p className="text-sm mt-0.5" style={{ color: '#5A7099' }}>
              17 de septiembre de 2026 · Turno 08:00–16:00 · <span className="font-semibold" style={{ color: '#1A3A6B' }}>{EVENTS.length} eventos</span>
            </p>
          </div>
          <div
            className="flex items-center gap-2 rounded px-3 py-1.5 text-xs font-semibold"
            style={{ backgroundColor: '#FEF3C7', color: '#92400E', border: '1px solid #FCD34D' }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse inline-block" style={{ backgroundColor: '#D97706' }} />
            {pendientes} pendientes
          </div>
        </div>

        {/* Filter bar */}
        <div
          className="bg-white rounded-lg border shadow-sm p-4 mb-4"
          style={{ borderColor: '#C2CEDE' }}
        >
          <div className="flex flex-wrap items-end gap-3">
            {/* Search */}
            <div className="flex-1 min-w-[220px]">
              <label htmlFor="q" className="block text-xs mb-1.5 font-medium" style={{ color: '#5A7099' }}>
                Buscar
              </label>
              <div className="relative">
                <svg viewBox="0 0 16 16" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="#5A7099" strokeWidth="1.5">
                  <circle cx="7" cy="7" r="5" />
                  <path d="M11 11l4 4" strokeLinecap="round" />
                </svg>
                <input
                  id="q"
                  type="text"
                  value={search}
                  onChange={e => onFilter(setSearch)(e.target.value)}
                  placeholder="Placa, comparendo, propietario o cédula…"
                  className="w-full rounded border pl-9 pr-3 py-2 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-200"
                  style={selectStyle}
                />
              </div>
            </div>

            {/* Estado */}
            <div className="min-w-[150px]">
              <label htmlFor="f-estado" className="block text-xs mb-1.5 font-medium" style={{ color: '#5A7099' }}>Estado</label>
              <select
                id="f-estado"
                value={estado}
                onChange={e => onFilter(setEstado)(e.target.value as typeof estado)}
                className="w-full rounded border px-3 py-2 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-200"
                style={selectStyle}
              >
                <option value="todos">Todos</option>
                {ESTADOS.map(s => <option key={s} value={s}>{ESTADO_STYLE[s].label}</option>)}
              </select>
            </div>

            {/* Tipo */}
            <div className="min-w-[180px]">
              <label htmlFor="f-tipo" className="block text-xs mb-1.5 font-medium" style={{ color: '#5A7099' }}>Tipo de infracción</label>
              <select
                id="f-tipo"
                value={tipo}
                onChange={e => onFilter(setTipo)(e.target.value as typeof tipo)}
                className="w-full rounded border px-3 py-2 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-200"
                style={selectStyle}
              >
                <option value="todos">Todos</option>
                {TIPOS_INFRACCION.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Date range */}
            <div>
              <label htmlFor="f-desde" className="block text-xs mb-1.5 font-medium" style={{ color: '#5A7099' }}>Desde</label>
              <input id="f-desde" type="date" value={desde} onChange={e => onFilter(setDesde)(e.target.value)}
                className="rounded border px-3 py-2 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-200" style={selectStyle} />
            </div>
            <div>
              <label htmlFor="f-hasta" className="block text-xs mb-1.5 font-medium" style={{ color: '#5A7099' }}>Hasta</label>
              <input id="f-hasta" type="date" value={hasta} onChange={e => onFilter(setHasta)(e.target.value)}
                className="rounded border px-3 py-2 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-200" style={selectStyle} />
            </div>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="rounded border px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-50"
                style={{ color: '#B91C1C', borderColor: '#FECACA' }}
              >
                Limpiar filtros
              </button>
            )}
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
                {['Foto', 'Placa (OCR)', 'Fecha', 'Hora', 'Tipo', 'Estado', 'Confianza OCR', ''].map(h => (
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
              {pageRows.map((ev, i) => {
                const es = ESTADO_STYLE[ev.estado];
                return (
                  <tr
                    key={ev.id}
                    className="cursor-pointer transition-colors"
                    style={{ borderBottom: i < pageRows.length - 1 ? '1px solid #EDF1F7' : undefined }}
                    onClick={() => navigate(`/agente/evento/${ev.id}`, { state: { event: ev } })}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F8FC')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '')}
                  >
                    {/* Thumb */}
                    <td className="px-5 py-3">
                      <div className="rounded overflow-hidden bg-slate-200 flex-none" style={{ width: 80, height: 52 }}>
                        <img src={ev.thumb} alt="Miniatura" className="w-full h-full object-cover" />
                      </div>
                    </td>

                    {/* Plate */}
                    <td className="px-5 py-3">
                      <span className="font-mono font-bold text-base tracking-widest" style={{ color: '#0F1F3D' }}>{ev.plate}</span>
                      <div className="text-xs mt-0.5" style={{ color: '#5A7099' }}>{ev.id}</div>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-3 text-sm" style={{ color: '#0F1F3D' }}>{ev.fecha}</td>

                    {/* Time */}
                    <td className="px-5 py-3 font-mono text-sm" style={{ color: '#0F1F3D' }}>{ev.hora}</td>

                    {/* Tipo */}
                    <td className="px-5 py-3 text-sm" style={{ color: '#0F1F3D', maxWidth: 160 }}>
                      <span className="leading-snug">{ev.tipo}</span>
                    </td>

                    {/* Estado */}
                    <td className="px-5 py-3">
                      <span
                        className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-semibold"
                        style={{ backgroundColor: es.bg, color: es.text, border: `1px solid ${es.border}` }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: es.dot }} />
                        {es.label}
                      </span>
                    </td>

                    {/* OCR confidence */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ width: 64, backgroundColor: '#EDF1F7' }}>
                          <div className="h-full rounded-full" style={{ width: `${ev.ocr}%`, backgroundColor: ev.ocr >= 95 ? '#15803D' : ev.ocr >= 85 ? '#D97706' : '#DC2626' }} />
                        </div>
                        <span className="font-mono text-sm font-semibold" style={{ color: ev.ocr >= 95 ? '#15803D' : ev.ocr >= 85 ? '#D97706' : '#DC2626' }}>{ev.ocr}%</span>
                      </div>
                    </td>

                    {/* CTA */}
                    <td className="px-5 py-3">
                      <span className="text-sm font-semibold flex items-center gap-1" style={{ color: '#1A3A6B' }}>
                        Revisar
                        <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
                          <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z"/>
                        </svg>
                      </span>
                    </td>
                  </tr>
                );
              })}

              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center">
                    <p className="text-sm font-medium" style={{ color: '#5A7099' }}>
                      No hay eventos que coincidan con los filtros.
                    </p>
                    {hasFilters && (
                      <button onClick={clearFilters} className="mt-2 text-sm font-semibold" style={{ color: '#1A3A6B' }}>
                        Limpiar filtros
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination footer */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t"
            style={{ borderColor: '#EDF1F7', backgroundColor: '#F5F8FC' }}
          >
            <div className="flex items-center gap-2 text-xs" style={{ color: '#5A7099' }}>
              <span>
                {filtered.length === 0 ? 0 : start + 1}–{Math.min(start + pageSize, filtered.length)} de {filtered.length}
              </span>
              <span className="mx-1">·</span>
              <label htmlFor="page-size">Por página</label>
              <select
                id="page-size"
                value={pageSize}
                onChange={e => onFilter(setPageSize)(Number(e.target.value))}
                className="rounded border px-2 py-1 text-xs outline-none"
                style={selectStyle}
              >
                {PAGE_SIZES.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={safePage <= 1}
                className="rounded border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                style={{ color: '#1A3A6B', borderColor: '#C2CEDE' }}
              >
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(n => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className="min-w-[32px] rounded border px-2 py-1.5 text-xs font-semibold transition-colors"
                  style={n === safePage
                    ? { backgroundColor: '#1A3A6B', color: '#fff', borderColor: '#1A3A6B' }
                    : { color: '#1A3A6B', borderColor: '#C2CEDE', backgroundColor: '#fff' }}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={safePage >= totalPages}
                className="rounded border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                style={{ color: '#1A3A6B', borderColor: '#C2CEDE' }}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
