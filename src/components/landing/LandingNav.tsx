import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { IconChevronDown, IconClose, IconMenu, SifcaMark } from "./icons";
import { container } from "./ui";

const anchors = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#para-quien", label: "Para quién" },
  { href: "#transparencia", label: "Transparencia" },
  { href: "#preguntas", label: "Preguntas" },
];

const staffLinks = [
  { to: "/agente", label: "Agente de tránsito", hint: "Revisar eventos" },
  { to: "/admin", label: "Administrador", hint: "Panel y métricas" },
];

export function LandingNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const loginRef = useRef<HTMLDivElement>(null);

  // Cierra el menú "Ingresar" con clic afuera o con Escape.
  useEffect(() => {
    if (!loginOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!loginRef.current?.contains(e.target as Node)) setLoginOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLoginOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [loginOpen]);

  // Cierra el menú móvil con Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-sifca-navy/85 backdrop-blur-md">
      <div className={`${container} flex h-16 items-center justify-between gap-4`}>
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="SIFCA, inicio">
          <SifcaMark className="size-8 shrink-0" />
          <span className="min-w-0 leading-tight">
            <span className="block text-sm font-semibold tracking-wide text-white">SIFCA</span>
            <span className="hidden truncate text-xs text-sifca-light/80 sm:block">
              Secretaría de Movilidad · Apartadó
            </span>
          </span>
        </Link>

        <nav aria-label="Secciones" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {anchors.map((a) => (
              <li key={a.href}>
                <a href={a.href} className="text-sm text-sifca-light transition hover:text-white">
                  {a.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <div ref={loginRef} className="relative">
            <button
              type="button"
              aria-expanded={loginOpen}
              aria-controls="menu-ingresar"
              onClick={() => setLoginOpen((v) => !v)}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-sifca-light transition hover:text-white"
            >
              Ingresar
              <IconChevronDown className={`size-4 transition ${loginOpen ? "rotate-180" : ""}`} />
            </button>
            {loginOpen ? (
              <ul
                id="menu-ingresar"
                className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-sifca-border bg-white p-1.5 shadow-xl shadow-sifca-navy/20"
              >
                {staffLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="block rounded-lg px-3 py-2.5 transition hover:bg-sifca-surface"
                      onClick={() => setLoginOpen(false)}
                    >
                      <span className="block text-sm font-medium text-sifca-text">{l.label}</span>
                      <span className="block text-xs text-sifca-muted">{l.hint}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <Link
            to="/ciudadano"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-sifca-navy transition hover:bg-sifca-light"
          >
            Consultar mi comparendo
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg text-white hover:bg-white/10 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="menu-movil"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <IconClose className="size-6" /> : <IconMenu className="size-6" />}
        </button>
      </div>

      {menuOpen ? (
        <div id="menu-movil" className="border-t border-white/10 bg-sifca-navy lg:hidden">
          <nav aria-label="Secciones" className={`${container} py-4`}>
            <ul className="grid gap-1">
              {anchors.map((a) => (
                <li key={a.href}>
                  <a
                    href={a.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base text-sifca-light hover:bg-white/5 hover:text-white"
                  >
                    {a.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid gap-2 border-t border-white/10 pt-4">
              <Link
                to="/ciudadano"
                className="rounded-lg bg-white px-4 py-3 text-center text-sm font-semibold text-sifca-navy"
              >
                Consultar mi comparendo
              </Link>
              <div className="grid grid-cols-2 gap-2">
                {staffLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="rounded-lg border border-white/20 px-3 py-3 text-center text-sm text-white hover:border-sifca-glow"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
