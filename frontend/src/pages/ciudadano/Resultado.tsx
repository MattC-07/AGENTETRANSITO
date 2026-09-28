import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router";
import { AppealCard } from "../../components/ciudadano/AppealCard";
import {
  buscarComparendos,
  cedulaValida,
  enmascararCedula,
  fechaHoraSeg,
  formatoPlaca,
  pesos,
  placaValida,
  valorAPagar,
  vehiculoDe,
  type TipoBusqueda,
} from "../../components/ciudadano/data";
import { EvidencePlayer } from "../../components/ciudadano/EvidencePlayer";
import { PaymentCard } from "../../components/ciudadano/PaymentCard";
import { ProcessTimeline } from "../../components/ciudadano/ProcessTimeline";
import { CitizenHeader, EstadoBadge, Panel, btnC, shell } from "../../components/ciudadano/ui";
import { IconCheck, IconSearch } from "../../components/landing/icons";

export default function CiudadanoResultado() {
  const [params] = useSearchParams();
  const tipo = params.get("tipo") as TipoBusqueda | null;
  const valor = params.get("valor") ?? "";
  const valido =
    (tipo === "placa" && placaValida(valor)) || (tipo === "cedula" && cedulaValida(valor));

  const resultado = useMemo(
    () => (valido && tipo ? buscarComparendos(tipo, valor) : null),
    [valido, tipo, valor],
  );
  const [seleccion, setSeleccion] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Resultado de tu consulta · SIFCA";
  }, []);

  if (!valido || !resultado || !tipo) return <Navigate to="/ciudadano" replace />;

  const { comparendos } = resultado;
  const actual = comparendos.find((c) => c.id === seleccion) ?? comparendos[0];
  const porPagar = comparendos.filter((c) => c.estado === "por_pagar");
  const titulo =
    tipo === "placa" ? `Placa ${formatoPlaca(valor)}` : `Cédula ${enmascararCedula(valor)}`;

  return (
    <div className="sifca-ui min-h-screen bg-sifca-bg font-sans text-sifca-text antialiased">
      <CitizenHeader>
        <Link to="/ciudadano" className={btnC.ghostDark}>
          <IconSearch className="size-4" />
          Nueva consulta
        </Link>
      </CitizenHeader>

      <main className={`${shell} py-8 sm:py-10`}>
        {/* Resumen */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-sifca-muted">Resultado de tu consulta</p>
            <h1 className="font-mono text-2xl font-bold tracking-tight sm:text-3xl">{titulo}</h1>
          </div>
          {comparendos.length ? (
            <p className="text-sm text-sifca-muted" aria-live="polite">
              {comparendos.length === 1 ? "1 comparendo" : `${comparendos.length} comparendos`}
              {porPagar.length ? (
                <>
                  {" · "}
                  <span className="font-semibold text-status-amber">
                    {porPagar.length} por pagar
                  </span>
                </>
              ) : null}
            </p>
          ) : null}
        </div>

        {!comparendos.length || !actual ? (
          <Panel className="mt-6 px-6 py-14 text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-ok-soft text-status-green">
              <IconCheck className="size-7" strokeWidth={2} />
            </span>
            <h2 className="mt-5 text-xl font-semibold">
              No tienes comparendos por semáforo en rojo
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-sifca-muted">
              No encontramos comparendos de SIFCA para{" "}
              {tipo === "placa" ? "esta placa" : "los vehículos a nombre de esta cédula"}.
            </p>
            <Link to="/ciudadano" className={`${btnC.outline} mt-6`}>
              Hacer otra consulta
            </Link>
          </Panel>
        ) : (
          <>
            {/* Selector cuando hay varios comparendos */}
            {comparendos.length > 1 ? (
              <nav aria-label="Tus comparendos" className="mt-6">
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {comparendos.map((c) => {
                    const sel = c.id === actual.id;
                    return (
                      <li key={c.id}>
                        <button
                          type="button"
                          aria-current={sel ? "true" : undefined}
                          onClick={() => setSeleccion(c.id)}
                          className={`w-full rounded-xl border bg-white p-4 text-left transition ${
                            sel
                              ? "border-sifca-glow ring-2 ring-sifca-glow/25"
                              : "border-sifca-border hover:border-sifca-glow/60"
                          }`}
                        >
                          <span className="flex items-center justify-between gap-2">
                            <span className="font-mono text-sm font-bold">
                              {formatoPlaca(c.placa)}
                            </span>
                            <EstadoBadge estado={c.estado} />
                          </span>
                          <span className="mt-2 block font-mono text-[11px] text-sifca-muted">
                            {fechaHoraSeg(c.fechaDeteccion)}
                          </span>
                          <span className="mt-1 block text-sm font-semibold">
                            {c.estado === "pagado" ? "Pagado" : pesos(valorAPagar(c))}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ) : null}

            <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_20rem]">
              <Panel className="p-4 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[11px] text-sifca-muted">N.º {actual.numero}</p>
                    <h2 className="mt-0.5 text-lg font-semibold sm:text-xl">
                      {actual.descripcion}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <EstadoBadge estado={actual.estado} />
                    <span className="rounded bg-sifca-navy px-2 py-1 font-mono text-xs font-bold text-white">
                      {actual.codigo}
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <EvidencePlayer comparendo={actual} />
                </div>

                <DetalleVehiculo placa={actual.placa} comparendo={actual} />

                <div className="mt-6 border-t border-sifca-border pt-5">
                  <ProcessTimeline comparendo={actual} />
                </div>
              </Panel>

              <div className="grid content-start gap-5">
                <PaymentCard key={`p-${actual.id}`} comparendo={actual} />
                <AppealCard key={`a-${actual.id}`} comparendo={actual} />
              </div>
            </div>
          </>
        )}

        <p className="mt-8 text-center text-[11px] text-sifca-muted">
          Datos simulados para demostración · SIFCA · Secretaría de Movilidad de Apartadó
        </p>
      </main>
    </div>
  );
}

function DetalleVehiculo({
  placa,
  comparendo,
}: {
  placa: string;
  comparendo: ReturnType<typeof buscarComparendos>["comparendos"][number];
}) {
  const v = vehiculoDe(placa);
  const filas = [
    ["Fecha y hora", fechaHoraSeg(comparendo.fechaDeteccion)],
    ["Lugar", comparendo.lugar],
    [
      "Vehículo",
      v
        ? `${formatoPlaca(v.placa)} · ${v.marca} ${v.linea} ${v.modelo} · ${v.color}`
        : formatoPlaca(placa),
    ],
    ["Revisó", comparendo.revisadoPor],
  ];
  return (
    <dl className="mt-5 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
      {filas.map(([k, val]) => (
        <div key={k}>
          <dt className="text-xs text-sifca-muted">{k}</dt>
          <dd className="font-medium">{val}</dd>
        </div>
      ))}
    </dl>
  );
}
