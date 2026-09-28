import { Link } from "react-router";
import { SifcaMark } from "./icons";
import { container } from "./ui";

const access = [
  { to: "/ciudadano", label: "Consultar mi comparendo" },
  { to: "/agente", label: "Ingreso de agentes" },
  { to: "/admin", label: "Panel de administración" },
];

const sections = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#para-quien", label: "Para quién es" },
  { href: "#transparencia", label: "Transparencia" },
  { href: "#preguntas", label: "Preguntas frecuentes" },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-white/10 bg-sifca-navy text-sifca-light">
      <div className={`${container} grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]`}>
        <div>
          <div className="flex items-center gap-3">
            <SifcaMark className="size-9" />
            <div className="leading-tight">
              <p className="text-base font-semibold text-white">SIFCA</p>
              <p className="text-xs">Secretaría de Movilidad · Apartadó, Antioquia</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Proyecto académico — Análisis y Diseño de Sistemas, Universidad de Antioquia.
          </p>
        </div>

        <nav aria-label="Accesos rápidos">
          <h2 className="text-sm font-semibold text-white">Accesos</h2>
          <ul className="mt-4 grid gap-2.5 text-sm">
            {access.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Secciones de la página">
          <h2 className="text-sm font-semibold text-white">En esta página</h2>
          <ul className="mt-4 grid gap-2.5 text-sm">
            {sections.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className={`${container} py-5 font-mono text-xs text-sifca-light/80`}>
          © 2026 SIFCA · v2.1.4
        </p>
      </div>
    </footer>
  );
}
