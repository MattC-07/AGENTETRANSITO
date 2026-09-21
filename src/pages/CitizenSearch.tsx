import { useState } from 'react';
import { useNavigate } from 'react-router';
import { SifcaHeader } from './Home';

// ─── Screen 2.2 — Public Citizen Search ──────────────────────────────────────
export default function CitizenSearch() {
  const navigate = useNavigate();
  const [doc, setDoc] = useState('79542381');
  const [plate, setPlate] = useState('OPQ-317');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate('/ciudadano/resultado', { state: { doc, plate } });
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#EDF1F7' }}>
      <SifcaHeader />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">

        {/* Title block */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#0F1F3D' }}>
            Consulta de comparendos
          </h1>
          <p className="text-base" style={{ color: '#5A7099' }}>
            Ingrese su número de documento y la placa del vehículo para consultar sus infracciones.
          </p>
          <p className="text-sm mt-1" style={{ color: '#5A7099' }}>
            No se requiere registro ni contraseña.
          </p>
        </div>

        {/* Form card */}
        <div
          className="bg-white rounded-lg border shadow-sm w-full max-w-md overflow-hidden"
          style={{ borderColor: '#C2CEDE' }}
        >
          <div
            className="px-8 py-4 border-b"
            style={{ backgroundColor: '#F5F8FC', borderColor: '#C2CEDE' }}
          >
            <h2 className="font-semibold text-sm" style={{ color: '#0F1F3D' }}>
              Datos de consulta
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">

            {/* Document */}
            <div>
              <label
                htmlFor="doc"
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: '#5A7099' }}
              >
                Número de documento
              </label>
              <input
                id="doc"
                type="text"
                inputMode="numeric"
                value={doc}
                onChange={e => setDoc(e.target.value.replace(/\D/g, ''))}
                placeholder="Cédula de ciudadanía"
                maxLength={12}
                required
                className="
                  w-full rounded border px-4 py-3.5 text-sm outline-none
                  transition-all focus:ring-2 focus:ring-blue-300
                "
                style={{ borderColor: '#C2CEDE', color: '#0F1F3D' }}
                onFocus={e => (e.target.style.borderColor = '#1A3A6B')}
                onBlur={e => (e.target.style.borderColor = '#C2CEDE')}
              />
            </div>

            {/* Plate */}
            <div>
              <label
                htmlFor="plate"
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: '#5A7099' }}
              >
                Placa del vehículo
              </label>
              <input
                id="plate"
                type="text"
                value={plate}
                onChange={e => setPlate(e.target.value.toUpperCase())}
                placeholder="Ej: ABC-123"
                maxLength={8}
                required
                className="
                  w-full rounded border px-4 py-3.5 font-mono font-semibold
                  tracking-widest text-sm uppercase outline-none
                  transition-all focus:ring-2 focus:ring-blue-300
                "
                style={{ borderColor: '#C2CEDE', color: '#0F1F3D' }}
                onFocus={e => (e.target.style.borderColor = '#1A3A6B')}
                onBlur={e => (e.target.style.borderColor = '#C2CEDE')}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!doc || !plate}
              className="
                w-full py-4 rounded text-white font-semibold text-sm
                flex items-center justify-center gap-2.5
                transition-all hover:-translate-y-px hover:shadow-md
                active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed
                focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none
              "
              style={{ backgroundColor: '#1A3A6B' }}
              onMouseEnter={e => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#0D2247')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1A3A6B')}
            >
              <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd"/>
              </svg>
              Consultar
            </button>
          </form>
        </div>

        {/* Info note */}
        <div
          className="mt-6 rounded px-5 py-3 text-sm flex items-start gap-3 w-full max-w-md"
          style={{ backgroundColor: '#EFF6FF', color: '#1E40AF', border: '1px solid #BFDBFE' }}
        >
          <svg viewBox="0 0 16 16" className="w-4 h-4 flex-none mt-0.5" fill="currentColor">
            <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 110-2 1 1 0 010 2z"/>
          </svg>
          <span>
            Sus datos son tratados con total confidencialidad conforme a la Ley 1581 de 2012 (Habeas Data).
          </span>
        </div>

        {/* Back */}
        <button
          onClick={() => navigate('/')}
          className="mt-6 text-xs transition-colors"
          style={{ color: '#5A7099' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#1A3A6B')}
          onMouseLeave={e => (e.currentTarget.style.color = '#5A7099')}
        >
          ← Volver al portal principal
        </button>
      </main>

      <footer
        className="py-4 text-center text-xs border-t"
        style={{ color: '#5A7099', borderColor: '#C2CEDE', backgroundColor: '#EDF1F7' }}
      >
        © 2026 SIFCA — Secretaría de Movilidad · Municipio de Apartadó, Antioquia
      </footer>
    </div>
  );
}
