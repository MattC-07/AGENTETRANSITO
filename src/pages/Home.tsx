import { useNavigate } from 'react-router';

// ─── Shared header used on public-facing screens ──────────────────────────────
export function SifcaHeader() {
  const navigate = useNavigate();
  return (
    <header
      style={{ height: 64, backgroundColor: '#0D2247' }}
      className="flex-none flex items-center px-20 border-b border-white/10"
    >
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-3 group"
      >
        {/* Logo mark */}
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
            <div className="text-blue-300 text-xs leading-none mt-0.5">Secretaría de Movilidad · Apartadó</div>
          </div>
        </div>
      </button>
    </header>
  );
}

// ─── Screen 2.1 — Landing / Access Selector ──────────────────────────────────
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#EDF1F7' }}>
      <SifcaHeader />

      <main className="flex-1 flex flex-col items-center justify-center px-20 py-16">
        {/* Title */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
            style={{ backgroundColor: '#D6E3F7', color: '#1A3A6B' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ backgroundColor: '#2558A8' }}
            />
            Sistema de Fotodetección de Infracciones Semafóricas
          </div>
          <h1
            className="text-4xl font-bold tracking-tight leading-tight mb-3"
            style={{ color: '#0F1F3D' }}
          >
            Portal de Movilidad
          </h1>
          <p className="text-lg" style={{ color: '#5A7099' }}>
            Municipio de Apartadó, Antioquia
          </p>
        </div>

        {/* Two equal access cards */}
        <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">

          {/* Agent card */}
          <button
            onClick={() => navigate('/agente')}
            className="
              group text-left bg-white rounded-lg p-8
              border-2 transition-all duration-150 cursor-pointer
              hover:-translate-y-0.5 hover:shadow-lg
              focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300
              active:translate-y-0
            "
            style={{ borderColor: '#C2CEDE' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#1A3A6B')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#C2CEDE')}
          >
            <div
              className="w-10 h-10 rounded flex items-center justify-center mb-5"
              style={{ backgroundColor: '#D6E3F7' }}
            >
              <svg viewBox="0 0 20 20" className="w-5 h-5" style={{ color: '#1A3A6B' }} fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="font-semibold text-base mb-2" style={{ color: '#0F1F3D' }}>
              Acceso Agente de Tránsito
            </div>
            <div className="text-sm mb-6 leading-relaxed" style={{ color: '#5A7099' }}>
              Panel interno de validación de evidencia fotográfica y emisión de comparendos.
            </div>
            <div
              className="flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all"
              style={{ color: '#1A3A6B' }}
            >
              Iniciar sesión
              <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z"/>
              </svg>
            </div>
          </button>

          {/* Citizen card */}
          <button
            onClick={() => navigate('/ciudadano')}
            className="
              group text-left bg-white rounded-lg p-8
              border-2 transition-all duration-150 cursor-pointer
              hover:-translate-y-0.5 hover:shadow-lg
              focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300
              active:translate-y-0
            "
            style={{ borderColor: '#C2CEDE' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#1A3A6B')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#C2CEDE')}
          >
            <div
              className="w-10 h-10 rounded flex items-center justify-center mb-5"
              style={{ backgroundColor: '#D6E3F7' }}
            >
              <svg viewBox="0 0 20 20" className="w-5 h-5" style={{ color: '#1A3A6B' }} fill="currentColor">
                <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z"/>
                <path fillRule="evenodd" d="M10 3a7 7 0 100 14A7 7 0 0010 3zm-4.64 9.64a5 5 0 119.28 0A7.027 7.027 0 0110 15a7.027 7.027 0 01-4.64-2.36z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="font-semibold text-base mb-2" style={{ color: '#0F1F3D' }}>
              Consulta Ciudadana
            </div>
            <div className="text-sm mb-6 leading-relaxed" style={{ color: '#5A7099' }}>
              Consulte el estado de sus comparendos de tránsito y descargue el documento oficial.
            </div>
            <div
              className="flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all"
              style={{ color: '#1A3A6B' }}
            >
              Consultar comparendos
              <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z"/>
              </svg>
            </div>
          </button>
        </div>
      </main>

      <footer
        className="py-4 text-center text-xs border-t"
        style={{ color: '#5A7099', borderColor: '#C2CEDE', backgroundColor: '#EDF1F7' }}
      >
        © 2026 SIFCA — Secretaría de Movilidad · Municipio de Apartadó, Antioquia · v2.1.4
      </footer>
    </div>
  );
}
