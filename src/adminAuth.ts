// ─── Admin auth (simulada) ────────────────────────────────────────────────────
// Versión inicial de demostración: no hay backend. Las credenciales se validan
// contra un hash SHA-256 con sal (la contraseña nunca está en texto plano en el
// código), hay bloqueo temporal por intentos fallidos y la sesión expira sola.
// En producción esto debe reemplazarse por autenticación en servidor.

const SALT = 'sifca-apartado-2026';
const CREDENTIAL_HASH = 'd45359f9ea61651ece9b1f3d94fc105b76b1a5d4ab84affa02f14d91c2cb8724';

const SESSION_KEY = 'sifca.admin.session';
const ATTEMPTS_KEY = 'sifca.admin.attempts';

export const SESSION_MINUTES = 30;
export const MAX_ATTEMPTS = 5;
export const LOCKOUT_SECONDS = 60;

export interface AdminSession {
  user: string;
  name: string;
  role: string;
  token: string;
  expiresAt: number;
}

interface AttemptState {
  count: number;
  lockedUntil: number;
}

function read<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* almacenamiento no disponible */
  }
}

function remove(key: string) {
  try {
    sessionStorage.removeItem(key);
  } catch {
    /* almacenamiento no disponible */
  }
}

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function randomToken(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

function getAttempts(): AttemptState {
  return read<AttemptState>(ATTEMPTS_KEY) ?? { count: 0, lockedUntil: 0 };
}

/** Segundos restantes de bloqueo (0 si no está bloqueado). */
export function lockoutRemaining(): number {
  const { lockedUntil } = getAttempts();
  return Math.max(0, Math.ceil((lockedUntil - Date.now()) / 1000));
}

export type LoginResult =
  | { ok: true; session: AdminSession }
  | { ok: false; reason: 'locked'; seconds: number }
  | { ok: false; reason: 'invalid'; remaining: number }
  | { ok: false; reason: 'unsupported' };

export async function loginAdmin(user: string, password: string): Promise<LoginResult> {
  const locked = lockoutRemaining();
  if (locked > 0) return { ok: false, reason: 'locked', seconds: locked };

  if (!globalThis.crypto?.subtle) return { ok: false, reason: 'unsupported' };

  const hash = await sha256(`${SALT}:${user.trim().toLowerCase()}:${password}`);

  if (hash !== CREDENTIAL_HASH) {
    const attempts = getAttempts();
    const count = attempts.count + 1;
    if (count >= MAX_ATTEMPTS) {
      write(ATTEMPTS_KEY, { count: 0, lockedUntil: Date.now() + LOCKOUT_SECONDS * 1000 });
      return { ok: false, reason: 'locked', seconds: LOCKOUT_SECONDS };
    }
    write(ATTEMPTS_KEY, { count, lockedUntil: 0 });
    return { ok: false, reason: 'invalid', remaining: MAX_ATTEMPTS - count };
  }

  remove(ATTEMPTS_KEY);
  const session: AdminSession = {
    user: user.trim().toLowerCase(),
    name: 'Administrador SIFCA',
    role: 'Secretaría de Movilidad',
    token: randomToken(),
    expiresAt: Date.now() + SESSION_MINUTES * 60 * 1000,
  };
  write(SESSION_KEY, session);
  return { ok: true, session };
}

/** Sesión vigente o null (limpia la sesión si ya expiró). */
export function getAdminSession(): AdminSession | null {
  const session = read<AdminSession>(SESSION_KEY);
  if (!session) return null;
  if (!session.token || session.expiresAt <= Date.now()) {
    remove(SESSION_KEY);
    return null;
  }
  return session;
}

export function logoutAdmin() {
  remove(SESSION_KEY);
}
