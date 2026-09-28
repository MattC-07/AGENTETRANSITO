import type { ReactNode } from "react";
import { Link } from "react-router";
import { SifcaMark } from "../landing/icons";
import type { EstadoComparendo } from "./data";

export const shell = "mx-auto w-full max-w-6xl px-4 sm:px-6";

/** Barra superior del módulo ciudadano. */
export function CitizenHeader({ children }: { children?: ReactNode }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-sifca-navy">
      <div className={`${shell} flex h-16 items-center justify-between gap-4`}>
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="SIFCA, ir al inicio">
          <SifcaMark className="size-8 shrink-0" />
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-white">SIFCA</span>
            <span className="block text-xs text-sifca-light/80">Consulta ciudadana</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </header>
  );
}

const estados: Record<EstadoComparendo, { label: string; pill: string; dot: string }> = {
  por_pagar: { label: "Por pagar", pill: "bg-warn-soft text-status-amber", dot: "bg-warn" },
  en_apelacion: { label: "En apelación", pill: "bg-warn-soft text-status-amber", dot: "bg-warn" },
  pagado: { label: "Pagado", pill: "bg-ok-soft text-status-green", dot: "bg-ok" },
};

export function EstadoBadge({ estado }: { estado: EstadoComparendo }) {
  const e = estados[estado];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${e.pill}`}
    >
      <span className={`size-1.5 rounded-full ${e.dot}`} aria-hidden="true" />
      {e.label}
    </span>
  );
}

export const estadoLabel = (e: EstadoComparendo) => estados[e].label;

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-sifca-border bg-white ${className}`}>
      {children}
    </section>
  );
}

export const btnC = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-sifca-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sifca-mid disabled:cursor-not-allowed disabled:opacity-60",
  outline:
    "inline-flex items-center justify-center gap-2 rounded-lg border border-sifca-border bg-white px-4 py-2.5 text-sm font-semibold text-sifca-blue transition hover:border-sifca-glow",
  ghostDark:
    "inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-1.5 text-xs font-medium text-white transition hover:border-sifca-glow sm:text-sm",
};
