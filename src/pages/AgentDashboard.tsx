import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';

type EventStatus = 'pendiente' | 'aprobado' | 'descartado';

interface ViolationEvent {
  id: string;
  plate: string;
  timestamp: string;
  date: string;
  infracion: string;
  location: string;
  status: EventStatus;
  speed?: string;
  speedLimit?: string;
  panoramicImg: string;
  plateImg: string;
  runt: {
    propietario: string;
    cedula: string;
    marca: string;
    modelo: string;
    color: string;
    clase: string;
    cilindraje: string;
    servicio: string;
  };
  semaforoEstado: 'rojo' | 'amarillo' | 'verde';
  ocrConfianza: number;
}

const EVENTS: ViolationEvent[] = [
  {
    id: 'EVT-2026-004821',
    plate: 'OPQ-317',
    timestamp: '08:14:33',
    date: '17/09/2026',
    infracion: 'Semáforo en rojo',
    location: 'Cra. 7 con Calle 26 — Cámara 04',
    status: 'pendiente',
    panoramicImg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=500&fit=crop&auto=format',
    plateImg: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=160&fit=crop&auto=format',
    runt: { propietario: 'Carlos Andrés Molina Pérez', cedula: '79.542.381', marca: 'Chevrolet', modelo: 'Sail 2021', color: 'Blanco', clase: 'Automóvil', cilindraje: '1.400 cc', servicio: 'Particular' },
    semaforoEstado: 'rojo',
    ocrConfianza: 98.4,
  },
  {
    id: 'EVT-2026-004822',
    plate: 'FKJ-882',
    timestamp: '08:31:07',
    date: '17/09/2026',
    infracion: 'Exceso de velocidad',
    location: 'Autopista Norte Km 8 — Cámara 11',
    status: 'pendiente',
    speed: '87 km/h',
    speedLimit: '60 km/h',
    panoramicImg: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=1200&h=500&fit=crop&auto=format',
    plateImg: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=160&fit=crop&auto=format',
    runt: { propietario: 'María Fernanda Ospina Ríos', cedula: '52.889.014', marca: 'Renault', modelo: 'Duster 2019', color: 'Gris Platino', clase: 'Camioneta', cilindraje: '2.000 cc', servicio: 'Particular' },
    semaforoEstado: 'verde',
    ocrConfianza: 95.1,
  },
  {
    id: 'EVT-2026-004823',
    plate: 'TML-445',
    timestamp: '08:47:52',
    date: '17/09/2026',
    infracion: 'Semáforo en rojo',
    location: 'Av. El Dorado con Cra. 50 — Cámara 07',
    status: 'pendiente',
    panoramicImg: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&h=500&fit=crop&auto=format',
    plateImg: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=160&fit=crop&auto=format',
    runt: { propietario: 'Jorge Luis Becerra Sandoval', cedula: '80.221.763', marca: 'Toyota', modelo: 'Corolla 2022', color: 'Negro', clase: 'Automóvil', cilindraje: '1.800 cc', servicio: 'Particular' },
    semaforoEstado: 'rojo',
    ocrConfianza: 99.2,
  },
  {
    id: 'EVT-2026-004824',
    plate: 'BNX-091',
    timestamp: '09:03:18',
    date: '17/09/2026',
    infracion: 'Exceso de velocidad',
    location: 'Calle 80 con Av. Boyacá — Cámara 02',
    status: 'aprobado',
    speed: '92 km/h',
    speedLimit: '60 km/h',
    panoramicImg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=500&fit=crop&auto=format',
    plateImg: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=160&fit=crop&auto=format',
    runt: { propietario: 'Andrés Felipe Vargas Lozano', cedula: '1.024.519.887', marca: 'Mazda', modelo: 'CX-5 2020', color: 'Azul Marino', clase: 'Camioneta', cilindraje: '2.500 cc', servicio: 'Particular' },
    semaforoEstado: 'verde',
    ocrConfianza: 97.8,
  },
  {
    id: 'EVT-2026-004825',
    plate: 'SYR-663',
    timestamp: '09:21:44',
    date: '17/09/2026',
    infracion: 'Semáforo en rojo',
    location: 'Transversal 93 con Calle 147 — Cámara 15',
    status: 'descartado',
    panoramicImg: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=1200&h=500&fit=crop&auto=format',
    plateImg: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=160&fit=crop&auto=format',
    runt: { propietario: 'Luisa Carolina Herrera Montoya', cedula: '43.712.256', marca: 'Kia', modelo: 'Sportage 2023', color: 'Rojo', clase: 'Camioneta', cilindraje: '2.000 cc', servicio: 'Particular' },
    semaforoEstado: 'amarillo',
    ocrConfianza: 76.3,
  },
  {
    id: 'EVT-2026-004826',
    plate: 'RDQ-204',
    timestamp: '09:38:05',
    date: '17/09/2026',
    infracion: 'Exceso de velocidad',
    location: 'Cra. 30 con Calle 63 — Cámara 09',
    status: 'pendiente',
    speed: '78 km/h',
    speedLimit: '50 km/h',
    panoramicImg: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&h=500&fit=crop&auto=format',
    plateImg: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=160&fit=crop&auto=format',
    runt: { propietario: 'Diego Armando Patiño Castro', cedula: '71.338.495', marca: 'Hyundai', modelo: 'Tucson 2021', color: 'Plata', clase: 'Camioneta', cilindraje: '2.000 cc', servicio: 'Particular' },
    semaforoEstado: 'verde',
    ocrConfianza: 93.7,
  },
];

const CAUSALES_DESCARTE = [
  'Foto de mala calidad / ilegible',
  'Vehículo de emergencia (ambulancia, bomberos, policía)',
  'Placa no corresponde al vehículo infractor',
  'Error técnico del sistema de detección',
  'Semáforo con mal funcionamiento registrado',
  'Vehículo ya tiene comparendo por este evento',
  'Otra causal (especificar)',
];

const statusConfig: Record<EventStatus, { label: string; bg: string; text: string; dot: string }> = {
  pendiente: { label: 'Pendiente', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  aprobado: { label: 'Aprobado', bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-600' },
  descartado: { label: 'Descartado', bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-600' },
};

function TrafficLight({ estado }: { estado: 'rojo' | 'amarillo' | 'verde' }) {
  return (
    <div className="flex flex-col items-center gap-1 bg-gray-900 rounded p-2 w-10">
      <div className={`w-6 h-6 rounded-full border border-gray-700 transition-all ${estado === 'rojo' ? 'bg-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,0.6)]' : 'bg-gray-700'}`} />
      <div className={`w-6 h-6 rounded-full border border-gray-700 transition-all ${estado === 'amarillo' ? 'bg-amber-400 shadow-[0_0_8px_2px_rgba(251,191,36,0.6)]' : 'bg-gray-700'}`} />
      <div className={`w-6 h-6 rounded-full border border-gray-700 transition-all ${estado === 'verde' ? 'bg-green-400 shadow-[0_0_8px_2px_rgba(74,222,128,0.6)]' : 'bg-gray-700'}`} />
    </div>
  );
}

function StatusBadge({ status }: { status: EventStatus }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function DiscardModal({ onConfirm, onCancel }: { onConfirm: (c: string) => void; onCancel: () => void }) {
  const [selected, setSelected] = useState('');
  const [other, setOther] = useState('');
  const causal = selected === 'Otra causal (especificar)' ? other.trim() : selected;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 border border-slate-200 overflow-hidden">
        <div className="bg-red-700 px-6 py-4">
          <h2 className="text-white font-semibold text-base tracking-wide">Descartar Infracción</h2>
          <p className="text-red-200 text-sm mt-0.5">Seleccione la causal de descarte</p>
        </div>
        <div className="px-6 py-5 space-y-2">
          {CAUSALES_DESCARTE.map((c) => (
            <label key={c} className="flex items-start gap-3 cursor-pointer">
              <input type="radio" name="causal" value={c} checked={selected === c} onChange={() => setSelected(c)} className="mt-0.5 accent-red-600" />
              <span className={`text-sm leading-snug ${selected === c ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>{c}</span>
            </label>
          ))}
          {selected === 'Otra causal (especificar)' && (
            <textarea value={other} onChange={(e) => setOther(e.target.value)} placeholder="Describa la causal..." rows={3} className="w-full mt-2 px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 resize-none text-slate-800" />
          )}
        </div>
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors">Cancelar</button>
          <button disabled={!causal} onClick={() => causal && onConfirm(causal)} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Confirmar Descarte</button>
        </div>
      </div>
    </div>
  );
}

function CorrectPlateModal({ current, onConfirm, onCancel }: { current: string; onConfirm: (p: string) => void; onCancel: () => void }) {
  const [plate, setPlate] = useState(current);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm mx-4 border border-slate-200 overflow-hidden">
        <div className="bg-orange-700 px-6 py-4">
          <h2 className="text-white font-semibold text-base">Corregir Placa</h2>
          <p className="text-orange-200 text-sm mt-0.5">Ingrese la placa correcta del vehículo</p>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Placa detectada por OCR</label>
            <div className="font-mono text-lg font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded border border-slate-200">{current}</div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Placa corregida</label>
            <input value={plate} onChange={(e) => setPlate(e.target.value.toUpperCase())} maxLength={8} placeholder="Ej: ABC-123" className="w-full font-mono text-lg font-bold px-3 py-1.5 border border-orange-400 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 uppercase tracking-widest text-slate-900" />
          </div>
        </div>
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors">Cancelar</button>
          <button disabled={!plate.trim() || plate === current} onClick={() => onConfirm(plate.trim())} className="px-4 py-2 text-sm font-semibold text-white bg-orange-600 rounded hover:bg-orange-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Guardar Corrección</button>
        </div>
      </div>
    </div>
  );
}

export default function AgentDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const agent = (location.state as any)?.agent ?? { name: 'Ricardo Suárez', id: '7743', role: 'Agente Validador', shift: '08:00 – 16:00' };

  const [events, setEvents] = useState<ViolationEvent[]>(EVENTS);
  const [selectedId, setSelectedId] = useState<string>(EVENTS[0].id);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'warning' } | null>(null);

  const selected = events.find((e) => e.id === selectedId)!;
  const pendingCount = events.filter((e) => e.status === 'pendiente').length;

  function showToast(msg: string, type: 'success' | 'error' | 'warning') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  function handleApprove() {
    setEvents((ev) => ev.map((e) => e.id === selectedId ? { ...e, status: 'aprobado' } : e));
    showToast(`Comparendo aprobado — Placa ${selected.plate}`, 'success');
  }

  function handleDiscard(causal: string) {
    setEvents((ev) => ev.map((e) => e.id === selectedId ? { ...e, status: 'descartado' } : e));
    setShowDiscardModal(false);
    showToast(`Infracción descartada — ${causal}`, 'error');
  }

  function handleCorrectPlate(plate: string) {
    setEvents((ev) => ev.map((e) => e.id === selectedId ? { ...e, plate } : e));
    setShowCorrectModal(false);
    showToast(`Placa corregida a ${plate}`, 'warning');
  }

  const toastColors = { success: 'bg-green-700', error: 'bg-red-700', warning: 'bg-orange-700' };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-100">
      {/* Header */}
      <header className="flex-none bg-[#0B1929] border-b border-slate-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
            </div>
            <div className="text-left">
              <div className="text-white font-semibold text-sm leading-none group-hover:text-blue-300 transition-colors">SDM · Secretaría de Movilidad</div>
              <div className="text-slate-400 text-xs mt-0.5">Sistema de Validación de Fotomultas · v3.4.1</div>
            </div>
          </button>
          <div className="h-6 w-px bg-slate-600" />
          <div className="text-slate-300 text-xs">
            <span className="font-mono">AGENTE:</span>{' '}
            <span className="font-semibold text-white">{agent.name} — ID {agent.id ?? '7743'}</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-xs text-slate-400">Turno activo</div>
            <div className="font-mono text-sm text-white font-semibold">{agent.shift ?? '08:00 – 16:00'}</div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded px-3 py-1.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300 text-sm font-semibold">{pendingCount} pendientes</span>
          </div>
          <button onClick={() => navigate('/agente')} className="text-slate-400 hover:text-white text-xs transition-colors flex items-center gap-1">
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor"><path d="M10 12.5a.5.5 0 01-.5.5h-8a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v2a.5.5 0 001 0v-2A1.5 1.5 0 009.5 2h-8A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h8a1.5 1.5 0 001.5-1.5v-2a.5.5 0 00-1 0v2z"/><path d="M15.854 8.354a.5.5 0 000-.708l-3-3a.5.5 0 00-.708.708L14.293 7.5H5.5a.5.5 0 000 1h8.793l-2.147 2.146a.5.5 0 00.708.708l3-3z"/></svg>
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: event list */}
        <aside className="w-80 flex-none flex flex-col bg-white border-r border-slate-200 overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Cola de Eventos</h2>
            <span className="text-xs text-slate-400 font-mono">17/09/2026</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {events.map((ev) => {
              const isActive = ev.id === selectedId;
              return (
                <button key={ev.id} onClick={() => setSelectedId(ev.id)} className={`w-full text-left px-4 py-3 border-b border-slate-100 transition-colors relative ${isActive ? 'bg-blue-50 border-l-2 border-l-blue-600' : 'hover:bg-slate-50 border-l-2 border-l-transparent'}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className={`font-mono text-base font-bold tracking-widest leading-none ${isActive ? 'text-blue-800' : 'text-slate-900'}`}>{ev.plate}</div>
                      <div className="text-xs text-slate-500 mt-1 leading-snug">{ev.infracion}</div>
                    </div>
                    <StatusBadge status={ev.status} />
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                    <span className="font-mono">{ev.timestamp}</span>
                    <span className="text-slate-300">·</span>
                    <span className="truncate">{ev.location.split('—')[0].trim()}</span>
                  </div>
                  <div className="mt-1 text-xs font-mono text-slate-300">{ev.id}</div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right: detail */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            {/* Event header */}
            <div className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl font-bold text-slate-900 tracking-widest">{selected.plate}</span>
                  <StatusBadge status={selected.status} />
                  {selected.speed && (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-700">
                      {selected.speed} / límite {selected.speedLimit}
                    </span>
                  )}
                </div>
                <div className="text-sm text-slate-500 mt-1">{selected.infracion} · {selected.location}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-slate-700 font-semibold">{selected.date} — {selected.timestamp}</div>
                <div className="font-mono text-xs text-slate-400">{selected.id}</div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Panoramic */}
              <section>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Fotografía Panorámica</div>
                <div className="relative rounded-lg overflow-hidden bg-slate-800 border border-slate-200 shadow-sm">
                  <img src={selected.panoramicImg} alt="Fotografía panorámica de la infracción" className="w-full object-cover" style={{ height: 220 }} />
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white font-mono text-xs px-2 py-1 rounded">{selected.date} {selected.timestamp} · {selected.location}</div>
                  <div className="absolute top-2 right-2 bg-blue-900/80 text-blue-200 font-mono text-xs px-2 py-1 rounded">CAM-HD · {selected.id}</div>
                </div>
              </section>

              {/* OCR + RUNT + Semáforo */}
              <div className="grid grid-cols-3 gap-4">
                {/* OCR */}
                <section className="space-y-2">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Zoom Placa — OCR</div>
                  <div className="bg-slate-900 rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                    <img src={selected.plateImg} alt="Zoom de placa" className="w-full object-cover" style={{ height: 100 }} />
                    <div className="px-3 py-2 space-y-1.5">
                      <div className="font-mono text-xl font-bold text-white tracking-[0.35em] text-center bg-slate-800 rounded px-2 py-1.5 border border-slate-700">{selected.plate}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-xs">Confianza OCR</span>
                        <span className={`font-mono text-xs font-bold ${selected.ocrConfianza >= 90 ? 'text-green-400' : selected.ocrConfianza >= 75 ? 'text-amber-400' : 'text-red-400'}`}>{selected.ocrConfianza}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${selected.ocrConfianza >= 90 ? 'bg-green-500' : selected.ocrConfianza >= 75 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${selected.ocrConfianza}%` }} />
                      </div>
                    </div>
                  </div>
                </section>

                {/* RUNT */}
                <section className="space-y-2">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Datos RUNT</div>
                  <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-700 px-3 py-1.5"><span className="text-slate-200 text-xs font-semibold tracking-wide">Registro Único Nacional de Tránsito</span></div>
                    <div className="px-3 py-2 space-y-2">
                      {[
                        { label: 'Propietario', value: selected.runt.propietario },
                        { label: 'C.C.', value: selected.runt.cedula },
                        { label: 'Marca / Modelo', value: `${selected.runt.marca} ${selected.runt.modelo}` },
                        { label: 'Color', value: selected.runt.color },
                        { label: 'Clase', value: selected.runt.clase },
                        { label: 'Servicio', value: selected.runt.servicio },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between items-start gap-2">
                          <span className="text-slate-400 text-xs whitespace-nowrap">{label}</span>
                          <span className="text-slate-800 text-xs font-semibold text-right leading-snug">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Semáforo */}
                <section className="space-y-2">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Estado Semáforo</div>
                  <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-700 px-3 py-1.5"><span className="text-slate-200 text-xs font-semibold tracking-wide">Al momento de la infracción</span></div>
                    <div className="flex flex-col items-center justify-center gap-4 py-4 px-3">
                      <TrafficLight estado={selected.semaforoEstado} />
                      <div className="text-center">
                        <div className={`text-sm font-bold uppercase tracking-wide ${selected.semaforoEstado === 'rojo' ? 'text-red-600' : selected.semaforoEstado === 'amarillo' ? 'text-amber-500' : 'text-green-600'}`}>
                          {selected.semaforoEstado === 'rojo' ? 'Luz Roja' : selected.semaforoEstado === 'amarillo' ? 'Luz Ámbar' : 'Luz Verde'}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {selected.semaforoEstado === 'rojo' ? 'Infracción confirmada' : selected.semaforoEstado === 'amarillo' ? 'Verificar contexto' : 'Sin infracción de semáforo'}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Vehicle tech info */}
              <section className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Información Técnica del Vehículo</span>
                </div>
                <div className="grid grid-cols-4 divide-x divide-slate-100">
                  {[
                    { label: 'Cilindraje', value: selected.runt.cilindraje },
                    { label: 'Tipo de servicio', value: selected.runt.servicio },
                    { label: 'Clase de vehículo', value: selected.runt.clase },
                    { label: 'Placa asignada', value: selected.plate },
                  ].map(({ label, value }) => (
                    <div key={label} className="px-4 py-3">
                      <div className="text-xs text-slate-400 mb-0.5">{label}</div>
                      <div className={`text-sm font-semibold text-slate-800 ${label === 'Placa asignada' ? 'font-mono tracking-widest' : ''}`}>{value}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Action bar */}
          <div className="flex-none bg-white border-t-2 border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor"><path d="M8 1a7 7 0 110 14A7 7 0 018 1zm0 1.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM7.25 5h1.5v4.5h-1.5V5zm0 5.5h1.5V12h-1.5v-1.5z"/></svg>
              <span>Evento <span className="font-mono font-semibold text-slate-600">{selected.id}</span> — Acciones registradas con firma digital del agente</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowCorrectModal(true)} className="flex items-center gap-2 px-5 py-2.5 rounded font-semibold text-sm text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 transition-colors shadow-sm border border-orange-700">
                <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor"><path d="M12.854.146a.5.5 0 00-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 000-.708l-3-3zm-1.6 3.062L3.5 11 2 14l3-1.5 7.808-7.808-1.554-1.484zM1 13.5l1.25-2.5L4 12.75 1.5 14 1 13.5z"/></svg>
                Corregir Placa
              </button>
              <button onClick={() => setShowDiscardModal(true)} className="flex items-center gap-2 px-5 py-2.5 rounded font-semibold text-sm text-white bg-red-600 hover:bg-red-700 active:bg-red-800 transition-colors shadow-sm border border-red-700">
                <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor"><path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/><path fillRule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>
                Descartar Infracción
              </button>
              <button onClick={handleApprove} disabled={selected.status === 'aprobado'} className="flex items-center gap-2 px-6 py-2.5 rounded font-semibold text-sm text-white bg-green-700 hover:bg-green-800 active:bg-green-900 transition-colors shadow-sm border border-green-800 disabled:opacity-50 disabled:cursor-not-allowed">
                <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor"><path d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z"/></svg>
                Aprobar Comparendo
              </button>
            </div>
          </div>
        </main>
      </div>

      {showDiscardModal && <DiscardModal onConfirm={handleDiscard} onCancel={() => setShowDiscardModal(false)} />}
      {showCorrectModal && <CorrectPlateModal current={selected.plate} onConfirm={handleCorrectPlate} onCancel={() => setShowCorrectModal(false)} />}

      {toast && (
        <div className={`fixed bottom-24 right-6 z-50 ${toastColors[toast.type]} text-white text-sm font-medium px-4 py-3 rounded shadow-xl flex items-center gap-2`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
