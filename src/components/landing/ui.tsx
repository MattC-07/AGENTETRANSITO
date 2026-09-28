import { useEffect, type ReactNode } from "react";

/* Clases compartidas: todo con tokens de @theme, sin colores escritos a mano. */
const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition duration-200";

export const btn = {
  /** Principal sobre fondo claro */
  primary: `${btnBase} bg-sifca-blue text-white shadow-sm hover:bg-sifca-mid`,
  /** Secundario sobre fondo claro */
  outline: `${btnBase} border border-sifca-border bg-white text-sifca-blue hover:border-sifca-glow hover:text-sifca-mid`,
  /** Principal sobre fondo navy */
  light: `${btnBase} bg-white text-sifca-navy shadow-lg shadow-black/20 hover:bg-sifca-light`,
  /** Secundario sobre fondo navy */
  ghost: `${btnBase} border border-white/25 text-white hover:border-sifca-glow hover:bg-white/5`,
};

export const container = "mx-auto w-full max-w-6xl px-4 sm:px-6";

type HeadingProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  id?: string;
};

/** Encabezado de sección: etiqueta en mono + título + frase de apoyo. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  dark = false,
  align = "left",
  id,
}: HeadingProps) {
  const center = align === "center";
  return (
    <div className={`landing-reveal ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      <p
        className={`font-mono text-xs font-medium tracking-[0.18em] uppercase ${dark ? "text-sifca-glow" : "text-sifca-mid"}`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl ${dark ? "text-white" : "text-sifca-text"}`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-sifca-light" : "text-sifca-muted"}`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Hace aparecer con un fade/slide cada elemento con la clase `landing-reveal`
 * cuando entra en pantalla. Sin librerías; respeta prefers-reduced-motion vía CSS.
 */
export function useReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".landing-reveal"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
