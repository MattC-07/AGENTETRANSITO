import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router";
import { IconArrowRight, IconChevronDown } from "./icons";
import { SectionHeading, container } from "./ui";

const faqs = [
  {
    q: "¿Cómo sé si tengo un comparendo?",
    a: "Entra a “Consultar mi comparendo” y escribe tu placa o tu número de cédula. Verás si tienes comparendos y en qué estado está cada uno.",
  },
  {
    q: "¿Qué pasa si la foto no es clara?",
    a: "El agente de tránsito rechaza el caso y anota el motivo, por ejemplo “foto ilegible”. Ese evento no se convierte en multa.",
  },
  {
    q: "¿Puedo ver la evidencia?",
    a: "Sí. En tu consulta puedes ver la foto y el video del momento en que el vehículo cruzó con la luz en rojo, y descargar el comparendo.",
  },
  {
    q: "¿Cómo apelo?",
    a: "Abre el comparendo, pulsa “Apelar”, explica por qué no estás de acuerdo y adjunta tus pruebas si las tienes. Puedes seguir el estado de tu apelación en la plataforma.",
  },
  {
    q: "¿Hay descuento si pago rápido?",
    a: "Sí. Si pagas dentro del plazo de pronto pago, pagas la mitad. Por ejemplo, un comparendo D04 de $548.500 queda en $274.250.",
  },
  {
    q: "¿Quién revisa las multas?",
    a: "Un agente de tránsito de la Secretaría de Movilidad de Apartadó. La cámara solo detecta: la decisión siempre la toma una persona.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  // Navegación con flechas, Inicio y Fin entre preguntas (patrón WAI-ARIA de acordeón).
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = faqs.length - 1;
    const targets: Record<string, number> = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    if (e.key in targets) {
      e.preventDefault();
      buttons.current[targets[e.key]]?.focus();
    }
  };

  return (
    <section
      id="preguntas"
      aria-labelledby="preguntas-titulo"
      className="scroll-mt-20 bg-white py-24"
    >
      <div className={`${container} grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16`}>
        <div>
          <SectionHeading
            id="preguntas-titulo"
            eyebrow="Preguntas frecuentes"
            title="Lo que más nos preguntan"
            lead="Respuestas cortas, sin letra pequeña."
          />
          <Link
            to="/ciudadano"
            className="landing-reveal mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sifca-blue hover:text-sifca-mid"
          >
            Consultar mi comparendo
            <IconArrowRight className="size-4" />
          </Link>
        </div>

        <div className="landing-reveal divide-y divide-sifca-border border-y border-sifca-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const btnId = `${baseId}-btn-${i}`;
            const panelId = `${baseId}-panel-${i}`;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    ref={(el) => {
                      buttons.current[i] = el;
                    }}
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-medium text-sifca-text transition hover:text-sifca-blue"
                  >
                    {f.q}
                    <span
                      className={`flex size-7 shrink-0 items-center justify-center rounded-full border transition duration-300 ${
                        isOpen
                          ? "rotate-180 border-sifca-glow text-sifca-blue"
                          : "border-sifca-border text-sifca-muted"
                      }`}
                    >
                      <IconChevronDown className="size-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  hidden={!isOpen}
                  className="pr-12 pb-5 text-sm leading-relaxed text-sifca-muted"
                >
                  {f.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
