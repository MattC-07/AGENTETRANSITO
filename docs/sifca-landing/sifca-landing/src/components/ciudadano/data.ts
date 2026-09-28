/**
 * Datos SIMULADOS del módulo ciudadano.
 * Cuando exista el backend, reemplaza `buscarComparendos` por la llamada a la API
 * y conserva los tipos.
 */

export type TipoBusqueda = "placa" | "cedula";
export type EstadoComparendo = "por_pagar" | "en_apelacion" | "pagado";

export type Vehiculo = {
  placa: string; // normalizada, sin espacios: "KLM482"
  marca: string;
  linea: string;
  modelo: number;
  color: string;
  cedulaPropietario: string;
};

export type Comparendo = {
  id: string;
  numero: string;
  codigo: "D04";
  descripcion: string;
  placa: string;
  fechaDeteccion: string; // ISO local
  fechaRevision: string;
  fechaNotificacion: string;
  camara: string;
  lugar: string;
  valor: number;
  descuentoHasta: string; // fecha límite del pronto pago (50 %)
  revisadoPor: string;
  estado: EstadoComparendo;
  apelacion?: { radicado: string; fecha: string };
  pago?: { fecha: string; valor: number; referencia: string };
};

export const VALOR_D04 = 548_500;

const vehiculos: Vehiculo[] = [
  {
    placa: "KLM482",
    marca: "Renault",
    linea: "Logan",
    modelo: 2019,
    color: "Gris",
    cedulaPropietario: "1037000111",
  },
  {
    placa: "GHT915",
    marca: "Chevrolet",
    linea: "Spark GT",
    modelo: 2021,
    color: "Rojo",
    cedulaPropietario: "71000222",
  },
  {
    placa: "BCD204",
    marca: "Mazda",
    linea: "3",
    modelo: 2018,
    color: "Blanco",
    cedulaPropietario: "71000222",
  },
];

const comparendos: Comparendo[] = [
  {
    id: "c-1082",
    numero: "05045-2026-001082",
    codigo: "D04",
    descripcion: "No detenerse ante la luz roja del semáforo",
    placa: "KLM482",
    fechaDeteccion: "2026-09-22T10:42:18",
    fechaRevision: "2026-09-22T10:45:30",
    fechaNotificacion: "2026-09-23T08:00:00",
    camara: "CAM-03",
    lugar: "Cruce semaforizado CAM-03 · Apartadó",
    valor: VALOR_D04,
    descuentoHasta: "2026-09-30",
    revisadoPor: "Agente de tránsito · código 214",
    estado: "por_pagar",
  },
  {
    id: "c-0731",
    numero: "05045-2026-000731",
    codigo: "D04",
    descripcion: "No detenerse ante la luz roja del semáforo",
    placa: "GHT915",
    fechaDeteccion: "2026-09-03T18:10:05",
    fechaRevision: "2026-09-03T18:16:40",
    fechaNotificacion: "2026-09-04T08:00:00",
    camara: "CAM-01",
    lugar: "Cruce semaforizado CAM-01 · Apartadó",
    valor: VALOR_D04,
    descuentoHasta: "2026-09-12",
    revisadoPor: "Agente de tránsito · código 187",
    estado: "en_apelacion",
    apelacion: { radicado: "AP-2026-0142", fecha: "2026-09-05T11:20:00" },
  },
  {
    id: "c-0288",
    numero: "05045-2026-000288",
    codigo: "D04",
    descripcion: "No detenerse ante la luz roja del semáforo",
    placa: "BCD204",
    fechaDeteccion: "2026-07-12T07:55:41",
    fechaRevision: "2026-07-12T08:03:12",
    fechaNotificacion: "2026-07-13T08:00:00",
    camara: "CAM-05",
    lugar: "Cruce semaforizado CAM-05 · Apartadó",
    valor: VALOR_D04,
    descuentoHasta: "2026-07-21",
    revisadoPor: "Agente de tránsito · código 214",
    estado: "pagado",
    pago: { fecha: "2026-07-15T16:32:00", valor: VALOR_D04 / 2, referencia: "PSE-88213407" },
  },
];

/* ---------- Normalización y validación ---------- */

export function normalizarPlaca(v: string) {
  return v.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function normalizarCedula(v: string) {
  return v.replace(/\D/g, "");
}

/** Carros: ABC123 · Motos: ABC12D */
export function placaValida(v: string) {
  return /^[A-Z]{3}\d{2}[A-Z0-9]$/.test(v);
}

export function cedulaValida(v: string) {
  return /^\d{6,10}$/.test(v);
}

/* ---------- Consulta ---------- */

export type ResultadoConsulta = {
  vehiculos: Vehiculo[];
  comparendos: Comparendo[];
};

export function buscarComparendos(tipo: TipoBusqueda, valor: string): ResultadoConsulta {
  const vs =
    tipo === "placa"
      ? vehiculos.filter((v) => v.placa === valor)
      : vehiculos.filter((v) => v.cedulaPropietario === valor);
  const placas = new Set(vs.map((v) => v.placa));
  const cs = comparendos
    .filter((c) => placas.has(c.placa))
    .sort((a, b) => b.fechaDeteccion.localeCompare(a.fechaDeteccion));
  return { vehiculos: vs, comparendos: cs };
}

export function vehiculoDe(placa: string) {
  return vehiculos.find((v) => v.placa === placa);
}

/* ---------- Formato ---------- */

export function formatoPlaca(p: string) {
  return p.length === 6 ? `${p.slice(0, 3)} ${p.slice(3)}` : p;
}

export function enmascararCedula(c: string) {
  return `•••• ${c.slice(-4)}`;
}

export function pesos(n: number) {
  return `$${Math.round(n).toLocaleString("es-CO")}`;
}

const fFecha = new Intl.DateTimeFormat("es-CO", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});
const fHora = new Intl.DateTimeFormat("es-CO", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
const fHoraSeg = new Intl.DateTimeFormat("es-CO", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/** "2026-09-30" se interpreta como UTC y en Colombia saldría el día anterior: se fuerza hora local. */
const aFecha = (iso: string) => new Date(iso.length === 10 ? `${iso}T12:00:00` : iso);

export const fecha = (iso: string) => fFecha.format(aFecha(iso));
export const fechaHora = (iso: string) =>
  `${fFecha.format(aFecha(iso))} · ${fHora.format(aFecha(iso))}`;
export const fechaHoraSeg = (iso: string) =>
  `${fFecha.format(aFecha(iso))} · ${fHoraSeg.format(aFecha(iso))}`;

/** ¿Sigue vigente el 50 % de descuento? (hasta el final del día límite) */
export function descuentoVigente(c: Comparendo, hoy = new Date()) {
  return hoy <= new Date(`${c.descuentoHasta}T23:59:59`);
}

export function valorAPagar(c: Comparendo, hoy = new Date()) {
  return descuentoVigente(c, hoy) ? c.valor / 2 : c.valor;
}
