import { useEffect, useId, useState, type FormEvent } from "react";
import { IconCheck, IconScale } from "../landing/icons";
import { fecha, type Comparendo } from "./data";
import { Panel, btnC } from "./ui";

const motivos = [
  "El semáforo no estaba en rojo",
  "La placa no corresponde a mi vehículo",
  "Mi vehículo había sido vendido o hurtado",
  "Otro motivo",
];

const MIN_TEXTO = 30;

export function AppealCard({ comparendo }: { comparendo: Comparendo }) {
  const id = useId();
  const [abierto, setAbierto] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [texto, setTexto] = useState("");
  const [correo, setCorreo] = useState("");
  const [archivos, setArchivos] = useState<string[]>([]);
  const [intento, setIntento] = useState(false);
  const [radicado, setRadicado] = useState<string | null>(null);

  // Al cambiar de comparendo se limpia el formulario.
  useEffect(() => {
    setAbierto(false);
    setMotivo("");
    setTexto("");
    setCorreo("");
    setArchivos([]);
    setIntento(false);
    setRadicado(null);
  }, [comparendo.id]);

  if (comparendo.estado === "pagado") return null;

  if (comparendo.estado === "en_apelacion" && comparendo.apelacion) {
    return (
      <Panel className="p-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-sifca-text">
          <IconScale className="size-4 text-sifca-mid" />
          Tu apelación
        </p>
        <dl className="mt-3 grid gap-1.5 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-sifca-muted">Radicado</dt>
            <dd className="font-mono font-semibold">{comparendo.apelacion.radicado}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-sifca-muted">Presentada</dt>
            <dd className="font-medium">{fecha(comparendo.apelacion.fecha)}</dd>
          </div>
        </dl>
        <p className="mt-3 text-sm leading-relaxed text-sifca-muted">
          La Secretaría de Movilidad está revisando tu caso. La respuesta aparecerá aquí.
        </p>
      </Panel>
    );
  }

  const errores = {
    motivo: !motivo ? "Elige un motivo." : null,
    texto: texto.trim().length < MIN_TEXTO ? `Escribe al menos ${MIN_TEXTO} caracteres.` : null,
    correo: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) ? "Escribe un correo válido." : null,
  };
  const valido = !errores.motivo && !errores.texto && !errores.correo;

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    setIntento(true);
    if (!valido) return;
    // Demostración: el backend devolvería el número de radicado.
    setRadicado(`AP-2026-${String(Math.floor(1000 + Math.random() * 9000))}`);
  };

  if (radicado) {
    return (
      <Panel className="p-5">
        <div role="status" aria-live="polite">
          <span className="flex size-10 items-center justify-center rounded-full bg-ok-soft text-status-green">
            <IconCheck className="size-5" strokeWidth={2.25} />
          </span>
          <p className="mt-3 text-base font-semibold text-sifca-text">Recibimos tu apelación</p>
          <p className="mt-1 text-sm text-sifca-muted">
            Tu número de radicado es{" "}
            <span className="font-mono font-semibold text-sifca-text">{radicado}</span>. Te
            escribiremos a <span className="font-medium text-sifca-text">{correo}</span> cuando haya
            respuesta.
          </p>
        </div>
        <p className="mt-4 rounded-lg bg-sifca-surface px-3 py-2 text-[11px] text-sifca-muted">
          Demostración: la apelación no se guarda en ningún servidor.
        </p>
      </Panel>
    );
  }

  const err = (k: keyof typeof errores) => (intento ? errores[k] : null);

  return (
    <Panel className="p-5">
      <p className="flex items-center gap-2 text-sm font-semibold text-sifca-text">
        <IconScale className="size-4 text-sifca-mid" />
        ¿No estás de acuerdo?
      </p>
      <p className="mt-2 text-sm leading-relaxed text-sifca-muted">
        Cuéntanos por qué y adjunta tus pruebas. Una persona de la Secretaría revisará tu caso.
      </p>

      {!abierto ? (
        <button
          type="button"
          onClick={() => setAbierto(true)}
          className={`${btnC.outline} mt-4 w-full`}
        >
          Presentar apelación
        </button>
      ) : (
        <form noValidate onSubmit={enviar} className="mt-4 grid gap-4">
          <div>
            <label htmlFor={`${id}-motivo`} className="text-xs font-medium text-sifca-text">
              Motivo
            </label>
            <select
              id={`${id}-motivo`}
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              aria-invalid={!!err("motivo")}
              aria-describedby={err("motivo") ? `${id}-motivo-err` : undefined}
              className="mt-1 w-full rounded-lg border border-sifca-border bg-white px-3 py-2 text-sm aria-[invalid=true]:border-danger"
            >
              <option value="">Selecciona…</option>
              {motivos.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            {err("motivo") ? (
              <p id={`${id}-motivo-err`} className="mt-1 text-xs text-status-red">
                {err("motivo")}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor={`${id}-texto`} className="text-xs font-medium text-sifca-text">
              Explica lo que pasó
            </label>
            <textarea
              id={`${id}-texto`}
              rows={4}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              aria-invalid={!!err("texto")}
              aria-describedby={`${id}-texto-ayuda`}
              className="mt-1 w-full resize-y rounded-lg border border-sifca-border px-3 py-2 text-sm aria-[invalid=true]:border-danger"
            />
            <p
              id={`${id}-texto-ayuda`}
              className={`mt-1 text-xs ${err("texto") ? "text-status-red" : "text-sifca-muted"}`}
            >
              {err("texto") ?? `${texto.trim().length} de al menos ${MIN_TEXTO} caracteres`}
            </p>
          </div>

          <div>
            <label htmlFor={`${id}-archivos`} className="text-xs font-medium text-sifca-text">
              Pruebas (opcional)
            </label>
            <input
              id={`${id}-archivos`}
              type="file"
              multiple
              accept="image/*,application/pdf"
              onChange={(e) => setArchivos(Array.from(e.target.files ?? []).map((f) => f.name))}
              className="mt-1 block w-full text-xs text-sifca-muted file:mr-3 file:rounded-md file:border-0 file:bg-sifca-light file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-sifca-blue"
            />
            {archivos.length ? (
              <ul className="mt-1.5 grid gap-0.5 text-xs text-sifca-muted">
                {archivos.map((a) => (
                  <li key={a} className="truncate">
                    · {a}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-xs text-sifca-muted">Fotos o PDF.</p>
            )}
          </div>

          <div>
            <label htmlFor={`${id}-correo`} className="text-xs font-medium text-sifca-text">
              Correo para avisarte la respuesta
            </label>
            <input
              id={`${id}-correo`}
              type="email"
              autoComplete="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              aria-invalid={!!err("correo")}
              aria-describedby={err("correo") ? `${id}-correo-err` : undefined}
              className="mt-1 w-full rounded-lg border border-sifca-border px-3 py-2 text-sm aria-[invalid=true]:border-danger"
            />
            {err("correo") ? (
              <p id={`${id}-correo-err`} className="mt-1 text-xs text-status-red">
                {err("correo")}
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setAbierto(false)} className={btnC.outline}>
              Cancelar
            </button>
            <button type="submit" className={btnC.primary}>
              Enviar
            </button>
          </div>
        </form>
      )}
    </Panel>
  );
}
