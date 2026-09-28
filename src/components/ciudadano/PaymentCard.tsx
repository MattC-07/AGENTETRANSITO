import { useRef, useState } from "react";
import { IconCheck, IconClose, IconDownload, IconWallet } from "../landing/icons";
import { descuentoVigente, fecha, pesos, valorAPagar, type Comparendo } from "./data";
import { Panel, btnC } from "./ui";

const medios = [
  { id: "pse", titulo: "PSE", texto: "Débito desde tu cuenta de ahorros o corriente." },
  { id: "tarjeta", titulo: "Tarjeta de crédito", texto: "Visa, Mastercard y otras franquicias." },
  { id: "punto", titulo: "Punto de pago", texto: "Imprime el recibo y paga en efectivo." },
];

/** Aviso accesible para acciones de demostración (sin backend). */
function useAviso() {
  const [aviso, setAviso] = useState<string | null>(null);
  return { aviso, mostrar: setAviso };
}

export function PaymentCard({ comparendo }: { comparendo: Comparendo }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [medio, setMedio] = useState("pse");
  const { aviso, mostrar } = useAviso();

  const descargar = () =>
    mostrar(
      `Demostración: en el sistema real aquí se descarga el PDF del comparendo ${comparendo.numero}.`,
    );

  if (comparendo.estado === "pagado" && comparendo.pago) {
    return (
      <Panel className="p-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-sifca-text">
          <IconCheck className="size-4 text-ok" />
          Comparendo pagado
        </p>
        <p className="mt-2 font-mono text-3xl font-bold text-sifca-text">
          {pesos(comparendo.pago.valor)}
        </p>
        <dl className="mt-3 grid gap-1 text-xs">
          <div className="flex justify-between">
            <dt className="text-sifca-muted">Fecha de pago</dt>
            <dd className="font-medium">{fecha(comparendo.pago.fecha)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sifca-muted">Referencia</dt>
            <dd className="font-mono font-medium">{comparendo.pago.referencia}</dd>
          </div>
        </dl>
        <button type="button" onClick={descargar} className={`${btnC.outline} mt-4 w-full`}>
          <IconDownload className="size-4" />
          Descargar comprobante
        </button>
        <Aviso texto={aviso} />
      </Panel>
    );
  }

  if (comparendo.estado === "en_apelacion") {
    return (
      <Panel className="p-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-sifca-text">
          <IconWallet className="size-4 text-sifca-mid" />
          Valor del comparendo
        </p>
        <p className="mt-2 font-mono text-3xl font-bold text-sifca-text">
          {pesos(comparendo.valor)}
        </p>
        <p className="mt-3 rounded-lg bg-sifca-light px-3 py-2 text-xs leading-relaxed text-sifca-blue">
          Tu apelación está en estudio. Te avisaremos cuando haya una respuesta y qué debes hacer
          después.
        </p>
        <button type="button" onClick={descargar} className={`${btnC.outline} mt-4 w-full`}>
          <IconDownload className="size-4" />
          Descargar comparendo
        </button>
        <Aviso texto={aviso} />
      </Panel>
    );
  }

  const conDescuento = descuentoVigente(comparendo);
  const total = valorAPagar(comparendo);

  return (
    <Panel className="p-5">
      <p className="flex items-center gap-2 text-sm font-semibold text-sifca-text">
        <IconWallet className="size-4 text-sifca-mid" />
        Valor a pagar
      </p>
      <p className="mt-2 font-mono text-3xl font-bold text-sifca-text">{pesos(total)}</p>
      {conDescuento ? (
        <>
          <p className="mt-0.5 text-xs text-sifca-muted">
            Antes <span className="font-mono line-through">{pesos(comparendo.valor)}</span>
          </p>
          <p className="mt-3 rounded-lg bg-sifca-light px-3 py-2 text-xs leading-relaxed text-sifca-blue">
            Tienes <strong>50 % de descuento</strong> si pagas hasta el{" "}
            {fecha(comparendo.descuentoHasta)}.
          </p>
        </>
      ) : (
        <p className="mt-3 rounded-lg bg-sifca-surface px-3 py-2 text-xs leading-relaxed text-sifca-muted">
          El plazo del descuento terminó el {fecha(comparendo.descuentoHasta)}.
        </p>
      )}

      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className={`${btnC.primary} mt-4 w-full`}
      >
        Pagar {pesos(total)}
      </button>
      <button type="button" onClick={descargar} className={`${btnC.outline} mt-2 w-full`}>
        <IconDownload className="size-4" />
        Descargar comparendo
      </button>
      <Aviso texto={aviso} />

      <dialog
        ref={dialogRef}
        aria-labelledby="pago-titulo"
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-sifca-border bg-white p-0 text-sifca-text shadow-2xl backdrop:bg-sifca-deep/60 backdrop:backdrop-blur-sm"
      >
        <form
          method="dialog"
          className="p-6"
          onSubmit={() =>
            mostrar(
              `Demostración: aquí se abriría la pasarela de ${medios.find((m) => m.id === medio)?.titulo} por ${pesos(total)}.`,
            )
          }
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="pago-titulo" className="text-lg font-semibold">
                ¿Cómo quieres pagar?
              </h2>
              <p className="mt-1 text-sm text-sifca-muted">
                Comparendo {comparendo.numero} · <span className="font-mono">{pesos(total)}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Cerrar"
              className="rounded-lg p-1 text-sifca-muted hover:bg-sifca-surface"
            >
              <IconClose className="size-5" />
            </button>
          </div>

          <fieldset className="mt-5 grid gap-2">
            <legend className="sr-only">Medio de pago</legend>
            {medios.map((m) => (
              <label
                key={m.id}
                className={`flex cursor-pointer gap-3 rounded-xl border p-3.5 transition ${
                  medio === m.id
                    ? "border-sifca-glow bg-sifca-surface"
                    : "border-sifca-border hover:border-sifca-glow/60"
                }`}
              >
                <input
                  type="radio"
                  name="medio"
                  value={m.id}
                  checked={medio === m.id}
                  onChange={() => setMedio(m.id)}
                  className="mt-1 accent-sifca-blue"
                />
                <span>
                  <span className="block text-sm font-semibold">{m.titulo}</span>
                  <span className="block text-xs text-sifca-muted">{m.texto}</span>
                </span>
              </label>
            ))}
          </fieldset>

          <button type="submit" className={`${btnC.primary} mt-5 w-full`}>
            Continuar al pago
          </button>
          <p className="mt-3 text-center text-[11px] text-sifca-muted">
            Serás redirigido a una pasarela de pago segura.
          </p>
        </form>
      </dialog>
    </Panel>
  );
}

function Aviso({ texto }: { texto: string | null }) {
  return (
    <p
      role="status"
      aria-live="polite"
      className={
        texto ? "mt-3 rounded-lg bg-sifca-surface px-3 py-2 text-xs text-sifca-muted" : "sr-only"
      }
    >
      {texto}
    </p>
  );
}
