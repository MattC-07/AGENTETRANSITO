import { Link } from "react-router";
import { IconArrowRight, IconCheck, IconChevronDown } from "./icons";
import { btn, container } from "./ui";

const promises = [
  "Una persona revisa cada caso",
  "Evidencia en foto y video",
  "Apelación en línea",
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-titulo"
      className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-sifca-deep pt-28 pb-24 sm:pt-32"
    >
      {/* Fondo: cuadrícula, halos y línea de horizonte */}
      <div aria-hidden="true" className="landing-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute top-[-18rem] left-1/2 -z-10 h-[40rem] w-[60rem] max-w-[140vw] -translate-x-1/2 rounded-full bg-sifca-glow/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-20rem] left-1/2 -z-10 h-[30rem] w-[70rem] max-w-[160vw] -translate-x-1/2 rounded-full bg-sifca-mid/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-px bg-linear-to-r from-transparent via-sifca-glow/70 to-transparent"
      />

      <div className={`${container} text-center`}>
        <p
          className="landing-rise inline-flex items-center gap-2 rounded-full border border-sifca-glow/30 bg-sifca-glow/10 px-3.5 py-1.5 text-xs font-medium text-sifca-light sm:text-sm"
          style={{ animationDelay: "0ms" }}
        >
          <span className="size-1.5 rounded-full bg-sifca-glow" aria-hidden="true" />
          Secretaría de Movilidad · Apartadó, Antioquia
        </p>

        <h1
          id="hero-titulo"
          className="mx-auto mt-8 max-w-5xl text-[2.35rem] leading-[1.02] font-bold tracking-tighter text-balance text-white sm:text-6xl lg:text-[5.4rem]"
        >
          <span className="landing-rise block" style={{ animationDelay: "120ms" }}>
            Sistema de Fotodetección
          </span>
          <span
            className="landing-rise landing-shimmer block bg-linear-to-r from-sifca-light via-sifca-glow to-sifca-light bg-clip-text pb-2 text-transparent"
            style={{ animationDelay: "260ms" }}
          >
            de Infracciones Semafóricas
          </span>
        </h1>

        <p
          className="landing-rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sifca-light sm:text-xl"
          style={{ animationDelay: "420ms" }}
        >
          Cámaras que detectan cuando un vehículo se pasa el semáforo en rojo. Personas que revisan
          cada caso antes de emitir una multa.
        </p>

        <div
          className="landing-rise mt-10 flex flex-col justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "560ms" }}
        >
          <Link to="/ciudadano" className={`${btn.light} sm:px-7 sm:py-3.5 sm:text-base`}>
            Consultar mi comparendo
            <IconArrowRight className="size-4" />
          </Link>
          <Link to="/agente" className={`${btn.ghost} sm:px-7 sm:py-3.5 sm:text-base`}>
            Soy agente de tránsito
          </Link>
        </div>

        <ul
          className="landing-rise mt-10 flex flex-col items-center justify-center gap-x-8 gap-y-3 text-sm text-sifca-light sm:flex-row"
          style={{ animationDelay: "700ms" }}
        >
          {promises.map((p) => (
            <li key={p} className="inline-flex items-center gap-2">
              <IconCheck className="size-4 text-sifca-glow" />
              {p}
            </li>
          ))}
        </ul>

        <a
          href="#como-funciona"
          className="mt-14 inline-flex flex-col items-center gap-1 text-xs text-sifca-light/80 transition hover:text-white"
        >
          Mira cómo funciona
          <IconChevronDown className="size-5 motion-safe:animate-bounce" />
        </a>
      </div>
    </section>
  );
}
