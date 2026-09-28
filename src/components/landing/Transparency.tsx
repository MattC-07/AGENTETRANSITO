import type { ComponentType, SVGProps } from "react";
import { IconEye, IconInfo, IconScale } from "./icons";
import { container } from "./ui";

type Right = { icon: ComponentType<SVGProps<SVGSVGElement>>; title: string; text: string };

const rights: Right[] = [
  {
    icon: IconEye,
    title: "Ves el video de tu infracción",
    text: "La foto y el video del momento exacto están disponibles en tu consulta.",
  },
  {
    icon: IconInfo,
    title: "Conoces el motivo",
    text: "Cada comparendo indica la infracción, el lugar, la fecha y la hora.",
  },
  {
    icon: IconScale,
    title: "Puedes apelar",
    text: "Si no estás de acuerdo, presentas tu apelación desde la misma plataforma.",
  },
];

export function Transparency() {
  return (
    <section
      id="transparencia"
      aria-labelledby="transparencia-titulo"
      className="relative isolate scroll-mt-20 overflow-hidden bg-sifca-navy py-24"
    >
      <div aria-hidden="true" className="landing-grid absolute inset-0 -z-10 opacity-60" />
      <div className={`${container} grid gap-14 lg:grid-cols-2 lg:gap-16`}>
        <div className="landing-reveal">
          <p className="font-mono text-xs font-medium tracking-[0.18em] text-sifca-glow uppercase">
            Transparencia y tus derechos
          </p>
          <h2
            id="transparencia-titulo"
            className="mt-4 text-3xl leading-tight font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl"
          >
            Ninguna multa se emite sin que una persona revise la evidencia.
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-sifca-light">
            La cámara solo detecta. Un agente de tránsito mira cada caso y decide. Si la imagen no
            es clara, no hay multa.
          </p>
        </div>

        <ul className="grid content-center gap-4">
          {rights.map((r, i) => {
            const Icon = r.icon;
            return (
              <li
                key={r.title}
                className="landing-reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex gap-5 rounded-xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-sifca-glow/50 hover:bg-white/[0.06]">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-sifca-glow/30 bg-sifca-glow/10 text-sifca-light">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white">{r.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-sifca-light">{r.text}</p>
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
