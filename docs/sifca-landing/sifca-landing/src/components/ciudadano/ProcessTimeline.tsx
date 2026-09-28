import { IconCheck } from "../landing/icons";
import { fecha, fechaHora, type Comparendo } from "./data";

type Hito = { titulo: string; detalle: string; hecho: boolean };

function hitos(c: Comparendo): Hito[] {
  const base: Hito[] = [
    { titulo: "Detectado por la cámara", detalle: fechaHora(c.fechaDeteccion), hecho: true },
    {
      titulo: "Revisado y aprobado por un agente",
      detalle: fechaHora(c.fechaRevision),
      hecho: true,
    },
    { titulo: "Comparendo notificado", detalle: fecha(c.fechaNotificacion), hecho: true },
  ];
  if (c.estado === "pagado" && c.pago) {
    return [...base, { titulo: "Pagado", detalle: fecha(c.pago.fecha), hecho: true }];
  }
  if (c.estado === "en_apelacion" && c.apelacion) {
    return [
      ...base,
      { titulo: "Apelación radicada", detalle: fecha(c.apelacion.fecha), hecho: true },
      { titulo: "Apelación en estudio", detalle: "En curso", hecho: false },
    ];
  }
  return [...base, { titulo: "Pago o apelación", detalle: "Pendiente", hecho: false }];
}

export function ProcessTimeline({ comparendo }: { comparendo: Comparendo }) {
  const items = hitos(comparendo);
  return (
    <div>
      <h3 className="text-sm font-semibold text-sifca-text">Estado del proceso</h3>
      <ol
        className={`mt-3 grid gap-3 sm:gap-2 ${items.length === 5 ? "sm:grid-cols-5" : "sm:grid-cols-4"}`}
      >
        {items.map((t, i) => (
          <li key={t.titulo} className="relative flex gap-3 sm:flex-col sm:gap-2">
            {i < items.length - 1 ? (
              <span
                aria-hidden="true"
                className={`absolute top-6 left-2.5 h-[calc(100%-0.5rem)] w-px sm:top-2.5 sm:left-6 sm:h-px sm:w-[calc(100%-1rem)] ${
                  items[i + 1].hecho ? "bg-sifca-mid" : "bg-sifca-border"
                }`}
              />
            ) : null}
            <span
              className={`relative flex size-5 shrink-0 items-center justify-center rounded-full ${
                t.hecho ? "bg-sifca-mid text-white" : "border-2 border-warn bg-white"
              }`}
            >
              {t.hecho ? <IconCheck className="size-3" strokeWidth={2.25} /> : null}
            </span>
            <span>
              <span className="block text-xs font-medium text-sifca-text">{t.titulo}</span>
              <span
                className={`block font-mono text-[11px] ${t.hecho ? "text-sifca-muted" : "text-status-amber"}`}
              >
                {t.detalle}
              </span>
              <span className="sr-only">{t.hecho ? "(completado)" : "(pendiente)"}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
