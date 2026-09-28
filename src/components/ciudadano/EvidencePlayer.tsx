import { useEffect, useState, type KeyboardEvent } from "react";
import { IconPlay } from "../landing/icons";
import { PlateBadge, TrafficScene } from "../landing/TrafficScene";
import { fechaHoraSeg, formatoPlaca, type Comparendo } from "./data";

type Vista = "video" | "foto" | "placa";

const vistas: { id: Vista; label: string }[] = [
  { id: "video", label: "Video" },
  { id: "foto", label: "Foto de la infracción" },
  { id: "placa", label: "Foto de la placa" },
];

const DURACION_MS = 7000; // igual al ciclo de la animación landing-car

/**
 * Evidencia del comparendo. En el sistema real, el video y las fotos vienen del
 * backend (p. ej. el componente EvidenceReplay); aquí se ilustran con TrafficScene.
 */
export function EvidencePlayer({ comparendo }: { comparendo: Comparendo }) {
  const [vista, setVista] = useState<Vista>("video");
  const [reproduciendo, setReproduciendo] = useState(false);
  const [vuelta, setVuelta] = useState(0);
  const [segundo, setSegundo] = useState(0);
  const placa = formatoPlaca(comparendo.placa);

  useEffect(() => {
    if (!reproduciendo) return;
    setSegundo(0);
    const tick = window.setInterval(
      () => setSegundo((s) => Math.min(s + 1, DURACION_MS / 1000)),
      1000,
    );
    const fin = window.setTimeout(() => setReproduciendo(false), DURACION_MS);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(fin);
    };
  }, [reproduciendo, vuelta]);

  // Cambiar de comparendo reinicia el reproductor.
  useEffect(() => {
    setVista("video");
    setReproduciendo(false);
  }, [comparendo.id]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = vistas.length;
    const next =
      e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : -1;
    if (next < 0) return;
    e.preventDefault();
    setVista(vistas[next].id);
    document.getElementById(`ev-tab-${vistas[next].id}`)?.focus();
  };

  const play = () => {
    setReproduciendo(true);
    setVuelta((v) => v + 1);
  };

  return (
    <div>
      <div role="tablist" aria-label="Evidencia" className="flex flex-wrap gap-1.5">
        {vistas.map((v, i) => {
          const sel = v.id === vista;
          return (
            <button
              key={v.id}
              id={`ev-tab-${v.id}`}
              role="tab"
              type="button"
              aria-selected={sel}
              aria-controls="ev-panel"
              tabIndex={sel ? 0 : -1}
              onClick={() => setVista(v.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                sel
                  ? "bg-sifca-navy text-white"
                  : "border border-sifca-border text-sifca-muted hover:border-sifca-glow hover:text-sifca-blue"
              }`}
            >
              {v.label}
            </button>
          );
        })}
      </div>

      <div
        id="ev-panel"
        role="tabpanel"
        aria-labelledby={`ev-tab-${vista}`}
        className="relative mt-2 aspect-video overflow-hidden rounded-lg bg-sifca-deep"
      >
        {vista === "video" ? (
          <>
            <TrafficScene
              key={reproduciendo ? `play-${vuelta}` : "poster"}
              animated={reproduciendo}
              detection={reproduciendo}
              plate={placa}
              className="absolute inset-0 size-full"
              label={`Video de la evidencia: el vehículo ${placa} cruza la línea de pare con el semáforo en rojo`}
            />
            {!reproduciendo ? (
              <button
                type="button"
                onClick={play}
                className="absolute inset-0 flex items-center justify-center bg-sifca-deep/30 transition hover:bg-sifca-deep/10"
                aria-label={vuelta ? "Ver el video otra vez" : "Reproducir el video"}
              >
                <span className="flex size-14 items-center justify-center rounded-full bg-white/95 text-sifca-navy shadow-xl">
                  <IconPlay className="size-6" />
                </span>
              </button>
            ) : null}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-3 bg-linear-to-t from-sifca-deep/90 to-transparent px-3 pt-6 pb-2">
              <span className="font-mono text-[10px] text-white tabular-nums">
                00:0{reproduciendo ? segundo : 0} / 00:0{DURACION_MS / 1000}
              </span>
              <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
                {reproduciendo ? (
                  <span
                    key={vuelta}
                    className="landing-progress block h-full rounded-full bg-sifca-glow"
                    style={{ animationDuration: `${DURACION_MS}ms` }}
                  />
                ) : null}
              </span>
            </div>
          </>
        ) : null}

        {vista === "foto" ? (
          <TrafficScene
            plate={placa}
            className="absolute inset-0 size-full"
            label={`Foto de la infracción: el vehículo ${placa} sobre la línea de pare con el semáforo en rojo`}
          />
        ) : null}

        {vista === "placa" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-sifca-navy">
            <div className="landing-grid absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="relative rounded-lg border border-sifca-glow/40 p-6">
              <PlateBadge plate={placa} />
            </div>
            <p className="relative text-xs text-sifca-light">
              Acercamiento de la placa leída por la cámara
            </p>
          </div>
        ) : null}

        <span className="pointer-events-none absolute top-2 left-2 rounded bg-sifca-deep/80 px-1.5 py-0.5 font-mono text-[10px] text-white">
          {comparendo.camara} · {fechaHoraSeg(comparendo.fechaDeteccion)}
        </span>
      </div>
    </div>
  );
}
