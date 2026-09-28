import type { ComponentType, SVGProps } from "react";
import { Link } from "react-router";
import { IconArrowRight, IconBadge, IconChart, IconCheck, IconUser } from "./icons";
import { SectionHeading, btn, container } from "./ui";

type Audience = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  who: string;
  items: string[];
  cta: string;
  to: string;
  primary?: boolean;
};

const audiences: Audience[] = [
  {
    icon: IconUser,
    title: "Ciudadano",
    who: "Conductores y propietarios de vehículos",
    items: [
      "Consulta con tu placa o tu número de cédula",
      "Mira la foto y el video de la infracción",
      "Descarga el comparendo, paga con descuento o apela",
    ],
    cta: "Consultar mi comparendo",
    to: "/ciudadano",
    primary: true,
  },
  {
    icon: IconBadge,
    title: "Agente de tránsito",
    who: "Personal de la Secretaría de Movilidad",
    items: [
      "Revisa la bandeja de eventos detectados",
      "Compara la evidencia con los datos del RUNT",
      "Aprueba o rechaza, indicando el motivo",
    ],
    cta: "Ingresar como agente",
    to: "/agente",
  },
  {
    icon: IconChart,
    title: "Administrador",
    who: "Coordinación y seguimiento",
    items: [
      "Sigue los eventos y comparendos del día",
      "Revisa el estado de cámaras y semáforos",
      "Consulta las horas críticas y las finanzas",
    ],
    cta: "Ir al panel",
    to: "/admin",
  },
];

export function Audiences() {
  return (
    <section
      id="para-quien"
      aria-labelledby="para-quien-titulo"
      className="scroll-mt-20 bg-sifca-surface py-24"
    >
      <div className={container}>
        <SectionHeading
          id="para-quien-titulo"
          eyebrow="Para quién es"
          title="Una plataforma, tres formas de usarla"
          lead="Elige tu perfil para entrar a tu módulo."
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {audiences.map((a, i) => {
            const Icon = a.icon;
            return (
              <li
                key={a.title}
                className="landing-reveal flex"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="group flex w-full flex-col rounded-xl border border-sifca-border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sifca-glow/60 hover:shadow-lg hover:shadow-sifca-glow/10 sm:p-7">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-sifca-light text-sifca-blue">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-sifca-text">{a.title}</h3>
                  <p className="mt-1 text-sm text-sifca-muted">{a.who}</p>
                  <ul className="mt-5 grid gap-3 border-t border-sifca-border pt-5">
                    {a.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-sifca-text">
                        <IconCheck className="mt-0.5 size-4 shrink-0 text-sifca-mid" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-7">
                    <Link to={a.to} className={`${a.primary ? btn.primary : btn.outline} w-full`}>
                      {a.cta}
                      <IconArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
