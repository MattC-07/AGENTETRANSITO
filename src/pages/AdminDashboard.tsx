import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { getAdminSession, logoutAdmin, type AdminSession } from '../adminAuth';

// ─── Admin header (mismo estilo institucional que AgentHeader) ────────────────
function AdminHeader({ session, date, onLogout }: { session: AdminSession; date: string; onLogout: () => void }) {
  return (
    <header
      style={{ height: 64, backgroundColor: '#0D2247' }}
      className="flex-none flex items-center justify-between gap-3 px-4 sm:px-8 2xl:px-20 border-b border-white/10"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex items-center gap-2 flex-none">
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
            <div className="text-blue-300 text-xs leading-none mt-0.5">Panel Administrativo</div>
          </div>
        </div>

        <div className="hidden md:block h-5 w-px" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />

        <span className="hidden md:inline text-white/70 text-sm whitespace-nowrap">Resumen general</span>
        <span className="hidden lg:inline text-white/50 text-xs font-mono">{date}</span>
      </div>

      <div className="flex items-center gap-5 flex-none">
        <div className="hidden sm:block text-right">
          <div className="text-white text-sm font-semibold leading-none">{session.name}</div>
          <div className="text-blue-300 text-xs mt-0.5">{session.role}</div>
        </div>
        <button
          onClick={onLogout}
          className="
            flex items-center gap-2 text-xs font-medium text-white/70 hover:text-white
            border border-white/20 hover:border-white/40 rounded px-3 py-1.5
            transition-all whitespace-nowrap
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

// ─── Datos de demostración ────────────────────────────────────────────────────
// TODO: reemplazar por datos reales cuando existan los endpoints del backend.

const KPIS = [
  { label: 'Eventos detectados hoy', value: '108', note: '+12% vs. ayer', color: '#1A3A6B' },
  { label: 'Pendientes de validación', value: '37', note: '5 con más de 24 h', color: '#D97706' },
  { label: 'Comparendos emitidos hoy', value: '47', note: 'Tasa de aprobación 66%', color: '#15803D' },
  { label: 'Eventos descartados', value: '24', note: 'Principal causa: foto ilegible', color: '#DC2626' },
];

const INDICADORES = [
  { label: 'Promedio diario', value: '42,3' },
  { label: 'Comparendos al mes', value: '1.284' },
  { label: 'Semáforos activos', value: '4 / 5' },
  { label: 'Tiempo medio de validación', value: '3m 12s' },
];

const SEMAFOROS = [
  { id: 'Semáforo 04', lugar: 'Cra. 100 con Calle 98', estado: 'operativa', count: 187 },
  { id: 'Semáforo 11', lugar: 'Autopista Apto–Turbo Km 8', estado: 'operativa', count: 96 },
  { id: 'Semáforo 07', lugar: 'Av. Las Américas con Cra. 75', estado: 'mantenimiento', count: 143 },
  { id: 'Semáforo 02', lugar: 'Calle 100 con Cra. 90', estado: 'operativa', count: 58 },
  { id: 'Semáforo 15', lugar: 'Cra. 80 con Calle 95', estado: 'sin-conexion', count: 71 },
] as const;

const CAMERA_STATUS = {
  'operativa':     { label: 'Operativa',     bg: '#DCFCE7', fg: '#166534', dot: '#15803D' },
  'mantenimiento': { label: 'Mantenimiento', bg: '#FEF3C7', fg: '#92400E', dot: '#D97706' },
  'sin-conexion':  { label: 'Sin conexión',  bg: '#FEE2E2', fg: '#B91C1C', dot: '#DC2626' },
};

const WEEKLY = [
  { day: 'Lun', count: 38 },
  { day: 'Mar', count: 45 },
  { day: 'Mié', count: 41 },
  { day: 'Jue', count: 52 },
  { day: 'Vie', count: 61 },
  { day: 'Sáb', count: 34 },
  { day: 'Dom', count: 22 },
];

const HEATMAP_DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const HEATMAP_HOURS = ['06h', '08h', '10h', '12h', '14h', '16h', '18h', '20h'];
const HEATMAP_DATA: number[][] = [
  [4, 12, 9, 14, 10, 18, 22, 7],
  [5, 15, 11, 13, 9, 20, 25, 8],
  [3, 10, 8, 12, 11, 19, 21, 6],
  [6, 14, 10, 15, 13, 22, 27, 9],
  [7, 17, 13, 16, 14, 26, 31, 12],
  [9, 8, 6, 7, 12, 24, 20, 15],
  [2, 4, 3, 5, 6, 10, 13, 5],
];
const HEATMAP_MAX = Math.max(...HEATMAP_DATA.flat());

const FINANZAS = {
  mes: 284_500_000,
  semestral: 1_612_300_000,
};

const GENERADAS_VS_PAGADAS = [
  { mes: 'Abr', generadas: 980, pagadas: 610 },
  { mes: 'May', generadas: 1050, pagadas: 705 },
  { mes: 'Jun', generadas: 1120, pagadas: 780 },
  { mes: 'Jul', generadas: 1210, pagadas: 845 },
  { mes: 'Ago', generadas: 1180, pagadas: 902 },
  { mes: 'Sep', generadas: 1284, pagadas: 968 },
];

const AGENTS = [
  { name: 'Ricardo Suárez', id: '7743', turno: '08:00–16:00', hoy: 42, pct: 96.4, total: 312, activo: true },
  { name: 'Diana Cárdenas', id: '5518', turno: '08:00–16:00', hoy: 38, pct: 93.1, total: 287, activo: true },
  { name: 'Andrés Molano', id: '6602', turno: '14:00–22:00', hoy: 19, pct: 89.7, total: 264, activo: true },
  { name: 'Laura Jiménez', id: '8134', turno: '06:00–14:00', hoy: 12, pct: 84.2, total: 198, activo: false },
  { name: 'Felipe Rengifo', id: '4491', turno: '22:00–06:00', hoy: 0, pct: 78.5, total: 176, activo: false },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatCOP = (value: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);

// Rampa secuencial con la paleta SIFCA, de claro a oscuro
const HEAT_STEPS = ['#EDF1F7', '#D6E3F7', '#B3CBEE', '#8AAEE0', '#5F8CCC', '#2558A8', '#1A3A6B', '#0D2247'];
function heatIndex(value: number) {
  const ratio = HEATMAP_MAX > 0 ? value / HEATMAP_MAX : 0;
  return Math.min(HEAT_STEPS.length - 1, Math.floor(ratio * HEAT_STEPS.length));
}

// ─── Bloques ──────────────────────────────────────────────────────────────────

function Panel({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`${className} min-w-0 flex flex-col bg-white rounded-lg border shadow-sm overflow-hidden`}
      style={{ borderColor: '#C2CEDE' }}
    >
      <div className="px-5 py-3 border-b" style={{ backgroundColor: '#F5F8FC', borderColor: '#C2CEDE' }}>
        <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#5A7099' }}>{title}</h3>
      </div>
      <div className="flex-1 p-5 space-y-6">{children}</div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#92A5BF' }}>
      {children}
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border px-3 py-2.5" style={{ backgroundColor: '#F5F8FC', borderColor: '#C2CEDE' }}>
      <div className="text-[11px] leading-tight" style={{ color: '#5A7099' }}>{label}</div>
      <div className="text-lg sm:text-xl font-bold font-mono mt-0.5 break-words" style={{ color: '#0F1F3D' }}>{value}</div>
    </div>
  );
}

// ─── Columna 1: Resumen del día ───────────────────────────────────────────────

function ResumenPanel() {
  return (
    <Panel title="Resumen del día">
      <div>
        <SubHeading>Indicadores</SubHeading>
        <div className="grid grid-cols-2 gap-2">
          {INDICADORES.map(i => <StatTile key={i.label} label={i.label} value={i.value} />)}
        </div>
      </div>

      <div>
        <SubHeading>Info por semáforo</SubHeading>
        <ul className="space-y-1.5">
          {SEMAFOROS.map(s => {
            const st = CAMERA_STATUS[s.estado];
            return (
              <li
                key={s.id}
                className="flex items-center justify-between gap-2 px-3 py-2 rounded border"
                style={{ borderColor: '#EDF1F7' }}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full flex-none" style={{ backgroundColor: st.dot }} title={st.label} />
                    <span className="text-sm truncate" style={{ color: '#0F1F3D' }}>{s.lugar}</span>
                  </div>
                  <div className="text-[11px] ml-4" style={{ color: '#5A7099' }}>{s.id} · {st.label}</div>
                </div>
                <span className="font-mono text-sm font-semibold flex-none" style={{ color: '#0F1F3D' }}>{s.count}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </Panel>
  );
}

// ─── Columna 2: Gráficos ──────────────────────────────────────────────────────

function WeeklyBarChart() {
  const max = Math.max(...WEEKLY.map(d => d.count));
  return (
    <div>
      <SubHeading>Comparendos — últimos 7 días</SubHeading>
      <div className="flex items-end gap-1.5 sm:gap-2.5 h-32 px-1">
        {WEEKLY.map(d => (
          <div key={d.day} className="flex-1 flex flex-col items-center justify-end h-full group">
            <span className="text-[11px] font-mono font-semibold mb-1" style={{ color: '#1A3A6B' }}>{d.count}</span>
            <div
              className="w-full max-w-[22px] rounded-t transition-colors"
              style={{ height: `${Math.max(4, (d.count / max) * 100)}%`, backgroundColor: '#2558A8' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1A3A6B')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2558A8')}
            />
            <span className="text-[11px] mt-1.5" style={{ color: '#5A7099' }}>{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Heatmap() {
  return (
    <div>
      <SubHeading>Puntos de calor — infracciones por día / hora</SubHeading>
      <div
        className="grid gap-[3px] max-w-sm"
        style={{ gridTemplateColumns: `2rem repeat(${HEATMAP_HOURS.length}, minmax(0, 1fr))` }}
      >
        <span />
        {HEATMAP_HOURS.map(h => (
          <span key={h} className="text-[10px] text-center pb-1" style={{ color: '#5A7099' }}>{h}</span>
        ))}
        {HEATMAP_DAYS.map((day, r) => [
          <span key={day} className="text-[11px] pr-1 text-right self-center" style={{ color: '#5A7099' }}>{day}</span>,
          ...HEATMAP_DATA[r].map((v, c) => {
            const idx = heatIndex(v);
            return (
              <div
                key={`${day}-${c}`}
                title={`${day} ${HEATMAP_HOURS[c]} — ${v} infracciones`}
                className="aspect-square rounded flex items-center justify-center text-[10px] font-mono font-semibold transition-transform hover:scale-110 cursor-default"
                style={{ backgroundColor: HEAT_STEPS[idx], color: idx >= 5 ? '#fff' : '#1A3A6B' }}
              >
                {v}
              </div>
            );
          }),
        ])}
      </div>
      <div className="flex flex-wrap items-center gap-1.5 mt-3">
        <span className="text-[10px]" style={{ color: '#5A7099' }}>Menos</span>
        {HEAT_STEPS.map(s => (
          <span key={s} className="w-4 h-4 rounded-sm" style={{ backgroundColor: s }} />
        ))}
        <span className="text-[10px]" style={{ color: '#5A7099' }}>Más</span>
      </div>
    </div>
  );
}

// ─── Columna 3: Finanzas ──────────────────────────────────────────────────────

function GeneradasVsPagadasChart() {
  const max = Math.max(...GENERADAS_VS_PAGADAS.flatMap(d => [d.generadas, d.pagadas]));
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-3">
        <SubHeading>Generadas vs. pagadas</SubHeading>
        <div className="flex items-center gap-3 text-[11px] mb-2" style={{ color: '#5A7099' }}>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#2558A8' }} /> Generadas</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#D97706' }} /> Pagadas</span>
        </div>
      </div>
      <div className="flex items-end gap-1.5 sm:gap-3 h-28 px-1">
        {GENERADAS_VS_PAGADAS.map(d => (
          <div key={d.mes} className="flex-1 flex flex-col items-center justify-end h-full">
            <div className="w-full flex items-end justify-center gap-0.5 h-full">
              {[
                { v: d.generadas, color: '#2558A8' },
                { v: d.pagadas, color: '#D97706' },
              ].map(b => (
                <div key={b.color} className="flex-1 max-w-[12px] flex flex-col items-center justify-end h-full">
                  <span className="text-[9px] font-mono mb-0.5 whitespace-nowrap" style={{ color: '#5A7099' }}>{b.v}</span>
                  <div className="w-full rounded-t" style={{ height: `${(b.v / max) * 100}%`, backgroundColor: b.color }} />
                </div>
              ))}
            </div>
            <span className="text-[11px] mt-1.5" style={{ color: '#5A7099' }}>{d.mes}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EfectividadPorAgente() {
  return (
    <div>
      <SubHeading>Efectividad por agente</SubHeading>
      <ul className="space-y-2.5">
        {AGENTS.map(a => (
          <li key={a.id}>
            <div className="flex items-center justify-between text-xs mb-1 min-w-0">
              <span className="font-medium truncate min-w-0" style={{ color: '#0F1F3D' }}>
                {a.name} <span className="font-normal" style={{ color: '#5A7099' }}>· ID {a.id}</span>
              </span>
              <span className="font-mono font-semibold flex-none ml-2" style={{ color: '#1A3A6B' }}>{a.pct.toFixed(1)}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#EDF1F7' }}>
              <div className="h-full rounded-full" style={{ width: `${a.pct}%`, backgroundColor: '#2558A8' }} />
            </div>
            <div className="text-[10px] mt-0.5" style={{ color: '#5A7099' }}>{a.total} comparendos validados</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Screen 3.2 — Admin Dashboard ─────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [session, setSession] = useState(getAdminSession);
  const [date] = useState(() =>
    new Date().toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }),
  );
  const [longDate] = useState(() =>
    new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
  );

  // Revisa la expiración de la sesión cada 30 s
  useEffect(() => {
    const t = setInterval(() => {
      const s = getAdminSession();
      if (!s) navigate('/admin', { replace: true, state: { expired: true } });
      setSession(s);
    }, 30_000);
    return () => clearInterval(t);
  }, [navigate]);

  if (!session) return <Navigate to="/admin" replace />;

  function handleLogout() {
    logoutAdmin();
    navigate('/admin', { replace: true });
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: '#EDF1F7' }}>
      <AdminHeader session={session} date={date} onLogout={handleLogout} />

      <main className="flex-1 overflow-y-auto">
        <div className="px-4 sm:px-8 2xl:px-20 py-6 sm:py-8 space-y-6">

          {/* Sub-header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-semibold text-xl" style={{ color: '#0F1F3D' }}>Resumen de operación</h2>
              <p className="text-sm mt-0.5" style={{ color: '#5A7099' }}>
                {longDate} · Municipio de Apartadó ·{' '}
                <span className="font-semibold" style={{ color: '#1A3A6B' }}>{SEMAFOROS.length} intersecciones monitoreadas</span>
              </p>
            </div>
            <div
              className="flex items-center gap-2 rounded px-3 py-1.5 text-xs font-semibold whitespace-nowrap"
              style={{ backgroundColor: '#DCFCE7', color: '#166534', border: '1px solid #86EFAC' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse inline-block" style={{ backgroundColor: '#15803D' }} />
              Sistema en línea
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {KPIS.map(k => (
              <div
                key={k.label}
                className="min-w-0 bg-white rounded-lg border p-5 shadow-sm"
                style={{ borderColor: '#C2CEDE', borderTop: `3px solid ${k.color}` }}
              >
                <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#5A7099' }}>{k.label}</div>
                <div className="text-3xl font-bold mt-2 font-mono" style={{ color: '#0F1F3D' }}>{k.value}</div>
                <div className="text-xs mt-1" style={{ color: '#5A7099' }}>{k.note}</div>
              </div>
            ))}
          </div>

          {/* Resumen · Gráficos · Finanzas */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
            <ResumenPanel />
            <Panel title="Gráficos">
              <WeeklyBarChart />
              <Heatmap />
            </Panel>
            <Panel title="Finanzas" className="md:col-span-2 xl:col-span-1">
              <div>
                <SubHeading>Recaudo</SubHeading>
                <div className="grid grid-cols-1 gap-2">
                  <StatTile label="Del mes" value={formatCOP(FINANZAS.mes)} />
                  <StatTile label="Semestral" value={formatCOP(FINANZAS.semestral)} />
                </div>
              </div>
              <GeneradasVsPagadasChart />
              <EfectividadPorAgente />
            </Panel>
          </div>

          {/* Agents */}
          <section
            className="bg-white rounded-lg border shadow-sm overflow-hidden"
            style={{ borderColor: '#C2CEDE' }}
          >
            <div className="px-5 py-3 border-b" style={{ backgroundColor: '#F5F8FC', borderColor: '#C2CEDE' }}>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#5A7099' }}>Agentes validadores</span>
            </div>
            <div className="overflow-x-auto">
            <table className="w-full text-sm whitespace-nowrap">
              <thead>
                <tr style={{ borderBottom: '1px solid #C2CEDE' }}>
                  {['Agente', 'ID', 'Turno', 'Validados hoy', 'Total validados', 'Efectividad', 'Estado'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: '#5A7099' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AGENTS.map((a, i) => (
                  <tr key={a.id} style={{ borderBottom: i < AGENTS.length - 1 ? '1px solid #EDF1F7' : undefined }}>
                    <td className="px-5 py-3 font-semibold" style={{ color: '#0F1F3D' }}>{a.name}</td>
                    <td className="px-5 py-3 font-mono" style={{ color: '#5A7099' }}>{a.id}</td>
                    <td className="px-5 py-3 font-mono" style={{ color: '#0F1F3D' }}>{a.turno}</td>
                    <td className="px-5 py-3 font-mono" style={{ color: '#0F1F3D' }}>{a.hoy}</td>
                    <td className="px-5 py-3 font-mono" style={{ color: '#0F1F3D' }}>{a.total}</td>
                    <td className="px-5 py-3 font-mono font-semibold" style={{ color: '#1A3A6B' }}>{a.pct.toFixed(1)}%</td>
                    <td className="px-5 py-3">
                      <span
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium"
                        style={a.activo ? { backgroundColor: '#DCFCE7', color: '#166534' } : { backgroundColor: '#EDF1F7', color: '#5A7099' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: a.activo ? '#15803D' : '#92A5BF' }} />
                        {a.activo ? 'En turno' : 'Fuera de turno'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </section>
        </div>

        <footer
          className="py-4 px-4 text-center text-xs border-t"
          style={{ color: '#5A7099', borderColor: '#C2CEDE', backgroundColor: '#EDF1F7' }}
        >
          © 2026 SIFCA — Secretaría de Movilidad · Municipio de Apartadó, Antioquia · v2.1.4
        </footer>
      </main>
    </div>
  );
}
