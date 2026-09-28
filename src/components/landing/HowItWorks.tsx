import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent,
  type SVGProps,
} from "react";
import {
  IconCamera,
  IconDocument,
  IconPause,
  IconPhone,
  IconPlay,
  IconScan,
  IconUserCheck,
} from "./icons";
import {
  CitizenVisual,
  DetectVisual,
  IdentifyVisual,
  IssueVisual,
  ReviewVisual,
} from "./StepVisuals";
import { SectionHeading, container } from "./ui";

type Step = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  who: string;
  text: string;
  Visual: ComponentType;
  /** Duración del paso en reproducción automática (ms). */
  ms: number;
};

const steps: Step[] = [
  {
    icon: IconCamera,
    title: "La cámara detecta",
    who: "Automático · Cámara",
    text: "Graba al vehículo que pasa la línea de pare con la luz en rojo.",
    Visual: DetectVisual,
    ms: 7000,
  },
  {
    icon: IconScan,
    title: "El sistema identifica",
    who: "Automático · RUNT",
    text: "Lee la placa y busca en el RUNT (el registro nacional de vehículos) la marca, el modelo, el color y el propietario.",
    Visual: IdentifyVisual,
    ms: 6000,
  },
  {
    icon: IconUserCheck,
    title: "Una persona revisa",
    who: "Humano · Agente de tránsito",
    text: "Un agente mira la foto y el video. Si la evidencia no es clara, rechaza el caso y no hay multa.",
    Visual: ReviewVisual,
    ms: 6500,
  },
  {
    icon: IconDocument,
    title: "Se emite el comparendo",
    who: "Oficial · Código D04",
    text: "Solo si el agente aprueba, se genera el comparendo oficial por pasar el semáforo en rojo.",
    Visual: IssueVisual,
    ms: 5500,
  },
  {
    icon: IconPhone,
    title: "Consultas o apelas",
    who: "Ciudadano · Placa o cédula",
    text: "Ves la evidencia, descargas el documento, pagas con descuento o presentas tu apelación.",
    Visual: CitizenVisual,
    ms: 6000,
  },
];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(() => !prefersReducedMotion());
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);
  const [run, setRun] = useState(0); // reinicia la barra de progreso
  const sectionRef = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const playing = autoplay && inView && !hovering;

  // Solo avanza cuando la sección está en pantalla.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => {
      setActive((a) => (a + 1) % steps.length);
    }, steps[active].ms);
    return () => window.clearTimeout(id);
  }, [playing, active, run]);

  // Al reanudar, la barra arranca de nuevo junto con el temporizador.
  useEffect(() => {
    if (playing) setRun((r) => r + 1);
  }, [playing]);

  const select = (i: number, focus = false) => {
    setActive(i);
    setAutoplay(false);
    if (focus) tabs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = steps.length - 1;
    const map: Record<string, number> = {
      ArrowRight: i === last ? 0 : i + 1,
      ArrowDown: i === last ? 0 : i + 1,
      ArrowLeft: i === 0 ? last : i - 1,
      ArrowUp: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    };
    if (e.key in map) {
      e.preventDefault();
      select(map[e.key], true);
    }
  };

  const step = steps[active];
  const Visual = step.Visual;
  const StepIcon = step.icon;

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      aria-labelledby="como-titulo"
      className="scroll-mt-16 bg-white py-24"
    >
      <div className={container}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="como-titulo"
            eyebrow="Cómo funciona"
            title="Así trabaja SIFCA, paso a paso"
            lead="La cámara detecta. Una persona decide. Tú puedes verlo todo."
          />
          <button
            type="button"
            onClick={() => setAutoplay((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-sifca-border px-3.5 py-1.5 text-xs font-medium text-sifca-muted transition hover:border-sifca-glow hover:text-sifca-blue"
          >
            {autoplay ? <IconPause className="size-3.5" /> : <IconPlay className="size-3.5" />}
            {autoplay ? "Pausar recorrido" : "Reproducir recorrido"}
          </button>
        </div>

        <div
          className="landing-reveal mt-12 grid gap-6 lg:grid-cols-[21rem_1fr] lg:gap-8"
          data-paused={!playing}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* Pestañas: íconos en móvil, lista completa en escritorio */}
          <div
            role="tablist"
            aria-label="Pasos del proceso"
            className="grid grid-cols-5 gap-2 lg:grid-cols-1 lg:content-start lg:gap-1.5"
          >
            {steps.map((s, i) => {
              const Icon = s.icon;
              const selected = i === active;
              return (
                <button
                  key={s.title}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  id={`paso-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="paso-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`group relative flex flex-col items-center gap-1 overflow-hidden rounded-xl border px-1 py-3 text-center transition lg:flex-row lg:items-start lg:gap-4 lg:px-4 lg:py-4 lg:text-left ${
                    selected
                      ? "border-sifca-navy bg-sifca-navy text-white shadow-lg shadow-sifca-navy/20 lg:border-sifca-border lg:bg-sifca-surface lg:text-sifca-text lg:shadow-none"
                      : "border-sifca-border bg-white text-sifca-muted hover:border-sifca-glow/60 lg:border-transparent lg:hover:bg-sifca-surface"
                  }`}
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg lg:size-11 ${
                      selected
                        ? "text-white lg:bg-sifca-navy"
                        : "text-sifca-mid lg:bg-sifca-light lg:text-sifca-blue"
                    }`}
                  >
                    <Icon className="size-5 lg:size-6" />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block font-mono text-[11px] ${selected ? "text-sifca-light lg:text-sifca-mid" : ""}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`sr-only lg:not-sr-only lg:block lg:text-base lg:font-semibold ${
                        selected ? "lg:text-sifca-text" : "lg:text-sifca-text/80"
                      }`}
                    >
                      {s.title}
                    </span>
                    {selected ? (
                      <span className="hidden text-sm leading-relaxed text-sifca-muted lg:mt-1 lg:block">
                        {s.text}
                      </span>
                    ) : null}
                  </span>
                  {selected ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-sifca-border/40 lg:bg-sifca-border"
                    >
                      <span
                        key={`${active}-${run}`}
                        className={`block h-full bg-sifca-glow ${autoplay ? "landing-progress" : ""}`}
                        style={{ animationDuration: `${s.ms}ms` }}
                      />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Escenario del paso activo */}
          <div id="paso-panel" role="tabpanel" aria-labelledby={`paso-tab-${active}`}>
            <div className="mb-4 lg:hidden">
              <h3 className="text-lg font-semibold text-sifca-text">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-sifca-muted">{step.text}</p>
            </div>

            <div className="relative isolate flex min-h-[26rem] items-center justify-center overflow-hidden rounded-2xl bg-sifca-navy px-4 pt-16 pb-8 sm:px-8 lg:aspect-[16/11] lg:min-h-0">
              <div aria-hidden="true" className="landing-grid absolute inset-0 -z-10 opacity-70" />
              <div
                aria-hidden="true"
                className="absolute -top-32 -right-24 -z-10 size-80 rounded-full bg-sifca-glow/20 blur-3xl"
              />

              <p className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-sifca-deep/70 px-3 py-1 font-mono text-[11px] tracking-wider text-sifca-light uppercase backdrop-blur">
                <StepIcon className="size-3.5 text-sifca-glow" />
                Paso {String(active + 1).padStart(2, "0")} · {step.who}
              </p>

              {/* key: cada cambio de paso reinicia la escena */}
              <Visual key={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
