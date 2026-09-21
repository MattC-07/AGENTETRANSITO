import { useState } from 'react';
import { useNavigate } from 'react-router';

interface Comparendo {
  id: string;
  fecha: string;
  hora: string;
  codigo: string;
  descripcion: string;
  valor: number;
  descuento?: number;
  vencimiento: string;
  estado: 'pendiente' | 'en_mora';
  camara: string;
}

const MOCK_COMPARENDOS: Record<string, { nombre: string; placa: string; cedula: string; comparendos: Comparendo[] }> = {
  '79542381_OPQ317': {
    nombre: 'Carlos Andrés Molina Pérez',
    placa: 'OPQ-317',
    cedula: '79.542.381',
    comparendos: [
      {
        id: 'C-2026-004821',
        fecha: '17/09/2026',
        hora: '08:14',
        codigo: 'C02',
        descripcion: 'Transitar en semáforo en luz roja',
        valor: 822800,
        descuento: 411400,
        vencimiento: '17/11/2026',
        estado: 'pendiente',
        camara: 'Cra. 7 con Calle 26 — Cámara 04',
      },
      {
        id: 'C-2025-009103',
        fecha: '03/04/2025',
        hora: '17:42',
        codigo: 'D02',
        descripcion: 'Exceder la velocidad máxima permitida en vía urbana',
        valor: 548500,
        vencimiento: '03/04/2025',
        estado: 'en_mora',
        camara: 'Autopista Sur Km 3 — Cámara 18',
      },
    ],
  },
  '52889014_FKJ882': {
    nombre: 'María Fernanda Ospina Ríos',
    placa: 'FKJ-882',
    cedula: '52.889.014',
    comparendos: [
      {
        id: 'C-2026-004822',
        fecha: '17/09/2026',
        hora: '08:31',
        codigo: 'D02',
        descripcion: 'Exceder la velocidad máxima (87 km/h en zona 60 km/h)',
        valor: 548500,
        descuento: 274250,
        vencimiento: '17/11/2026',
        estado: 'pendiente',
        camara: 'Autopista Norte Km 8 — Cámara 11',
      },
    ],
  },
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);
}

type SearchState = 'idle' | 'loading' | 'found' | 'not_found';

export default function CitizenPortal() {
  const navigate = useNavigate();
  const [cedula, setCedula] = useState('');
  const [placa, setPlaca] = useState('');
  const [state, setState] = useState<SearchState>('idle');
  const [result, setResult] = useState<typeof MOCK_COMPARENDOS[string] | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(new Set());

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    setResult(null);

    const key = `${cedula.replace(/\D/g, '')}_${placa.replace(/[-\s]/g, '').toUpperCase()}`;
    setTimeout(() => {
      const found = MOCK_COMPARENDOS[key];
      if (found) {
        setResult(found);
        setState('found');
      } else {
        setState('not_found');
      }
    }, 1400);
  }

  function handleDownload(id: string) {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedIds((s) => new Set(s).add(id));
    }, 1800);
  }

  const totalPendiente = result?.comparendos.filter((c) => c.estado === 'pendiente').reduce((s, c) => s + c.valor, 0) ?? 0;
  const totalMora = result?.comparendos.filter((c) => c.estado === 'en_mora').reduce((s, c) => s + c.valor, 0) ?? 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-[#0B1929] border-b border-slate-700">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-none">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
            </div>
            <div>
              <div className="text-white font-semibold text-sm group-hover:text-blue-300 transition-colors">Secretaría Distrital de Movilidad</div>
              <div className="text-slate-400 text-xs">Alcaldía Mayor de Bogotá D.C.</div>
            </div>
          </button>
          <div className="text-slate-400 text-xs text-right hidden sm:block">
            Línea de atención: <span className="text-white font-mono font-semibold">195</span><br />
            Lun–Vie · 7:00 – 19:00
          </div>
        </div>
      </header>

      {/* Hero / Search */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 mb-5">
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-blue-600" fill="currentColor"><path d="M8 1a7 7 0 110 14A7 7 0 018 1zm0 1.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11z"/><path d="M7.25 4.5h1.5V8h2v1.5h-3.5V4.5z"/></svg>
              <span className="text-blue-700 text-xs font-semibold">Consulta de Comparendos en Línea</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Consulte sus infracciones<br />
              <span className="text-blue-700">de tránsito</span>
            </h1>
            <p className="text-slate-500 mt-3 text-base leading-relaxed">
              Ingrese su número de cédula y la placa del vehículo para consultar los comparendos pendientes asociados.
            </p>
          </div>

          <form onSubmit={handleSearch} className="mt-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="cedula" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  Número de Documento (Cédula)
                </label>
                <input
                  id="cedula"
                  type="text"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value.replace(/\D/g, ''))}
                  placeholder="Ej: 79542381"
                  maxLength={12}
                  required
                  className="w-full font-mono text-base text-slate-900 bg-white border-2 border-slate-300 focus:border-blue-600 focus:ring-0 rounded-xl px-4 py-3.5 outline-none placeholder:text-slate-400 placeholder:font-sans placeholder:text-sm transition-colors"
                />
              </div>
              <div>
                <label htmlFor="placa" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  Placa del Vehículo
                </label>
                <input
                  id="placa"
                  type="text"
                  value={placa}
                  onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                  placeholder="Ej: OPQ-317"
                  maxLength={8}
                  required
                  className="w-full font-mono text-base font-semibold tracking-widest text-slate-900 bg-white border-2 border-slate-300 focus:border-blue-600 focus:ring-0 rounded-xl px-4 py-3.5 outline-none placeholder:text-slate-400 placeholder:font-sans placeholder:text-sm placeholder:tracking-normal placeholder:font-normal transition-colors uppercase"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={state === 'loading' || !cedula || !placa}
              className="w-full bg-blue-700 hover:bg-blue-800 focus-visible:ring-4 focus-visible:ring-blue-300 active:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-base py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-md shadow-blue-200"
            >
              {state === 'loading' ? (
                <>
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Consultando base de datos...
                </>
              ) : (
                <>
                  <svg viewBox="0 0 20 20" className="w-5 h-5" fill="currentColor"><path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd"/></svg>
                  Buscar Comparendos
                </>
              )}
            </button>

            <p className="text-center text-xs text-slate-400 mt-3">
              Sus datos son tratados con confidencialidad conforme a la Ley 1581 de 2012 · Habeas Data
            </p>
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
        {/* Not found */}
        {state === 'not_found' && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Sin comparendos pendientes</h2>
            <p className="text-slate-500 max-w-sm mx-auto text-sm leading-relaxed">
              No se encontraron infracciones de tránsito asociadas al documento y placa ingresados. Si cree que hay un error, comuníquese con nuestra línea 195.
            </p>
          </div>
        )}

        {/* Found */}
        {state === 'found' && result && (
          <div className="space-y-6">
            {/* Citizen info card */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#0B1929] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-sm flex-none">
                    {result.nombre.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{result.nombre}</div>
                    <div className="text-slate-400 text-sm font-mono">C.C. {result.cedula} · Placa {result.placa}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-slate-400 text-xs mb-0.5">Total adeudado</div>
                  <div className="text-white font-bold text-xl font-mono">{formatCurrency(totalPendiente + totalMora)}</div>
                </div>
              </div>

              {/* Summary chips */}
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center gap-4 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-slate-600">{result.comparendos.filter(c => c.estado === 'pendiente').length} comparendo(s) pendiente(s)</span>
                  <span className="font-semibold text-slate-800 ml-1">{formatCurrency(totalPendiente)}</span>
                </span>
                {totalMora > 0 && (
                  <span className="inline-flex items-center gap-1.5 text-sm">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-slate-600">{result.comparendos.filter(c => c.estado === 'en_mora').length} en mora</span>
                    <span className="font-semibold text-red-700 ml-1">{formatCurrency(totalMora)}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Table */}
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3">Comparendos registrados</h2>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Fecha</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Código</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Infracción</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Estado</th>
                      <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Valor</th>
                      <th className="text-center px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {result.comparendos.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-mono font-semibold text-slate-800">{c.fecha}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{c.hora} · {c.id}</div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-block font-mono font-bold text-sm bg-slate-900 text-white px-2.5 py-1 rounded">
                            {c.codigo}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="text-slate-800 font-medium leading-snug max-w-xs">{c.descripcion}</div>
                          <div className="text-xs text-slate-400 mt-0.5 truncate max-w-xs">{c.camara}</div>
                        </td>
                        <td className="px-5 py-4">
                          {c.estado === 'pendiente' ? (
                            <div>
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                Pendiente
                              </span>
                              {c.descuento && (
                                <div className="text-xs text-green-700 mt-1.5 font-medium">
                                  ✓ 50% dto. hasta {c.vencimiento}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                              En mora
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="font-mono font-bold text-slate-900">{formatCurrency(c.valor)}</div>
                          {c.descuento && (
                            <div className="text-xs text-green-700 font-semibold mt-0.5">Con dto: {formatCurrency(c.descuento)}</div>
                          )}
                        </td>
                        <td className="px-5 py-4 text-center">
                          <button
                            onClick={() => handleDownload(c.id)}
                            disabled={downloadingId === c.id}
                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                              downloadedIds.has(c.id)
                                ? 'bg-green-50 text-green-700 border border-green-300 cursor-default'
                                : 'bg-green-700 hover:bg-green-800 focus-visible:ring-4 focus-visible:ring-green-300 text-white shadow-sm shadow-green-200 active:bg-green-900'
                            } disabled:opacity-60`}
                          >
                            {downloadingId === c.id ? (
                              <>
                                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                                Generando...
                              </>
                            ) : downloadedIds.has(c.id) ? (
                              <>
                                <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor"><path d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z"/></svg>
                                Descargado
                              </>
                            ) : (
                              <>
                                <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor"><path d="M.5 9.9a.5.5 0 01.5.5v2.5a1 1 0 001 1h12a1 1 0 001-1v-2.5a.5.5 0 011 0v2.5a2 2 0 01-2 2H2a2 2 0 01-2-2v-2.5a.5.5 0 01.5-.5z"/><path d="M7.646 11.854a.5.5 0 00.708 0l3-3a.5.5 0 00-.708-.708L8.5 10.293V1.5a.5.5 0 00-1 0v8.793L5.354 8.146a.5.5 0 10-.708.708l3 3z"/></svg>
                                Descargar PDF
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Info box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 flex gap-4">
              <svg viewBox="0 0 20 20" className="w-5 h-5 text-blue-600 flex-none mt-0.5" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd"/></svg>
              <div className="text-sm text-blue-800 leading-relaxed">
                <span className="font-semibold">¿Necesita más información?</span> Puede descargar el PDF de cada comparendo para conocer el proceso de pago y los mecanismos de impugnación disponibles. Para asesoría personalizada comuníquese al <span className="font-mono font-semibold">195</span> o visítenos en la Cra. 36 No. 22B-31, Bogotá.
              </div>
            </div>
          </div>
        )}

        {/* Idle helper tips */}
        {state === 'idle' && (
          <div className="grid grid-cols-3 gap-5 max-w-2xl mx-auto mt-4">
            {[
              { icon: '🔍', title: 'Consulta rápida', desc: 'Ingrese cédula y placa para conocer el estado de sus multas en segundos.' },
              { icon: '📄', title: 'Descargue su PDF', desc: 'Obtenga el documento oficial de su comparendo con código de barras para pago.' },
              { icon: '💰', title: 'Descuento del 50%', desc: 'Los comparendos pagados antes de su vencimiento tienen descuento del 50%.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-sm">
                <div className="text-2xl mb-3">{icon}</div>
                <div className="font-semibold text-slate-800 text-sm mb-1.5">{title}</div>
                <div className="text-slate-500 text-xs leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-auto">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between text-xs text-slate-400">
          <span>© 2026 Secretaría Distrital de Movilidad · Alcaldía Mayor de Bogotá D.C.</span>
          <div className="flex items-center gap-4">
            <button className="hover:text-slate-600 transition-colors">Política de privacidad</button>
            <button className="hover:text-slate-600 transition-colors">Términos de uso</button>
            <button className="hover:text-slate-600 transition-colors">Preguntas frecuentes</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
