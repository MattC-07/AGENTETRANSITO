import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { SifcaHeader } from './Home';
import { getAdminSession, loginAdmin, lockoutRemaining, SESSION_MINUTES } from '../adminAuth';

// ─── Screen 3.1 — Admin Login ─────────────────────────────────────────────────
export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const expired = (location.state as { expired?: boolean } | null)?.expired;

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(
    expired ? 'Su sesión expiró. Inicie sesión nuevamente.' : null,
  );
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(lockoutRemaining());

  // Cuenta regresiva del bloqueo por intentos fallidos
  useEffect(() => {
    if (locked <= 0) return;
    const t = setInterval(() => setLocked(lockoutRemaining()), 1000);
    return () => clearInterval(t);
  }, [locked > 0]);

  if (getAdminSession()) return <Navigate to="/admin/panel" replace />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || locked > 0) return;
    setLoading(true);
    setError(null);

    const result = await loginAdmin(user, pass);
    // Pequeña espera para simular verificación en servidor
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);

    if (result.ok) {
      navigate('/admin/panel', { replace: true });
      return;
    }
    setPass('');
    if (result.reason === 'locked') {
      setLocked(result.seconds);
      setError('Demasiados intentos fallidos. El acceso fue bloqueado temporalmente.');
    } else if (result.reason === 'invalid') {
      setError(`Usuario o contraseña incorrectos. Intentos restantes: ${result.remaining}.`);
    } else {
      setError('El navegador no permite la verificación segura. Use HTTPS o localhost.');
    }
  }

  const disabled = loading || locked > 0;

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
              className="px-8 py-5 border-b flex items-start gap-3"
              style={{ backgroundColor: '#F5F8FC', borderColor: '#C2CEDE' }}
            >
              <div
                className="w-9 h-9 rounded flex items-center justify-center flex-none"
                style={{ backgroundColor: '#D6E3F7' }}
              >
                <svg viewBox="0 0 20 20" className="w-4 h-4" style={{ color: '#1A3A6B' }} fill="currentColor">
                  <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h1 className="font-semibold text-base" style={{ color: '#0F1F3D' }}>
                  Acceso administrativo
                </h1>
                <p className="text-xs mt-0.5" style={{ color: '#5A7099' }}>
                  Uso exclusivo de la Secretaría de Movilidad — Apartadó
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5" autoComplete="off">

              {error && (
                <div
                  role="alert"
                  className="rounded px-3 py-2.5 text-xs leading-relaxed"
                  style={{ backgroundColor: '#FEF2F2', color: '#B91C1C', border: '1px solid #FECACA' }}
                >
                  {error}
                  {locked > 0 && (
                    <span className="block mt-1 font-semibold font-mono">
                      Intente de nuevo en {locked}s
                    </span>
                  )}
                </div>
              )}

              <div>
                <label
                  htmlFor="admin-user"
                  className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: '#5A7099' }}
                >
                  Usuario administrador
                </label>
                <input
                  id="admin-user"
                  type="text"
                  value={user}
                  onChange={e => setUser(e.target.value)}
                  required
                  disabled={disabled}
                  autoComplete="username"
                  className="
                    w-full rounded border px-4 py-3 text-sm outline-none
                    transition-all focus:ring-2 focus:ring-blue-300 disabled:opacity-60
                  "
                  style={{ borderColor: '#C2CEDE', color: '#0F1F3D', backgroundColor: '#fff' }}
                  onFocus={e => (e.target.style.borderColor = '#1A3A6B')}
                  onBlur={e => (e.target.style.borderColor = '#C2CEDE')}
                />
              </div>

              <div>
                <label
                  htmlFor="admin-pass"
                  className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: '#5A7099' }}
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="admin-pass"
                    type={showPass ? 'text' : 'password'}
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                    required
                    disabled={disabled}
                    autoComplete="current-password"
                    className="
                      w-full rounded border pl-4 pr-20 py-3 text-sm outline-none
                      transition-all focus:ring-2 focus:ring-blue-300 disabled:opacity-60
                    "
                    style={{ borderColor: '#C2CEDE', color: '#0F1F3D' }}
                    onFocus={e => (e.target.style.borderColor = '#1A3A6B')}
                    onBlur={e => (e.target.style.borderColor = '#C2CEDE')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold"
                    style={{ color: '#1A3A6B' }}
                  >
                    {showPass ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={disabled}
                className="
                  w-full py-3 rounded text-sm font-semibold text-white
                  transition-all hover:-translate-y-px hover:shadow-md
                  active:translate-y-0 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
                "
                style={{ backgroundColor: '#1A3A6B' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0D2247')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1A3A6B')}
              >
                {loading ? 'Verificando credenciales…' : 'Ingresar al panel'}
              </button>

              <p className="text-xs text-center leading-relaxed" style={{ color: '#5A7099' }}>
                La sesión se cierra automáticamente tras {SESSION_MINUTES} minutos.
                Todos los accesos quedan registrados.
              </p>
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

      <footer
        className="py-4 text-center text-xs border-t"
        style={{ color: '#5A7099', borderColor: '#C2CEDE', backgroundColor: '#EDF1F7' }}
      >
        © 2026 SIFCA — Secretaría de Movilidad · Municipio de Apartadó, Antioquia · v2.1.4
      </footer>
    </div>
  );
}
