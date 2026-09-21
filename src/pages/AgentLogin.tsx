import { useState } from 'react';
import { useNavigate } from 'react-router';
import { SifcaHeader } from './Home';

// ─── Screen 1.1 — Agent Login ─────────────────────────────────────────────────
export default function AgentLogin() {
  const navigate = useNavigate();
  const [cedula, setCedula] = useState('7743');
  const [pass, setPass] = useState('••••••••');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate('/agente/bandeja');
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#EDF1F7' }}>
      <SifcaHeader />

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">

          {/* Card */}
          <div
            className="bg-white rounded-lg border overflow-hidden shadow-sm"
            style={{ borderColor: '#C2CEDE' }}
          >
            {/* Card header */}
            <div
              className="px-8 py-5 border-b"
              style={{ backgroundColor: '#F5F8FC', borderColor: '#C2CEDE' }}
            >
              <h1 className="font-semibold text-base" style={{ color: '#0F1F3D' }}>
                Acceso al sistema
              </h1>
              <p className="text-xs mt-0.5" style={{ color: '#5A7099' }}>
                Personal autorizado de tránsito — Apartadó
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">

              <div>
                <label
                  htmlFor="cedula"
                  className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: '#5A7099' }}
                >
                  Usuario / Cédula
                </label>
                <input
                  id="cedula"
                  type="text"
                  value={cedula}
                  onChange={e => setCedula(e.target.value)}
                  required
                  className="
                    w-full rounded border px-4 py-3 text-sm outline-none
                    transition-all
                    focus:ring-2 focus:ring-blue-300
                  "
                  style={{
                    borderColor: '#C2CEDE',
                    color: '#0F1F3D',
                    backgroundColor: '#fff',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#1A3A6B')}
                  onBlur={e => (e.target.style.borderColor = '#C2CEDE')}
                />
              </div>

              <div>
                <label
                  htmlFor="pass"
                  className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: '#5A7099' }}
                >
                  Contraseña
                </label>
                <input
                  id="pass"
                  type="password"
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  required
                  className="
                    w-full rounded border px-4 py-3 text-sm outline-none
                    transition-all focus:ring-2 focus:ring-blue-300
                  "
                  style={{ borderColor: '#C2CEDE', color: '#0F1F3D' }}
                  onFocus={e => (e.target.style.borderColor = '#1A3A6B')}
                  onBlur={e => (e.target.style.borderColor = '#C2CEDE')}
                />
              </div>

              <button
                type="submit"
                className="
                  w-full py-3 rounded text-sm font-semibold text-white
                  transition-all hover:-translate-y-px hover:shadow-md
                  active:translate-y-0 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none
                "
                style={{ backgroundColor: '#1A3A6B' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0D2247')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1A3A6B')}
              >
                Iniciar sesión
              </button>
            </form>
          </div>

          {/* Back link */}
          <button
            onClick={() => navigate('/')}
            className="mt-5 w-full text-center text-xs transition-colors"
            style={{ color: '#5A7099' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#1A3A6B')}
            onMouseLeave={e => (e.currentTarget.style.color = '#5A7099')}
          >
            ← Volver al portal principal
          </button>
        </div>
      </main>
    </div>
  );
}
