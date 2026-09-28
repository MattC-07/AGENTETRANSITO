import { useEffect, useState } from "react";
import { TrafficScene } from "./TrafficScene";

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

const fmtDate = new Intl.DateTimeFormat("es-CO", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});
const fmtTime = new Intl.DateTimeFormat("es-CO", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/** Esquina de visor de cámara. */
function Corner({ className }: { className: string }) {
  return (
    <span aria-hidden="true" className={`absolute size-6 border-sifca-glow/80 ${className}`} />
  );
}

/**
 * Visor de "cámara en vivo": el vehículo cruza con el semáforo en rojo y el
 * sistema lo detecta. Solo CSS (clases landing-*).
 */
export function CameraFeed({ className = "" }: { className?: string }) {
  const now = useClock();

  return (
    <div className={`overflow-hidden bg-sifca-deep ${className || "relative aspect-[4/3]"}`}>
      <TrafficScene
        animated
        className="absolute inset-0 size-full"
        label="Ilustración: una cámara de tránsito detecta un vehículo que cruza la línea de pare con el semáforo en rojo."
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 font-mono text-[11px] text-white"
      >
        <Corner className="top-3 left-3 rounded-tl-md border-t-2 border-l-2" />
        <Corner className="top-3 right-3 rounded-tr-md border-t-2 border-r-2" />
        <Corner className="bottom-3 left-3 rounded-bl-md border-b-2 border-l-2" />
        <Corner className="right-3 bottom-3 rounded-br-md border-r-2 border-b-2" />

        <span className="absolute top-5 left-6 inline-flex items-center gap-1.5 rounded bg-sifca-deep/70 px-1.5 py-0.5">
          <span className="landing-blink size-2 rounded-full bg-danger" />
          REC
        </span>
        <span className="absolute top-5 right-6 rounded bg-sifca-deep/70 px-1.5 py-0.5 text-sifca-light">
          CAM-03 · APARTADÓ
        </span>
        <span className="absolute bottom-5 left-6 rounded bg-sifca-deep/70 px-1.5 py-0.5 text-sifca-light tabular-nums">
          {fmtDate.format(now)} · {fmtTime.format(now)}
        </span>
        <span className="landing-detect absolute right-6 bottom-5 hidden rounded-full bg-warn-soft px-2 py-0.5 font-sans text-[11px] font-semibold text-status-amber sm:inline-block">
          Pendiente de revisión
        </span>
      </div>
    </div>
  );
}
